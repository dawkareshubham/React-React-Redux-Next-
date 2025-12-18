import { useState } from "react";
import Input from "./Input";
import { hasMinLength, isEmail, isNotEmpty } from "../util/validation";

export default function Login() {

  const [enteredValues, setEnteredValues] = useState({
    email: '',
    password: ''
  });

  // const emailIsInvalid = enteredValues.email !== '' && !enteredValues.email.includes('@');
  // showing error on every key stroke and only once when user has interacted with the field

  // showing error only when use is done interacting with the field ie. onBlur event
  const [ didEdit, setDidEdit ] = useState({
    email: false,
    password: false
  });
  
  const emailIsInvalid = didEdit.email && !isEmail(enteredValues.email) && !isNotEmpty(enteredValues.email);
  const passwordIsInvalid = didEdit.password && !hasMinLength(enteredValues.password, 8);
  
  function handleInputBlur(identifier) {
    setDidEdit((prevDidEdit) => ({
      ...prevDidEdit,
      [identifier]: true
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    
    console.log(enteredValues);

    // reset form fields
    // setEnteredValues({
    //   email: '',
    //   password: ''
    // });

  }

  function handleInputChange(identifier, event) {
    setEnteredValues((prevValues) => ({
      ...prevValues,
      [identifier]: event.target.value
    }));
    setDidEdit((prevDidEdit) => ({
      ...prevDidEdit,
      [identifier]: false
    }));
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className="control-row">
        <Input
          id="email"
          label="Email"
          type="email"
          name="email"
          onBlur={() => handleInputBlur('email')}
          value={enteredValues.email}
          onChange={(event) => handleInputChange('email', event)}
          error={emailIsInvalid && 'Please enter a valid email.'}/>
        <Input
          id="password"
          label="Password"
          type="password"
          name="password"
          onBlur={() => handleInputBlur('password')}
          value={enteredValues.password}
          onChange={(event) => handleInputChange('password', event)}
          error={passwordIsInvalid && 'Please enter atleast 8 character password.'}/>
      </div>

      <p className="form-actions">
        <button className="button button-flat">Reset</button>
        <button className="button">Login</button>
      </p>
    </form>
  );
}
