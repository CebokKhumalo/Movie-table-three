import React from 'react';
import Link from 'next/link';
import login from './login';
import { useGet } from 'restful-react';

interface Movies {
    title: string;
    duration: string;
    staring: string;
    category: string;
    id: string;
    videolink: string;
}

const App = () => {
    const { data } = useGet({
        path: 'Movie/GetAll',
    });
    if (!data) {
        return <div>Loading...</div>;
    }

    const movies = data.result[15];
    console.log(movies);

    console.log('movies: ', movies);
    console.log('@movies', movies);

    return (
        <div className="position-relative">
            <form className="position-absolute top-0 start-0 translate-middle">
                <form>
                    <label>
                        Username:
                        <input type="text" name="name" />
                    </label>
                    <label>
                        Password:
                        <input type="text" name="name" />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            </form>
        </div>
    );
};

export default App;
/*<tbody>

             <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Duration</th>
                        <th>Starring</th>
                        <th>Category</th>
                    </tr>
                </thead>
            </table>
            <video controls>
                <source src={movies.videoLink} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <h1>{movies.title}</h1>

                    {movies.map((movie: Movies) => (
                        <tr key={movie.id}>
                            <td>{movie.title}</td>
                            <td>{movie.duration}</td>
                            <td>{movie.staring}</td>
                            <td>{movie.category}</td>
                        </tr>
                    ))}
                </tbody>*/