'use client'
import { useState }from 'react'
import { signOut, useSession } from 'next-auth/react'
const NavbarDropDown = () => {
  const { data: session } = useSession();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <>
      <div>
        <span id="dropdownDefaultButton" data-dropdown-toggle="dropdown" type="button" onClick={toggleDropdown}>
            <img className='rounded-full top-1 relative' src={session.user.image} width={34} alt="" />
        </span>
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
                href="/profile"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Profile
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Settings
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
                onClick={() => signOut()}
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Sign out
              </span>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default NavbarDropDown