import axios from 'axios';

import Agent from '../models/Agent';

export default class AgentService {
	public async findById(id: string) {
		try {
			const response = await axios.get(`https://valorant-api.com/v1/agents/${id}`);
			return new Agent(response.data.data);
		} catch (err) {
			console.log(err);
			throw new Error(`❌  There's something wrong with the Valorant API's servers. Try again later!`);
		}
    }    
}
