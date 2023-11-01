import { Body, Injectable } from '@nestjs/common/decorators';
import { AppDataSource } from 'src/shared/config/databaseConfig';
import { CartItem } from '../entities/cartitem.entity';
import { User } from 'src/modules/user/entities/user.entity';

@Injectable()
export class CartItemService {
  async addToCart(userId: number, productId: number, quantity: number) {
    const cartitemRepository: any = await AppDataSource.getRepository(CartItem);
    const cartitem = await cartitemRepository.create({
      user: userId,
      product: productId,
      quantity: quantity,
    });
    await cartitemRepository.save(cartitem);
    return {
      status: true,
      message: 'Product is added to cart!',
    };
  }

  async getCart(userId: number) {
    const cartitemRepository: any = await AppDataSource.getRepository(CartItem);
    const cartitem = await cartitemRepository.find({
      where: { user: userId },
      relations: ['product'],
    });
    return {
      status: true,
      data: cartitem,
    };
  }

  async removeProductFromCart(userId: number, productId: number) {
    const cartitemRepository: any = await AppDataSource.getRepository(CartItem);
    const cartItem = await cartitemRepository.findOne({
      where: {
        user: userId,
        'product.id': productId,
      },
    });
    if (cartItem) {
      await cartitemRepository.remove(cartItem);
    }

    return {
      status: true,
      message: 'Product has been removed from cart!',
    };
  }

  async updateQuantityOfProductInCart(
    userId: number,
    productId: number,
    quantity: number,
  ) {
    const cartitemRepository: any = await AppDataSource.getRepository(CartItem);
    const cartItem = await cartitemRepository.findOne({
      where: {
        user: userId,
        'product.id': productId,
      },
    });

    if (cartItem) {
      cartItem.quantity = quantity;
      cartitemRepository.save(cartItem);
    }

    return {
      status: true,
      message: 'Product quantity has been updated!',
    };
  }
}
