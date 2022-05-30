// import { useFetch } from '../../hooks/useFetch'
import { useParams } from 'react-router-dom'
import { useTheme } from '../../hooks/useTheme'
import { useState, useEffect } from 'react'

import { db } from '../../firebase/config'
import { doc, getDoc } from 'firebase/firestore'

// styles
import './Recipe.css'


export default function Recipe() {
  const { id } = useParams()
  const { mode } = useTheme()

  const [recipe, setRecipe] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const docRef = doc(db, 'recipes', id)
    setIsPending(true)

    getDoc(docRef).then((doc) => {
      // console.log(doc.data(), doc.id);
      if (doc.exists) {
        setIsPending(false)
        setRecipe(doc.data())
      } else {
        setError('Sorry, there are no recipes to load at the moment')
        setIsPending(false)
      }
    })

  }, [id])

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
                    <li className='title-case' key={ingredient}>{ingredient}</li>
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
