import { client } from "./api";

export const RECOMMEND_PRODUCTS_BY_LAST_ORDER = `
  query {
    suggestRelatedProductsBasedOnLastOrder {
      id
      title
      price
      salePrice
      category
    }
  }
`;

export interface Product {
  id: string;
  title: string;
  price: number;
  salePrice: number | null;  // sale_price can be null if not available
  category: string[];
}

export const fetchRecommendedProducts = async (): Promise<Product[] | null> => {
  try {
    interface RecommendResponse {
      suggestRelatedProductsBasedOnLastOrder: Product[];
    }

    const data = await client.request<RecommendResponse>(RECOMMEND_PRODUCTS_BY_LAST_ORDER);

    return data.suggestRelatedProductsBasedOnLastOrder;
  } catch (error) {
    console.error("❌ Error fetching recommended products:", error);
    return null;
  }
};
