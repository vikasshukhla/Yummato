import mongoose, { Schema } from 'mongoose';

// export restaurant schema
export const restaurantSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  location: {
    type: String,
    trim: true,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    required: true,
  },
  offers: {
    type: String,
    trim: true,
  },
  images: {
    location: {
      type: String,
      trim: true,
    },
  },
});

export const profileSchema = new Schema({
  firstName: {
    type: String,
    trim: true,
    required: true,
  },
  lastName: {
    type: String,
    trim: true,
    required: true,
  },
  gender: {
    type: String,
    trim: true,
    required: true,
  },
  dob: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    trim: true,
    required: true,
  },
  address: {
    type: String,
    trim: true,
    required: true,
  },
  city: {
    type: String,
    trim: true,
    required: true,
  },
  state: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
});

export const userSchema = new Schema({
  googleId: {
    type: String,
    required: false,
    unique: true,
  },
  name: {
    type: String,
    require: true,
    unique: false,
  },
  email: {
    type: String,
    required: false,
    unique: true,
  },
  password: {
    type: String,
    required: false,
  },
  resetLink: {
    type: String,
    default: "",
    required: false
  }
});

export const couponSchema = new Schema({
  code: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
});

// export product schema
export const productSchema = new Schema({
  name: {
    type: String,
    trim: true,
    unique: true,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  cuisine: {
    type: String,
    trim: true,
    required: true,
  },
  image: {
    type: String,
    trim: true,
  },
});

export const cartSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  cartItem: [
    {
      product: { type: Schema.Types.ObjectId, ref: 'Products' },
      quantity: { type: Number, default: 0 },
      id: { type: String },
    },
  ],
  totalPrice: { type: Number, default: 0 },
});

export const formDataSchema = new Schema({
  firstName: {
    type: String,
    trim: true,
    required: true,
  },
  lastName: {
    type: String,
    trim: true,
    required: true,
  },
  address: {
    type: String,
    trim: true,
    required: true,
  },
  city: {
    type: String,
    trim: true,
    required: true,
  },
  state: {
    type: String,
    trim: true,
    required: true,
  },
});

export const Cart = mongoose.model('Cart', cartSchema);

export const orderDataSchema = new Schema({
  cartItems: { type: Schema.Types.Array, ref: 'Cart', required: true },
  totalPrice: {
    type: Number,
    required: true,
  },
  formData: { type: formDataSchema, trim: true, required: true },
});

export const orderSchema = new Schema({
  emailId: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
  },
  date: {
    type: String,
    trim: true,
    required: true,
    unique: false,
  },
  orderData: {
    type: orderDataSchema,
    required: true,
  },
});
