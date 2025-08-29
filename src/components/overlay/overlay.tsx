import { getOverlay } from '../../store/site-process/selectors';
import { useAppSelector } from '../../hooks';
import { memo } from 'react';

function Overlay(): JSX.Element {
  const isOverlay = useAppSelector(getOverlay);

  return (
    <div className={`overlay ${isOverlay ? 'overlay--active' : ''}`} />
  );
}

export const MemoizedOverlay = memo(Overlay);
