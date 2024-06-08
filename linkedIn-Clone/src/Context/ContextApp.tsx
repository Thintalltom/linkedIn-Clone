import {
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
  ReactNode,
} from "react";
import React from "react";
import axios from "axios";



// Define the type for the context value
interface LinkedInDataContextType {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  getData: () => Promise<void>;
}

// Create the context with the defined type
const LinkedInDataContext = createContext<LinkedInDataContextType | null>(null);

export const useDataContext = () => useContext(LinkedInDataContext);


interface LinkedUserDataProps {
    children: ReactNode;
  }
//creating a provider component
export const LinkedUserData: React.FC<LinkedUserDataProps> = ({ children }) => {
  const [search, setSearch] = useState<string>(
    ''
  );

  const getData = async () => {
    try {
      const response = await axios.get('https://instagram-scraper-api2.p.rapidapi.com/v1/followers', {
        params: {
          username_or_id_or_url: search
        },
        headers: {
          'x-rapidapi-key': 'a844195ae0msh1fbee6d2d56602cp18da5djsn5c6202c811c3',
          'x-rapidapi-host': 'instagram-scraper-api2.p.rapidapi.com'
        }
      });
      
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }



  return (
    <LinkedInDataContext.Provider
      value={{search, setSearch, getData }}
    >
    {children}
    </LinkedInDataContext.Provider>
  );
};

