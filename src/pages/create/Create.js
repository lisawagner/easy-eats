import { useRef, useState } from 'react'
import { useFetch } from '../../hooks/useFetch'
import './Create.css'

export default function Create() {
  const [title, setTitle] = useState('')
  const [instructions, setInstructions] = useState('')
  const [cookingTime, setCookingTime] = useState('')
  const [newIngredient, setNewIngredient] = useState('')
  const [ingredients, setIngredients] = useState([])
  const ingredientInput = useRef(null)

  // api endpoint - since "GET" is default, we pass in "POST" to use it instead
  const { postData, data, error } = useFetch('http://localhost:3000/recipes', 'POST')

  const handleSubmit = (e) => {
    // pervent default of page resubmitting
    e.preventDefault()
    console.log(title, instructions, cookingTime, ingredients);
    // note: JSON server automatically adds a unique ID when you pass in new data
    postData({ title, ingredients, instructions, cookingTime: cookingTime + ' minutes' })
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
    <div className='create' >
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
              // onChange={(e) => setNewIngredient(e.target.value.toLowerCase())}
              onChange={(e) => setNewIngredient(e.target.value)}
              value={newIngredient}
              ref={ingredientInput}
            />
            <button className="btn" onClick={handleAdd} >add</button>
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

        <button className="btn">submit</button>

      </form>
    </div>
  )
}
