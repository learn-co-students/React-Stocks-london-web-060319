import React from 'react';

const SearchBar = ({changeFilterChoice, filterChoice, changeSortChoice, sortChoice}) => {
  return (
    <div>

      <strong>Sort by:</strong>
      <label>
        <input type="radio" value="Alphabetically" checked={sortChoice === "Alphabetically" ? true : false} onChange={(event) => changeSortChoice(event)}/>
        Alphabetically
      </label>
      <label>
        <input type="radio" value="Price" checked={sortChoice === "Price" ? true : false} onChange={(event) => changeSortChoice(event)}/>
        Price
      </label>
      <br/>

      <label>
        <strong>Filter:</strong>
        <select onChange={(event) => changeFilterChoice(event)}>
          <option selected={filterChoice === "None"} value="None">None</option>
          <option selected={filterChoice === "Tech"} value="Tech">Tech</option>
          <option selected={filterChoice === "Sportswear"} value="Sportswear">Sportswear</option>
          <option selected={filterChoice === "Finance"} value="Finance">Finance</option>
        </select>
      </label>


    </div>
  );
}


export default SearchBar;
