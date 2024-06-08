import { useEffect, useState } from 'react';
import './App.css'
import { useDataContext } from './Context/ContextApp';

function App() {
 const {search, setSearch, getData} = useDataContext()
 console.log(search)


  useEffect(() => {
    getData();
  
  }, [search])
  

  
  return (
    <div>
  
   <input type='text' placeholder='search anything' onChange={(e) => setSearch(e.target.value)} value={search} />
   <button onClick={getData}>Search</button>
    </div>
  )
}

export default App
