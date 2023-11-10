export interface Order {
  emailId: string;
  date: string;
  orderData: OrderData;
}

export interface OrderData {
  cartItems: Array<Cart>;
  totalPrice: number;
  formData: Form;
}

export interface Cart {
  id: string;
  name: string;
  image: string;
  price: number;
  cuisine: string;
  quantity: number;
}

export interface Form {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
}

