import { CreateProductDto } from "../dtos/create.product.dto";
import ProductDaos from "../daos/product.daos";
import { PatchProductDto } from "../dtos/patch.product.dto";

class ProductsService {
	create(product: CreateProductDto) {
		return ProductDaos.addProduct(product);
	}
	patchById(id: string, product: PatchProductDto) {
		return ProductDaos.patchProductById(id, product);
	}
	read() {
		return ProductDaos.getProducts();
	}
	readById(id: string) {
		return ProductDaos.getProductById(id);
	}
}

export default new ProductsService();
