import express from 'express';
import financesService from '../../finance/services/finances.service';
import { CreateProductDto } from '../dtos/create.product.dto';
import productsService from '../services/products.service';

class ProductsController {
	create(req: express.Request, res: express.Response) {
		const product = productsService.create(req.body);
		res.status(200).send(`product ${product} created`);
	}

	list(req: express.Request, res: express.Response) {
		const products = productsService.read();
		res.send(products);
	}
	buy(req: express.Request, res: express.Response) {
		/**
		 * get respective product 
		 * check if quantity is above 0
		 * check value of coins inserted should be greater than or equal to price
		 * check if change is required and available, dispense
		 * else refund
		 */
		const product = productsService.readById(req.body.id);
		if (!product) {
			return res.send("no product found with id provided");
		}

		const coinsInserted: number[] = req.body.coins;
		const price = product!.price;
		const quantity = product!.quantity;
		const totalValue = coinsInserted.reduce((previousCoin, currentCoin) => {
			return previousCoin + currentCoin;
		});
		console.log("totalValue", totalValue)
		if (totalValue < price) {
			return res.send("insufficient money provided for product selected");
		}
		if (quantity <= 0) {
			return res.send('product is out of stock')
		}

		coinsInserted.forEach((coin) => {
			let finances = financesService.getFinanceDenominations();
			let patchFinanceData = {
				//@ts-ignore
				[coin]: finances[coin] + 1
			}
			financesService.addFinances(coin.toString(), patchFinanceData)
		});
		const changeAvailable = financesService.setChange(totalValue, price);
		console.log("changeAvailable", changeAvailable)
		if (changeAvailable) {
			let productPatchData = {
				"quantity": quantity - 1
			};
			financesService.getChange(changeAvailable);
			productsService.patchById(product!.id, productPatchData);
			return res.send("please collect your product from the dispenser");
		}
		financesService.getRefund(coinsInserted);
		return res.send('funds restored due to insufficient change');
	}
}

export default new ProductsController();
