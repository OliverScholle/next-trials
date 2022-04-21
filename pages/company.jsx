import styles from '../styles/Home.module.css';
import { useState } from 'react';
import { getAllCompanies } from '@/lib/services/companyService';
import { Button, Table } from 'react-bootstrap';

export async function getServerSideProps()
{
    return { props: {data: JSON.stringify(await getAllCompanies()) } }
}

export async function addEmployee(companyId)
{
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ CompanyId: companyId })
    };
    const response = await fetch('api/v1/employee', requestOptions);
}

export default function CompanyDashboard({ data })
{
    const [companies, setCompanyState] = useState(JSON.parse(data));
    
    return (
        <div className={styles.container}>
          <h1>Company Dashboard</h1>
            <div>
              <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Company Name</th>
                      <th>Company Id</th>
                      <th>Create Employee</th>
                    </tr>
                  </thead>
                  <tbody>
                    {companies.map(function(value, index) { return (
                    <tr key={index}>
                        <td>{value.Name}</td>
                        <td>{value.CompanyId}</td>
                        <td><Button variant="outline-success" onClick={() => addEmployee(value.CompanyId)}>New Employee</Button></td>
                    </tr>
                    )})}
                  </tbody>
              </Table>
            </div>
        </div>
      )
}