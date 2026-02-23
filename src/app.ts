import "dotenv/config";
import express from "express";
import { categoryModule } from "./modules/category/index";

import { env } from "./shared/components/env";
import { sequelize } from "./shared/components/sequelize";

const app = express();
app.use(express.json());

const router = () => {
	const router = express.Router();
	router.use("/categories", categoryModule());
	return router;
};

(async () => {
	try {
		await sequelize.authenticate();
		app.use("/api/v1", router());
		app.listen(env.PORT, () => {
			console.log("ok");
		});
	} catch (error) {
		console.log(error);
	}
})();
