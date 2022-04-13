import {useState}from'react';
import ReactLanguageSelect from "react-languages-select";
import Chip from '@mui/material/Chip';

//import css module
import 'react-languages-select/css/react-languages-select.css';
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import '../CreateTask.css';


export default function LanguageSelection({array, arrayUpdater}) {
  const [country, setCountry] = useState("");
  const [region, setRegion] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");

  

  const handleDelete = (language) => {
    arrayUpdater(array.filter(item => item !== language));
  }
  
  const handleSelect = (language) => {
    if (!array.includes(language)) {
      arrayUpdater(arr => [...arr, language])
    }
  }

  return (
    <div className="App">
      <ReactLanguageSelect
        names={"international"}
        searchable={true}
        searchPlaceholder="Search "
        showSelectedLabel={false}
        onSelect={(languageCode)=> handleSelect(languageCode)}
      />
       <div className='LanguageSection__div'>
            <div className="LanguageSection__Box">
                {array.map((keyword, id) => (
                    <Chip
                        key={id}
                        label={keyword}
                        color="primary"
                        variant="outlined"
                        onDelete={() => {
                            handleDelete(keyword);
                    }}/>
                ))
                }
            </div>
        </div>
      {/* <div>Language Code: {selectedLanguage}</div>
      <CountryDropdown
        value={country}
        onChange={(val) => setCountry(val)}
      />{" "}
      <RegionDropdown
        country={country}
        value={region}
        onChange={(val) => setRegion(val)}
      />
      <div>{country}</div>
      <div>{region}</div> */}
    </div>
  );
}
