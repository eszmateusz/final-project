import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getAll, fetchProductById } from '../../../redux/productsRedux.js';

import styles from './Product.module.scss';

const Component = ({className, children, product, id, fetchById}) => {

  const {name, price, images, text } = product;
  const [largeImg, setLargeImg] = useState('');
  const [count, setCount] = useState(1);
  const valueAlert = 'The value should be a number between 1-9';

  useEffect(() => {
    fetchById(id);
  }, [fetchById, id]);

  useEffect(() => {
    if (images) {
      setLargeImg(images[0]);
    }
  }, [images]);

  const handleIncrease = () => {
    if (count < 9 ) {
      setCount(count + 1);
    } else {
      alert(valueAlert);
    }
  }

  const handleDecrease = () => {
    if (count > 1 ) {
      setCount(count - 1);
    } else {
      alert(valueAlert);
    }
  }

  const handleChange = (e) => {
    const newValue = parseInt(e.target.value);
    // console.log(typeof(newValue));

    if (typeof(newValue) === 'number' && newValue <= 9 && newValue >= 1) {
      setCount(newValue);
    } else {
      alert(valueAlert);
    }
  }

  return (
    <div className={clsx(className, styles.root)}>
      <div className={styles.productLeft}>
        {images ? 
          <div className={styles.mainImg}>
            <img src={largeImg ? largeImg : images[0]} alt={name}/>
          </div> :
        null}
        <div className={styles.miniaturesWrapper}>
          {largeImg ? images.map((img, i) => (
            <div key={i} className={largeImg === img ? styles.miniature : clsx(styles.miniature, styles.miniature__fade)} onClick={() => setLargeImg(img)}>
              <img src={img} alt={name} />
            </div>
          )) : null }
        </div>
      </div>
      <div className={styles.productRight}>
        <h2>{name}</h2>
        <p>{text}</p>
        <h5>from ${price}</h5>
        <div className={styles.cartSection}>
          <button onClick={handleIncrease}><i class="fas fa-plus"></i></button>
          <input type='text' value={count} onChange={(e) => handleChange(e)}/>
          <button onClick={handleDecrease}><i class="fas fa-minus"></i></button>
          <button className={styles.cart}>
            Add to cart
            <i class="fas fa-shopping-basket"></i>
          </button>
        </div>
      </div>
      {children}
    </div>
  );
}

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  product: PropTypes.object,
  id: PropTypes.string,
  fetchById: PropTypes.func,
};

const mapStateToProps = (state, ownProps) => ({
  id: ownProps.match.params.id,
  product: getAll(state),
});

const mapDispatchToProps = dispatch => ({
  fetchById: id => dispatch(fetchProductById(id)),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  // Component as Product,
  Container as Product,
  Component as ProductComponent,
};