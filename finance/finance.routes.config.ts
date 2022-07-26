import { CommonRoutesConfig } from "../common/common.routes.config";
import express from 'express';
import FinanceController from "./controllers/finance.controller";

export class FinanceRoutes extends CommonRoutesConfig {
	constructor(app: express.Application) {
		super(app, "ManagersRoutes");
	}

	configureRoutes(): express.Application {
		this.app.route("/finance").get(FinanceController.balance);
		this.app.route("/finance/denominations").get(FinanceController.balanceDenominations)
		return this.app;
	}

}
