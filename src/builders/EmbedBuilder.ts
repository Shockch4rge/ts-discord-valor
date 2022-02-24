import { ChartJSNodeCanvas } from 'chartjs-node-canvas';
import {
    ColorResolvable, MessageActionRow, MessageAttachment, MessageButton, MessageEmbed,
    WebhookMessageOptions
} from 'discord.js';
import DominantColour from 'dominant-color-converter';

import { inlineCode } from '@discordjs/builders';

export class EmbedBuilder {
	public static async buildAgentDetails(agent: any) {
		const dominantColor = await new DominantColour().convert(agent.displayIcon);
		const embed = new MessageEmbed();

		const chart = await new ChartJSNodeCanvas({
			width: 400,
			height: 200,
		}).renderToBuffer({
			type: "line",
			data: {
				datasets: [
					{
						data: [20, 10],
					},
				],
				labels: ["a", "b"],
			},
		});

		embed.setTitle(agent.displayName);
		embed.addFields([
			{
				name: "Role",
				value: agent.role.displayName,
				inline: true,
			},
			{
				name: "Abilities",
				value: "⠀",
			},
			{
				name: `${agent.abilities[0].displayName}  ${inlineCode("E")}`,
				value: agent.abilities[0].description,
			},
			{
				name: `${agent.abilities[1].displayName}  ${inlineCode("Q")}`,
				value: agent.abilities[1].description,
			},
			{
				name: `${agent.abilities[2].displayName}  ${inlineCode("C")}`,
				value: agent.abilities[2].description,
			},
			{
				name: `${agent.abilities[3].displayName}  ${inlineCode("X")}`,
				value: agent.abilities[3].description,
			},
		]);

		embed.setColor(dominantColor.vibrant! as ColorResolvable);
		embed.setDescription(agent.description);
		embed.setThumbnail(agent.displayIcon);

		return {
			embeds: [embed],
			files: [new MessageAttachment(chart, `${agent.displayName}.png`)],
			components: [
				new MessageActionRow().addComponents([
					new MessageButton()
						.setCustomId("ability-1")
						.setLabel(agent.abilities[0].displayName)
						.setStyle("PRIMARY"),
					new MessageButton()
						.setCustomId("ability-2")
						.setLabel(agent.abilities[1].displayName)
						.setStyle("PRIMARY"),
					new MessageButton()
						.setCustomId("ability-3")
						.setLabel(agent.abilities[2].displayName)
						.setStyle("PRIMARY"),
					new MessageButton()
						.setCustomId("ability-4")
						.setLabel(agent.abilities[3].displayName)
						.setStyle("PRIMARY"),
				]),
			],
		} as WebhookMessageOptions;
	}


	public static async buildWeaponDetails(data: any) {
		
	}
}
