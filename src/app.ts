import "dotenv/config";
import "reflect-metadata";
import { userModule } from "@modules/user";
import { configReqQuery } from "@shared/middlewares/config-req-query.middleware";
import compression from "compression";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import { brandModule } from "./modules/brand";
import { categoryModule } from "./modules/category/index";
import { productModule } from "./modules/product";
import { env } from "./shared/components/env";
import { mySqlDataSource } from "./shared/components/type-orm";
import { errorHandler } from "./shared/middlewares/error-handler.middleware";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(morgan("dev"));
app.use(compression());
app.use(configReqQuery);

const router = () => {
	const router = express.Router();
	router.use("/categories", categoryModule());
	router.use("/brands", brandModule());
	router.use("/products", productModule());
	router.use("/users", userModule());
	return router;
};

(async () => {
	try {
		await mySqlDataSource.initialize();

		app.use("/api/v1", router());
		app.get("/", (req, res) => {
			return res.json({ message: "welcome to my api", data: req.query });
		});

		app.use(errorHandler);

		app.listen(env.PORT, () => {
			console.log(`Server is running on port ${env.PORT}`);
		});
	} catch (error) {
		console.log(error);
	}
})();
