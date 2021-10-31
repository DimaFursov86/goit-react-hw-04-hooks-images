import { useEffect } from "react";
import s from "./Modal.module.scss";
import PropTypes from "prop-types";

export default function Modal({ onClose, src }) {
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });

  const handleKeyDown = (e) => {
    if (e.code === "Escape") {
      onClose();
    }
  };

  const handleBackdropClick = (event) => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };

  return (
    <div className={s.ModalBackdrop} onClick={handleBackdropClick}>
      <div className={s.ModalContent}>
        <img className={s.imgpoz} src={src} alt="" />
      </div>
    </div>
  );
}
Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
};
