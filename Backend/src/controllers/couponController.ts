import {
    Controller,
    Route,
    Post,
    SuccessResponse,
    Body,
    Get,
    Path,
    Delete
} from '@tsoa/runtime';
import {
    CouponCreate,
} from '../interfaces/couponInterface';
import {
    createNewCoupon,
    getAllCoupons,
    getCouponById,
    deleteCouponById
} from '../services/couponService';
import { ApplicationError } from '../models/error.model';
import { StatusCodes } from 'http-status-codes';

@Route('coupons')
export class CouponController extends Controller {
    @SuccessResponse('201', 'coupon created')
    @Post()
    public async addNewCoupon(@Body() postRequestBody: CouponCreate) {
        // log request
        console.info(
            `received POST /coupons with request body: ${JSON.stringify(
                postRequestBody
            )}`
        );

        // call service function to create new coupon
        const coupon = await createNewCoupon(postRequestBody);

        // return coupon data
        return coupon;
    }

    @Get()
    public async getAllCoupons() {
        // log request
        console.info(`GET /coupons request received`);

        // call service function to get all coupons
        return await getAllCoupons();
    }

    @Get('/{id}')
    public async getCouponById(@Path() id: string) {
        // log request
        console.info(`GET /coupons/id received with id: ${id}`);

        // call service function to get coupon record by id
        const coupon = await getCouponById(id);

        // check if any coupon record was found
        if (coupon) {
            // return coupon data
            return coupon;
        } else {
            // throw NOT_FOUND error
            throw new ApplicationError(
                StatusCodes.NOT_FOUND,
                `coupon with id ${id} do not exists`
            );
        }
    }

    @Delete('/{id}')
    public async deleteCouponById(@Path() id: string) {
        // log request
        console.info(`received DELETE /coupons/id with id: ${id}`);

        // call service function to delete coupon record
        const coupon = await deleteCouponById(id);

        // check if coupon was deleted
        if (coupon) {
            // return deleted coupon data
            return coupon;
        } else {
            // throw NOT_FOUND error
            throw new ApplicationError(
                StatusCodes.NOT_FOUND,
                `coupon with id ${id} do not exists`
            );
        }
    }
}
