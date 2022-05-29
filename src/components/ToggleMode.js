import { useTheme } from '../hooks/useTheme'
import darkIcon from '../assets/icons/night-mode.svg'
import lightIcon from '../assets/icons/light-mode.svg'

import './ToggleMode.css'

export default function ToggleMode() {
  const { color, changeMode, mode  } = useTheme()

  const handleMode = () => {
    changeMode(mode === 'dark' ? 'light' : 'dark')
  }
  console.log(mode);
  return (
    <div className='toggler'>
      {/* <label className="switch" style={{ background: color }} > */}
      <label className="switch" style={{ background: mode === 'dark' ? 'antiquewhite' : color }} >
      {/* <label className="switch" > */}
        <div className="names">
          <p className="light">
            <img
              src={lightIcon}
              alt="lightmode-icon"
              style={{ filter: mode === 'dark' ? 'invert(20%)' : 'invert(100%)' }}
            />
          </p>
          <p className="dark">
            <img
              src={darkIcon}
              alt="darkmode-icon"
              style={{ filter: mode === 'dark' ? 'invert(20%)' : 'invert(100%)' }}
            />
          </p>
        </div>
        <input
          type="checkbox"
          name='checkbox'
          id="toggler"
          onClick={handleMode}
        />
        <span className="slider"></span>
      </label>
    </div>
  )
}
