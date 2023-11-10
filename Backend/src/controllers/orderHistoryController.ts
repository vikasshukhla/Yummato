import { Body, Controller, Post, Route, SuccessResponse } from "@tsoa/runtime";
import { Order } from "../interfaces/order";
import { OrderModel } from "../models/mongodb.model";
import { Get, Path, Delete, Query } from "tsoa";

@Route("order")
export class OrderHistoryController extends Controller {
  @SuccessResponse("201", "order created")
  @Post()
  public async addOrder(@Body() postRequestBody: Order) {
    // log request body
    console.info(`Adding order: ${JSON.stringify(postRequestBody)}`);
    // save order to database
    const newOrder = new OrderModel({
      emailId: postRequestBody.emailId,
      date: postRequestBody.date,
      orderData: postRequestBody.orderData,
    });
    const createResp = await newOrder.save();
    console.info(`Added Order Response: ${JSON.stringify(createResp)}`);
    return newOrder;
  }

  @SuccessResponse("200", "order history fetched")
  @Get("/all")
  public async getOrders() {
    console.info(`Order history data...`);

    // fetch orders from database
    const orders = await OrderModel.find();

    console.info(`Orders: ${JSON.stringify(orders)}`);
    return orders;
  }

  @SuccessResponse("200", "order history fetched")
  @Get("/{id}")
  public async getOrder(@Path() id: string) {
    console.info(`Fetching order from id: ${id}`);

    // fetch order from database
    const order = await OrderModel.findById(id);

    console.info(`Order: ${JSON.stringify(order)}`);
    return order;
  }

  @SuccessResponse("204", "order history deleted")
  @Delete("/{id}")
  public async deleteOrder(@Path() id: string) {
    console.info(`Deleting order for id: ${id}`);

    // delete order from database
    const deleteResp = await OrderModel.findByIdAndDelete(id);

    console.info(`Deleted Order Response: ${JSON.stringify(deleteResp)}`);
  }

  @SuccessResponse("200", "order history fetched for particular user")
  @Get()
  public async getAllOrdersOfParticularUser(@Query('emailId') emailId:string) {
    console.info(`Order history for user : ${emailId}`);

    // fetch orders from database for given email
    const orders = await OrderModel.find({emailId : emailId});

    console.info(`Orders: ${JSON.stringify(orders)}`);
    return orders;
  }
}
