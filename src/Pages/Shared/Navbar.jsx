import React from 'react';
import Logo from '../../Assets/Logo.png'
import { Link, NavLink } from 'react-router';
import Switch from '../../Hooks/Switch';
import useAuth from '../../Hooks/useAuth';
const Navbar = () => {

  const {user, logOut} = useAuth()

let photoUrl = "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"

if(user){
  photoUrl = user.photoURL
}

  const handleLogOut = ()=>{
    logOut()
    .then(result => {
    })
    .catch(error => {
      console.log(error)
    })
  }
// console.log(user, user.providerData[0].photoURL)
  

    const navLink = (
        <div className='text-[20px] space-x-8  lg:flex '>
            <li>
               <NavLink to="/" className="active">Home</NavLink>
            </li>
            <li>
                <NavLink to="/allLoans">All Loans</NavLink>
            </li>
            {user? <>
               <li>
                <NavLink to="/dashboard">Dashboard</NavLink>
              </li>
               <li>
                <NavLink to="/beAManager">Be a Manager</NavLink>
              </li>
               {/* <li>
                <NavLink to="/loanApplication">Loan Application</NavLink>
              </li> */}
            </>: <>
                <li>
                  <NavLink to="/aboutUs">About Us</NavLink>
                </li>
                <li>
                    <NavLink to="/contact">Contact</NavLink>
                </li>
                <li>
                    <NavLink to="/login">Login</NavLink>
                </li>
                <li>
                    <NavLink to="/registration">Registration</NavLink>
                </li>
            </>}
        </div>
    )


    return (
                <div className="navbar bg-base-100 shadow-sm max-w-[1440px]  mx-auto">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      <ul
        tabIndex="-1"
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        {navLink}
      </ul>


    </div>
    {/* <a className="btn btn-ghost text-xl">daisyUI</a> */}
    <div><Link><img src={Logo} width="200px"></img></Link></div>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
      {navLink}
    </ul>
  </div>
  <div className="navbar-end gap-3">
    {/* <a className="btn bg-secondary">Button</a> */}
      {/* <input
  type="checkbox"
  value="synthwave"
  className="toggle theme-controller col-span-2 col-start-1 row-start-1 border-sky-400 bg-amber-300 [--tglbg:var(--color-sky-500)] checked:border-blue-800 checked:bg-blue-300 checked:[--tglbg:var(--color-blue-900)]" /> */}

        {/* <Switch></Switch> */}

<input type="checkbox" value="synthwave" className="toggle theme-controller" />
{/* <label className="toggle text-base-content">
  <input type="checkbox" value="synthwave" className="theme-controller" />

  <svg aria-label="sun" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="m6.34 17.66-1.41 1.41"></path><path d="m19.07 4.93-1.41 1.41"></path></g></svg>

  <svg aria-label="moon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path></g></svg>

</label> */}



    <div className="flex-none">

    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS Navbar component"
            src={photoUrl} />
        </div>
      </div>
      <ul
        tabIndex="-1"
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li>
          <a className="justify-between">
            Profile
            <span className="badge">New</span>
          </a>
        </li>
        <li><a>Settings</a></li>
        <li>
          {user ? <Link className='text-red-500 font-bold' onClick={handleLogOut}>Log Out</Link> : <Link className='text-green-500  font-bold' to="/login">Login</Link>}
        </li>
      </ul>
    </div>
  </div>
  </div>
</div>
    );
};
export default Navbar;

