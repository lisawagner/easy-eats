import { useFetch } from '../../hooks/useFetch'
import { useParams } from 'react-router-dom'
import { useTheme } from '../../hooks/useTheme'

// styles
import './Recipe.css'


export default function Recipe() {
  const { id } = useParams()
  const URL = 'http://localhost:3000/recipes/' + id
  const { data: recipe, isPending, error } = useFetch(URL)
  const { mode } = useTheme()

  return (
    <div className="recipe-container">
      {/* className={`card vintageFx ${mode}`} */}
        <div className={`recipe vintageFx ${mode}`}>
          <div className={`pattern ${mode}`}>
            {error && <p className='error' >{error}</p>}
            {isPending && <p className='loading' >Loading...</p>}
            {recipe && (
              <>
                <h2 className='page-title'>{recipe.title}</h2>
                <p className='cook-time'>Takes {recipe.cookingTime} to cook.</p>
                <ul>
                  {recipe.ingredients.map( (ingredient) => (
                    <li key={ingredient}>{ingredient}</li>
                  ))}
                </ul>
                <p className='instructions' >{recipe.instructions}</p>
              </>
            )}
          </div>
        </div>
   
    </div>
  )
}
