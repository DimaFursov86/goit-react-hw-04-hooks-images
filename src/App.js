import { Component } from "react";
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

export default class App extends Component {
  state = {
    images: [],
    imageName: "",
    page: 1,
    status: Status.IDLE,
    showModal: false,
    largeImg: "",
  };

  handleFormSubmit = (imageName) => {
    this.setState({ imageName });
  };
  onPageClick = () => {
    this.setState((prevState) => ({
      page: prevState.page + 1,
    }));
  };
  componentDidUpdate(prevProps, prevState) {
    const prevName = prevState.imageName;
    const text = this.state.imageName;
    const prevPage = prevState.page;
    const page = this.state.page;

    if (prevName !== text) {
      this.setState({ images: [], page: 1, status: Status.PENDING });

      if (page === 1) {
        serviceAPI
          .fetchImages(text, page)
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

            this.setState({
              images: [...imageArr],
              status: Status.RESOLVED,
            });
          })
          .catch((error) => this.setState({ error, status: Status.REJECTED }));
      }
    }
    if (prevPage !== page) {
      serviceAPI
        .fetchImages(text, page)
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

          this.setState((prevState) => ({
            images: [...prevState.images, ...imageArr],
            status: Status.RESOLVED,
          }));
        })
        .catch((error) => this.setState({ error, status: Status.REJECTED }));
    }
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  }
  openModal = (e) => {
    this.setState({ largeImg: e.target.dataset.source });
    this.toggleModal();
  };
  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const { images, status, showModal, largeImg } = this.state;
    return (
      <div className={s.box}>
        <Searchbar onSubmit={this.handleFormSubmit} />

        {status === Status.RESOLVED && images.length !== 0 && (
          <>
            <ImageGallery images={images} openModal={this.openModal} />
            {images.length > 12 && <Loaders />}
            {images.length > 24 && <Loaders />}
            {images.length > 36 && <Loaders />}
            {images.length > 48 && <Loaders />}
            {images.length > 60 && <Loaders />}
            {images.length > 72 && <Loaders />}
            {images.length > 84 && <Loaders />}
            {images.length > 96 && <Loaders />}
            {images.length > 108 && <Loaders />}
            {images.length > 120 && <Loaders />}
          </>
        )}
        {showModal && <Modal onClose={this.toggleModal} src={largeImg} />}
        {status === Status.PENDING && images.length === 0 && <Loaders />}
        {status === Status.REJECTED && <h2>The request failed</h2>}
        {status === Status.RESOLVED && images.length !== 0 && (
          <Button onClick={this.onPageClick} />
        )}
      </div>
    );
  }
}
