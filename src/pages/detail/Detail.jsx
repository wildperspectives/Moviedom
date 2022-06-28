import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

import "./Detail.scss";

import apiConfig from "../../api/apiConfig";
import tmdbApi from "../../api/tmdbApi";
import CastList from "./CastList";
import VideoList from "./VideoList";

import MovieList from "../../components/movieList/MovieList";

import API from '../../API';
import Rate from './Rate.js';

const Detail = () => {
  const { category, id } = useParams();

  const [item, setItem] = useState(null);

  useEffect(() => {
    const getDetail = async () => {
      const response = await tmdbApi.detail(category, id, { params: {} });
      setItem(response);
      window.scrollTo(0, 0);
    };
    getDetail();
  }, [category, id]);

  const handleRating = async value => {
    const rate = await API.rateMovie(item.id, value);
    console.log(rate);
  };

  return (
    <>
      {item && (
        <>
          {item && (
            <>
              <div
                className="banner"
                style={{
                  backgroundImage: `url(${apiConfig.originalImage(
                    item.data.backdrop_path || item.data.poster
                  )})`,
                }}
              ></div>
              <div className="mb-3 movie-content container">
                <div className="movie-content__poster">
                  <div
                    className="movie-content__poster__img"
                    style={{
                      backgroundImage: `url(${apiConfig.originalImage(
                        item.data.poster_path || item.data.backdrop_path
                      )})`,
                    }}
                  ></div>
                </div>
                <div className="movie-content__info">
                  <h1 className="title">{item.data.title || item.data.name}</h1>
                  <div className="genres">
                    {item.data.genres &&
                      item.data.genres.slice(0, 5).map((genre, i) => (
                        <span key={i} className="genres__item">
                          {genre.name}
                        </span>
                      ))}
                  </div>
                  <p className="overview"> {item.data.overview} </p>{" "}
                  <div className="cast">
                    <div className="section__header">
                      <h2>Casts</h2>
                    </div>
                    <CastList id={item.data.id} />
                    <div className='rating'>
            <div>
              <h3>Rating</h3>
              <div className='score'>{item.data.vote_average}</div>
            </div>
            <div>
              <h3>Rate Movie</h3>
              {/* <Rate callback={handleRating} /> */}
              <Rate/>
            </div>
            </div>
                  </div>
                </div>
              </div>
              <div className="container">
                <div className="section mb-3">
                  <VideoList id={item.data.id} />
                </div>
                <div className="section mb-3">
                  <div className="section__header mb-2">
                    <h2>Similar</h2>
                  </div>
                  <MovieList
                    category={category}
                    type="similar"
                    id={item.data.id}
                  />
                </div>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
};

export default Detail;