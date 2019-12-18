import { useState, useEffect } from 'react';

const useLoadScript = (uri) => {
  const [scriptLoad, setScriptLoad] = useState(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = uri;
    script.async = true;

    const scriptElement = document.head.appendChild(script);
    const setScriptLoadTrue = () => { setScriptLoad(true) };
    scriptElement.addEventListener('load', setScriptLoadTrue);

    return () => {
      script.removeEventListener('load', setScriptLoadTrue);
      document.head.removeChild(scriptElement);
    }
  }, [uri]);

  return scriptLoad;
};

export default useLoadScript;
