import React, {useState, useEffect, useContext} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Drawer from './drawer';
import useFetch from '../hooks/useFetch';
import DealType from './dealType';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import {ImageContext} from '../contexts/imageStore';
import ProductImage from './productImage';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(() => ({
  newProductForm: {
    display: 'flex',
    justifyContent: 'center',
  },
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
    height: '15rem',
  },
  category: {
    display: 'flex',
    justifyContent: 'space-between',
    borderBottom: '1px solid black',
    marginTop: '1rem',
  },
  price: {
    display: 'flex',
    width: '13rem',
  },
  imgList: {
    height: '3rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contents: {
    marginTop: '0.2rem',
    height: '5rem',
    width: '13rem',
    border: '1px solid #999',
    resize: 'none',
  },
  submitButton: {
    position: 'absolute',
    bottom: '0',
    left: '0',
    width: '100%',
    display: 'block',
    color: 'white',
    background: '#aaa',
    '&:hover': {
      background: 'powderblue',
    },
  },
  imageCard: {
    listStyle: 'none',
  },
}));

const ProductForm = () => {
  const classes = useStyles();
  const [category, setCategory] = useState([]);
  const [statusTypeList, setStatusTypeList] = useState([]);
  const [negotiable, setNegotiable] = useState(false);
  const {images} = useContext(ImageContext);
  const [progress, setProgress] = React.useState(0);

  useEffect(() => {
    function tick() {
      // reset when reaching 100%
      setProgress((oldProgress) => (oldProgress >= 100 ? 0 : oldProgress + 1));
    }

    const timer = setInterval(tick, 20);
    return () => {
      clearInterval(timer);
    };
  }, []);
  let imageList = '';
  if (images.length) {
    if (images[0].uri) {
      imageList = images.map((image, index) => (
        <li key={index} className={classes.imageCard}>
          <ProductImage uri={image.uri} name={image.name} />
        </li>
      ));
    } else {
      imageList = <CircularProgress variant='determinate' value={progress} />;
    }
  }

  const categoryAPI = [
    '디지털/가전',
    '가구/인테리어',
    '유아동/유아도서',
    '생활/가공식품',
    '여성의류',
    '여성잡화',
    '뷰티/미용',
    '남성패션/잡화',
    '스포츠/레저',
    '게임/취미',
    '도서/티켓/음반',
    '반려동물용품',
    '기타 중고물품',
  ];
  const statusTypeListAPI = [
    '미개봉',
    '미사용',
    'A급',
    '사용감 있음',
    '전투용',
    '고장/부품',
  ];

  const loadCategory = useFetch(categoryAPI, setCategory);
  const loadStatusType = useFetch(statusTypeListAPI, setStatusTypeList);

  const onChangeNegotiable = () => {
    setNegotiable(!negotiable);
  };

  const submitListener = (evt) => {
    evt.preventDefault();
  };
  return (
    <div className={classes.newProductForm}>
      <form>
        <TextField id='standard-basic' label='제품명' />
        <Drawer name='카테고리' data={category} loading={loadCategory} />
        <Drawer
          name='제품상태'
          data={statusTypeList}
          loading={loadStatusType}
        />
        <DealType />
        <div className={classes.price}>
          <TextField id='standard-basic' label='가격(원)' />
          <Checkbox
            checked={negotiable}
            onChange={onChangeNegotiable}
            value='checkedB'
            color='primary'
            inputProps={{
              'aria-label': 'secondary checkbox',
            }}
          />
        </div>
        <ul className={classes.imgList}>{imageList}</ul>
        <textarea
          className={classes.contents}
          placeholder='물품에 대해 소개해 주세요'
        />
        <Button
          variant='contained'
          type='submit'
          className={classes.submitButton}
          onClick={submitListener}
        >
          등록
        </Button>
      </form>
    </div>
  );
};

export default ProductForm;
