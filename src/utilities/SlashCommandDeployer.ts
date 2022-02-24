import 'dotenv/config';

import { Routes } from 'discord-api-types/v9';
import { Collection } from 'discord.js';

import { REST } from '@discordjs/rest';

import { SlashCommandData } from '../interfaces';

export class SlashCommandDeployer {
	public static async deploy(guildId: string, slashCommandFiles: Collection<string, SlashCommandData>) {
		const rest = new REST({ version: "9" }).setToken(process.env.token!);

		await rest.put(Routes.applicationGuildCommands(process.env.client_id!, guildId), {
			body: slashCommandFiles.map(command => command.builder.toJSON()),
		});
	}
}
