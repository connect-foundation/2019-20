import msg from '../../assets/errorMessages';
import uri from '../../assets/uris';

const serverErrorHandler = (err, req, res, next) => {
  if (Number(err.status) / 100 === 5) {
    if (
      err.message === msg.naverError
      || err.message === msg.ErrorWhenCheckMember
    ) {
      res.redirect(uri.client500ErrorPage);
    } else if (err.message === msg.invalidJwtToken) {
      res.status(err.status);
      res.clearCookie('jwt');
      res.json({ message: err.message });
    } else if (err.message === msg.internalError) {
      res.status(err.status);
      res.json({ message: err.message });
    }
  } else {
    next(err);
  }
};

const clientErrorHandler = (err, req, res) => {
  if (err.status / 100 === 4) {
    res.status(err.status);
    res.json({ message: err.message });
  }
};

export { serverErrorHandler, clientErrorHandler };
