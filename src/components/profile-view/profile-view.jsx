import React, { useEffect, useState } from 'react';
import './profile-view.scss'
import PropTypes from 'prop-types';
import { Form, Button, Card, CardGroup, Container, Col, Row, Modal } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { MovieCard } from '../movie-card/movie-card';


export function ProfileView({ movies }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [favouriteMovies, setFavouriteMovies] = useState([]);
    const [show, setShow] = useState(false); // setting the state for the deleteUser modal 
  

    useEffect(() => {
        getUser()
      }, [])
    

      const getUser = () => {
        let token = localStorage.getItem('token');
        let user = localStorage.getItem("user");
        axios.get(`https://fabiflix.herokuapp.com//users/${user}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
          .then((response) => {
            setUsername(response.data.Username)
            setEmail(response.data.Email)
            setFavouriteMovies(response.data.FavouriteMovies)
            console.log(response.data)
          })
          .catch(e => {
            console.log('Error')
          });
      }
      const updateUser = () => {
        let token = localStorage.getItem('token');
        let user = localStorage.getItem("user");
        axios.put(`https://fabiflix.herokuapp.com/users/${user}`, {
          Username: username,
          Email: email, //Email is a variable which holds the email
          Password: password
        },
          {
            headers: {
              Authorization: 'Bearer ' + token
            }
          }).then((response) => {
            alert('Your profile has been updated');
            localStorage.setItem('user', response.data.Username),
              console.log(response.data)
          })
          .catch(e => {
            console.log('Error')
          });
      }
// Delete user 
const deleteUser = () => {
    setShowModal(false)
    let token = localStorage.getItem('token');
    let user = localStorage.getItem("user");
    axios.delete(`https://fabiflix.herokuapp.com/users/${user}`,
      {
        headers: {
          Authorization: 'Bearer ' + token
        }
      }).then((response) => {
        console.log(response.data);
        alert('Your profile has been deleted');
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        window.open("/", "_self");
      })
      .catch(e => {
        console.log('Error')
      });
  }


    
    }

