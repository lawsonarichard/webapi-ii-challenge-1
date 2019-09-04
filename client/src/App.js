import React, { useEffect, useState, Component } from "react";

import "./App.css";
import axios from "axios";
import {
  Card,
  CardHeader,
  CardTitle,
  CardImg,
  CardBody,
  CardFooter,
  Button,
  Container
} from "shards-react";
export default class App extends Component {
  state = {
    posts: []
  };
  componentDidMount() {
    axios
      .get(`http://localhost:8000/api/posts/`)
      .then(res => {
        console.log("posts", res.data);
        const posts = res.data;
        this.setState({ posts });
      })
      .catch(err => {});
  }
  render() {
    return (
      <div className="App">
        <Container>
          POSTS
          {this.state.posts.map(post => (
            <h1>{post.title}</h1>
          ))}
        </Container>
      </div>
    );
  }
}
