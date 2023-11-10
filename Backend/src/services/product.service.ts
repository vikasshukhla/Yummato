import {
  IProduct,
  IProductCreate,
  IProductUpdate,
} from "../interfaces/product.interface";
import { ApplicationError } from "../models/error.model";
import { ProductModel } from "../models/mongodb.model";
import { StatusCodes } from "http-status-codes";

const getProductByName = async (productName: string) => {
  try {
    // fetch product by name and return
    return await ProductModel.findOne({ name: productName });
  } catch (error: unknown) {
    console.error(
      `error fetching product by name - ${productName}: ${JSON.stringify(
        error
      )}`
    );
    throw new ApplicationError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      `error fetching product by name - ${productName}`
    );
  }
};

export const createNewProduct = async (
  productData: IProductCreate
): Promise<IProduct> => {
  try {
    // check if product with same name already exists
    if (await getProductByName(productData.name)) {
      // throw error
      console.error(
        `product with same name already exists: ${productData.name}`
      );
      throw new ApplicationError(
        StatusCodes.CONFLICT,
        `product with same name already exists: ${productData.name}`
      );
    }
    // create product record
    const newProduct = new ProductModel({
      name: productData.name.trim(),
      price: productData.price,
      cuisine: productData.cuisine.trim(),
      image: productData.image,
    });

    // save product data
    await newProduct.save();

    // create dto object
    const product: IProduct = {
      id: newProduct.id,
      name: newProduct.name,
      price: newProduct.price,
      cuisine: newProduct.cuisine,
      image: newProduct.image,
    };

    // return new product
    return product;
  } catch (error: unknown) {
    console.error(`error creating new product: ${JSON.stringify(error)}`);
    if (error instanceof ApplicationError) throw error;
    else
      throw new ApplicationError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        `error creating new product`
      );
  }
};

export const getAllProducts = async (): Promise<IProduct[]> => {
  try {
    // fetch all products
    const products = await ProductModel.find();

    // create dto object array
    const responseArray: IProduct[] = [];

    // add product items to dto object array
    for (const product of products) {
      responseArray.push({
        id: product.id,
        name: product.name,
        price: product.price,
        cuisine: product.cuisine,
        image: product.image,
      });
    }

    // return dto objects array
    return responseArray;
  } catch (error: unknown) {
    console.error(`error getting all products: ${JSON.stringify(error)}`);
    if (error instanceof ApplicationError) throw error;
    else
      throw new ApplicationError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        `error getting all products`
      );
  }
};

export const getProductById = async (
  productId: string
): Promise<IProduct | undefined> => {
  try {
    // fetch product by id
    const product = await ProductModel.findById(productId);

    // check if product record was found
    if (product) {
      // create and return dto object
      const productDTO: IProduct = {
        id: product.id,
        name: product.name,
        price: product.price,
        cuisine: product.cuisine,
        image: product.image,
      };

      // return dto object
      return productDTO;
    } else {
      // return undefined
      return undefined;
    }
  } catch (error: unknown) {
    console.error(
      `error getting product by id ${productId} - ${JSON.stringify(error)}`
    );
    if (error instanceof ApplicationError) throw error;
    else if ((error as Error).name && (error as Error).name === "CastError") {
      // throw BAD_REQUEST error
      throw new ApplicationError(
        StatusCodes.BAD_REQUEST,
        `invalid product id: ${productId}`
      );
    } else
      throw new ApplicationError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        `error getting product by id ${productId}`
      );
  }
};

export const deleteProductById = async (
  productId: string
): Promise<IProduct | undefined> => {
  try {
    // fetch and delete product by id
    const product = await ProductModel.findByIdAndDelete(productId);

    // check if product was deleted
    if (product) {
      // create dto object
      const productDTO: IProduct = {
        id: product.id,
        name: product.name,
        price: product.price,
        cuisine: product.cuisine,
        image: product.image,
      };

      // return dto object
      return productDTO;
    } else {
      // return undefined when no product was found with given id
      return undefined;
    }
  } catch (error: unknown) {
    console.error(
      `error deleting product by id ${productId} - ${JSON.stringify(error)}`
    );
    if (error instanceof ApplicationError) throw error;
    else if ((error as Error).name && (error as Error).name === "CastError") {
      // throw BAD_REQUEST error
      throw new ApplicationError(
        StatusCodes.BAD_REQUEST,
        `invalid product id: ${productId}`
      );
    } else
      throw new ApplicationError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        `error deleting product by id ${productId}`
      );
  }
};

export const updateProductById = async (
  productId: string,
  productUpdateData: IProductUpdate
): Promise<IProduct> => {
  try {
    // fetch product by id
    const product = await ProductModel.findById(productId);

    // check if product was found
    if (product) {
      // check if at least one field value is sent to update
      if (productUpdateData.price || productUpdateData.image) {
        // check if product price needed to be updated
        if (productUpdateData.price) {
          // update product price
          product.price = productUpdateData.price;
        }

        // check if product image needed to be updated
        if (productUpdateData.image) {
          // update product image
          product.image = productUpdateData.image;
        }

        // save updated product
        await product.save();

        // create dto object
        const productDTO: IProduct = {
          id: product.id,
          name: product.name,
          price: product.price,
          cuisine: product.cuisine,
          image: product.image,
        };

        // return dto object
        return productDTO;
      } else {
        // throw BAD_REQUEST error
        throw new ApplicationError(
          StatusCodes.BAD_REQUEST,
          `at least one field ('price' or 'image') value needed to be sent with PATCH request body`
        );
      }
    } else {
      // throw NOT_FOUND error
      throw new ApplicationError(
        StatusCodes.NOT_FOUND,
        `product record with id ${productId} do not exists`
      );
    }
  } catch (error: unknown) {
    console.error(
      `error updating product by id ${productId} - ${JSON.stringify(error)}`
    );
    if (error instanceof ApplicationError) throw error;
    else if ((error as Error).name && (error as Error).name === "CastError") {
      // throw BAD_REQUEST error
      throw new ApplicationError(
        StatusCodes.BAD_REQUEST,
        `invalid product id: ${productId}`
      );
    } else
      throw new ApplicationError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        `error updating product by id ${productId}`
      );
  }
};

export const getAllCuisines = async (): Promise<IProduct[]> => {
  try {
    // fetch all cuisines
    const cuisines = await ProductModel.distinct("cuisine");

    // return dto objects array
    return cuisines;
  } catch (error: unknown) {
    console.error(`error getting all cuisines: ${JSON.stringify(error)}`);
    if (error instanceof ApplicationError) throw error;
    else
      throw new ApplicationError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        `error getting all cuisines`
      );
  }
};
