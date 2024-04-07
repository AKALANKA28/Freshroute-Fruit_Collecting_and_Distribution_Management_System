import React from 'react'

const Card = ({ img, title, star, reviews, prevPrice, newPrice }) => {
  return (
    <>
      <section className="col-md-3 card shop-card">
        <img src={img} alt={title} className="card-img" />
        <div className="card-details">
          <h3 className="card-title">{title}</h3>
          <section className="card-reviews">
            {star} {star} {star} {star}
            <span className="total-reviews">{reviews}</span>
          </section>
          <section className="card-price">
            <div className="price">
              <del>{prevPrice}</del> {newPrice}
            </div>
          </section>
          <div className="card-button-flex">
            <button type="button" className="custom__button">Buy</button>
            <button type="button" className="custom__button">Add to Cart</button>
            </div>
        </div>
      </section>
    </>
  );
};

export default Card
