import 'intersection-observer';
import {useRef, useEffect, useCallback} from 'react';

const cleanupObserver = (observer) => {
  if (
    observer &&
    observer.current &&
    typeof observer.current.disconnect === 'function'
  ) {
    observer.current.disconnect();
    // eslint-disable-next-line no-param-reassign
    observer.current = null;
  }
};

const useIntersect = (
  onIntersect,
  {root = null, rootMargin = '0px', threshold = 0} = {},
) => {
  const node = useRef(null);
  const observer = useRef(null);
  const checkIntersect = useCallback(
    ([E], O) => {
      if (E.isIntersecting) {
        onIntersect(E, O);
      }
    },
    [onIntersect],
  );
  useEffect(() => {
    cleanupObserver(observer);

    if (node.current) {
      observer.current = new IntersectionObserver(checkIntersect, {
        root,
        rootMargin,
        threshold,
      });
      observer.current.observe(node.current);
    }
    return () => cleanupObserver(observer);
  }, [checkIntersect, root, rootMargin, threshold]);

  return [node, observer];
};

export default useIntersect;
