import React, { useState } from 'react';
import { loginCustomer, loginMerchant } from '../api'; // Pastikan untuk menambahkan fungsi ini di api.js

const LoginForm = ({ setToken, setUserRole }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('customer'); // Default ke 'customer'

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let data;
            if (role === 'customer') {
                data = await loginCustomer({ email, password });
            } else {
                data = await loginMerchant({ email, password });
            }
            setToken(data.token);
            localStorage.setItem('token', data.token);
            setUserRole(role); // Set role berdasarkan pilihan
            setEmail('');
            setPassword('');
        } catch (error) {
            console.error('Login failed:', error.response.data);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4">
            <div>
                <label>
                    <input
                        type="radio"
                        value="customer"
                        checked={role === 'customer'}
                        onChange={() => setRole('customer')}
                    />
                    Customer
                </label>
                <label>
                    <input
                        type="radio"
                        value="merchant"
                        checked={role === 'merchant'}
                        onChange={() => setRole('merchant')}
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
                className="border p-2 mb-2 w-full"
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="border p-2 mb-2 w-full"
            />
            <button type="submit" className="bg-blue-500 text-white p-2 w-full">
                Login
            </button>
        </form>
    );
};

export default LoginForm;
