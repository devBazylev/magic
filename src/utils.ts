import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { LocalStorage, labels, filters } from './const';
import { CardProps } from './types';

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

const loadCheckboxes = (): string[] => {
  try {
    const checkboxes = localStorage.getItem(LocalStorage.Checkboxes);
    if (!checkboxes) {
      return labels.filter((label) => label.checked).map((label) => label.id);
    }
    const parsed: unknown = JSON.parse(checkboxes);
    return Array.isArray(parsed) ? parsed as string[] : labels.filter((label) => label.checked).map((label) => label.id);
  } catch (error) {
    return labels.filter((label) => label.checked).map((label) => label.id);
  }
};

const saveCheckboxes = (checkboxes: string[]): void => {
  try {
    localStorage.setItem(LocalStorage.Checkboxes, JSON.stringify(checkboxes));
  } catch (error) {
    //
  }
};

const loadFilter = (): string => {
  try {
    const filter = localStorage.getItem(LocalStorage.Filter);
    if (!filter) {
      return filters[0];
    }
    const parsed: unknown = JSON.parse(filter);
    return typeof parsed === 'string' && filters.includes(parsed as typeof filters[number]) ? parsed : filters[0];
  } catch (error) {
    return filters[0];
  }
};

const saveFilter = (filter: string): void => {
  try {
    localStorage.setItem(LocalStorage.Filter, JSON.stringify(filter));
  } catch (error) {
    //
  }
};

const loadCart = (): CardProps[] => {
  try {
    const cart = localStorage.getItem(LocalStorage.Cart);
    if (!cart) {
      return [];
    }
    const parsed: unknown = JSON.parse(cart);
    return Array.isArray(parsed) ? parsed as CardProps[] : [];
  } catch (error) {
    return [];
  }
};

const saveCart = (cart: CardProps[] | null): void => {
  try {
    if (cart) {
      localStorage.setItem(LocalStorage.Cart, JSON.stringify(cart));
    } else {
      localStorage.removeItem(LocalStorage.Cart);
    }
  } catch (error) {
    //
  }
};

export {
  ScrollToTop,
  lockScroll,
  joinPaths,
  calcElems,
  loadFavorites,
  saveFavorites,
  mergeFavorites,
  loadCheckboxes,
  saveCheckboxes,
  loadFilter,
  saveFilter,
  loadCart,
  saveCart,
};
