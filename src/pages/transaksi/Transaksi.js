import React, { useEffect, useState } from "react";
import { getTransactions } from "../../api";
import Footer from "../Footer";
import Navbar from "../Navbar";

const Transaksi = () => {
  const [transactions, setTransactions] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [userRole, setUserRole] = useState(localStorage.getItem("role") || "");
  const [isLoggedIn, setIsLoggedIn] = useState(!!token);

  useEffect(() => {
    const fetchTransactions = async () => {
      if (isLoggedIn) {
        const role = userRole;
        console.log("data role", role);
        const data = await getTransactions(token, role);
        setTransactions(data);
      }
    };

    fetchTransactions();
  }, [isLoggedIn, token, userRole]);

  const handleLogout = () => {
    setToken("");
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUserRole("");
    window.location.reload();
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar
        isLoggedIn={isLoggedIn}
        onLogout={handleLogout}
        setToken={setToken}
        setUserRole={setUserRole}
      />
      <div className="container mx-auto p-4 flex-grow">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Marketplace Merah Kuning Hijau
        </h1>
        <h3 className="text-2xl font-bold mb-4">Daftar Transaksi</h3>
        {transactions.length === 0 ? (
          <p>Tidak ada transaksi yang ditemukan.</p>
        ) : (
          <table className="min-w-full border">
            <thead>
              <tr>
                <th className="border p-2">ID Transaksi</th>
                <th className="border p-2">Produk</th>
                <th className="border p-2">Jumlah</th>
                <th className="border p-2">Tanggal</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td className="border p-2">{transaction.id}</td>
                  <td className="border p-2">{transaction.product.name}</td>
                  <td className="border p-2">Rp. {transaction.total}</td>
                  <td className="border p-2">
                    {new Date(transaction.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Transaksi;
