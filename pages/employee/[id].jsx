import styles from '../../styles/Home.module.css';
import { useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import Context from '@/lib/context';
import EmployeeService from '@/lib/services/employeeService';
import EmployeePaycheckModal from 'components/modals/employeePaychecks';

export async function getServerSideProps({ params })
{
  const context = Context.getInstance();
  const service = new EmployeeService(context);
  const employees = await service.getAllEmployees(params.id);
  return { props: { data: JSON.stringify(employees), companyId: params.id } }
}

export async function createPaycheck(employeeId, companyId)
{
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ EmployeeId: employeeId, CompanyId: companyId })
  };
  const response = await fetch('/api/v1/employee/paycheck', requestOptions);
}

export async function getPaychecks(eId, cId, setShowPaychecks, setPaycheckData)
{
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  };
  fetch('/api/v1/employee/paycheck?' + new URLSearchParams({
    employeeId: eId,
    companyId: cId
  }), requestOptions).then(response => {
    setShowPaychecks(true);
    // data sent back in body which needs to be parsed into json
    response.json().then(body => {
      setPaycheckData(body);
    });
  })
}

export default function EmployeeDashboard({ data, companyId }) {
  const [employees, setEmployeeState] = useState(JSON.parse(data));
  const [showPaychecks, setShowPaychecks] = useState(false);
  const [paycheckData, setPaycheckData] = useState([]);
    
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
            <th>Paychecks</th>
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
              <td><Button variant="success" onClick={() => getPaychecks(value.EmployeeId, companyId, setShowPaychecks, setPaycheckData)}>Show Paychecks</Button></td>
              <td><Button variant="outline-primary" onClick={() => createPaycheck(value.EmployeeId, companyId)}>Make Paycheck</Button></td>
          </tr>
          )})}
        </tbody>
      </Table>
      <EmployeePaycheckModal
        show={showPaychecks}
        onHide={() => setShowPaychecks(false)}
        title={"Paycheck History"}
        data={paycheckData}
      />
    </div>
  )
}