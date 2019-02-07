import React, { Component } from "react";
import api from "../../services/api";
import { Link } from "react-router-dom";

import "./styles.css";

export default class Main extends Component {
  state = {
    products: [],
    productInfo: {}
  }

  componentDidMount() {
    this.loadProducts();
  }

  loadProducts = async (page = 1) => {
    const response = await api.get(`/products?page=${page}`);

    const { docs, ...productInfo } = response.data;

    this.setState({ products: docs, productInfo });
  }

  prevPage = () => {
    const { productInfo } = this.state;

    if (parseInt(productInfo.page) === 1) return;

    this.loadProducts(parseInt(productInfo.page) - 1);
  }

  nextPage = () => {
    const { productInfo } = this.state;

    if (parseInt(productInfo.page) === productInfo.pages) return;

    this.loadProducts(parseInt(productInfo.page) + 1);
  }

  render() {
    const { products, productInfo } = this.state;

    return (
      <div className="product-list">
        {products.map(product => (
          <article key={product._id}>
            <strong>{product.title}</strong>
            <p>{product.description}</p>

            <Link to={`/products/${product._id}`}>Acessar</Link>
          </article>
        ))}
        <div className="actions">
          <button disabled={parseInt(productInfo.page) === 1} onClick={this.prevPage}>
            Anterior
          </button>
          <button disabled={parseInt(productInfo.page) === productInfo.pages} onClick={this.nextPage}>
            Próxima
          </button>
        </div>
      </div>
    )
  }
}