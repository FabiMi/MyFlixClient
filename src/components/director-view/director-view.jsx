import React from 'react';
import Button from 'react-bootstrap/Button';

export class DirectorView extends React.Component {

  render() {
    const { movie, director, onBackClick } = this.props;

    return (
      <div className="director-view">
        <div className="movie-poster">
          <img crossOrigin="anonymous" src={movie.ImagePath} />
        </div>
        <div className="director-name">
          <span className="label">Name: </span>
          <span className="value">{director.Name}</span>
        </div>
        <div className="director-bio">
          <span className="label">Bio: </span>
          <span className="value">{director.Bio}</span>
        </div>
        <div className="director-birthday">
          <span className="label">Birth: </span>
          <span className="value">{director.Birth}</span>
        </div>
        

        <Button onClick={() => { onBackClick(null); }}>Back</Button>
       </div>
    );
  }
}
