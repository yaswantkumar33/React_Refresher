import {useState} from 'react'
import './App.css';
import  Search from '../src/Components/Search.jsx';

function App() {
    const [search, setSearch] = useState('');
    const SearchTermSet =(searchterm)=>{
        setSearch(searchterm);
    }
    return (
        <main>

            <div className="pattern"/>
            {/*<img src={heropng_1} alt=""/> */}

            <div className="wrapper">
                <header>
                    <img src="./hero-card-banner.png" alt=""/>
                    <h1>Find <span className="text-gradient">Movies</span> You’ll Love Without the Hassle</h1>
                </header>
                 <Search search={search} setsearch={SearchTermSet} />
                <h3 className="text-white">{search}</h3>
            </div>


        </main>
    )
}

export default App
