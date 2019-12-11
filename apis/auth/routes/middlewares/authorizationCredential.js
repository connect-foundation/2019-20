import uri from '../../assets/uris';

const credentialResponse = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', uri.clientHost);
  res.header('Access-Control-Allow-Methods', 'POST, PUT, GET, DELETE');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
  res.header('Access-Control-Allow-Credentials', true);
  next();
};

export default credentialResponse;
