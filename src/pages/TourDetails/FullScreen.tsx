import React from 'react';

const Fullscreen = React.memo(({onClick}: {onClick: (e: any) => void}) => {
  return (
    <button
      type="button"
      className="image-gallery-icon image-gallery-fullscreen-button"
      onClick={(e) => onClick(e)}
      aria-label="Open Fullscreen">
      EXIT
    </button>
  );
});

Fullscreen.displayName = 'Fullscreen';

export default Fullscreen;
