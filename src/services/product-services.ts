import { Request, Response } from "express";
import DaoFactory from "../daos";
import ProductDto from "../dto/product-dto";
import { IProduct, IProductDto } from "../models/types";

class ProductServices {

    private productDao = DaoFactory.getInstance().createDao('products');

    async getAll(){
        try {
            const products = await this.productDao.getAll();
            const productsDto:ProductDto[] = [];
            products.forEach((product:IProductDto) => {
                productsDto.push(new ProductDto(product._id,product));
            });

            return productsDto;
        } catch (err) {
            throw err;
        }
    }
    async getById(id:string) {
        try {
            const product = await this.productDao.getById(id);
            return new ProductDto(product._id,product);
        } catch (err) {
            throw err;
        }
    }
    async create(product:IProduct) {
        try {
            return await this.productDao.create(product);
        } catch (err) {
            throw err;
        }
    }
}
const productServices = new ProductServices();
export default productServices;