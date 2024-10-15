import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';

const Navbar = () => {
    const { logout } = useLogout();
    const { user } = useAuthContext();

    const handleClick = () => {
        logout();
    }

    return (
        <header className="bg-white p-4 text-black fixed top-0 w-full shadow-md z-10 h-16">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex-1 flex justify-center">
                    <Link to="/" className="text-2xl font-bold">
                        Vault
                    </Link>
                </div>
                <nav className="ml-auto">
                    {user ? (
                        <div className="flex items-center">
                            <Link to="/post">
                                <button className="bg-green-500 text-white px-2 py-2 rounded">
                                    Add
                                </button>
                            </Link>
                            <button onClick={handleClick} className="bg-red-500 text-white px-2 py-2 rounded ml-4">
                                Logout
                            </button>
                        </div>
                    ) : null}
                </nav>
            </div>
        </header>
    );
}

export default Navbar;
