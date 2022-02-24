import 'dotenv/config';

import { Client, Collection } from 'discord.js';
import fs from 'node:fs';
import path from 'node:path';

import BotCache from './app/BotCache';
import { ButtonHelper } from './helpers/ButtonHelper';
import { MenuHelper } from './helpers/MenuHelper';
import { SlashCommandHelper } from './helpers/SlashCommandHelper';
import { ButtonData, MenuData, SlashCommandData } from './interfaces';
import { SlashCommandDeployer } from './utilities/SlashCommandDeployer';

export default class Bot {
	private readonly bot: Client;
	public readonly botCache: BotCache;
	public readonly slashCommandFiles: Collection<string, SlashCommandData>;
	public readonly buttonFiles: Collection<string, ButtonData>;
	public readonly menuFiles: Collection<string, MenuData>;

	public constructor() {
		this.bot = new Client({
			intents: ["GUILD_MESSAGES", "GUILDS"],
		});
		this.botCache = new BotCache(this.bot);
		this.slashCommandFiles = new Collection();
		this.buttonFiles = new Collection();
		this.menuFiles = new Collection();
	}

	public initialise() {
		this.registerSlashCommandInteractions();
		this.registerButtonInteractions();
		this.registerMenuInteractions();
		this.registerClientEvents();
		void this.bot.login(process.env.token!);
	}

	protected registerClientEvents() {
		this.bot.on("ready", async bot => {
			const guilds = bot.guilds.cache.toJSON();

			for (const guild of guilds) {
				try {
					await SlashCommandDeployer.deploy(guild.id, this.slashCommandFiles);
				} catch (err) {
					console.error(
						`❌ Failed to deploy slash commands in ${guild.name}: ${(err as Error).message}`
					);
				}

				console.log(`✅ Deployed slash commands in ${guild.name}`);
			}

			console.log(`${bot.user.tag} is ready!`);
		});

		this.bot.on("error", error => console.error(`❗ Bot Error: ${error.message}`));

		this.bot.on("interactionCreate", async interaction => {
			const guildCache = this.botCache.getGuildCache(interaction.guild!);

			if (interaction.isCommand()) {
				const command = this.slashCommandFiles.get(interaction.commandName);
				if (!command) return;

				await interaction
					.deferReply({
						ephemeral: command.ephemeral ?? true,
					})
					.catch(() => {});

				const helper = new SlashCommandHelper(interaction, guildCache);

				if (command.guard) {
					try {
						await command.guard.test(helper);
					} catch (err) {
						await command.guard.fail(err as Error, helper);
						return;
					}
				}

				try {
					await command.execute(helper);
				} catch (err) {
					console.error(
						`❌ Failed to execute command:\nName: ${command.builder.name}\nDescription: ${command.builder.description}`
					);
					console.error(`Error: "${(err as Error).message}"`);
				}
			}

			if (interaction.isButton()) {
				const button = this.buttonFiles.get(interaction.customId);
				if (!button) return;

				const helper = new ButtonHelper(interaction, guildCache);

				try {
					await button.execute(helper);
				} catch (err) {
					await helper
						.update({
							content: `❌ There was an error executing this button!`,
							components: [],
						})
						.catch(() => {});
					console.error(`❌ Failed to execute button:\nName: ${button.id}`);
					console.error(`Error: "${(err as Error).message}"`);
				}
			}

			if (interaction.isSelectMenu()) {
				const menu = this.menuFiles.get(interaction.customId);
				if (!menu) return;

				const helper = new MenuHelper(interaction, guildCache);

				try {
					await menu.execute(helper);
				} catch (err) {
					await helper
						.update({
							content: `❌ There was an error executing this menu!`,
							components: [],
						})
						.catch(() => {});
					console.error(`❌ Failed to execute menu:\nName: ${menu.id}`);
					console.error(`Error: "${(err as Error).message}"`);
				}
			}
		});

		this.bot.on("guildDelete", async guild => {
			console.log(`Removed from guild: ${guild.name}`);
		});
	}

	protected registerSlashCommandInteractions() {
		const commandDir = path.join(__dirname, `./commands`);
		const commandNames = fs.readdirSync(commandDir).filter(this.isFile);

		for (const commandName of commandNames) {
			const commandData = require(path.join(commandDir, commandName)) as SlashCommandData;
			this.slashCommandFiles.set(commandData.builder.name, commandData);
		}
	}

	protected registerButtonInteractions() {
		const buttonDir = path.join(__dirname, `./buttons`);
		const buttonNames = fs.readdirSync(buttonDir).filter(this.isFile);

		for (const buttonName of buttonNames) {
			const buttonData = require(path.join(buttonDir, buttonName)) as ButtonData;
			this.buttonFiles.set(buttonData.id, buttonData);
		}
	}

	protected registerMenuInteractions() {
		const menuDir = path.join(__dirname, `./menus`);
		const menuNames = fs.readdirSync(menuDir).filter(this.isFile);

		for (const menuName of menuNames) {
		}
	}

	private isFile(file: string) {
		return file.endsWith(`.ts`) || file.endsWith(`.js`);
	}
}
