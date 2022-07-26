import { CommonRoutesConfig } from "../common/common.routes.config"
import express from 'express';
import ProductsController from "./controllers/product.controller";

export class ProductsRoutes extends CommonRoutesConfig {
	constructor(app: express.Application) {
		super(app, "ProductsRoutes");
	}

	configureRoutes(): express.Application {
		this.app.route("/products").get(ProductsController.list);
		this.app.route("/products/buy").post(ProductsController.buy);
		this.app.route("/products/create").post(ProductsController.create);
		return this.app
	}
}
