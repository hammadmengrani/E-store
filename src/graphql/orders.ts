import { client } from "./api";

// ===========================
// 📌 Order Types
// ===========================
interface OrderItem {
  productId: string;
  title: string;
  price: number;
  quantity: number;
  total: number;
}

interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  email: string;
  totalAmount: number;
  status: string;
  createdAt: string;
  items: OrderItem[];
}

interface OrderInput {
  customerName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  postalCode: string;
  items: OrderItem[];
  totalAmount: number;
}

// ===========================
// 📌 Add Order Mutation
// ===========================
export const ADD_ORDER_MUTATION = `
  mutation AddOrder(
    $customerName: String!,
    $email: String!,
    $phone: String!,
    $address: String!,
    $city: String!,
    $country: String!,
    $postalCode: String!,
    $items: [OrderItemInput!]!,
    $totalAmount: Float!
  ) {
    addOrder(
      customerName: $customerName,
      email: $email,
      phone: $phone,
      address: $address,
      city: $city,
      country: $country,
      postalCode: $postalCode,
      items: $items,
      totalAmount: $totalAmount
    ) {
      id
      orderNumber
      customerName
      email
      totalAmount
      status
      createdAt
    }
  }
`;

export const placeOrder = async (orderData: OrderInput): Promise<Order | null> => {
  try {
    const data = await client.request<{ addOrder: Order }>(ADD_ORDER_MUTATION, orderData);
    console.log("✅ Order Placed:", data.addOrder);
    return data.addOrder;
  } catch (error) {
    console.error("❌ Error Placing Order:", error);
    return null;
  }
};

// ===========================
// 📌 Get Orders Query
// ===========================
export const GET_ORDERS_QUERY = `
  query GetOrders {
    getOrders {
      id
      orderNumber
      customerName
      email
      totalAmount
      status
      createdAt
      items {
        productId
        title
        price
        quantity
        total
      }
    }
  }
`;

export const fetchOrders = async (): Promise<Order[]> => {
  try {
    const data = await client.request<{ getOrders: Order[] }>(GET_ORDERS_QUERY);
    console.log("✅ Orders Fetched:", data.getOrders);
    return data.getOrders;
  } catch (error) {
    console.error("❌ Error Fetching Orders:", error);
    return [];
  }
};
