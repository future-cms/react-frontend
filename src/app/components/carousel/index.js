import React from 'react';
import { Swiper, Slide } from 'react-dynamic-swiper';
import ReactJsonSchema from "react-json-schema";
import 'react-dynamic-swiper/lib/styles.css';
import './index.css';

const slides = new ReactJsonSchema();
slides.setComponentMap({ Slide });
const SwiperCarousel = ({swiper})=> (
      <div className="Slider">
        <div className="Slider-swiper">
          <Swiper 
          navigation={true}
          pagination= {true}
          scrollBar = {false}
          loop={true}
          >
          {console.log(swiper.children[0].children)}
           {slides.parseSchema(swiper.children[0].children)}
            
          </Swiper>
        </div>
      </div>
);

export default SwiperCarousel;