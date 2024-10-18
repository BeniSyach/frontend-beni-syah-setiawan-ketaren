import React, { useState, useRef, useEffect } from "react";
import { loginCustomer, loginMerchant } from "../../../api";

const LoginModal = ({ setToken, setUserRole, onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("customer");
  const [errorMessage, setErrorMessage] = useState(""); // State untuk menyimpan pesan kesalahan
  const modalRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Reset pesan kesalahan sebelum melakukan login
    try {
      let data;
      if (role === "customer") {
        data = await loginCustomer({ email, password });
      } else {
        data = await loginMerchant({ email, password });
      }
      setToken(data.token);
      localStorage.setItem("token", data.token);
      setUserRole(role);
      localStorage.setItem("role", role);
      onClose();
      window.location.reload();
    } catch (error) {
      console.log(error.message);
      setErrorMessage(
        error.response?.data?.message || "Login failed. Please try again."
      );
      console.error("Login failed:", error.response?.data);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div ref={modalRef} className="bg-white p-6 rounded shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Login</h2>
        {errorMessage && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline">{` ${errorMessage}`}</span>
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="mr-4">
              <input
                type="radio"
                value="customer"
                checked={role === "customer"}
                onChange={() => setRole("customer")}
                className="mr-2"
              />
              Customer
            </label>
            <label>
              <input
                type="radio"
                value="merchant"
                checked={role === "merchant"}
                onChange={() => setRole("merchant")}
                className="mr-2"
              />
              Merchant
            </label>
          </div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border p-2 mb-4 w-full"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="border p-2 mb-4 w-full"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 w-full"
          >
            Login
          </button>
        </form>
        <button onClick={onClose} className="mt-4 text-red-500">
          Close
        </button>
      </div>
    </div>
  );
};

export default LoginModal;
