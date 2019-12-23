import fs from 'fs';

export default {
  key: fs.readFileSync('/etc/letsencrypt/live/chat.oemarket.shop/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/chat.oemarket.shop/cert.pem'),
};
