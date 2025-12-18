import { useState } from "react";

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
  
  const emailIsInvalid = didEdit.email && !enteredValues.email.includes('@');
  
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
        <div className="control no-margin">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            onBlur={() => handleInputBlur('email')}
            value={enteredValues.email}
            onChange={(event) => handleInputChange('email', event)}/>
            <div className="control-error">{emailIsInvalid && <p>Please enter a valid email address</p>}</div>
        </div>

        <div className="control no-margin">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            onBlur={() => handleInputBlur('password')}
            value={enteredValues.password}
            onChange={(event) => handleInputChange('password', event)}/>
        </div>
      </div>

      <p className="form-actions">
        <button className="button button-flat">Reset</button>
        <button className="button">Login</button>
      </p>
    </form>
  );
}
