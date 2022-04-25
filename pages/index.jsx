// import Image from 'next/image';
import styles from '../styles/Home.module.css';
import Link from 'next/link';
import { Button } from 'react-bootstrap';

export function createRandomCompany() {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  };
  const response = fetch('/api/v1/company', requestOptions);
  return response;
}

export default function Home() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>User Dashboard</h1>
      <main className={styles.main}>
        <div className={styles.grid}>
          <Link href="/employee/cl28ml4ym0010u4sxr0gg7t6l">
            <a className={styles.card}>
              <h2>Employee Dashboard &rarr;</h2>
              <p>Access your company information and payroll.</p>
            </a>
          </Link>

          <Link href="/company">
            <a className={styles.card}>
              <h2>Company Dashboard &rarr;</h2>
              <p>Company admin access.</p>
            </a>
          </Link>

          <div className={styles.card}>
            <Button variant="success" disabled>Temporarily Disabled</Button>
          </div>

          <div className={styles.card}>
            <Button variant="primary" onClick={() => createRandomCompany()}>Create New Company</Button>
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by Vercel{' '}
          <span className={styles.logo}>
            {/* <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} /> */}
          </span>
        </a>
      </footer>
    </div>
  )
}