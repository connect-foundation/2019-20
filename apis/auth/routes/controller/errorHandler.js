import msg from '../../assets/errorMessages';
import uri from '../../assets/uris';
import { isClientError, isServerError } from '../../utils/detectError';

const serverErrorHandler = (err, req, res, next) => {
  if (isServerError(err)) {
    switch (err.message) {
      case msg.githubError:
        res.redirect(uri.client500ErrorPage);
        break;
      case msg.ErrorWhenCheckMember:
        res.redirect(uri.client500ErrorPage);
        break;
      case msg.internalError:
        res.status(err.status);
        res.json({ message: err.message });
        break;
      default:
        res.status(err.status);
        res.json({ message: err.message });
        break;
    }
  } else {
    next(err);
  }
};

const clientErrorHandler = (err, req, res, next) => {
  if (isClientError(err)) {
    switch (err.message) {
      case msg.invalidJwtToken:
        res.status(err.status);
        res.clearCookie('jwt');
        res.json({ message: err.message });
        break;
      case msg.validationError:
        res.status(err.status);
        res.clearCookie('jwt');
        res.json({ message: err.message });
        break;
      default:
        res.status(err.status);
        res.json({ message: err.message });
        break;
    }
  } else {
    next(err);
  }
};

export { serverErrorHandler, clientErrorHandler };
