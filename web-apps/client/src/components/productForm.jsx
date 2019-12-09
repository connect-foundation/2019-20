import React, {useState, useContext} from 'react';

import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import useFetch from '../hooks/useFetch';
import {ProductContext} from '../contexts/productStore';

import Drawer from './drawer';
import DealType from './dealType';
import ImageList from './imageList';
import PriceField from './priceField';
import {uploadProduct} from '../utils/apiCall';
import getCurrentGeoLocation from '../utils/util';

const useStyles = makeStyles(() => ({
  formContainer: {
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
}));

const ProductForm = () => {
  const classes = useStyles();
  const [categoryList, setCategoryList] = useState([]);
  const [statusTypeList, setStatusTypeList] = useState([]);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('카테고리');
  const [status, setStatus] = useState('제품상태');
  const [dealType, setDealType] = useState('');
  const [price, setPrice] = useState('');
  const [negotiable, setNegotiable] = useState(false);
  const [contents, setContents] = useState('');

  const {
    setAlertMessage,
    fileDelimiter,
    mobileDesktopDelimiter,
    user,
  } = useContext(ProductContext);

  const categoryAPI = 'category';
  const statusTypeListAPI = 'statusType';
  const emptyErrorMessage = '비어있는 항목이 있습니다. 확인해 주세요 :D';
  const submitErrorMessage =
    '상품 등록에 실패했습니다. 잠시후 다시 시도해 주세요. :D';
  const gpsErrorMessage = '위치 등록에 실패했습니다. 다시 시도해 주세요 :D';

  const loadCategory = useFetch(categoryAPI, setCategoryList);
  const loadStatusType = useFetch(statusTypeListAPI, setStatusTypeList);

  const checkAllInfoFilled = (product) => {
    const {
      title,
      userId,
      price,
      pictures,
      contents,
      productStatus,
      category,
    } = product;

    try {
      if (
        !title.length ||
        !userId.length ||
        !price.length ||
        !pictures.length ||
        !contents.length ||
        productStatus === '제품상태' ||
        category === '카테고리'
      ) {
        return false;
      }
    } catch (e) {
      return false;
    }
    return true;
  };

  const submitListener = async (evt) => {
    evt.preventDefault();

    const images = window.localStorage.getItem('images');
    const imageList = images.split(fileDelimiter).slice(0, -1);
    const enrolledImages = imageList.map((image) => {
      const [mobile, deskTop] = image.split(mobileDesktopDelimiter);
      return {mobile, deskTop};
    });

    const product = {
      title,
      userId: user.id,
      location: {type: 'Point', coordinates: [user.latitude, user.longitude]},
      price,
      pictures: enrolledImages,
      contents,
      negotiable,
      productStatus: status,
      deliverAvailable: dealType === '택배거래',
      category,
    };

    if (!checkAllInfoFilled(product)) {
      setAlertMessage(emptyErrorMessage);
      return;
    }

    try {
      await uploadProduct(product);
    } catch (err) {
      setAlertMessage(submitErrorMessage);
    }
  };

  const onTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const onCategoryChange = (name) => {
    setCategory(name);
  };

  const onStatusChange = (name) => {
    setStatus(name);
  };

  const onDealTypeChange = (type) => {
    setDealType(type);
  };

  const onPriceChange = (price) => {
    setPrice(price);
  };
  const onNegotiableChange = (negotiable) => {
    setNegotiable(negotiable);
  };
  const onContentChange = (e) => {
    setContents(e.target.value);
  };

  return (
    <div className={classes.formContainer}>
      <form>
        <TextField
          id='standard-basic'
          label='제품명'
          value={title}
          onChange={onTitleChange}
        />
        <Drawer
          name={category}
          data={categoryList}
          loading={loadCategory}
          onDrawerSelected={onCategoryChange}
        />
        <Drawer
          name={status}
          data={statusTypeList}
          loading={loadStatusType}
          onDrawerSelected={onStatusChange}
        />
        <DealType onDealTypeChange={onDealTypeChange} />
        <PriceField
          setPrice={onPriceChange}
          negotiable={negotiable}
          setNegotiable={onNegotiableChange}
        />
        <ImageList />
        <textarea
          className={classes.contents}
          placeholder='물품에 대해 소개해 주세요'
          onChange={onContentChange}
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
