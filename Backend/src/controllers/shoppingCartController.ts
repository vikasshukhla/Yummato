import {
  Controller,
  Delete,
  Get,
  Header,
  Patch,
  Path,
  Route,
  SuccessResponse,
} from "tsoa";
import { Cart } from "../schemas/mongodb.schema";
import { ProductModel, User } from "../models/mongodb.model";
import { ApplicationError } from "../models/error.model";
import { StatusCodes } from "http-status-codes";

@Route("cart")
export class ShoppingCartController extends Controller {
  @SuccessResponse("200", "Shopping Cart fetched")
  @Get()
  public async getShoppingCart(@Header("x-user-email") emailID: string) {
    // find user
    const user = await User.findOne({ email: emailID });
    if (!user) {
      throw new ApplicationError(
        StatusCodes.NOT_FOUND,
        `User with email ${emailID} do not exists`
      );
    }

    console.info(`Fetching shopping cart `);

    let cart = await Cart.findOne({ user: user.id })
      .populate("user", "-password")
      .populate("cartItem.product");
    if (!cart) {
      // create an empty cart
      cart = new Cart({
        user: user.id,
      });
      await cart.save();
    }
    console.info(`Shopping Cart: ${JSON.stringify(cart)}`);
    return cart;
  }

  @SuccessResponse("200", "Item added to Shopping Cart")
  @Patch("/{productID}")
  public async addCartItem(
    @Path() productID: string,
    @Header("x-user-email") emailID: string
  ) {
    // find user
    const user = await User.findOne({ email: emailID });
    if (!user) {
      throw new ApplicationError(
        StatusCodes.NOT_FOUND,
        `User with email ${emailID} do not exists`
      );
    }

    console.info(`Adding product to shopping cart `);
    const product = await ProductModel.findById(productID);
    if (!product) {
      throw new ApplicationError(
        StatusCodes.NOT_FOUND,
        `product record with id ${productID} do not exists`
      );
    }
    let cart = await Cart.findOne({ user: user.id });
    if (!cart) {
      cart = new Cart({
        user: user.id,
        cartItem: [
          {
            product: product._id,
            quantity: 1,
          },
        ],
        totalPrice: product.price,
      });
      await cart.save();
      await cart.populate("cartItem.product");
      console.debug(`Shopping Cart: ${JSON.stringify(cart)}`);
      return cart;
    }
    //   if product already exists in cart
    let productFound = false;
    cart?.cartItem.forEach((item) => {
      if (item.product?.toString() === productID) {
        item.quantity += 1;
        productFound = true;
      }
    });
    // if product doesn't exist in cart
    if (!productFound) {
      cart?.cartItem.push({ product: product._id, quantity: 1 });
    }
    cart.totalPrice += product.price;
    await cart?.save();
    await cart.populate("cartItem.product");
    console.debug(`Shopping Cart: ${JSON.stringify(cart)}`);
    return cart;
  }

  @SuccessResponse("200", "Item removed from Shopping Cart")
  @Delete("/{productID}")
  public async removeCartItem(
    @Path() productID: string,
    @Header("x-user-email") emailID: string
  ) {
    // find user
    const user = await User.findOne({ email: emailID });
    if (!user) {
      throw new ApplicationError(
        StatusCodes.NOT_FOUND,
        `User with email ${emailID} do not exists`
      );
    }

    // find product
    const product = await ProductModel.findById(productID);
    if (!product) {
      throw new ApplicationError(
        StatusCodes.NOT_FOUND,
        `product record with id ${productID} do not exists`
      );
    }

    // find cart
    let cart = await Cart.findOne({ user: user.id });
    if (!cart) {
      // create an empty cart
      cart = new Cart({
        user: user.id,
      });
      await cart.save();
      console.info(`Shopping Cart: ${JSON.stringify(cart)}`);
      return cart;
    }
    // remove cartItem
    cart?.cartItem.forEach((item) => {
      if (item.product?.toString() === productID) {
        if (item.quantity === 1) {
          const index = cart!.cartItem.indexOf(item);
          cart?.cartItem.splice(index, 1);
          cart!.totalPrice -= product.price;
        } else {
          item.quantity -= 1;
          cart!.totalPrice -= product.price;
        }
      }
    });

    await cart?.save();
    await cart.populate("cartItem.product");
    console.debug(`Shopping Cart: ${JSON.stringify(cart)}`);
    return cart;
  }

  @SuccessResponse("200", "Delete Shopping Cart")
  @Delete("")
  public async deleteCart(@Header("x-user-email") emailID: string) {
    // find user
    const user = await User.findOne({ email: emailID });
    if (!user) {
      throw new ApplicationError(
        StatusCodes.NOT_FOUND,
        `User with email ${emailID} do not exists`
      );
    }

    // find cart
    const cart = await Cart.findOneAndDelete({ user: user.id });
    console.debug(
      `Shopping Cart Deleted Successfully: ${JSON.stringify(cart)}`
    );
    return cart;
  }
}
