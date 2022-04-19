import styles from '../../styles/Home.module.css';
import { useState } from 'react';

export async function getStaticProps({ params })
{
  const result = await fetch("/api/v1/", params.id);

  return { props }
}

export default function EmployeeDashboard() {
  const [data, setData] = useState([]);
  const fetchData = async () => {
      const response = await fetch("/api/employee");

      if (!response.ok)
          throw new Error(`Error: ${response.status}`);

      const employees = await response.json();
      return setData(employees);
  }
    
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Employee Dashboard</h1>
      <main className={styles.main}>
      </main>
    </div>
  )
}