import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../hooks/useTheme'

import { db } from '../../firebase/config'
import { addDoc, collection } from 'firebase/firestore'

// styles
import './Create.css'


export default function Create() {
  const [title, setTitle] = useState('')
  const [instructions, setInstructions] = useState('')
  const [cookingTime, setCookingTime] = useState('')
  const [newIngredient, setNewIngredient] = useState('')
  const [ingredients, setIngredients] = useState([])
  const ingredientInput = useRef(null)
  const history = useNavigate()
  const { color, mode } = useTheme()
  const docRef = collection(db, 'recipes')

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const recipe = { title, ingredients, instructions, cookingTime: cookingTime + ' minutes' }

    try {
      await addDoc(docRef, recipe)
      history('/')
    } catch (error) {
      console.log(error);
    }
    
  }

  const handleAdd = (e) => {
    e.preventDefault()
    const ing = newIngredient.trim().toLowerCase()

    // duplicates check
    if(ing && !ingredients.includes(ing)) {
      // take prev ingredients and create a new array with both the prev ingredients and the new ingredients(ing) in it.
      setIngredients(prevIngredients => [...prevIngredients, ing])
      // clear input field so that it is ready for another ingredient
      setNewIngredient('')
      // focus the input via useRef
      ingredientInput.current.focus()
    } else {
      console.log("you already added this ingredient.");
      setNewIngredient('')
    }
  }

  return (
    <div className="create-wrap">
    <div className={`create vintageFx ${mode}`} >
      <h2 className='page-title'>Add a New Recipe</h2>
      <form onSubmit={handleSubmit} >
        <label>
          <span>Recipe Title:</span>
          <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            required
            />
        </label>

        <label>
          <span>Recipe ingredients:</span>
          <div className="ingredients">
            <input
              type="text"
              // grab the input value
              onChange={(e) => setNewIngredient(e.target.value)}
              value={newIngredient}
              ref={ingredientInput}
            />
            <button
              className="btn"
              onClick={handleAdd}
              style={{ background: color }}
              >
                add
            </button>
          </div>
        </label>
        {/* display current ingredients list */}
        <p>Current Ingredients: {ingredients.map( i => <em key={i}>{i}, </em> )}</p>

        <label>
          <span>Recipe Instructions:</span>
          <textarea
            onChange={(e) => setInstructions(e.target.value)}
            value={instructions}
            required
            />
        </label>
        <label>
          <span>Total Cooking + Preparation Time (minutes):</span>
          <input
            type="number"
            onChange={(e) => setCookingTime(e.target.value)}
            value={cookingTime}
            required
            />
        </label>
        <button className="btn" style={{ background: color }}>submit</button>
      </form>
    </div>
    </div>
  )
}
