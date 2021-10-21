import React, {useEffect, useState} from 'react'
import Recipe from './recipe'
import './App.css'

const App = () => {

  const APP_ID = '0ed809da'
  const APP_KEY = '59678d0cad4a55183e1d7da11fedb468'
  
  const [recipes, setRecipes] = useState([])
  const [search, setSearch] = useState('')
  const [query, setQuery] = useState('chicekn')

  useEffect(() => {
    getRecipes()
  }, [query])

  const getRecipes = async () => {
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`)
    const data = await response.json()
    setRecipes(data.hits)
    console.log(data.hits)
  }

  const updateSearch = e => {
    setSearch(e.target.value)
  }

  const getSearch = e => {
    e.preventDefault()
    setQuery(search)
  }

  return(
    <div className="App">
      <form onSubmit={getSearch} className='search-form'>
        <input className='search-bar' type="text" value={search} onChange={updateSearch}></input>
        <button className='search-btn' type='submit'>Search for Recipe</button>
      </form>
      <div className='recipes'>
      {recipes.map(recipe => (
        <Recipe 
                key={recipe.recipe.label}
                title={recipe.recipe.label} 
                calories={recipe.recipe.calories} 
                ingredients={recipe.recipe.ingredients}
                image={recipe.recipe.image}/>
      ))}
      </div>
    </div>
  )
}

export default App
