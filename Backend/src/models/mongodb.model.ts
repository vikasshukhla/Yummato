import { model } from 'mongoose';
import {
    restaurantSchema,
    userSchema,
    productSchema,
    orderSchema,
    couponSchema,
    profileSchema
} from '../schemas/mongodb.schema';

// export models
export const RestaurantModel = model("Restaurant", restaurantSchema);
export const User = model("User", userSchema);
export const ProductModel = model('Products', productSchema);
export const OrderModel = model("Order", orderSchema);
export const CouponModel = model("Coupons", couponSchema);
export const ProfileModel = model("Profiles", profileSchema);
