import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Req,
  Res,
} from '@nestjs/common/decorators';
import { Response } from 'express';
import { CartItemDto } from '../dto/cartitem.dto';
import CustomRequest from 'src/shared/common/interfaces/CustomRequestInterface';
import { CartItemService } from '../services/cartitem.service';

@Controller('cart')
export class CartItemController {
  constructor(private readonly cartItemService: CartItemService) {}

  //API : /cart/add-to-cart
  //Method : POST
  //Access : Public
  //Description : add a product to cart
  @Post('add-to-cart')
  async addToCart(
    @Body() cartItemDto: CartItemDto,
    @Req() req: CustomRequest,
    @Res() res: Response,
  ) {
    try {
      const userId = req.userId;
      if (!cartItemDto.productId || !cartItemDto.quantity) {
        return res.status(400).json({
          status: false,
          message: 'Some fields missing in payload!',
        });
      }
      const response = await this.cartItemService.addToCart(
        userId,
        cartItemDto.productId,
        cartItemDto.quantity,
      );
      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({
        status: false,
        message: error?.message,
        error: error?.stack,
      });
    }
  }

  //API : /cart/get-cart
  //Method : GET
  //Access : Public
  //Description : get user's cart with products
  @Get('get-cart')
  async getCart(@Req() req: CustomRequest, @Res() res: Response) {
    try {
      const userId = req.userId;
      const response = await this.cartItemService.getCart(userId);
      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({
        status: false,
        message: error?.message,
        error: error?.stack,
      });
    }
  }

  //API : /cart/total-cost
  //Method : GET
  //Access : Public
  //Description : get total price of products in cart
  @Get('total-cost')
  async totalCost(@Req() req: CustomRequest, @Res() res: Response) {
    try {
      const userId = req.userId;
      const response = await this.cartItemService.getCart(userId);
      let totalCostOfItems = 0;
      for (let item of response.data) {
        totalCostOfItems += item.quantity * item.product?.price;
      }
      return res.status(200).json({
        status: true,
        totalCost: totalCostOfItems,
      });
    } catch (error) {
      return res.status(500).json({
        status: false,
        message: error?.message,
        error: error?.stack,
      });
    }
  }

  //API : /cart/remove-product?productId={number}
  //Method : DELETE
  //Access : Public
  //Description : remove product from the cart
  @Delete('remove-product')
  async removeProductFromCart(@Req() req: CustomRequest, @Res() res: Response) {
    try {
      const userId = req.userId;
      const productId = Number(req.query?.productId);
      if (!productId) {
        return res.status(400).json({
          status: false,
          message: 'productId is missing in query!',
        });
      }
      const response = await this.cartItemService.removeProductFromCart(
        userId,
        productId,
      );
      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({
        status: false,
        message: error?.message,
        error: error?.stack,
      });
    }
  }

  //API : /cart/update-quantity
  //Method : PUT
  //Access : Public
  //Description : update quantity of specific product in cart
  @Put("update-quantity")
  async updateQuantity(
    @Body() cartItemDto: CartItemDto,
    @Req() req: CustomRequest,
    @Res() res: Response,
  ) {
    try {
      const userId = req.userId;
      const {
        productId,
        quantity
      } = cartItemDto;

      if (!productId || !quantity) {
        return res.status(400).json({
          status: false,
          message: 'Some fields are missing in payload!',
        });
      }
      const response = await this.cartItemService.updateQuantityOfProductInCart(
        userId,
        productId,
        quantity
      );
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
