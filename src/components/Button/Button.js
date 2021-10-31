import PropTypes from "prop-types";
import s from "./Button.module.scss";
export default function Button({ onClick }) {
  return (
    <button className={s.buttonStyle} type="button" onClick={onClick}>
      Load More
    </button>
  );
}
Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};
