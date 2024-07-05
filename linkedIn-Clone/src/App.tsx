import { useEffect, FormEvent } from 'react';
import './App.css'
import { useDataContext } from './Context/ContextApp';

function App() {
 const { getData, company, setCompany} = useDataContext()


 useEffect(() => {
  getData
 }, [company])
 

 const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>  {
  e.preventDefault();
  const { name, value } = e.target;
  setCompany(prevCompany => ({
    ...prevCompany,
    [name]: value,
  }));
  setCompany('')
};

const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  getData();
};

  
  return (
    <form  onSubmit={handleSubmit}>
      <div>
        <label>Keywords</label>
        <input
          type="text"
          name="keywords"
          value={company.keywords}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Location Id</label>
        <input
          type="text"
          name="locationId"
          value={company.locationId}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Date Posted:</label>
        <select
           name="datePosted"
           value={company.datePosted}
           onChange={handleChange}
        >
          <option value="anyTime">Any Time</option>
          <option value="pastMonth">Past Month</option>
          <option value="pastWeek">Past Week</option>
          <option value="past24Hours">24 hours ago</option>

        </select>
      </div>

      <div>
        <label>Sort:</label>
        <select
           name="sort"
           value={company.sort}
           onChange={handleChange}
        >
          <option value="mostRelevant">Most Relevant</option>
          <option value="mostRecent">Most Recent</option>

        </select>
      </div>
      
      <button type="submit">Submit</button>
     
    </form>
  )
}

export default App
