import axios from 'axios';

import Agent from '../Agent';

describe("Type parity with API", () => {
	it("locally defined constants should match the API's", async () => {
		const Constants = await import("../../utilities/Constants");
		const response = await axios.get("https://valorant-api.com/v1/agents/");

		expect(response.status).toBe(200);
		Constants.AGENTS.forEach(agent => {
			expect(
				response.data.data.find((a: any) => a.displayName === agent[0] && a.id === agent[1])
			).toBeTruthy();
		});
	});

	it("should parse Sage API data into a new Agent", async () => {
		const sageUuid = "569fdd95-4d10-43ab-ca70-79becc718b46";
		const response = await axios.get(`https://valorant-api.com/v1/agents/${sageUuid}`);

		expect(response.status).toBe(200);

		const apiAgent = response.data.data;
		const agent = new Agent(apiAgent);

		expect(agent.uuid).toBe(sageUuid);
		expect(agent.name).toBe("Sage");
		expect(agent.iconUrl).toBe(apiAgent.displayIcon);
		expect(agent.description).toBe(apiAgent.description);
		expect(agent.abilities.length).toBe(4);
		agent.abilities.forEach((ability, index) => {
			const apiAbility = apiAgent.abilities[index];
			expect(ability.name).toBe(apiAbility.name);
			expect(ability.description).toBe(apiAbility.description);
			expect(ability.iconUrl).toBe(apiAbility.displayIcon);
			expect(ability.slot).toBe(apiAbility.slot);
		});
		expect(agent.role.name).toBe(apiAgent.role.displayName);
		expect(agent.role.description).toBe(apiAgent.role.description);
		expect(agent.role.iconUrl).toBe(apiAgent.role.displayIcon);
	});
});
