/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import './Movieselection.css';
import { getNewMovie, interactWithMovie } from '../Services/fetcher.js';

function Movieselection() {

  const movies = ["tt1877830","tt2463208","tt13403046","tt3581652"];

  const sampleMovie = {
    id: "tt0443453",
    title: "Borat",
    description: "2006 ‧ Adventure ‧ 1h 24m Kazakh TV talking head Borat is dispatched to the United States to report on the greatest country in the world. With a documentary crew in tow, Borat becomes more interested in locating and marrying Pamela Anderson.",
    image: "https://m.media-amazon.com/images/I/51RPHFy00cL._AC_.jpg",
    trailer: "https://www.imdb.com/video/imdb/vi1712300569/imdb/embed",
    rating: "7.3",
  }

  // useEffect(() => {
  //   setCurrentMovie()
  // });

  const [currentMovie, setCurrentMovie] = useState(sampleMovie);
  const [count,setCount] = useState(0);


  async function interactMovie(interaction) {
    interactWithMovie(currentMovie.id,interaction);
    setCurrentMovie( await getNewMovie());
  }



  return (
    <div className="div">
      <div className="div-3">
        {/* <div className="builder-columns div-4"> */}
          <div className="builder-column column">
            <div className="title">{currentMovie.title}</div>
            <p className="borat-2006-adventure-1-h-24">
            {currentMovie.description}
            </p>
          {/* </div> */}
        </div>
        <div className="div-9">Reviews</div>
        <div className="div-10">
          <div className="screen-shot-2022-02-23-at-3-17">
            <p>
            IMDB Rating: {currentMovie.rating}/10
            </p>
          </div>
        </div>
        <div className="div-11">Trailer</div>
        {/* <div className="div-12"> */}

          <iframe className="trailer" src={currentMovie.trailer}  title="Trailer" allowFullScreen="true" mozallowfullscreen="true" webkitallowfullscreen="true" frameBorder="no" scrolling="no">
            <div className="builder-image-sizer image-sizer-2" />
          </iframe>
            

        {/* </div> */}
      </div>
      <div className="div-movie-pic">
        <img src={currentMovie.image} alt="hi" />
      </div>
      <div className="column-2">
        <button className="button" type="submit" onClick={() => {interactMovie("like")}}>Like</button>
        <button className="button" type="submit" onClick={() => {interactMovie("dislike")}}>Dislike</button>
        <button className="button" type="submit" onClick={() => {interactMovie("superlike")}}>SuperLike</button>
      </div>
    </div>

  );
}

export default Movieselection;
