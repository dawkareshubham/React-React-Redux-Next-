import { useActionState } from "react";
import { hasMinLength, isEmail, isEqualToOtherValue, isNotEmpty } from "../util/validation";

export default function Signup() {

  function signupAction(prevFormState, formData) {
    const data = Object.fromEntries(formData);
    data.acquisition = formData.getAll('acquisition');
    data.terms = formData.get('terms') === 'on';
    console.log(data);

    let errors = [];
    if (!isEmail(data.email)) {
      errors.push('Please enter a valid email address.');
    }
    if (!isNotEmpty(data.password) || !hasMinLength(data.password, 6)) {
      errors.push('Password must be at least 6 characters long.');
    }
    if (!isNotEmpty(data['confirm-password'])) {
      errors.push('Please confirm your password.');
    }
    if (!isEqualToOtherValue(data.password, data['confirm-password'])) {
      errors.push('Passwords do not match.');
    }
    if (!isNotEmpty(data['first-name']) || !isNotEmpty(data['last-name'])) {
      errors.push('First name and last name cannot be empty.');
    }
    if (!isNotEmpty(data.role)) {
      errors.push('Please select a role.');
    }
    if (!data.terms) {
      errors.push('You must agree to the terms and conditions.');
    }
    if (data.acquisition.length === 0) {
      errors.push('Please let us know how you found us.');
    }

    if (errors.length > 0) {
      return { errors, enteredValues: data};
    }
    return { errors: null};
  }

  const [ formState, formAction ] = useActionState(signupAction, { errors: null });

  return (
    <form action={formAction}>
      <h2>Welcome on board!</h2>
      <p>We just need a little bit of data from you to get you started 🚀</p>

      <div className="control">
        <label htmlFor="email">Email</label>
        <input id="email" type="email" name="email" defaultValue={formState.enteredValues?.email} />
      </div>

      <div className="control-row">
        <div className="control">
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password" defaultValue={formState.enteredValues?.password} />
        </div>

        <div className="control">
          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            id="confirm-password"
            type="password"
            name="confirm-password"
            defaultValue={formState.enteredValues?.['confirm-password']}
          />
        </div>
      </div>

      <hr />

      <div className="control-row">
        <div className="control">
          <label htmlFor="first-name">First Name</label>
          <input type="text" id="first-name" name="first-name" defaultValue={formState.enteredValues?.['first-name']} />
        </div>

        <div className="control">
          <label htmlFor="last-name">Last Name</label>
          <input type="text" id="last-name" name="last-name" defaultValue={formState.enteredValues?.['last-name']} />
        </div>
      </div>

      <div className="control">
        <label htmlFor="phone">What best describes your role?</label>
        <select id="role" name="role" defaultValue={formState.enteredValues?.role}>
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
          <option value="employee">Employee</option>
          <option value="founder">Founder</option>
          <option value="other">Other</option>
        </select>
      </div>

      <fieldset>
        <legend>How did you find us?</legend>
        <div className="control">
          <input
            type="checkbox"
            id="google"
            name="acquisition"
            value="google"
            defaultChecked={formState.enteredValues?.acquisition?.includes('google')}
          />
          <label htmlFor="google">Google</label>
        </div>

        <div className="control">
          <input
            type="checkbox"
            id="friend"
            name="acquisition"
            value="friend"
            defaultChecked={formState.enteredValues?.acquisition?.includes('friend')}
          />
          <label htmlFor="friend">Referred by friend</label>
        </div>

        <div className="control">
          <input type="checkbox" id="other" name="acquisition" value="other" defaultChecked={formState.enteredValues?.acquisition?.includes('other')} />
          <label htmlFor="other">Other</label>
        </div>
      </fieldset>

      <div className="control">
        <label htmlFor="terms-and-conditions">
          <input type="checkbox" id="terms-and-conditions" name="terms" defaultChecked={formState.enteredValues?.terms}/>I
          agree to the terms and conditions
        </label>
      </div>

      {formState.errors && <ul className="error">
        {formState.errors.map((error, index) => (
          <li key={index}>{error}</li>
        ))}
        </ul>}
      <p className="form-actions">
        <button type="reset" className="button button-flat">
          Reset
        </button>
        <button className="button">Sign up</button>
      </p>
    </form>
  );
}
