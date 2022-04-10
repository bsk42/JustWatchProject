/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import './Movieselection.css';

function Movieselection() {
  const likeMovie = null;
  const dislikeMovie = null;
  const superlikeMovie = null;
  const ReturnButton = null;
  const GoToProfile = null;
  const GoToGroups = null;

  return (
    <div className="div">
      <div className="titleBar">
        <div className="titleText">
          JustWatch
        </div>
      </div>
      <button className="returnButton" type="submit" onClick={ReturnButton}>Return</button>
      <button className="profileButton" type="submit" onClick={GoToProfile}>Profile</button>
      <button className="groupButton" type="submit" onClick={GoToGroups}>Groups</button>
      <div className="div-3">
        <div className="builder-columns div-4">
          <div className="builder-column column">
            <div className="title">Borat</div>
            <div className="borat-2006-adventure-1-h-24">
              2006 ‧ Adventure ‧ 1h 24m Kazakh TV talking head Borat
              is dispatched to the United States to report on the greatest
              country in the world. With a documentary crew in tow, Borat
              becomes more interested in locating and marrying Pamela
              Anderson.
            </div>
          </div>
        </div>
        <div className="div-5">Available on: </div>
        <div className="div-7">
          <div className="div-7-text">
            Prime
          </div>
        </div>
        <div className="div-9">Reviews</div>
        <div className="div-10">
          <div className="screen-shot-2022-02-23-at-3-17">
            <img src="https://cdn.builder.io/api/v1/image/assets%2FTEMP%2Ff4d8d22d15844a5680c29483b983ec9e?format=webp&width=100" alt="hi" width={300} />
            <div className="builder-image-sizer image-sizer" />
          </div>
        </div>
        <div className="div-11">Trailer</div>
        <div className="div-12">
          <div className="screen-shot-2022-02-23-at-3-16">
            <img src="https://cdn.builder.io/api/v1/image/assets%2FTEMP%2Fe37c1b7775e847688689fdf5fa55af50?format=webp&width=100" alt="hi" />
            <div className="builder-image-sizer image-sizer-2" />
          </div>
        </div>
      </div>
      <div className="div-movie-pic">
        <img src="https://m.media-amazon.com/images/I/51RPHFy00cL._AC_.jpg" alt="hi" />
      </div>
      <div className="column-2">
        <button className="button" type="submit" onClick={likeMovie}>Like</button>
        <button className="button" type="submit" onClick={dislikeMovie}>Dislike</button>
        <button className="button" type="submit" onClick={superlikeMovie}>SuperLike</button>
      </div>
    </div>

  );
}

export default Movieselection;
