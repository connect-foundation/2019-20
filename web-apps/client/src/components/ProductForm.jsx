import React, {useState, useContext} from 'react';

import {Redirect} from 'react-router-dom';

import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import useFetch from '../hooks/useFetch';

import {ImageContext} from '../contexts/Image';
import {AlertMessageContext} from '../contexts/AlertMessage';
import {UserContext} from '../contexts/User';

import Drawer from './Drawer';
import DealType from './DealType';
import ImageList from './ImageList';
import PriceField from './PriceField';
import {uploadProduct} from '../utils/apiCall';

const useStyles = makeStyles(() => ({
  formContainer: {
    display: 'flex',
    justifyContent: 'center',
    overflowY: 'auto',
    paddingBottom: '2rem',
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
    height: '2rem',
    position: 'fixed',
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
  const [nextPage, setNextPage] = useState('');

  const {images, setImages} = useContext(ImageContext);
  const {user} = useContext(UserContext);
  const {dispatchMessage} = useContext(AlertMessageContext);

  const categoryAPI = 'category';
  const statusTypeListAPI = 'statusType';
  const emptyErrorMessage = (msg) => {
    const basic = <div>비어있는 항목이 있습니다. 확인해 주세요 :D</div>;
    return (
      <div>
        {basic}
        {msg}
      </div>
    );
  };
  const submitErrorMessage = (
    <div>상품 등록에 실패했습니다. 잠시후 다시 시도해 주세요. :D</div>
  );

  const loadCategory = useFetch(categoryAPI, setCategoryList);
  const loadStatusType = useFetch(statusTypeListAPI, setStatusTypeList);

  const checkAllInfoFilled = (product) => {
    let result = '';
    const {
      title,
      userId,
      price,
      pictures,
      contents,
      productStatus,
      category,
    } = product;
    if (!title || !title.length) {
      result += '제목 ';
    }
    if (!userId || !userId.length) {
      result = '로그인 정보가 없습니다.';
      return result;
    }
    if (!price || price <= 0) {
      result += '가격 ';
    }
    if (!pictures || !pictures.length) {
      result += '사진';
    } else if (pictures[0].loading) {
      return '사진이 로딩중입니다.';
    }
    if (!contents || !contents.length) {
      result += '본문';
    }
    if (productStatus === '제품상태') {
      result += '제품상태 ';
    }
    if (category === '카테고리') {
      result += '카테고리 ';
    }

    return result;
  };

  const submitListener = async (evt) => {
    evt.preventDefault();

    const enrolledImages = images.map((image) => {
      const {mobile, deskTop} = image;
      return {mobile, deskTop};
    });

    const product = {
      title,
      userId: user !== null && user.id,
      location: user !== null && {
        lat: user.latitude,
        lon: user.longitude,
      },
      price: Number(price),
      pictures: enrolledImages,
      contents,
      negotiable,
      productStatus: status,
      deliverAvailable: dealType === '택배거래',
      category,
    };

    const emptyElement = checkAllInfoFilled(product);
    if (emptyElement.length) {
      dispatchMessage({
        type: 'error_message',
        payload: emptyErrorMessage(emptyElement),
      });
      return;
    }

    try {
      const {_id} = await uploadProduct(product);
      setImages([]);
      setNextPage(`/product/${_id}`);
    } catch (err) {
      dispatchMessage({
        type: 'error_message',
        payload: submitErrorMessage,
      });
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

  if (nextPage.length) {
    return <Redirect to={nextPage} />;
  }

  return (
    <div className={classes.formContainer}>
      <form>
        <ImageList />
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
