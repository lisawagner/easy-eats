import { useEffect, useState } from 'react'

import { db } from '../../firebase/config'
import { collection, onSnapshot } from 'firebase/firestore'

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

    // real time collection data
    const unsubscribe = onSnapshot(ref, (snapshot) => {
      if (snapshot.empty) {
        setError('Sorry, there are no recipes to load at the moment')
        setIsPending(false)
      } else {
        let results = []
        snapshot.docs.forEach((doc) => {
        // console.log(`${doc.id} => ${doc.data()}`)
        results.push({id: doc.id, ...doc.data()})
        })
        setData(results)
        setIsPending(false)
      }
    }, (err) => {
      setError(err.message)
      setIsPending(false)
    })

    return () => unsubscribe()
    
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

    // getDocs(ref).then((snapshot) => {
    //   if (snapshot.empty) {
    //     setError('Sorry, there are no recipes to load at the moment')
    //     setIsPending(false)
    //   } else {
    //     let results = []
    //     snapshot.docs.forEach((doc) => {
    //     results.push({id: doc.id, ...doc.data()})
    //   })
    //   setData(results)
    //   setIsPending(false)
    //   }
    // })
    // .catch((error) => {
    //   console.log(error);
    // })