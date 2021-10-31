import s from "./ImageGalleryItem.module.scss";
import PropTypes from "prop-types";
export default function ImageGalleryItem({
  webformatURL,
  id,
  openModal,
  largeImageURL,
}) {
  return (
    <img
      src={webformatURL}
      alt={id}
      data-source={largeImageURL}
      onClick={openModal}
      className={s.photoCard}
    />
  );
}
ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  openModal: PropTypes.func.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};
