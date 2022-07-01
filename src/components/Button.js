import "./Button.css"

function Button({clickHandler, text}) {
  return (
    
    <button className="button" onClick={clickHandler}>{text}</button>
  );
}

export default Button;
