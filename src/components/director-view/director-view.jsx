/**
 @fileoverview the director view allows the user to see the director details. The props are passed down from the main view.
 */


import React from 'react';
import Button from 'react-bootstrap/Button';


/**
 * @description renders the director view
 * @function DirectorView
 * @param {string} props - director, onBackClick
 */

export class DirectorView extends React.Component {


  render() {
    const { director, onBackClick } = this.props;

    return (
      <div className="director-view">
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

        <Button onClick={() => { onBackClick(null); }}>Back</Button> {/*this is the button that allows the user to go back to the main view*/}
       </div>
    );
  }
}
