'use client';
import { useState } from 'react';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const NavbarDropDown: React.FC = () => {
    // Use the session hook with the appropriate type
    const { data: session } = useSession();
    const router = useRouter();

    // Define the type for username
    let username: string | undefined;
    if (session?.user?.email) {
        username = session.user.email.split('@')[0];
    }

    // State for dropdown visibility
    const [dropdownVisible, setDropdownVisible] = useState<boolean>(false);

    const toggleDropdown = () => {
        setDropdownVisible(prev => !prev);
    };

    return (
        <>
            <div>
                <button
                    id="dropdownDefaultButton"
                    data-dropdown-toggle="dropdown"
                    type="button"
                    onClick={toggleDropdown}
                >
                    <img
                        className='rounded-full top-1 relative'
                        src={session?.user?.image || ''}
                        width={30}
                        alt="User Image"
                    />
                </button>
                <div
                    id="dropdown"
                    className={`z-10 ${dropdownVisible ? '' : 'hidden'} absolute right-4 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}
                >
                    <ul
                        className="py-2 text-sm text-gray-700 dark:text-gray-200"
                        aria-labelledby="dropdownDefaultButton"
                    >
                        <li>
                            <a
                                href={`/${username}/updateprofile`}
                                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                                My Account
                            </a>
                        </li>
                        <li>
                            <a
                                href='/home'
                                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                                Homepage
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                                Switch Theme
                            </a>
                        </li>
                        <li>
                            <span
                                onClick={() => { signOut(); router.push('/login'); }}
                                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                                Sign out
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
};

export default NavbarDropDown;
