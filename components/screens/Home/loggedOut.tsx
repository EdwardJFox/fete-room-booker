
import { signIn } from "next-auth/react";
import Image from 'next/image'
import { useState } from "react";
import Button from "../../Button";
import TextField from "../../form/TextField";

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
      <div className="text-center p-4">
        <Image
          src="/fete3_logo.png"
          alt="Fete 3 Logo"
          width={400}
          height={400}
          className="mx-auto"
        />
      </div>

      <div className="m-4 p-6 bg-secondary-600 rounded-md max-w-md sm:mx-auto">
        <h2 className="mb-4">Sign in</h2>
        <p className="text-sm leading-7">This is for users signed up with accommodation for Fete 3, to organise groups into rooms. If you haven't registered for the event yet, go <a href="https://fete.gg/" className="underline">here</a> to sign up, and come back when you have received your room booking email!</p>
        
        <form onSubmit={onFormSubmit}>
          <TextField
            value={email}
            name="email"
            onChange={(value) => setEmail(value)}
            type="email"
            required
            autoFocus
            placeholder="Email address used on Start.gg"
          />

          { error && <p>Could not log you in. Ensure you are signed up on the Start.gg page, and that you have received your Room booking email.</p>}

          { success ? 
            <p className="mt-2 border-green-400 border-2 rounded-md p-4 text-center">An email has been sent to you with a magic link</p>
            :
            <div className="sm:text-right">
              <Button type="submit" className="w-full mt-2">Sign in with email</Button>
            </div>
          }
        </form>
      </div>
    </>
  )
}

export default HomeLoggedOutScreen;