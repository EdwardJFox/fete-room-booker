
import { signIn } from "next-auth/react";
import { useState } from "react";
import { H2, P } from "../../Typography";

const HomeLoggedOutScreen = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<null | string>(null);
  const [success, setSuccess] = useState(false);

  const onFormSubmit = (e) => {
    e.preventDefault();
    signIn("email", { email, redirect: false }).then(({ ok, error: err }) => {
      if (!err) {
        setSuccess(true)
      } else {
        console.log(error)
        setError(err)
      }
    });
  }

  return (
    <>
      <H2>Sign in</H2>    
      <P>This service is for users signed up with accommodation to the Fete 3 Start.gg event. If you haven't signed up yet, go <a href="google.com">to sign up first and come back here when you have received your room booking email!</a></P>
      
      <form onSubmit={onFormSubmit}>
        <label>
          Email address
          <input type="email" id="email" name="email" required autoFocus onChange={(e) => setEmail(e.target.value)} />
        </label>

        { error && <P>Could not log you in. Ensure you are signed up on the Start.gg page, and that you have received your Room booking email.</P>}

        { success ? 
          <P>An email has been sent to you with a magic link</P>
          :
          <button type="submit">Sign in with Email</button>
        }
      </form>
    </>
  )
}

export default HomeLoggedOutScreen;