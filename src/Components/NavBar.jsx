import React, { useState, useEffect, useRef } from 'react';

const NavBar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);

    const handleMenuToggle = () => {
        setIsMenuOpen((prev) => !prev);
    };

    const handleClickOutside = (event) => {
        // Close the menu if clicking outside of it
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setIsMenuOpen(false);
        }
    };

    useEffect(() => {
        // Add event listener for clicks outside of the menu
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            // Clean up the event listener on component unmount
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="w-full justify-between">
            <div className="bg-blue-400 shadow">
                <div className="container mx-auto">
                    <div className="flex items-center justify-between py-2">
                        <div  className='bg-white px-2 py-1 rounded-xl'>
                           
                        <img src='../src/assets/feedback.png' className='w-10 h-10' alt='logo'/>
                        </div>

                        <div className="hidden sm:flex sm:items-center">
                            <a href="#" className="text-gray-800 text-sm font-semibold hover:text-blue-600 mr-4">Dashboard</a>
                            <a href="#" className="text-gray-800 text-sm font-semibold hover:text-blue-600 mr-4">About Us</a>
                            <a href="#" className="text-gray-800 text-sm font-semibold hover:text-blue-600 mr-4">Contact Us</a>
                        </div>

                        <div className="hidden sm:flex sm:items-center gap-10">
                            <a href="/" className="text-gray-800 text-sm font-semibold border px-4 py-2 rounded-lg hover:text-blue-400 bg-white">Log Out</a>
                            <div className="w-8 h-8 bg-black rounded-full flex justify-center items-center"></div>
                        </div>

                        <div className="sm:hidden cursor-pointer" onClick={handleMenuToggle}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-6 h-6 text-blue-600"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    fill="currentColor"
                                    d="M12.9499909,17 C12.7183558,18.1411202 11.709479,19 10.5,19 C9.290521,19 8.2816442,18.1411202 8.0499909,17 L17.9500091,17 C17.7183558,18.1411202 16.709479,19 15.5,19 C14.290521,19 13.2816442,18.1411202 12.9499909,17 Z M12.9499909,17 L17,17 L17,15 L12.9499909,15 L12.9499909,17 Z M12.9499909,14 L20.5,14 L20.5,10 L12.9499909,10 L12.9499909,14 Z M20.5,8 L12.9499909,8 L12.9499909,7 L20.5,7 C20.7761424,7 21,7.22385763 21,7.5 C21,7.77614237 20.7761424,8 20.5,8 Z"
                                />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div ref={menuRef} className="sm:hidden bg-white shadow py-2">
                    <a href="#" className="text-gray-800 text-sm font-semibold hover:text-blue-600 block px-4 py-2">Dashboard</a>
                    <a href="#" className="text-gray-800 text-sm font-semibold hover:text-blue-600 block px-4 py-2">About Us</a>
                    <a href="#" className="text-gray-800 text-sm font-semibold hover:text-blue-600 block px-4 py-2">Contact Us</a>
                    <div className="flex justify-between items-center px-4 py-2">
                        <a href="/" className="text-gray-800 text-sm font-semibold border px-4 py-2 rounded-lg hover:text-blue-400 bg-white">Log Out</a>
                        <div className="w-8 h-8 bg-black rounded-full"></div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NavBar;
