import { useSession, signIn, signOut } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();
  if (!{session}) {
    return <>
      Not signed in <br/>
      <button type='button' class='btn btn-outline-success' onClick={() => signIn()}>Sign In</button>
    </>
  }
  /* Signed in as {session.user.email} <br/> */
  <button type='button' class='btn btn-outline-primary' onClick={() => signOut()}>Sign Out</button>
}