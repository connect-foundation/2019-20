import React, {useState, useEffect, useContext} from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';
import {ImageContext} from '../contexts/imageStore';

const AlertDialog = () => {
  const {alertMessage, setAlertMessage} = useContext(ImageContext);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (alertMessage.length) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [alertMessage]);

  const handleClose = () => {
    setAlertMessage('');
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            {alertMessage}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary' autoFocus>
            확인
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AlertDialog;
