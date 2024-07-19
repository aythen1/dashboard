import React, { useState, useEffect } from 'react';
import styles from './work.module.css';

const Work = () => {
    const [clients, setClients] = useState([]);

    useEffect(() => {
        // Simulación de llamada a una API para obtener datos de clientes
        const fetchClients = async () => {
            const clientsData = [
                { id: 1, name: 'Cliente A', address: 'Dirección 1', otherInfo: 'Otra información A' },
                { id: 2, name: 'Cliente B', address: 'Dirección 2', otherInfo: 'Otra información B' },
                { id: 3, name: 'Cliente C', address: 'Dirección 3', otherInfo: 'Otra información C' },
            ];
            setClients(clientsData);
        };

        fetchClients();
    }, []);

    return (
        <div className={styles.workContainer}>
            <h1>Lista de Clientes</h1>
            <table className={styles.clientsTable}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Dirección</th>
                        <th>Otra Información</th>
                    </tr>
                </thead>
                <tbody>
                    {clients.map(client => (
                        <tr key={client.id}>
                            <td>{client.id}</td>
                            <td>{client.name}</td>
                            <td>{client.address}</td>
                            <td>{client.otherInfo}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Work;
