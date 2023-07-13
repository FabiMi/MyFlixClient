/**  
 * The genre view allows the user to see the genre details. The props are passed down from the main view.
 */
import React from 'react';
import Button from 'react-bootstrap/Button';

/**
 * @description renders the genre view
 * @function GenreView
 * @param {string} props - genre, onBackClick
 */

export class GenreView extends React.Component {

  render() {
    const { genre, onBackClick } = this.props;

    return (
      <div className="genre-view">
        <div className="genre-name">
          <span className="label">Name: </span>
          <span className="value">{genre.Name}</span>
        </div>
        <div className="genre-description">
          <span className="label">Description: </span>
          <span className="value">{genre.Description}</span>
        </div>
       <Button onClick={() => { onBackClick(null); }}>Back</Button> {/*this is the button that allows the user to go back to the main view*/}
       </div>
    );
  }
}