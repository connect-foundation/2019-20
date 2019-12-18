import React, {useState, useEffect} from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

const Loading = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function tick() {
      setProgress((oldProgress) => (oldProgress >= 100 ? 0 : oldProgress + 1));
    }

    const timer = setInterval(tick, 20);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return <CircularProgress variant='determinate' value={progress} />;
};

export default Loading;
