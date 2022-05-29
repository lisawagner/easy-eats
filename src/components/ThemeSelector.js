import { useTheme } from '../hooks/useTheme'

// styles
import './ThemeSelector.css'
import ToggleMode from './ToggleMode'

// temporary theme colours array
const themeColors = ['#6f1212', '#006767', '#4e0027', '#8f5911']

export default function ThemeSelector() {
  const { changeColor } = useTheme()

  return (
    <div className="theme-select-wrap">

      <div className='theme-selector'>
        <ToggleMode />
        <div className="theme-buttons">
          {themeColors.map(color => (
            <div
              key={color}
              onClick={() => changeColor(color)}
              style={{ background: color }}
            />
          ))}
        </div>

      </div>

    </div>
  )
}
