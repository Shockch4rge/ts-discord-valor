import { Guild } from 'discord.js';

import AgentService from '../services/AgentService';
import WeaponService from '../services/WeaponService';

export default class GuildCache {
	public readonly guild: Guild;
    public readonly agentService: AgentService;
    public readonly weaponService: WeaponService;

	public constructor(guild: Guild) {
		this.guild = guild;
        this.agentService = new AgentService();
        this.weaponService = new WeaponService();
	}
}
