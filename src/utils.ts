import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop() {
  const {pathname} = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

const joinPaths = (...parts: string[]) => parts.map((part, index) => {
  if (index === 0) {
    return part.replace(/\/+$/, '');
  } else {
    return part.replace(/^\/+/, '');
  }
}).join('/');

const generateCardId = () => {
  let key = 0;
  return () => {
    key += 1;
    return key;
  };
};

const generateCityId = () => {
  let key = 0;
  return () => {
    key += 1;
    return key;
  };
};

const generateReviewId = () => {
  let key = 0;
  return () => {
    key += 1;
    return key;
  };
};

const getCardId = generateCardId();
const getCityId = generateCityId();
const getReviewId = generateReviewId();

export {
  ScrollToTop,
  joinPaths,
  getCardId,
  getCityId,
  getReviewId,
};
