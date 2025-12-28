import axios from 'axios';
import type { Product } from "../types/product.types";
import type { LoginCredentials, SignUpCredentials } from '../types';

interface AuthResponse {
  token: string;
}

const BASE_URL = 'https://fakestoreapi.com';

// 1. Fetch All Products
export async function fetchAllProducts(): Promise<Product[]> {
    const response = await axios.get(`${BASE_URL}/products`);
    return response.data;
}

// 2. Fetch Single Product by ID
export async function fetchProductById(id: number): Promise<Product> {
    const response = await axios.get(`${BASE_URL}/products/${id}`);
    return response.data;
}

// 3. Fetch All Categories
export async function fetchCategories(): Promise<string[]> {
    const response = await axios.get(`${BASE_URL}/products/categories`);
    return response.data;
}

// 4. Fetch Products by Specific Category
export async function fetchProductsByCategory(category: string): Promise<Product[]> {
    const response = await axios.get(`${BASE_URL}/products/category/${category}`);
    return response.data;
}

// 5. Authentication (Real FakeStore Logic)
export async function loginUser(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await axios.post(`${BASE_URL}/auth/login`, credentials);
    return response.data;
}

// 6. Register New User
export async function registerUser(userData: SignUpCredentials): Promise<{ id: number }> {
    const response = await axios.post(`${BASE_URL}/users`, userData);
    return response.data;
}