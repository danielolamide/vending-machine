import express from 'express';
import financesService from '../services/finances.service';


class FinancesController {
	balance(req: express.Request, res: express.Response) {
		let totalBalance = financesService.getFinance();
		return res.send(totalBalance.toString());
	}

	balanceDenominations(req: express.Request, res: express.Response) {
		let balanceDenominations = financesService.getFinanceDenominations();
		return res.send(balanceDenominations);
	}
}

export default new FinancesController();
