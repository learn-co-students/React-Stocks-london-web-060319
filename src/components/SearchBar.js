import React from 'react';

const SearchBar = (props) => {
  return (
    <div>

     <input onChange={props.handleChange} type="text" placeholder="search" name="search"/>
      <br/>

      <label>
        <strong>Filter:</strong>
        <select onChange={props.handleType}>
          <option value="Tech">Tech</option>
          <option value="Sportswear">Sportswear</option>
          <option value="Finance">Finance</option>
        </select>
      </label>


    </div>
  );
}


export default SearchBar;
