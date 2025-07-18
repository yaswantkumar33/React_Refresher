import React from 'react';
const Search = ({search,setsearch}) => {
    return (
        <div className="search relative flex items-center">
            <img src="search-svg.svg" alt="Search icon"/>
            <input type="text" placeholder="Search Over 1000+ Fav Movies" value={search} onChange={(e)=>setsearch(e.target.value)}/>
        </div>
    );
};

export default Search;