import { Controller, Post, Get, Body, Res, Req } from '@nestjs/common';
import { Response, Request } from 'express';
import { ProductDto } from '../dto/product.dto';
import { ProductService } from '../services/product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  //API : /product/add-product
  //Method : POST
  //Access : Public
  //Description : add new product (admin)
  @Post('add-product')
  async addProduct(@Body() productDto: ProductDto, @Res() res: Response) {
    try {
      if (
        !productDto.name ||
        !productDto.price ||
        !productDto.imageUrl
      ) {
        return res.status(400).json({
          status: false,
          message: 'Some fields are missing in payload!',
        });
      }
      const response = await this.productService.addNewProduct(productDto);
      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({
        status: false,
        message: error?.message,
        error: error?.stack,
      });
    }
  }

  //API : /product/get-all-products
  //Method : GET
  //Access : Public
  //Description : fetch all products
  @Get('get-all-products')
  async getAllProducts(@Res() res: Response) {
    try {
      const response = await this.productService.fetchAllProducts();
      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({
        status: false,
        message: error?.message,
        error: error?.stack,
      });
    }
  }

  //API : /product/get-product?productId={number}
  //Method : GET
  //Access : Public
  //Description : fetch specific product
  @Get('get-product')
  async getProduct(@Req() req: Request ,@Res() res: Response) {
    try {
      const productId = Number(req.query?.productId);
      if(!productId){
        return res.status(400).json({
          status: false,
          message: 'productId is missing in query!',
        });
      }
      const response = await this.productService.getProductById(productId);
      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({
        status: false,
        message: error?.message,
        error: error?.stack,
      });
    }
  }
}
