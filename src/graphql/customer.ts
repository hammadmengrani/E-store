import { client } from "./api"; // Assuming client is imported from your API setup

// GraphQL query to fetch customers
export const GET_CUSTOMERS_QUERY = `
  query GetCustomers {
    getCustomers {
      id
      customerName
      phone
      city
      country
      orders
      totalSpend
      email
      aov
      purchasedProducts {
        productId
        title
        category
        price
        purchaseDate
      }
    }
  }
`;

// Function to fetch customers
export const fetchCustomers = async () => {
  try {
    // Sending the GraphQL request and fetching customer data
    const data = await client.request<{
      getCustomers: {
        id: string;
        customerName: string;
        phone: number;
        city: string;
        country: string;
        orders: number;
        totalSpend: number;
        email: string;
        aov: number;
        cluster: number;
        purchasedProducts: {
          productId: string;
          title: string;
          category: string[];
          price: number;
          purchaseDate: string;
        }[];
      }[];
    }>(GET_CUSTOMERS_QUERY);

    // Returning the fetched customer data
    return data.getCustomers;
  } catch (error) {
    // Catching and logging errors
    console.error("❌ Error Fetching Customers:", error);
    return []; // Return an empty array if fetching fails
  }
};
