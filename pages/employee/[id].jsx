import styles from '../../styles/Home.module.css';
import { useState } from 'react';
import { getAllEmployees } from '@/lib/services/employeeService';
import { Button, Table } from 'react-bootstrap';

export async function getServerSideProps({ params })
{
  const employees = await getAllEmployees(params.id);
  return { props: { data: JSON.stringify(employees) } }
}

export function createPaycheck(employeeId, companyId)
{
  
}

export default function EmployeeDashboard({ data }) {
    const [employees, setEmployeeState] = useState(JSON.parse(data));
    
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Employee Dashboard</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Employee ID</th>
            <th>Dependents</th>
            <th>Payroll</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(function(value, index) { return (
          <tr key={index}>
              <td>{value.FirstName}</td>
              <td>{value.LastName}</td>
              <td>{value.EmployeeId}</td>
              <td>{value.EmployeeDependent.length}</td>
              <td><Button variant="outline-primary" onClick={() => createPaycheck(value.EmployeeId, value.CompanyId)}>Make Paycheck</Button></td>
          </tr>
          )})}
        </tbody>
      </Table>
    </div>
  )
}