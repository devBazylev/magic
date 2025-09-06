import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { LocalStorage } from './const';

function ScrollToTop() {
  const {pathname} = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

const lockScroll = (flag: boolean) => {
  if (flag) {
    document.body.classList.add('locked');
  } else {
    document.body.classList.remove('locked');
  }
};

const joinPaths = (...parts: string[]) => parts.map((part, index) => {
  if (index === 0) {
    return part.replace(/\/+$/, '');
  } else {
    return part.replace(/^\/+/, '');
  }
}).join('/');

const calcElems = (arr: number[]) => {
  let sum = 0;
  arr.forEach((item) => {
    sum += item;
  });
  return sum;
};

const loadFavorites = () => {
  const favorites = localStorage.getItem(LocalStorage.Favorites);
  return favorites ? JSON.parse(favorites) as number[] : [];
};

export {
  ScrollToTop,
  lockScroll,
  joinPaths,
  calcElems,
  loadFavorites,
};
