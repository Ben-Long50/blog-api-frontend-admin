const Form = (props) => {
  return (
    <form method={props.method} onSubmit={props.onSubmit} className="form">
      {props.children}
      <button className="submit-button" type="submit">
        {props.buttonText}
      </button>
    </form>
  );
};

export default Form;
