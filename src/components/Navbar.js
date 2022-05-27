import { NavLink } from 'react-router-dom'
import './Navbar.css'
import Searchbar from './Searchbar'

export default function Navbar() {
  return (
    <div className='navbar vintageFx'>
      <nav>
        <NavLink to='/' className="brand" ><h1>Easy Eats</h1></NavLink>
        <Searchbar />
        <NavLink to='/create' className='btn'>Create Recipe</NavLink>
      </nav>
    </div>
  )
}
