import React from 'react';
import { useNavigate } from 'react-router-dom';

const WebsiteCard = ({ detail }) => {
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate(`/stored-services/${detail._id}`);
    };

    return (
        // <div className="p-4 bg-white rounded shadow-md m-4 w-full max-w-xs">
        //     <h4
        //         className="text-lg font-bold text-blue-600 cursor-pointer"
        //         onClick={handleNavigate}
        //     >
        //         {detail.website}
        //     </h4>
        //     <p className="text-gray-700">Username: {detail.username}</p>
        // </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
            {detail.length > 0 ? (
                detail.map((detail) => (
                    <WebsiteCard key={detail._id} detail={detail} />
                ))
            ) : (
                <div className="col-span-full text-center text-gray-600 text-xl">
                    No saved websites
                </div>
            )}
        </div>
    );
};

export default WebsiteCard;
