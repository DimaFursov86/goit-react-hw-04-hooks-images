import { Component } from "react";
import s from "./Searchbar.module.scss";
import { ImSearch } from "react-icons/im";
import PropTypes from "prop-types";

export default class Searchbar extends Component {
  state = {
    imageName: "",
  };
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };
  handleNameChange = (event) => {
    this.setState({ imageName: event.currentTarget.value.toLowerCase() });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    if (this.state.imageName.trim() === "") {
      alert("Enter text.");
      return;
    }

    this.props.onSubmit(this.state.imageName);
    this.setState({ imageName: "" });
  };

  render() {
    return (
      <header className={s.searchbar}>
        <form onSubmit={this.handleSubmit} className="SearchForm">
          <button type="submit" className={s.searchButton}>
            <ImSearch style={{ marginRight: 8 }} />
            {/* <span className="SearchForm-button-label">Search</span> */}
          </button>

          <input
            className="SearchForm-input"
            type="text"
            name="imageName"
            value={this.state.imageName}
            onChange={this.handleNameChange}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}
