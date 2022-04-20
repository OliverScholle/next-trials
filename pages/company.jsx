import styles from '../styles/Home.module.css';
import { useState } from 'react';
import { getAllCompanies, addNewRandomCompany } from '@/lib/services/companyService';
import { Table } from 'react-bootstrap';

export async function getServerSideProps()
{
    return { props: {data: JSON.stringify(await getAllCompanies()) } }
}

export default function CompanyDashboard({ data })
{
    const [companies, setCompanyState] = useState(JSON.parse(data));
    
    return (
        <div className={styles.container}>
          <h1>Company Dashboard</h1>
              <Table striped bordered hover>
                  <thead>
                      <th>Company Name</th>
                      <th>Company Id</th>
                  </thead>
                  <tbody>
                    {companies.map(function(value, index) { return (
                    <tr key={index}>
                        <td>{value.Name}</td>
                        <td>{value.CompanyId}</td>
                    </tr>
                    )})}
                  </tbody>
              </Table>
        </div>
      )
}