import { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Overlay, ModalWindow, Img } from './Modal.styled';

export function Modal({ largeImgUrl, tags, closeModal }) {
  const handleKeyDown = useCallback(
    event => {
      if (event.key === 'Escape') {
        closeModal();
      }
    },
    [closeModal]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <Overlay onClick={closeModal}>
      <ModalWindow>
        <Img src={largeImgUrl} alt={tags} />
      </ModalWindow>
    </Overlay>
  );
}

Modal.propTypes = {
  largeImgUrl: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
};
