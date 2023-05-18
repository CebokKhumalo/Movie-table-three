import React, { useEffect } from 'react';
import Link from 'next/link';
import { useMovie } from '../../Providers/movies';


const Dashboard = () => {

     const {getMovie, Movies } = useMovie();
useEffect(()=>{
    getMovie();
},[])

    

     return (
         <div>
              {Movies.map(movie => (
                <p key={movie.id}>{movie.title}</p>
            ))}
         </div>
     )
};

export default Dashboard;
