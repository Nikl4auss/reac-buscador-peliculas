import { useState, useCallback } from "react"
import { useMovies } from "./hooks/useMovies"
import { useSearch } from "./hooks/useSearch"
import debounce from 'just-debounce-it'
import { Movies } from "./components/Movies"
import './App.css'


function App() {
  const [search, updateSearch, searchError] = useSearch()
  const [sort, setSort] = useState(false)
  const { movies, getMovies, loading } = useMovies({ search, sort })
  const debouncerGetMovies = useCallback(
    debounce(search => {
    getMovies(search)
  }, 500), 
  [getMovies]
)

  function handleSubmit(event) {
    event.preventDefault()
    getMovies(search)

  }

  function handleChange(event) {
    const newSearch = event.target.value
    updateSearch(newSearch)
    debouncerGetMovies(newSearch)
  }
  return (
    <div className='page' onSubmit={handleSubmit}>
      <header>
        <h1>Buscador de peliculas</h1>
        <form className='form'>
          <input value={search} onChange={handleChange} type="text" placeholder='Avenger, Star Wars, The Matrix...' />
          <input type="checkbox" name="sorted" id="sorted" onChange={event => setSort(event.target.checked)} value={sort}/>
          <button type='Submit' >Buscar</button>
        </form>
        {searchError ? <p style={{ color: "red" }}>{searchError}</p> : null}
      </header>
      <main>
        {loading ? <p>Cargando...</p> : <Movies movies={movies} />}

      </main>
    </div>
  )
}

export default App
