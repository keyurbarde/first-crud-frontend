export default Button;

function Button({ onClickHandler, children, customColor }) {
  return (
    <button
      className="btn"
      onClick={onClickHandler}
      style={{ backgroundColor: customColor }}>
      {children}
    </button>
  );
}
