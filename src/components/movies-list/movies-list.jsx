/**
 * This component renders the movie data as a list with a link to the movie view. It also has a button that allows the user to add the movie to their list of favorites.
 */

import React from 'react';
import Col from 'react-bootstrap/Col';
import { connect } from 'react-redux';

import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';
import { MovieCard } from '../movie-card/movie-card';


const mapStateToProps = state => { // mapStateToProps is used for selecting the part of the data from the store that the connected component needs.
  const { visibilityFilter } = state;
  return { visibilityFilter };
};

/**
 * @description renders the movies list
 * @param { props } props 
 * @returns the list of movies and the filter input
 * @function MoviesList
 */
function MoviesList(props) {
  const { movies, visibilityFilter } = props; 
  let filteredMovies = movies;
  if (visibilityFilter !== '') {
    filteredMovies = movies.filter(m => m.Title.toLowerCase().includes(visibilityFilter.toLowerCase()));
  }

  if (!movies) return <div className="main-view"/>;

  return <>
    <Col md={12} style={{ margin: '1em' }}>
      <VisibilityFilterInput visibilityFilter={visibilityFilter} />
    </Col>
    {filteredMovies.map(m => (
      <Col md={3} key={m._id}>
        <MovieCard movie={m} />
      </Col>
    ))}
  </>;
}

export default connect(mapStateToProps)(MoviesList);
