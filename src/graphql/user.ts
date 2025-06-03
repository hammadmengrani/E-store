import { client } from "./api";


export const LOGIN_USER_MUTATION = `
  mutation LoginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      id
      username
      email
    }
  }
`;

export interface User {
  id: string;
  username: string;
  email: string;
}

export const loginUser = async (email: string, password: string): Promise<User | null> => {
  try {
    // Send request with email and password
    const variables = { email, password };
    interface LoginResponse {
      loginUser: User | null;
    }

    const data = await client.request<LoginResponse>(LOGIN_USER_MUTATION, variables);
    
    return data.loginUser; 
  } catch (error) {
    console.error("❌ Error Logging in:", error);
    return null; 
  }
};
