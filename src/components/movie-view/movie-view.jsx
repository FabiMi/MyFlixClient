import React from 'react';
import { Card, Col, Container, Row, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import axios from 'axios'
import { Link } from "react-router-dom";



export class MovieView extends React.Component {

  render() {
    const { movie, onBackClick, director, genre } = this.props;

    return (
      <Container>
        <Row>
          <Col>
          <Card className="movie-view" style={{ width: '40rem' }}>
        <Card.Body>
                <Card.Img className="movie-view__image" crossOrigin="anonymous" variant="top" src={movie.ImagePath} />
                <Card.Title className="title-style">{movie.Title}</Card.Title>

                <Card.Text className="text-style">Director: {movie.director.Name}
                  <Link to={`/directors/${movie.director.Name}`}>
                    <Button variant="link">more info</Button>
                  </Link>
                </Card.Text>    

                {/*<Card.Text className="text-style">Genre: {genre.Name}
                  <Link to={`/genres/${movie.Genre.Name}`}>
                    <Button variant="link">more info</Button>
                  </Link>
                      </Card.Text><Card.Text className="text-style">Genre: {genre.Name}
                      <Link to={`/genres/${movie.Genre.Name}`}>
                         <Button variant="link">more info</Button>
                      </Link>
              </Card.Text>*/}




                <Card.Text className="text-style">{movie.Description}</Card.Text>
                <Button variant="outline-warning" onClick={() => { onBackClick() }}>Back</Button>

        </Card.Body>
       </Card>
       </Col>
       </Row>
       </Container>
    );
  }
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      }),
    genre: PropTypes.shape({
      Name: PropTypes.string.isRequired
    })
  }).isRequired,
  onBackClick: PropTypes.func.isRequired
};