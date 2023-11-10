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
} from '@tsoa/runtime';
import { ICreateRestaurant, IPatchRestaurant } from '../interfaces/restaurant';
import { RestaurantModel } from '../models/mongodb.model';

@Route('restaurant')
export class RestaurantController extends Controller {
  @SuccessResponse('201', 'restaurant created')
  @Post()
  public async addRestaurant(@Body() postRequestBody: ICreateRestaurant) {
    // log request body
    console.info(`Adding restaurant data: ${JSON.stringify(postRequestBody)}`);

    // save restaurant data to database
    const newRestaurant = new RestaurantModel({
      name: postRequestBody.name,
      location: postRequestBody.location,
      rating: postRequestBody.rating,
      email: postRequestBody.email,
      offers: postRequestBody.offers,
      images: {
        location: postRequestBody.images
          ? postRequestBody.images.location
          : undefined,
      },
    });
    const createResp = await newRestaurant.save();

    console.info(`Create Restaurant Response: ${JSON.stringify(createResp)}`);
    return newRestaurant;
  }

  @SuccessResponse('200', 'restaurants fetched')
  @Get()
  public async getRestaurants() {
    console.info(`Fetching restaurants data...`);

    // fetch restaurants data from database
    const restaurants = await RestaurantModel.find();

    console.info(`Restaurants: ${JSON.stringify(restaurants)}`);
    return restaurants;
  }

  @SuccessResponse('200', 'restaurant fetched')
  @Get('/{id}')
  public async getRestaurant(@Path() id: string) {
    console.info(`Fetching restaurant data for id: ${id}`);

    // fetch restaurant data from database
    const restaurant = await RestaurantModel.findById(id);

    console.info(`Restaurant: ${JSON.stringify(restaurant)}`);
    return restaurant;
  }

  @SuccessResponse('204', 'restaurant deleted')
  @Delete('/{id}')
  public async deleteRestaurant(@Path() id: string) {
    console.info(`Deleting restaurant data for id: ${id}`);

    // delete restaurant data from database
    const deleteResp = await RestaurantModel.findByIdAndDelete(id);

    console.info(`Delete Restaurant Response: ${JSON.stringify(deleteResp)}`);
  }

  @SuccessResponse('200', 'restaurant updated')
  @Patch('/{id}')
  public async updateRestaurant(
    @Path() id: string,
    @Body() patchRequestBody: IPatchRestaurant
  ) {
    console.info(`Fetching restaurant data for id: ${id}`);

    // update restaurant data from database
    await RestaurantModel.findByIdAndUpdate(id, patchRequestBody);

    // get updated restaurant data from database
    const updateResp = await RestaurantModel.findById(id);

    console.info(`Update Restaurant Response: ${JSON.stringify(updateResp)}`);
    return updateResp;
  }
}
