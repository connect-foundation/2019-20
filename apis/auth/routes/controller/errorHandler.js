import msg from '../../assets/errorMessages';
import uri from '../../assets/uris';
import { isClientError, isServerError } from '../../utils/detectError';

const serverErrorHandler = (err, req, res, next) => {
  if (isServerError(err)) {
    if (
      err.message === msg.naverError
      || err.message === msg.ErrorWhenCheckMember
    ) {
      res.redirect(uri.client500ErrorPage);
    } else if (err.message === msg.internalError) {
      res.status(err.status);
      res.json({ message: err.message });
    }
  } else {
    next(err);
  }
};

const clientErrorHandler = (err, req, res, next) => {
  if (isClientError(err)) {
    if (err.message === msg.invalidJwtToken) {
      res.status(err.status);
      res.clearCookie('jwt');
      res.json({ message: err.message });
    } else {
      res.status(err.status);
      res.json({ message: err.message });
    }
  } else {
    next(err);
  }
};

export { serverErrorHandler, clientErrorHandler };
