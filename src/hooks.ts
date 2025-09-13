import type { State, AppDispatch } from './types';
import { useEffect, useCallback, useMemo } from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { setMedia, setOverlay, setCart } from './store/site-process/site-process';
import { setFavoritesStore, syncFavorites } from './store/action';
import { getFavoritesStore } from './store/site-data/selectors';
import { getCart } from './store/site-process/selectors';
import { saveFavorites, saveCart, loadCart } from './utils';
import { RefObject } from 'react';
import { CardProps } from './types';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<State> = useSelector;

export const useMedia = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const mob: MediaQueryList = window.matchMedia('(max-width: 1023px)');
    dispatch(setMedia(mob.matches));

    const onMOb = () => {
      dispatch(setMedia(mob.matches));
    };

    mob.addEventListener('change', onMOb);

    return () => {
      mob.removeEventListener('change', onMOb);
    };
  }, []);
};

export const useOverlay = (flag: boolean) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setOverlay(flag));

    return () => {
      dispatch(setOverlay(false));
    };

  }, [flag]);
};

export const useClickOutsideAndEscape = (
  ref: RefObject<HTMLElement>,
  callback: () => void,
  flag: boolean = false
) => {
  useEffect(() => {
    if (!flag) {
      return;
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        callback();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [flag]);
};


export const useFavorites = () => {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector(getFavoritesStore);
  const favoritesSet = useMemo(() => new Set(favorites), [favorites]);

  const saveFavoritesMemo = useCallback((favoritesList: number[]) => {
    saveFavorites(favoritesList);
  }, []);

  const toggleFavorite = useCallback((cardId: number) => {
    const newFavorites = favoritesSet.has(cardId)
      ? favorites.filter((favId: number) => favId !== cardId)
      : [...favorites, cardId];

    dispatch(setFavoritesStore(newFavorites));
    saveFavoritesMemo(newFavorites);
    dispatch(syncFavorites(newFavorites));
  }, [favorites, favoritesSet, saveFavoritesMemo]);

  const addToFavorites = useCallback((cardId: number) => {
    if (!favoritesSet.has(cardId)) {
      const newFavorites = [...favorites, cardId];
      dispatch(setFavoritesStore(newFavorites));
      saveFavoritesMemo(newFavorites);
      dispatch(syncFavorites(newFavorites));
    }
  }, [favorites, favoritesSet, saveFavoritesMemo]);

  const removeFromFavorites = useCallback((cardId: number) => {
    if (favoritesSet.has(cardId)) {
      const newFavorites = favorites.filter((favId: number) => favId !== cardId);
      dispatch(setFavoritesStore(newFavorites));
      saveFavoritesMemo(newFavorites);
      dispatch(syncFavorites(newFavorites));
    }
  }, [favorites, favoritesSet, saveFavoritesMemo]);

  const isFavorite = useCallback((cardId: number) => favoritesSet.has(cardId), [favoritesSet]);

  return {
    favorites,
    favoritesSet,
    toggleFavorite,
    addToFavorites,
    removeFromFavorites,
    isFavorite
  };
};

export const useCart = () => {
  const dispatch = useAppDispatch();
  const cart = useAppSelector(getCart);

  useEffect(() => {
    const savedCart = loadCart();
    if (savedCart.length > 0) {
      dispatch(setCart(savedCart));
    }
  }, []);

  useEffect(() => {
    if (cart) {
      saveCart(cart);
    }
  }, [cart]);

  const addToCart = useCallback((cardId: number, cardsMap: Map<number, CardProps>) => {
    const selectedCard = cardsMap.get(cardId);
    if (!selectedCard) {
      return;
    }

    const newCart = [...(cart || [])];
    const existingCardIndex = newCart.findIndex((item) => item.id === selectedCard.id);

    if (existingCardIndex >= 0) {
      const newAmount = (newCart[existingCardIndex].amount ?? 0) + 1;
      newCart[existingCardIndex] = { ...newCart[existingCardIndex], amount: newAmount };
      dispatch(setCart(newCart));
    } else {
      dispatch(setCart([...newCart, { ...selectedCard, amount: 1 }]));
    }
  }, [cart]);

  const removeFromCart = useCallback((cardId: number) => {
    if (cart) {
      dispatch(setCart(cart.filter((item) => item.id !== cardId)));
    }
  }, [cart]);

  const increaseAmount = useCallback((cardId: number) => {
    if (cart) {
      dispatch(setCart(cart.map((item) =>
        item.id === cardId
          ? { ...item, amount: item.amount ? item.amount + 1 : 1 }
          : item
      )));
    }
  }, [cart]);

  const decreaseAmount = useCallback((cardId: number) => {
    if (cart) {
      const newCart = cart
        .map((item) =>
          item.id === cardId
            ? { ...item, amount: (item.amount ?? 0) - 1 }
            : item
        )
        .filter((item) => (item.amount ?? 0) > 0);

      dispatch(setCart(newCart));
    }
  }, [cart]);

  const clearCart = useCallback(() => {
    dispatch(setCart([]));
  }, []);

  return {
    cart,
    addToCart,
    removeFromCart,
    increaseAmount,
    decreaseAmount,
    clearCart
  };
};
