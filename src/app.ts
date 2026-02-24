import "dotenv/config";
import compression from "compression";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import { brandModule } from "./modules/brand";
import { categoryModule } from "./modules/category/index";
import { productModule } from "./modules/product";
import { env } from "./shared/components/env";
import { sequelize } from "./shared/components/sequelize";
import { errorHandler } from "./shared/middlewares/error-handler.middleware";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(morgan("dev"));
app.use(compression());

const router = () => {
	const router = express.Router();
	router.use("/categories", categoryModule());
	router.use("/brands", brandModule());
	router.use("/products", productModule());
	return router;
};

(async () => {
	try {
		await sequelize.sync({ alter: true });
		app.use("/api/v1", router());
		app.use(errorHandler);
		app.listen(env.PORT, () => {
			console.log(`Server is running on port ${env.PORT}`);
		});
	} catch (error) {
		console.log(error);
	}
})();
