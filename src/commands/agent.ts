import axios from 'axios';
import { MessageEmbed } from 'discord.js';

import { inlineCode, SlashCommandBuilder } from '@discordjs/builders';

import { EmbedBuilder } from '../builders/EmbedBuilder';
import { SlashCommandData } from '../interfaces';
import * as Constants from '../utilities/Constants';

module.exports = {
	builder: new SlashCommandBuilder()
		.setName("agent")
		.setDescription("Get info about a specific agent")
		.addStringOption(option =>
			option
				.setName("name")
				.setDescription("The agent's names")
				.setRequired(true)
				.addChoices(Constants.AGENTS)
		),

	execute: async helper => {
		const agentId = helper.string("name")!;

		try {
			const agent = await axios.get(`https://valorant-api.com/v1/agents/${agentId}`)
			// const agent = await helper.cache.agentService.findById(agentId);
			const message = await EmbedBuilder.buildAgentDetails(agent.data.data);
			await helper.respond(message);
		} catch (err) {
			await helper.respond(
				new MessageEmbed().setAuthor({
					name: (err as Error).message,
				})
			);
		}
	},
} as SlashCommandData;
