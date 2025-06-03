// askGemini.ts

import { client } from "./api"; // Your GraphQL client setup (like from graphql-request)

// 1. Define the GraphQL Mutation
const ASK_GEMINI_MUTATION = `
  mutation AskGemini($question: String!) {
    askGemini(question: $question)
  }
`;

// 2. Create a function to send the question to the backend
export const askGemini = async (question: string): Promise<string> => {
  try {
    const variables = { question };
    interface AskGeminiResponse {
      askGemini: string;
    }
    const data = await client.request<AskGeminiResponse>(ASK_GEMINI_MUTATION, variables);
    return data.askGemini;
  } catch (error) {
    console.error("❌ Error asking Gemini:", error);
    return "Something went wrong while contacting Gemini.";
  }
};

// 3. Optional: Example usage in a frontend function
// You can remove this block if you will use the function elsewhere
const example = async () => {
  const response = await askGemini("What are some trending products?");
  console.log("Gemini Response:", response);
};


