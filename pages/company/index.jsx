import styles from '../../styles/Home.module.css';

export function fetchData() 
{
    const response = fetch("/api/company", { method: 'GET' });
    console.log('nani');
    if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
    }

    const companies = response.json();
    return companies;
}

export async function getStaticProps()
{
    fetchData();
}

export default function CompanyDashboard()
{
    
    return (
        <div className={styles.container}>
          <h1 className={styles.title}>Company Dashboard</h1>
          <main className={styles.main}>
              
          </main>
        </div>
      )
}