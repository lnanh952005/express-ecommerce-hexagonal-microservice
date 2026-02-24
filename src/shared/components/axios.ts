import axios from "axios";
import { env } from "./env";

class MyAxios {
	instance;

	constructor() {
		this.instance = axios.create({
			baseURL: env.SERVER_URL,
		});
	}
}

export const myAxios = new MyAxios();
