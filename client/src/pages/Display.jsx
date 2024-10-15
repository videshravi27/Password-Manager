import React, { useEffect } from 'react';
import { useDetailsContext } from '../hooks/useDetailsContext';
import { useAuthContext } from '../hooks/useAuthContext';
import StoredPass from '../components/StoredPass';

const Display = () => {
    const { details, dispatch } = useDetailsContext();
    const { user } = useAuthContext();

    useEffect(() => {
        const fetchDetails = async () => {
            const response = await fetch('https://vault-7nbr.onrender.com/api/details', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });

            const json = await response.json();

            if (response.ok) {
                dispatch({ type: 'SET_DETAILS', payload: json });
            }
        };

        if (user) {
            fetchDetails();
        }
    }, [dispatch, user]);

    return (
        <div className="flex flex-col justify-center items-center bg-gray-100 min-h-screen">
            {details && details.map((detail) => (
                <StoredPass key={detail._id} detail={detail} />
            ))}
        </div>
    );
};

export default Display;
