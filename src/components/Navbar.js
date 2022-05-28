import { NavLink } from 'react-router-dom'
import { useTheme } from '../hooks/useTheme'

// styles
import './Navbar.css'

// components
import Searchbar from './Searchbar'


export default function Navbar() {
  const { color } = useTheme()

  return (
    <div className='navbar vintageFx' style={{ background: color }}>
      <nav>
        <NavLink to='/' className="brand" ><h1>Easy Eats</h1></NavLink>
        <Searchbar />
        <NavLink to='/create' className='btn'>Add Recipe</NavLink>
      </nav>
    </div>
  )
}
