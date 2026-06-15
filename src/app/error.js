'use client';

import { useEffect } from 'react';

export default function Error({ error, reset }) {
  useEffect(() => {
    if (
      error.message?.includes('Loading chunk') ||
      error.name === 'ChunkLoadError'
    ) {
      // Chunk load failure — reload to get new deployment
      window.location.reload();
    }
  }, [error]);

  return (
    {/* <div>
      <h2>Something went wrong</h2>
      <button onClick={() => reset()}>Try again</button>
    </div> */}
  );
}