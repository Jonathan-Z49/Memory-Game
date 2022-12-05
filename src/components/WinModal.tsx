import React, { useEffect, useRef } from 'react';

const WinModal = (props: { onClick: () => void }) => {
  const modal = useRef<HTMLDivElement>(null);

  useEffect(() => {
    modal.current?.classList.add('fade-in');
  }, []);

  return (
    <div className="overlay">
      <div ref={modal} className="modal-win">
        <p className="modal-info">Congrats on winning!</p>
        <button className="reset-btn" onClick={props.onClick}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default WinModal;
