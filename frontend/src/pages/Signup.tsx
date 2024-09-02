import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export const Signup: React.FC = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading , setLoading] = useState<boolean>(false);
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!email || !name || !password) {
            setError('All fields are required.');
            return;
        }
        try {
            setLoading(true)
            const response = await axios.post('http://localhost:3000/api/v1/user/signup', {
                email,
                name,
                password,
            });
            const token = response.data;
            localStorage.setItem('authToken', token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            setError(null);
            setEmail('');
            setName('');
            setPassword('');
            navigate('/');
        } catch (error) {
            setError('Signup failed. Please try again.');
        }finally{
            setLoading(false);
        }
    };
    if(error){
        return (
            <div className="flex flex-col items-center justify-center h-screen bg-red-100">
                <div className="text-3xl font-bold text-red-600">Error Occurred</div>
                <div className="text-xl text-red-500">Status Code 500</div>
            </div>
        );
    } 

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
                {error && <div className="text-red-500 mb-4">{error}</div>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    >
                        {loading ? 'Loading...' : 'Sign up'}
                    </button>
                </form>
                <div className="text-center mt-4">
                    <p className="text-sm text-gray-600">
                        Already have an account?{' '}
                        <Link to="/login" className="text-blue-500 hover:underline">
                            Log in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};
