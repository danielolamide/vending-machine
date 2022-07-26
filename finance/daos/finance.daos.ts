import { CreateFinanceDto } from "../dtos/create.finance.dto";
import { PatchFinanceDto } from "../dtos/patch.finance.dto";

class FinanceDaos {
	finances: CreateFinanceDto = {
		1000: 0,
		500: 0,
		200: 0,
		100: 0,
		50: 0,
		20: 0,
		10: 0,
		5: 0,
		1: 0,
		0.5: 0
	}

	patchByDenomination(denomination: string, finance: PatchFinanceDto) {
		//@ts-ignore
		this.finances[denomination] = finance[denomination];
		//@ts-ignore
		console.log(`${denomination}\`s are now ${finance[denomination]}`);
	}

	getFinances() {
		return this.finances;
	}
}

export default new FinanceDaos();
