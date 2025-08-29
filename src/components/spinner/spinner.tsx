import { memo } from 'react';

function Spinner(): JSX.Element {
  return (
    <div>Loading...</div>
  );
}

export const MemoizedSpinner = memo(Spinner);
