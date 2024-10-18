import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const loginCustomer = async (credentials) => {
  const response = await axios.post(`${API_URL}/customers/login`, credentials);
  return response.data;
};

export const loginMerchant = async (credentials) => {
  const response = await axios.post(`${API_URL}/merchants/login`, credentials);
  return response.data;
};

export const getProducts = async () => {
  const response = await axios.get(`${API_URL}/products`);
  return response.data;
};

export const createProduct = async (product, token) => {
  const response = await axios.post(`${API_URL}/products`, product, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const createTransaction = async (transactionData, token) => {
  try {
    const response = await axios.post(
      `${API_URL}/transactions`,
      transactionData,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Transaction failed");
  }
};

export const getTransactions = async (token, role) => {
  const endpoint =
    role === "customer" ? "/transactions/customer" : "/transactions/merchant";

  const response = await axios.get(`${API_URL}${endpoint}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data;
};
