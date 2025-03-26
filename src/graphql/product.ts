import { client } from "./api";

export const GET_PRODUCTS_QUERY = `
  query GetProducts {
    getProducts {
      id
      title
      description
      price
      salePrice  # ✅ Corrected field name
      stock
      imageUrl   # ✅ Corrected field name
      category
      multiImages # ✅ Corrected field name
      variations
    }
  }
`;

export const fetchProducts = async () => {
    try {
      const data = await client.request(GET_PRODUCTS_QUERY);
      // console.log(data.getProducts)
      return data.getProducts;
    } catch (error) {
      console.error("❌ Error Fetching Products:", error);
      return [];
    }
  };