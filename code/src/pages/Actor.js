import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { BackButton } from '../BackButton';

export const Actor = () => {
  const { actorID } = useParams();
  const [actor, setActor] = useState([]);

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/person/${actorID}?api_key=303d50a32fc0419fb55796d006e5d6c2&language=en-US`)
    .then(res => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error('404');
      }
    })
   .then((json) => {
     setActor(json);
   })
   .catch(() => {
    window.location.assign('/404');
  });
  },[actorID]);

return (
  <section className="actor-main-content">
    <header className="app-header"> <BackButton text="Back to movie"/></header>
      <div className="actor-container">
        <div className="actor-text">
          <h1>{actor.name}</h1>
           <a className="imdb-link" href={`https://www.imdb.com/name/${actor.imdb_id }/`} alt="imdb-link" target="_blank" rel="noopener noreferrer">IMDB <span role="img" aria-label="link-emoji">🔗</span> </a>
          <p>{actor.biography === "" ? "We don't have a lot of information on this actor yet.": actor.biography }</p>
        </div>
      <div className="actor-portrait">
       <img className="actor-poster" src= {actor.profile_path !== null ? `https://image.tmdb.org/t/p/w342${actor.profile_path}` : 
        `https://images.unsplash.com/photo-1519400197429-404ae1a1e184?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80`} alt={actor.name} />  
     </div>
    </div>
  </section>
);
}