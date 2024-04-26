import { FaSearch } from "react-icons/fa";
// Link is used to navigate between pages , without refreshing the page
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Header() {
  // getting the current user from the redux store
  const { currentUser } = useSelector((state) => state.user);

  return (
    <header className='bg-slate-200 shadow-md'>
      <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
        {/* ON CLICKING  THE REAL ESTATE WE WILL BE REDIRECTED TO HOME PAGE */}
        <Link to='/'>
          <h1 className='font-bold text-sm sm:text-3xl flex flex-wrap'>
            <span className='text-slate-500'>Real</span>
            <span className='text-slate-800'>Estate</span>
          </h1>
        </Link>
        <form className='bg-slate-100 p-3 rounded-lg flex items-center'>
          <input
            type='text'
            placeholder='Search....'
            className='bg-transparent focus:outline-none w-24  sm:w-64'
          />
          <FaSearch className='text-slate-900' />
        </form>

        {/* NAVIGATION LINKS */}

        <ul className='flex gap-6'>
          <Link to='/home'>
            <li className='hover:scale-110 text-slate-800 font-bold text-xl'>
              Home
            </li>
          </Link>

          <Link to='/about'>
            <li className='hover:scale-110 text-slate-800  font-bold text-xl'>
              About
            </li>
          </Link>

          {/* If the user is logged in, we will display the profile picture, else we will display the sign in link */}
          <Link to='/profile'>
            {currentUser ? (
              <img
                className='rounded-full h-7 w-7 object-cover'
                src={currentUser.avatar}
                alt='profile'
              />
            ) : (
              <li className=' text-slate-700 hover:underline'> Sign in</li>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
}
