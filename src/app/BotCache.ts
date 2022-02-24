import { Client, Collection, Guild } from 'discord.js';

import GuildCache from './GuildCache';

export default class BotCache {
	public readonly bot: Client;
	public readonly guildCaches: Collection<string, GuildCache>;

	public constructor(bot: Client) {
		this.bot = bot;
		this.guildCaches = new Collection();
	}

	public getGuildCache(guild: Guild) {
		let cache = this.guildCaches.get(guild.id);

		if (!cache) {
			cache = this.createGuildCache(guild);
		}

		return cache;
	}

	public createGuildCache(guild: Guild) {
		const cache = new GuildCache(guild);
		this.guildCaches.set(guild.id, cache);
		return cache;
	}
}
