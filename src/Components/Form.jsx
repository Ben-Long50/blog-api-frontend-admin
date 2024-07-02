import Button from './Button';

const Form = (props) => {
  return (
    <form
      method={props.method}
      onSubmit={props.onSubmit}
      className={`form ${props.class}`}
    >
      {props.children}
      <Button text={props.buttonText} type="submit" classes="submit-button" />
    </form>
  );
};

export default Form;
