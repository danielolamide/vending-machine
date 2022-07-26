import financeDaos from "../daos/finance.daos";
import { CreateFinanceDto } from "../dtos/create.finance.dto";
import { PatchFinanceDto } from "../dtos/patch.finance.dto";

class FinancesService {
	getFinance() {
		let finances = financeDaos.getFinances();
		let denominations = Object.keys(finances);
		let totalFunds = 0;
		for (let i = 0; i < denominations.length; i++) {
			//@ts-ignore
			totalFunds = Number(denominations[i]) * finances[denominations[i]];
		}
		return totalFunds;
	}

	getFinanceDenominations() {
		return financeDaos.getFinances();
	}

	addFinances(denomination: string, finance: PatchFinanceDto) {
		financeDaos.patchByDenomination(denomination, finance);
		return "vending machine balance updated";
	}

	setChange(paid: number, price: number) {
		let change = paid - price;
		return this.#setChangeDenominations(change) ?? false
	}

	getChange(changeRequired: CreateFinanceDto) {
		let denomination = Object.keys(changeRequired);
		denomination.forEach((coin) => {
			let finances = financeDaos.getFinances();
			let patchFinanceData = {
				//@ts-ignore
				[coin]: finances[coin] - changeRequired[coin]
			}
			this.addFinances(coin, patchFinanceData);
		});
	}


	getRefund(coinsInserted: number[]) {
		let finances = financeDaos.getFinances();
		coinsInserted.forEach((coin) => {
			let patchFinanceData = {
				//@ts-ignore 
				[coin]: finances[coin] - 1
			};
			financeDaos.patchByDenomination(coin.toString(), patchFinanceData);
		})
	}

	#setChangeDenominations(change: number) {
		let finances = financeDaos.getFinances();
		let denominations = Object.keys(finances);
		let changeCombinations: CreateFinanceDto = {
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
		};
		denominations.sort((a, b) => +b - +a);
		for (let i = 0; i < denominations.length; i++) {
			//@ts-ignore
			while (change >= Number(denominations[i]) && finances[denominations[i]] > 0) {
				change = change % Number(denominations[i]);
				//@ts-ignore
				changeCombinations[denominations[i]] += 1;
			}
		}
		if (change === 0) {
			return changeCombinations;
		};
		return false;
	}
}

export default new FinancesService();
