import React, { Component } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { BraintreeDropIn } from 'braintree-web-react'
import {ROOT_URL} from "../server/config";
import './index.css'

class Index extends Component {
  state = {
    clientToken: null,
  }

  instance = null;

  async componentDidMount() {
    try {
      // Get a client token for authorization from your server
      const response = await axios.get(`${ROOT_URL}/api/braintree/v1/getToken`)
      const { clientToken } = response.data;

      this.setState({ clientToken })
    } catch (err) {
      console.error(err)
    }
  }

  async buy() {
    try {
      // Send the nonce to your server
      const { nonce } = await this.instance.requestPaymentMethod()

      const response = await axios.post(
        `${ROOT_URL}/api/braintree/v1/sandbox`,
        { nonce },
      )

      console.log(response)
    } catch (err) {
      console.error(err)
    }
  }

  render() {
    if (!this.state.clientToken) {
      return (
        <div className="loading-container">
          <h1>Loading...</h1>
        </div>
      )
    }
    return (
      <div className="container">
        <BraintreeDropIn
          className="drop-in-container"
          options={{
            authorization: this.state.clientToken,
          }}
          onInstance={instance => (this.instance = instance)}
        />
        <button className="submit" onClick={this.buy.bind(this)}>Submit</button>
      </div>
    )
  }
}

Index.propTypes = {
  title: PropTypes.string,
}

export default Index
