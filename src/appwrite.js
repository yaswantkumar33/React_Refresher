import {Client, Query, Databases, ID} from "appwrite";


const PROJECT_ID = import.meta.env.VITE_APP_WRITE_ID;
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DB_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;
const appwrite_endpoint = import.meta.env.VITE_APPWRITE_ENDPOINT;
export const SearchCount = async (searchterm = "avengers", movie) => {
    console.log(PROJECT_ID, DATABASE_ID, COLLECTION_ID);

    const client = new Client().setEndpoint(appwrite_endpoint).setProject(PROJECT_ID);
    const dataBase = new Databases(client);
    // 1. use the app write to check if there is any data on the search term
    try {
        // eslint-disable-next-line
        const results = await dataBase.listDocuments(DATABASE_ID, COLLECTION_ID, [Query.equal("search", searchterm)]);
        // 2.update the search term count if it is avaliable
        if (results.documents.length > 0) {
            const doc = results.documents[0];
            await dataBase.updateDocument(DATABASE_ID, COLLECTION_ID, doc.$id, {
                count: doc.count + 1,
            });
        } else {
            await dataBase.createDocument(
                DATABASE_ID,
                COLLECTION_ID,
                ID.unique(),
                {
                    search: searchterm,
                    count: 1,
                    movie_id: movie.id,
                    poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                }
            );
        }
        // 3.if there is no data means create one
    } catch (e) {
        console.log(e)
    }
}