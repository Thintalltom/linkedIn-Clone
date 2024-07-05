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

interface Company {
  keywords: string;
  locationId: string;
  datePosted: string;
  sort: string;
}

// Define the type for the context value
interface LinkedInDataContextType {
  company: Company;
  setCompany: Dispatch<SetStateAction<Company>>;

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
  const [company, setCompany] = useState<Company>({
    keywords: "golang",
    locationId: '92000000',
    datePosted: "anyTime",
    sort: "mostRevelant",
  });

  const getData = async () => {
    try {
      const response = await axios.get(
        "https://linkedin-api8.p.rapidapi.com/search-jobs",
        {
          params: {
            keywords: company.keywords, // join array to a string if keywords is an array
            locationId: company.locationId,
            datePosted: company.datePosted,
            sort: company.sort, // Ensure this matches the actual key in your company state
          },
          headers: {
            "x-rapidapi-key": "a844195ae0msh1fbee6d2d56602cp18da5djsn5c6202c811c3",
            "x-rapidapi-host": "linkedin-api8.p.rapidapi.com",
          },
        }
      );
      setCompany(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <LinkedInDataContext.Provider value={{ getData, company, setCompany }}>
      {children}
    </LinkedInDataContext.Provider>
  );
};
