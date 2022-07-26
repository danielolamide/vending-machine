import { CreateProductDto } from "../dtos/create.product.dto";
import { PatchProductDto } from "../dtos/patch.product.dto";
import shortid from 'shortid';


class ProductDaos {
	products: Array<CreateProductDto> = [];
	constructor() {
		console.log("Created new instance of in-memory product table");
	}
	addProduct(product: CreateProductDto) {
		product.id = shortid.generate();
		this.products.push(product);
		return product.id;
	}
	getProducts() {
		return this.products;
	}
	getProductById(productId: string) {
		return this.products.find((product: { id: string }) => product.id = productId)
	}
	patchProductById(productId: string, product: PatchProductDto) {
		const productIndex = this.products.findIndex((obj: { id: string }) => obj.id === productId);
		let selectedProduct = this.products[productIndex];
		const patchableFields = [
			"quantity",
			"price"
		];
		for (let field of patchableFields) {
			if (field in product) {
				//@ts-ignore
				selectedProduct[field] = product[field]
			}
		}
		this.products.splice(productIndex, 1, selectedProduct);
		return `${selectedProduct.id} updated`;
	}
}

//singleton pattern to ensure same instance of objects
export default new ProductDaos();
