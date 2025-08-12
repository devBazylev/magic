import { getOverlay } from '../../store/site-process/selectors';
import { useAppSelector } from '../../hooks';

function Overlay(): JSX.Element {
  const isOverlay = useAppSelector(getOverlay);

  return (
    <div className={`overlay ${isOverlay ? 'overlay--active' : ''}`} />
  );
}

export default Overlay;
