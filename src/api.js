import axios from 'axios';

const API_URL = 'http://localhost:3000/api'; // Ganti dengan URL API Anda

// Fungsi untuk login sebagai customer
export const loginCustomer = async (credentials) => {
    const response = await axios.post(`${API_URL}/customers/login`, credentials);
    return response.data; // Mengembalikan token dan role
};

// Fungsi untuk login sebagai merchant
export const loginMerchant = async (credentials) => {
    const response = await axios.post(`${API_URL}/merchants/login`, credentials);
    return response.data; // Mengembalikan token dan role
};

// Fungsi untuk mendapatkan semua produk
export const getProducts = async () => {
    const response = await axios.get(`${API_URL}/products`);
    return response.data;
};

// Fungsi untuk membuat produk
export const createProduct = async (product, token) => {
    const response = await axios.post(`${API_URL}/products`, product, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};
