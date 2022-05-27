import { NavLink } from 'react-router-dom'
import './Navbar.css'
import Searchbar from './Searchbar'

export default function Navbar() {
  return (
    <div className='navbar'>
      <nav>
        <NavLink to='/' className="brand" ><h1>Easy Eats</h1></NavLink>
        <Searchbar />
        <NavLink to='/create'>Create Recipe</NavLink>
      </nav>
    </div>
  )
}
