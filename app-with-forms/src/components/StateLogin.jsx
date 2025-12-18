import Input from "./Input";
import { hasMinLength, isEmail, isNotEmpty } from "../util/validation";
import { useInput } from "../hooks/useInput";

export default function Login() {

  const {
    value: emailInput,
    handleInputChange: handleEmailChange,
    handleInputBlur: handleEmailBlur,
    hasError: emailHasError,
  } = useInput('', (value) => isEmail(value) && isNotEmpty(value));
  
  const {
    value: passwordInput,
    handleInputChange: handlePasswordChange,
    handleInputBlur: handlePasswordBlur,
    hasError: passwordHasError,
  } = useInput('', (value) => hasMinLength(value, 8));

  
  function handleSubmit(event) {
    event.preventDefault();
    
    if (emailHasError || passwordHasError) {
      return;
    }
    console.log({ email: emailInput, password: passwordInput });

    // reset form fields
    // setEnteredValues({
    //   email: '',
    //   password: ''
    // });

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
          onBlur={handleEmailBlur}
          value={emailInput}
          onChange={ handleEmailChange}
          error={emailHasError && 'Please enter a valid email.'}/>
        <Input
          id="password"
          label="Password"
          type="password"
          name="password"
          onBlur={handlePasswordBlur}
          value={passwordInput}
          onChange={handlePasswordChange}
          error={passwordHasError && 'Please enter atleast 8 character password.'}/>
      </div>

      <p className="form-actions">
        <button className="button button-flat">Reset</button>
        <button className="button">Login</button>
      </p>
    </form>
  );
}
