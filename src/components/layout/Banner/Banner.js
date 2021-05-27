import React, { useState } from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getAll } from '../../../redux/productsRedux';

import styles from './Banner.module.scss';

import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption
} from 'reactstrap';

const Component = ({className, children, products}) => {

  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === products.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  }

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? products.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  }

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  }

  const slides = products.map((item) => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={item._id}
        className={styles.carouselItem}
      >
        <img src={item.images[0]} alt={item.name} />
        <CarouselCaption captionText={`from $${item.price}`} captionHeader={item.name} />
      </CarouselItem>
    );
  });

  return (
    <div className={clsx(className, styles.root, 'container')}>
      <div className={styles.bannerLeft}>
        <h1>Especially for You Retro Headphones. Leave your email here and know more.</h1>
        <form id='newsletter'>
          <label>
            <h5>sign up today</h5>
            <input type='email' name='email' placeholder='Enter Your Email Address' />
          </label>
          <button type='submit' form='newsletter' value='Submit'>
            <i className='fas fa-arrow-right'></i>
          </button>
        </form>
      </div>
      <div className={styles.bannerRight}>
        <Carousel
          activeIndex={activeIndex}
          next={next}
          previous={previous}
        >
          <CarouselIndicators items={products} activeIndex={activeIndex} onClickHandler={goToIndex} />
          {slides}
          <CarouselControl direction='prev' directionText='Previous' onClickHandler={previous} />
          <CarouselControl direction='next' directionText='Next' onClickHandler={next} />
        </Carousel>
      </div >
      {children}
    </div>
  );
};

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  products: PropTypes.array,
};

const mapStateToProps = state => ({
  products: getAll(state),
});

const Container = connect(mapStateToProps)(Component);

export {
  // Component as Banner,
  Container as Banner,
  Component as BannerComponent,
};