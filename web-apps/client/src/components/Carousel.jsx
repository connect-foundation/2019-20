import React, {useState} from 'react';
import MyCarousel from 'nuka-carousel';
import 'mutationobserver-shim';


const Carousel = () => {
  const [slideIndex, setSlideIndex] = useState(0);

  const images = [
    'http://ljwnqpbxeqxy3089560.cdn.ntruss.com/1575986477948',
    'http://ljwnqpbxeqxy3089560.cdn.ntruss.com/1575986483742',
    'http://ljwnqpbxeqxy3089560.cdn.ntruss.com/1575986483810',
  ];

  const imageList = images.map((image, index) => (
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
      withoutControls
    >
      {imageList}
    </MyCarousel>
  );
};

export default Carousel;
