import React, { useState, useEffect } from "react";
import { useDetailsContext } from '../hooks/useDetailsContext';
import { useAuthContext } from "../hooks/useAuthContext";

const UpdatePass = () => {
    const { dispatch } = useDetailsContext();
    const { user } = useAuthContext();
    const id = window.location.pathname.split('/').pop();

    const [website, setWebsite] = useState('');
    const [url, setUrl] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [emptyFields, setEmptyFields] = useState([]);

    useEffect(() => {
        const fetchDetails = async () => {
            if (user && user.token) {
                try {
                    const response = await fetch(`http://localhost:4000/api/details/${id}`, {
                        headers: {
                            'Authorization': `Bearer ${user.token}`
                        }
                    });
                    if (!response.ok) {
                        throw new Error('Failed to fetch details');
                    }
                    const data = await response.json();
                    setWebsite(data.website);
                    setUrl(data.url);
                    setUsername(data.username);
                    setPassword(data.password);
                } catch (error) {
                    console.error('Error fetching details:', error);
                }
            }
        };

        fetchDetails();
    }, [user, id]);

    const handleUrlChange = (e) => {
        let value = e.target.value;
        if (value.startsWith("w")) {
            value = "https://" + value;
        }
        setUrl(value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) {
            setError('You must be logged in');
            return;
        }

        const updatedDetail = { website, url, username, password };
        const response = await fetch(`http://localhost:4000/api/details/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify(updatedDetail),
        });
        
        const json = await response.json();

        if (!response.ok) {
            setError(json.error);
            setSuccess(null);
            setEmptyFields(json.emptyFields);
        }
        if (response.ok) {
            setEmptyFields([]);
            setError(null);
            setSuccess('Password updated');
            dispatch({ type: 'UPDATE_DETAIL', payload: json });
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    // Wait until the user object is available before rendering the form
    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className="bg-gray-100 flex justify-center items-center min-h-screen">
            <form className="bg-white p-4 rounded shadow-md max-w-lg w-full mx-auto mt-20" onSubmit={handleSubmit}>
                <h3 className="text-xl font-semibold mb-4">Update Password</h3>

                <label className="block mb-1">Website:</label>
                <input
                    type="text"
                    onChange={(e) => setWebsite(e.target.value)}
                    value={website}
                    placeholder="Website"
                    className={`p-2 border rounded w-full ${emptyFields.includes('website') ? 'border-red-500' : 'border-gray-300'}`}
                />

                <label className="block mb-1 mt-4">URL:</label>
                <input
                    type="url"
                    onChange={handleUrlChange}
                    value={url}
                    placeholder="URL"
                    className={`p-2 border rounded w-full ${emptyFields.includes('url') ? 'border-red-500' : 'border-gray-300'}`}
                />

                <label className="block mb-1 mt-4">Username:</label>
                <input
                    type="text"
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                    placeholder="Username"
                    className={`p-2 border rounded w-full ${emptyFields.includes('username') ? 'border-red-500' : 'border-gray-300'}`}
                />

                <label className="block mb-1 mt-4">Password:</label>
                <div className="relative">
                    <input
                        type={showPassword ? "text" : "password"}
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        placeholder="Password"
                        className={`p-2 border rounded w-full ${emptyFields.includes('password') ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
                    >
                        {showPassword ? (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="lucide lucide-eye-off"
                            >
                                <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/>
                                <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/>
                                <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/>
                                <line x1="2" x2="22" y1="2" y2="22"/>
                            </svg>
                        ) : (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="lucide lucide-eye"
                            >
                                <path d="M1 12s3-7 10-7 10 7 10 7-3 7-10 7S1 12 1 12z"/>
                                <circle cx="12" cy="12" r="3"/>
                            </svg>
                        )}
                    </button>
                </div>

                <button className="bg-gray-800 hover:bg-gray-700 text-white py-2 px-4 rounded mt-6" type="submit">Update</button>
                {error && <div className="text-red-600 text-sm mt-2">{error}</div>}
                {success && <div className="text-green-600 text-sm mt-2">{success}</div>}
            </form>
        </div>
    );
}

export default UpdatePass;
