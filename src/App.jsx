import {useState, useEffect, Profiler} from 'react'
import './App.css';
import Search from '../src/Components/Search.jsx';

const API_KEY_TMDB = import.meta.env.VITE_TMDB_API_KEY;

function App() {
    const [search, setSearch] = useState('');
    const [errormsg, setErrormsg] = useState('');
    const [loading, setLoading] = useState(false);
    const [MovieList, setMovieList] = useState([]);

    const API_OPTIONS = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${API_KEY_TMDB}`,
        },
    };
    const Fectch_Movies = async () => {
        const Endpoint = `${import.meta.env.VITE_TMDB_BASE_URL}/discover/movie?sort_by=popularity.desc`;
        setLoading(true);
        try {
            const response = await fetch(Endpoint, API_OPTIONS);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log(data.results);
            setMovieList(data.results);
            setLoading(false);
        } catch (e) {
            console.log("This is the Error Occurred", e);
            setErrormsg("Oops something went wrong and movies are not rendered");
            setLoading(false);
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
                    {loading ? (<p className="text-white">Loading.......</p>) : errormsg ? (
                            <p className="text-center">Error</p>) :
                        (<ul className="grid grid-cols-3">
                            {MovieList.length > 0 ? MovieList.map((movie) => (
                                <li key={movie.id} className="text-white m-2 p-2 border-2">{movie.title}</li>
                            )) : (<p>Moies Are Not avaliable</p>)}

                        </ul>)}

                </section>
            </div>
        </main>
    )
}

export default App
