import styles from '../../styles/Home.module.css';
import { useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import Context from '@/lib/context';
import EmployeeService from '@/lib/services/employeeService';

export async function getServerSideProps({ params })
{
  const context = Context.getInstance();
  const service = new EmployeeService(context);
  const employees = await service.getAllEmployees(params.id);
  return { props: { data: JSON.stringify(employees) } }
}

export async function createPaycheck({ employeeId, companyId })
{
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ EmployeeId: employeeId, CompanyId: companyId })
  };
  const response = await fetch('/api/v1/employee/paycheck', requestOptions);
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