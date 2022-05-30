import { Link } from 'react-router-dom'
import { useTheme } from '../hooks/useTheme'
// styles
import './RecipeList.css'

export default function RecipeList({ recipes }) {
  const { mode } = useTheme()

  // If array empty, return this template
  if(recipes.length === 0) {
    return <div className='error' >No recipes to load...</div>
  }

  return (
    <div className='recipe-list'>
      {/* we already have the recipes sent in from homepage props, so we don't need to do the recipes && check before mapping*/}
      {recipes.map(recipe => (
        <div key={recipe.id} className={`card vintageFx ${mode}`} >
          {/* <div className='vintageFx'> */}
            <div className={`pattern ${mode}`}>
              
                <h3 className='title-case'>{recipe.title}</h3>
                <p>{recipe.cookingTime} to make</p>
                {/* add snippet substring to grab characters from zero to 100*/}
                <div>{recipe.instructions.substring(0, 100)}...</div>
                <Link
                  to={`/recipes/${recipe.id}`}
                  className='ribbon ribbon-top-right'
                  
                  >
                    <span>Make it!</span>
                  </Link>

            </div>
          {/* </div> */}
        </div>
      ))}
    </div>
  )
}
