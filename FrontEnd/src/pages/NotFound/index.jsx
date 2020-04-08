import React, { Component } from 'react';
import { Container } from './styles';

class NotFound extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <Container>Not Found</Container>;
  }
}

export default NotFound;
