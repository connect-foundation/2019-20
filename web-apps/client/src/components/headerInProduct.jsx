import React, {useState, useContext} from 'react';
import {useHistory} from 'react-router-dom';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {makeStyles} from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import GoBackButton from './GoBackButton';

import {UserContext} from '../contexts/User';

import {deleteProduct} from '../utils/apiCall';

const useStyles = makeStyles({
  header: {
    position: 'fixed',
    height: '5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 1,
    top: '0',
    width: '95%',
    margin: '0.5rem',
  },
  back: {
    width: '3rem',
    height: '3rem',
    backgroundColor: 'rgba(255,255,255,0.5)',
    borderRadius: '5rem',
  },
  more: {
    width: '2rem',
    height: '2rem',
  },
});
const HeaderInProduct = ({id, seller}) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  let history = useHistory();

  const {user} = useContext(UserContext);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleUpdate = () => {
    history.push(`/edit/${id}`);
    handleClose();
  };
  const handleDelete = async () => {
    try {
      await deleteProduct(id, user.id);
      history.replace('/service/main');
    } catch (e) {
      alert('삭제 실패');
    }

    handleClose();
  };
  const isOwner = () => {
    return !!(
      user &&
      user.id &&
      seller &&
      seller.userId &&
      user.id === seller.userId
    );
  };

  return (
    <div className={classes.header}>
      <div className={classes.back}>
        <GoBackButton />
      </div>
      {isOwner() && (
        <>
          <div onClick={handleClick}>
            <MoreVertIcon className={classes.more} />
          </div>
          <Menu
            id='simple-menu'
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleUpdate}>수정</MenuItem>
            <MenuItem onClick={handleDelete}>삭제</MenuItem>
          </Menu>
        </>
      )}
    </div>
  );
};

export default HeaderInProduct;
