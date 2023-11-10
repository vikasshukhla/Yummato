import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Path,
  Post,
  Route,
  SuccessResponse,
} from "@tsoa/runtime";
import { StatusCodes } from "http-status-codes";
import {
  IProductCreate,
  IProductUpdate,
} from "../interfaces/product.interface";
import { ApplicationError } from "../models/error.model";
import {
  createNewProduct,
  deleteProductById,
  getAllCuisines,
  getAllProducts,
  getProductById,
  updateProductById,
} from "../services/product.service";

@Route("products")
export class ProductController extends Controller {
  @SuccessResponse("201", "product created")
  @Post()
  public async addNewProduct(@Body() postRequestBody: IProductCreate) {
    // log request
    console.info(
      `received POST /products with request body: ${JSON.stringify(
        postRequestBody
      )}`
    );

    // call service function to create new product
    const product = await createNewProduct(postRequestBody);

    // return product data
    return product;
  }

  @Get()
  public async getAllProducts() {
    // log request
    console.info(`GET /products request received`);

    // call service function to get all products
    return await getAllProducts();
  }

  @Get("/{id}")
  public async getProductById(@Path() id: string) {
    // log request
    console.info(`GET /products/id received with id: ${id}`);

    // call service function to get product record by id
    const product = await getProductById(id);

    // check if any product record was found
    if (product) {
      // return product data
      return product;
    } else {
      // throw NOT_FOUND error
      throw new ApplicationError(
        StatusCodes.NOT_FOUND,
        `product with id ${id} do not exists`
      );
    }
  }

  @Delete("/{id}")
  public async deleteProductById(@Path() id: string) {
    // log request
    console.info(`received DELETE /products/id with id: ${id}`);

    // call service function to delete product record
    const product = await deleteProductById(id);

    // check if product was deleted
    if (product) {
      // return deleted product data
      return product;
    } else {
      // throw NOT_FOUND error
      throw new ApplicationError(
        StatusCodes.NOT_FOUND,
        `product with id ${id} do not exists`
      );
    }
  }

  @Patch("/{id}")
  public async patchProductById(
    @Path() id: string,
    @Body() patchRequestBody: IProductUpdate
  ) {
    // log request
    console.info(
      `received PATCH /products/id with id: ${id}, request body: ${JSON.stringify(
        patchRequestBody
      )}`
    );

    // call service function to update product record having given id
    return await updateProductById(id, patchRequestBody);
  }
}

@Route("cuisines")
export class CuisineController extends Controller {
  @Get()
  public async getAllCuisines() {
    // log request
    console.info(`GET /cuisines request received`);

    // call service function to get all products
    return await getAllCuisines();
  }
}
