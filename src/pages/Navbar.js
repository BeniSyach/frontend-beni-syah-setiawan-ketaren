import React, { useState } from "react";
import { Link } from "react-router-dom";
import LoginModal from "./utama/Component/LoginModal";

const Navbar = ({ isLoggedIn, onLogout, setToken, setUserRole }) => {
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);

  const handleLoginClick = () => {
    setLoginModalOpen(true);
  };

  const handleModalClose = () => {
    setLoginModalOpen(false);
  };

  return (
    <>
      <nav className="bg-blue-500 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-white text-2xl">My Shop</h1>
          <ul className="flex space-x-4">
            <li>
              <a href="/" className="text-white">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="text-white">
                Products
              </a>
            </li>
            {isLoggedIn ? (
              <>
                <li>
                  <Link to="/transaksi" className="text-white">
                    Transaksi
                  </Link>
                </li>
                <li>
                  <button onClick={onLogout} className="text-white">
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li>
                <button onClick={handleLoginClick} className="text-white">
                  Login
                </button>
              </li>
            )}
          </ul>
        </div>
      </nav>

      {isLoginModalOpen && (
        <LoginModal
          setToken={setToken}
          setUserRole={setUserRole}
          onClose={handleModalClose}
        />
      )}
    </>
  );
};

export default Navbar;
