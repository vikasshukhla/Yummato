import {
    Coupon,
    CouponCreate
} from '../interfaces/couponInterface';
import { ApplicationError } from '../models/error.model';
import { CouponModel } from '../models/mongodb.model';
import { StatusCodes } from 'http-status-codes';

const getCouponByCode = async (couponCode: string) => {
    try {
        // fetch coupon by code and return
        return await CouponModel.findOne({ code: couponCode });
    } catch (error: unknown) {
        console.error(
            `error fetching coupon by code - ${couponCode}: ${JSON.stringify(
                error
            )}`
        );
        throw new ApplicationError(
            StatusCodes.INTERNAL_SERVER_ERROR,
            `error fetching coupon by code - ${couponCode}`
        );
    }
};

export const createNewCoupon = async (
    couponData: CouponCreate
): Promise<Coupon> => {
    try {
        // check if coupon with same name already exists
        if (await getCouponByCode(couponData.code)) {
            // throw error
            console.error(
                `coupon with same code already exists: ${couponData.code}`
            );
            throw new ApplicationError(
                StatusCodes.CONFLICT,
                `coupon with same code already exists: ${couponData.code}`
            );
        }
        // create coupon record
        const newCoupon = new CouponModel({
            code: couponData.code.trim()
        });

        // save coupon data
        await newCoupon.save();

        // create dto object
        const coupon: Coupon = {
            id: newCoupon.id,
            code: newCoupon.code
        };

        // return new coupon
        return coupon;
    } catch (error: unknown) {
        console.error(`error creating new coupon: ${JSON.stringify(error)}`);
        if (error instanceof ApplicationError) throw error;
        else
            throw new ApplicationError(
                StatusCodes.INTERNAL_SERVER_ERROR,
                `error creating new coupon`
            );
    }
};

export const getAllCoupons = async (): Promise<Coupon[]> => {
    try {
        // fetch all coupons
        const coupons = await CouponModel.find();

        // create dto object array
        const responseArray: Coupon[] = [];

        // add coupon items to dto object array
        for (const coupon of coupons) {
            responseArray.push({
                id: coupon.id,
                code: coupon.code
            });
        }

        // return dto objects array
        return responseArray;
    } catch (error: unknown) {
        console.error(`error getting all coupons: ${JSON.stringify(error)}`);
        if (error instanceof ApplicationError) throw error;
        else
            throw new ApplicationError(
                StatusCodes.INTERNAL_SERVER_ERROR,
                `error getting all coupons`
            );
    }
};

export const getCouponById = async (
    couponId: string
): Promise<Coupon | undefined> => {
    try {
        // fetch coupon by id
        const coupon = await CouponModel.findById(couponId);

        // check if coupon record was found
        if (coupon) {
            // create and return dto object
            const couponDTO: Coupon = {
                id: coupon.id,
                code: coupon.code
            };

            // return dto object
            return couponDTO;
        } else {
            // return undefined
            return undefined;
        }
    } catch (error: unknown) {
        console.error(
            `error getting coupon by id ${couponId} - ${JSON.stringify(
                error
            )}`
        );
        if (error instanceof ApplicationError) throw error;
        else if (
            (error as Error).name &&
            (error as Error).name === 'CastError'
        ) {
            // throw BAD_REQUEST error
            throw new ApplicationError(
                StatusCodes.BAD_REQUEST,
                `invalid coupon id: ${couponId}`
            );
        } else
            throw new ApplicationError(
                StatusCodes.INTERNAL_SERVER_ERROR,
                `error getting coupon by id ${couponId}`
            );
    }
};

export const deleteCouponById = async (
    couponId: string
): Promise<Coupon | undefined> => {
    try {
        // fetch and delete coupon by id
        const coupon = await CouponModel.findByIdAndDelete(couponId);

        // check if coupon was deleted
        if (coupon) {
            // create dto object
            const couponDTO: Coupon = {
                id: coupon.id,
                code: coupon.code
            };

            // return dto object
            return couponDTO;
        } else {
            // return undefined when no coupon was found with given id
            return undefined;
        }
    } catch (error: unknown) {
        console.error(
            `error deleting coupon by id ${couponId} - ${JSON.stringify(
                error
            )}`
        );
        if (error instanceof ApplicationError) throw error;
        else if (
            (error as Error).name &&
            (error as Error).name === 'CastError'
        ) {
            // throw BAD_REQUEST error
            throw new ApplicationError(
                StatusCodes.BAD_REQUEST,
                `invalid coupon id: ${couponId}`
            );
        } else
            throw new ApplicationError(
                StatusCodes.INTERNAL_SERVER_ERROR,
                `error deleting coupon by id ${couponId}`
            );
    }
};