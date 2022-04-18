import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { Nav, Button } from 'react-bootstrap';

function signInOrOutButton(session) {
  if (!session) {
    return (
      <Button className="nav-link" variant="outline-success" onClick={() => signIn()}>
      Sign In
      </Button>
    )
  }
  else {
    return (
      /* Signed in as {session.user.email} <br/> */
      <Button className="nav-link" variant="outline-primary" onClick={() => signOut()}>
        Sign Out
      </Button>
    )
  }
}

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <Nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-xl">
        <Link href="/">
          <a className="navbar-brand">Home</a>
        </Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end">
          <ul className="navbar-nav px-3">
            <li className="nav-item text-nowrap">
              {signInOrOutButton(session)}
            </li>
          </ul>
        </div>
      </div>
    </Nav>
  )
}