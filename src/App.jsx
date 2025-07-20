import {useState, useEffect} from 'react'
import './App.css';
import Search from '../src/Components/Search.jsx';

const API_KEY_TMDB = import.meta.env.VITE_TMDB_API_KEY;

function App() {
    const [search, setSearch] = useState('');
    const [errormsg, setErrormsg] = useState('');

    const API_OPTIONS = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${API_KEY_TMDB}`,
        },
    };
    const Fectch_Movies = async () => {
        const Endpoint = `${import.meta.env.VITE_TMDB_BASE_URL}/discover/movie?sort_by=popularity.desc`;
        try {
            console.log(API_OPTIONS);
            const response = await fetch(Endpoint, API_OPTIONS);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            // console.log('response', response);
            const data = await response.json();  // 👈 THIS is what you need to log
            console.log("Fetched Data:", data); // ✅ Now you'll see the full movie list
        } catch (e) {
            console.log("This is the Error Occurred", e);
            setErrormsg("Oops something went wrong and movies are not rendered");
        }
    };

    useEffect(() => {
        try {
            Fectch_Movies()
        } catch (e) {
            console.log(e, "This is the Error Occuried")
            setErrormsg("Oops something went wrong and movies are rendered")
        }
    }, [])
    const SearchTermSet = (searchterm) => {
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
                    <Search search={search} setsearch={SearchTermSet}/>
                </header>
                {/*<h3 className="text-white">{search}</h3>*/}
                <section className="text-center mt-8 mb-6s">
                    <h1>All Movies</h1>
                    <p className="text-red-500">{errormsg && errormsg}</p>
                </section>
            </div>


        </main>
    )
}

export default App
