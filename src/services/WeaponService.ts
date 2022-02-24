import axios from 'axios';

export default class WeaponService {
	public async findById(id: string) {
		try {
			const response = await axios.get(`https://valorant-api.com/v1/weapons/${id}`);
			return response.data.data;
		} catch (err) {
			console.log(err);
			throw new Error(`❌  There's something wrong with the Valorant API's servers. Try again later!`);
		}
    }
}
