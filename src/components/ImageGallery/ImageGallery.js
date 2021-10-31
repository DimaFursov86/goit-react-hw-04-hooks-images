import ImageGalleryItem from "../ImageGalleryItem";
import s from "./ImageGallery.module.scss";
import PropTypes from "prop-types";
export default function ImageGallery({ images, openModal }) {
  return (
    <ul className={s.gallery}>
      {images.map(({ webformatURL, id, largeImageURL }, index) => (
        <li key={index} className={s.listItem}>
          <ImageGalleryItem
            id={id}
            webformatURL={webformatURL}
            largeImageURL={largeImageURL}
            openModal={openModal}
          />
        </li>
      ))}
    </ul>
  );
}
ImageGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.shape).isRequired,
  openModal: PropTypes.func.isRequired,
};
