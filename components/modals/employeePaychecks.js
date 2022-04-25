import { Button, Modal, ModalBody, ModalFooter, ModalHeader, Table } from 'react-bootstrap';
import { useState } from 'react';

export default function EmployeePaycheckModal(props)
{
  return (
    <Modal {...props}>
        <ModalHeader closeButton>
          <h4>{props.title}</h4>
        </ModalHeader>
        <ModalBody>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Date Created</th>
                <th>Gross Pay</th>
                <th>Net Pay</th>
              </tr>
            </thead>
            <tbody>
              {props.data.map(function(value, index) { return (
              <tr key={index}>
                  <td>{value.CreatedOn}</td>
                  <td>{value.GrossPay}</td>
                  <td>{value.NetPay}</td>
              </tr>
              )})}
            </tbody>
          </Table>
        </ModalBody>
        <ModalFooter>
          <Button variant="outline-primary" onClick={props.onHide}>Close</Button>
        </ModalFooter>
    </Modal>
  )
}