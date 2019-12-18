import React, {useState, useEffect, useContext} from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';
import {AlertMessageContext} from '../contexts/alertMessage';

const AlertDialog = () => {
  const {message, dispatchMessage} = useContext(AlertMessageContext);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (message.length > 0 || message.type === 'div') {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [message]);

  const handleClose = () => {
    dispatchMessage({type: 'clear'});
  };

  console.log(message);
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
            {message}
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
