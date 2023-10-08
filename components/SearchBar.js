import styles from "../styles/Home.module.css";
import { useState, useEffect } from "react";

function SearchBar({ onSearch, selectedHashtag }) {

    const [searchTerm, setSearchTerm] = useState(selectedHashtag || '');
  
    useEffect(() => {
      setSearchTerm(selectedHashtag || '');
  }, [selectedHashtag]);

    const handleInputChange = (e) => {
      const value = e.target.value;
      setSearchTerm(value);

      // Si la valeur contient un hashtag, déclenchez la recherche
      if (value.startsWith('#')) {
        onSearch(value);
    } else {
        // Ajoute un hashtag avant la valeur puis déclenchez la recherche
        onSearch('#' + value);
    }
  };
  
    return (
      <div className={styles.inputBox}>
        <h1 className={styles.title}>Hashtag</h1>
      <form onSubmit={(e) => e.preventDefault()}> {/* Prevent form submission */}
          <input 
            type="text" 
            placeholder="Search for hashtag..." 
            value={searchTerm} 
            onChange={handleInputChange}
            className={styles.inputSearch}
          />
        </form>
      </div>
    );
  }
  
  export default SearchBar;
  