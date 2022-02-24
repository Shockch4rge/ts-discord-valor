import { ButtonInteraction, MessageEmbed, WebhookEditMessageOptions } from 'discord.js';

import GuildCache from '../app/GuildCache';
import { InteractionHelper } from './InteractionHelper';

export class ButtonHelper extends InteractionHelper<ButtonInteraction> {
	public constructor(interaction: ButtonInteraction, guildCache: GuildCache) {
		super(interaction, guildCache);
	}

	public async update(options: MessageEmbed | WebhookEditMessageOptions | string) {
		if (options instanceof MessageEmbed) {
			await this.interaction
				.update({
					embeds: [options],
				})
				.catch(() => {});
		} else if (typeof options === "object") {
			await this.interaction.editReply(options);
		} else {
			await this.interaction
				.update({
					content: options,
				})
				.catch(() => {});
		}
	}
}
