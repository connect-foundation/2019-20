import React, {useState} from 'react';
import MyCarousel from 'nuka-carousel';
import 'mutationobserver-shim';

const Carousel = ({images}) => {
  const [slideIndex, setSlideIndex] = useState(0);

  const imageList =
    images &&
    images.map((image, index) => (
      <a href={image} key={index}>
        <div
          style={{
            backgroundImage: `url(${image})`,
            height: '250px',
            width: '100%',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      </a>
    ));

  const imageSize = 100;
  return (
    <MyCarousel
      initialSlideHeight={imageSize}
      initialSlideWidth={imageSize}
      cellAlign='center'
      slideIndex={slideIndex}
      afterSlide={(slideIndex) => setSlideIndex(slideIndex)}
      withoutControls={false}
    >
      {imageList}
    </MyCarousel>
  );
};

export default Carousel;
