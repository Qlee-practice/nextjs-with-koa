import React from 'react';
import axios from 'axios';
import Layout from './layout';
import { Link } from "../../routes-page";

export default class extends React.PureComponent {
  static async getInitialProps(props) {
    const customer = await axios.get(`http://localhost:9999/api/customer/${ props.query.id }`)
      .then(res => res.data);
    return { customer };
  }

  render() {
    return <Layout>
      <Link route="/customer">
        <a>Customer</a>
      </Link>
      <div>
        <p>This is the customer detail!!!</p>
        <p>{ this.props.customer.name }</p>
      </div>
    </Layout>;
  }
}