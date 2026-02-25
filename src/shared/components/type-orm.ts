import path from "node:path";
import { DataSource } from "typeorm";
import { env } from "./env";

export const mySqlDataSource = new DataSource({
	type: "mysql",
	url: env.DB_URL,
	synchronize: true,
	entities: [path.resolve(__dirname ,'../entities/*.entity{.ts,.js}')],
});