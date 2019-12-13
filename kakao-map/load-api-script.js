export default (appKey, callback) => () => {
  const KAKAOAPIURL = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${appKey}&autoload=false&libraries=services,drawing`;
  const script = document.createElement('script');
  script.src = KAKAOAPIURL;
  script.async = true;
  const element = document.head.appendChild(script);
  script.addEventListener('load', callback);
  return () => {
    script.removeEventListener('load', callback);
    document.head.removeChild(element);
  };
};