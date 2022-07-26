import express from 'express';
import * as http from 'http';
import { CommonRoutesConfig } from "./common/common.routes.config";
import { FinanceRoutes } from './finance/finance.routes.config';
import { ProductsRoutes } from "./products/products.routes.config";

const app: express.Application = express();

const routes: Array<CommonRoutesConfig> = []

const port = 3000;

app.use(express.json());

routes.push(new ProductsRoutes(app), new FinanceRoutes(app));

http.createServer(app).listen(port, () => {
	console.log("we're up and running");
}); 
