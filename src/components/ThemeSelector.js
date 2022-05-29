import { useTheme } from '../hooks/useTheme'

// styles
import './ThemeSelector.css'
import ToggleMode from './ToggleMode'

// temporary theme colours array
const themeColors = ['#851616', '#008080', '#ff7f50', '#455769']

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
