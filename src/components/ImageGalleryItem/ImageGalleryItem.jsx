import { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'components/Modal/Modal';
import { Item, Img } from './ImageGalleryItem.styled';

export function ImageGalleryItem({ smallImgUrl, largeImgUrl, tags }) {
  const [modal, setModal] = useState(false);

  const openModal = () => {
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
  };
  return (
    <>
      <Item>
        <Img src={smallImgUrl} alt={tags} onClick={() => openModal()} />
      </Item>

      {modal && (
        <Modal
          largeImgUrl={largeImgUrl}
          tags={tags}
          closeModal={() => closeModal()}
        />
      )}
    </>
  );
}

ImageGalleryItem.propTypes = {
  smallImgUrl: PropTypes.string.isRequired,
  largeImgUrl: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};
