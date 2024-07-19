import React, { useState } from 'react';
import styles from './index.module.css';

// Placeholder function for generating random passwords
const generateRandomPassword = () => {
  return Math.random().toString(36).slice(-8);
};

const Admin = () => {
  const [clients, setClients] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [newClient, setNewClient] = useState('');
  const [newEmployee, setNewEmployee] = useState('');

  const handleAddClient = () => {
    setClients([...clients, { name: newClient, password: generateRandomPassword() }]);
    setNewClient('');
  };

  const handleAddEmployee = () => {
    setEmployees([...employees, { name: newEmployee, password: generateRandomPassword() }]);
    setNewEmployee('');
  };


  // -------------------------------

  const handleDeleteClient = (index) => {
    const updatedClients = [...clients];
    updatedClients.splice(index, 1);
    setClients(updatedClients);
  };

  const handleDeleteEmployee = (index) => {
    const updatedEmployees = [...employees];
    updatedEmployees.splice(index, 1);
    setEmployees(updatedEmployees);
  };

  const handleModifyClient = (index, newName) => {
    const updatedClients = [...clients];
    updatedClients[index].name = newName;
    setClients(updatedClients);
  };

  const handleModifyEmployee = (index, newName) => {
    const updatedEmployees = [...employees];
    updatedEmployees[index].name = newName;
    setEmployees(updatedEmployees);
  };

  return (
    <div className={styles.admin}>
      <h1>Admin Panel</h1>
      <div>
        <h2>Clientes</h2>
        <input 
          type="text" 
          value={newClient} 
          onChange={(e) => setNewClient(e.target.value)} 
          placeholder="Nuevo Cliente" 
        />
        <button onClick={handleAddClient}>Añadir Cliente</button>
        <ul>
          {clients.map((client, index) => (
            <li key={index}>
              {client.name} - {client.password} 
              <button onClick={() => handleDeleteClient(index)}>Eliminar</button>
              <button onClick={() => handleModifyClient(index, prompt('Nuevo nombre:', client.name))}>Modificar</button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2>Empleados</h2>
        <input 
          type="text" 
          value={newEmployee} 
          onChange={(e) => setNewEmployee(e.target.value)} 
          placeholder="Nuevo Empleado" 
        />
        <button onClick={handleAddEmployee}>Añadir Empleado</button>
        <ul>
          {employees.map((employee, index) => (
            <li key={index}>
              {employee.name} - {employee.password} 
              <button onClick={() => handleDeleteEmployee(index)}>Eliminar</button>
              <button onClick={() => handleModifyEmployee(index, prompt('Nuevo nombre:', employee.name))}>Modificar</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Admin;