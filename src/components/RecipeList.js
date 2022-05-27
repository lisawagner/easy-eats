import { Link } from 'react-router-dom'
// styles
import './RecipeList.css'

export default function RecipeList({ recipes }) {
  return (
    <div className='recipe-list'>
      {/* we already have the recipes sent in from homepage props, so we don't need to do the recipes && check before mapping*/}
      {recipes.map(recipe => (
        <div key={recipe.id} className='card' >
          <h3>{recipe.title}</h3>
          <p>{recipe.cookingTime} to make</p>
          {/* add snippet substring to grab characters from zero to 100*/}
          <div>{recipe.instructions.substring(0, 100)}...</div>
          <Link to={`/recipes/${recipe.id}`}>Cook this</Link>
        </div>
      ))}
    </div>
  )
}
