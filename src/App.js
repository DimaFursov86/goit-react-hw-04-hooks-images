import { useState, useEffect } from "react";
import Searchbar from "./components/Searchbar";
import ImageGallery from "./components/ImageGallery";
import serviceAPI from "../src/servicesAPI";
import Button from "./components/Button";
import Modal from "./components/Modal";
import s from "../src/App.module.scss";
import "modern-normalize/modern-normalize.css";
import Loaders from "./components/Loader";

const Status = {
  IDLE: "idle",
  PENDING: "pending",
  RESOLVED: "resolved",
  REJECTED: "rejected",
};
export default function App() {
  const [images, setImages] = useState([]);
  const [imageName, setImageName] = useState("");
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(Status.IDLE);
  const [page, setPage] = useState(1);
  const [largeImg, setLargeImg] = useState("");
  const [showModal, setshowModal] = useState(false);

  useEffect(() => {
    if (!imageName) {
      return;
    }
    setStatus(Status.PENDING);

    serviceAPI
      .fetchImages(imageName, page)
      .then((images) => {
        const imageArr = images.hits.map(
          ({ id, webformatURL, largeImageURL }) => {
            return {
              id,
              webformatURL,
              largeImageURL,
            };
          }
        );
        setImages((prevState) => [...prevState, ...imageArr]);
        setStatus(Status.RESOLVED);
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: "smooth",
        });
      })
      .catch((error) => {
        setError(error);
        setStatus(Status.REJECTED);
      });
  }, [imageName, page]);

  const handleFormSubmit = (imageName) => {
    setImageName(imageName);
    setImages([]);
    setPage(1);
  };

  const onPageClick = () => {
    setPage((prevState) => prevState + 1);
  };

  const openModal = (e) => {
    setLargeImg(e.target.dataset.source);
    toggleModal();
  };

  const toggleModal = () => {
    setshowModal(!showModal);
  };

  return (
    <div className={s.box}>
      <Searchbar onSubmit={handleFormSubmit} />

      {images.length !== 0 && (
        <>
          <ImageGallery images={images} openModal={openModal} />
          {status === Status.PENDING && <Loaders />}
        </>
      )}
      {showModal && <Modal onClose={toggleModal} src={largeImg} />}
      {status === Status.PENDING && images.length === 0 && <Loaders />}
      {status === Status.REJECTED && <h2>{error.message}</h2>}
      {status === Status.RESOLVED && images.length !== 0 && (
        <Button onClick={onPageClick} />
      )}
    </div>
  );
}
