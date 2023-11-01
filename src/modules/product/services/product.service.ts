import { Body, Injectable } from '@nestjs/common/decorators';
import { ProductDto } from '../dto/product.dto';
import { AppDataSource } from 'src/shared/config/databaseConfig';
import { Product } from '../entities/product.entity';

@Injectable()
export class ProductService {

  async addNewProduct(@Body() productDto: ProductDto) {
    const productRepository = await AppDataSource.getRepository(Product);
    const product = await productRepository.create(productDto);
    await productRepository.save(product);
    return {
      status: true,
      message: 'Added new product!',
    };
  }

  async fetchAllProducts() {
    const productRepository = await AppDataSource.getRepository(Product);
    const products = await productRepository.find();
    return {
      status: true,
      data: products,
    };
  }

  async getProductById(productId: number) {
    const productRepository = await AppDataSource.getRepository(Product);
    const product = await productRepository.findOneBy({
      id: productId
    });
    return {
      status: true,
      data: product
    };
  }
}
