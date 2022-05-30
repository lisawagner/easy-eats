import { useEffect, useState } from 'react'

import { db } from '../../firebase/config'
import { collection, getDocs } from 'firebase/firestore'

// components
import RecipeList from '../../components/RecipeList'

// styles
import './Home.css'

export default function Home() {
  const [data, setData] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const ref = collection (db, 'recipes')
    setIsPending(true)

    getDocs(ref).then((snapshot) => {

      if (snapshot.empty) {
        setError('Sorry, there are no recipes to load at the moment')
        setIsPending(false)
      } else {
        let results = []
        snapshot.docs.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`)
        results.push({id: doc.id, ...doc.data()})
      })
      setData(results)
      setIsPending(false)
      }
    }).catch((err) => {
      setError(err.message)
      setIsPending(false)
    })

    // db.collection('recipes').get().then((snapshot) => {
    //   console.log(snapshot)
    //   if (snapshot.empty) {
    //     setError('No recipes to load')
    //     setIsPending(false)
    //   } else {
    //     let results = []
    //     snapshot.docs.forEach(doc => {
    //       // console.log(doc)
    //       results.push({ ...doc.data(), id: doc.id })
    //     })
    //     setData(results)
    //     setIsPending(false)
    //   }
    // }).catch(err => {
    //   setError(err.message)
    //   setIsPending(false)
    // })


  }, [])

  return (
    <div className='home'>
      {error && <p className='error'>{error}</p>}
      {isPending && <p className='loading'>Loading...</p>}
      {data && <RecipeList recipes={ data } /> }

      {/* {data && data.map(recipe => (
        <h2 key={recipe.id} >{recipe.title}</h2>
      ))} */}
    </div>
  )
}
