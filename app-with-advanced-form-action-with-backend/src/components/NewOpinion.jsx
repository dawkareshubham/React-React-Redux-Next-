import { useActionState, use } from "react";
import { OpinionsContext } from "../store/opinions-context";
import Submit from "./Submit";

export function NewOpinion() {

  const { addOpinion } = use(OpinionsContext);

  async function newOptionAction(_prevFormData, formData) {
    const data = Object.fromEntries(formData);
    console.log(data);
    if (!data.userName || !data.title || !data.body) {
      return {
        errors: ['All fields are required.'],
        enteredValues: data
      };
    }
    await addOpinion({
      userName: data.userName,
      title: data.title,
      body: data.body
    });

    return { errors: null };
  }

  const [ formState, formAction ] = useActionState(newOptionAction, { errors: null});
  return (
    <div id="new-opinion">
      <h2>Share your opinion!</h2>
      <form action={formAction}>
        <div className="control-row">
          <p className="control">
            <label htmlFor="userName">Your Name</label>
            <input type="text" id="userName" name="userName" defaultValue={formState.enteredValues?.userName || ''} />
          </p>

          <p className="control">
            <label htmlFor="title">Title</label>
            <input type="text" id="title" name="title" defaultValue={formState.enteredValues?.title || ''} />
          </p>
        </div>
        <p className="control">
          <label htmlFor="body">Your Opinion</label>
          <textarea id="body" name="body" rows={5} defaultValue={formState.enteredValues?.body || ''}></textarea>
        </p>
        {formState.errors && (
          <ul className="errors">
            {formState.errors.map((err, index) => (
              <li key={index}>{err}</li>
            ))}
          </ul>
        )}
        <Submit/>
      </form>
    </div>
  );
}
