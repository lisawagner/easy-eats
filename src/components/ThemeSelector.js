import { useTheme } from '../hooks/useTheme'

// styles
import './ThemeSelector.css'

// temporary theme colours array
const themeColors = ['#851616', '#008080', '#ff7f50', 'slategrey']

export default function ThemeSelector() {
  const { changeColor } = useTheme()

  return (
    <div className='theme-selector'>
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
  )
}
