export default class Agent {
	public readonly uuid: string;
	public readonly name: string;
	public readonly description: string;
	public readonly iconUrl: string;
	public readonly role: AgentRole;
	public readonly abilities: AgentAbility[];

	public constructor(data: any) {
		this.uuid = data.uuid;
		this.name = data.displayName;
		this.description = data.description;
		this.iconUrl = data.iconUrl;
		this.role = {
			uuid: data.role.uuid,
			name: data.role.name,
			description: data.role.description,
			iconUrl: data.role.displayIcon,
		};
		this.abilities = data.abilities.map(
			(ability: any) =>
				({
					slot: ability.slot,
					name: ability.name,
					description: ability.description,
					iconUrl: ability.displayIcon,
				} as AgentAbility)
		);
	}
}

export interface AgentRole {
	uuid: string;
	name: string;
	description: string;
	iconUrl: string;
}

export interface AgentAbility {
	slot: string;
	name: string;
	description: string;
	iconUrl: string;
}
