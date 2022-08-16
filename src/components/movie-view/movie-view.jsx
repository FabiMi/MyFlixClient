import React from 'react';
import { Card, Col, Container, Row, Button } from 'react-bootstrap';


export class MovieView extends React.Component {

  render() {
    const { movie, onBackClick, director } = this.props;

    return (
      <Container>
        <Row>
          <Col>
          <Card className="movie-view" style={{ width: '40rem' }}>
        <Card.Body>
                <Card.Img className="movie-view__image" crossOrigin="anonymous" variant="top" src={movie.ImagePath} />
                <Card.Title className="title-style">{movie.Title}</Card.Title>

               {/* <Card.Text className="text-style">Director: {director.Name}
                  <Link to={`/directors/${director.Name}`}>
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
