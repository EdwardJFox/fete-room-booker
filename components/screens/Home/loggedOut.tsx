
import { signIn } from "next-auth/react";
import Image from 'next/image'
import { useState } from "react";
import Button from "../../Button";
import TextField from "../../form/TextField";
import InfoMessage from "../../InfoMessage";

const HomeLoggedOutScreen = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<null | string>(null);
  const [success, setSuccess] = useState(false);

  const onFormSubmit = (e: any) => {
    e.preventDefault();
    signIn("email", { email, redirect: false }).then(({ ok, error: err }: any) => {
      if (!err) {
        setSuccess(true)
      } else {
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
        <p className="text-sm leading-7">This is for users signed up with accommodation for Fete 3, to organise groups into rooms. If you haven&apos;t registered for the event yet, go <a href="https://fete.gg/" className="underline">here</a> to sign up, and come back when you have received your room booking email!</p>
        
        <form onSubmit={onFormSubmit}>
          <TextField
            value={email}
            name="email"
            onChange={(value) => setEmail(value)}
            type="email"
            required
            autoFocus
            placeholder="Email address used on Start.gg"
            className="mt-2"
          />

          { error && <p className="my-3">Could not log you in. Ensure you are signed up on the Start.gg page, and that you have received your Room booking email.</p>}

          { success ? 
            <InfoMessage style="success" className="mt-4">An email has been sent to you with a magic link</InfoMessage>
            :
            <div className="sm:text-right">
              <Button type="submit" className="w-full mt-4">Sign in with email</Button>
            </div>
          }
        </form>
      </div>
    </>
  )
}

export default HomeLoggedOutScreen;