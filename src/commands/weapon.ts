import { SlashCommandBuilder } from '@discordjs/builders';

import { SlashCommandData } from '../interfaces';
import * as Constants from '../utilities/Constants';

module.exports = {
	builder: new SlashCommandBuilder()
		.setName("weapon")
		.setDescription("Get info about a specific weapon")
		.addStringOption(option =>
			option
				.setName("name")
				.setDescription("The name of the weapon")
				.addChoices(Constants.WEAPONS)
				.setRequired(true)
		),

	execute: async helper => {
        const weaponId = helper.string("name")!;
        
	},
} as SlashCommandData;
