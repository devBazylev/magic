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

const loadFavorites = (): number[] => {
  try {
    const favorites = localStorage.getItem(LocalStorage.Favorites);
    if (!favorites) {
      return [];
    }
    const parsed: unknown = JSON.parse(favorites);
    return Array.isArray(parsed) ? parsed as number[] : [];
  } catch (error) {
    return [];
  }
};

const saveFavorites = (favorites: number[]): void => {
  try {
    if (favorites.length === 0) {
      localStorage.removeItem(LocalStorage.Favorites);
    } else {
      localStorage.setItem(LocalStorage.Favorites, JSON.stringify(favorites));
    }
  } catch (error) {
    //
  }
};

const mergeFavorites = (serverFavorites: number[], localFavorites: number[]): number[] => {
  const merged = [...new Set([...serverFavorites, ...localFavorites])];
  return merged;
};

export {
  ScrollToTop,
  lockScroll,
  joinPaths,
  calcElems,
  loadFavorites,
  saveFavorites,
  mergeFavorites,
};
