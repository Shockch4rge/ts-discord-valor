import { MessageEmbed } from 'discord.js';

import { SlashCommandBuilder } from '@discordjs/builders';

import { SlashCommandData } from '../interfaces';

module.exports = {
	builder: new SlashCommandBuilder().setName("ping").setDescription("Get the bot's ping"),

	execute: async helper => {
		await helper.respond(
			new MessageEmbed().setAuthor({ name: ` 🏓  Pong! ${helper.interaction.client.ws.ping}ms` })
		);
	},
} as SlashCommandData;
