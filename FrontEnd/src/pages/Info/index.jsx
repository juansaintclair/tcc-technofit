import React, { Component } from 'react';

class Info extends Component {
  constructor(props) {
    super(props);
    this.state = {
      infoMsg: 'teste',
    };
  }

  componentDidMount() {
    this.setState({ infoMsg: this.defineInfoMsg() });
  }

  defineInfoMsg = () => `Env: ${process.env.NODE_ENV} - ${
    process.env.NODE_ENV === 'production'
      ? `Versão: ${process.env.REACT_APP_VERSION}`
      : `Last Commit: ${process.env.REACT_APP_GIT_SHA}`
  }`;

  render() {
    const { infoMsg } = this.state;
    return <p>{infoMsg}</p>;
  }
}

export default Info;
