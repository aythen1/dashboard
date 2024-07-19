import React, { useState } from 'react';
import styles from './client.module.css';

const Client = () => {
    const [addresses, setAddresses] = useState([]);
    const [currentAddress, setCurrentAddress] = useState('');
    const [tickets, setTickets] = useState({});
    const [currentUrl, setCurrentUrl] = useState('');
    const [currentPosition, setCurrentPosition] = useState('');
    const [currentComment, setCurrentComment] = useState('');
    const [selectedAddress, setSelectedAddress] = useState(null);

    const handleAddAddress = () => {
        setAddresses([...addresses, currentAddress]);
        setTickets({ ...tickets, [currentAddress]: [] });
        setCurrentAddress('');
    };

    const handleAddTicket = (address) => {
        const newTicket = { url: currentUrl, position: currentPosition, comment: currentComment };
        setTickets({
            ...tickets,
            [address]: [...tickets[address], newTicket]
        });
        setCurrentUrl('');
        setCurrentPosition('');
        setCurrentComment('');
    };

    const handleSelectAddress = (address) => {
        setSelectedAddress(address);
    };

    return (
        <div>
            <h2>Client Dashboard</h2>
            <div>
                <h3>Add Address</h3>
                <input
                    type="text"
                    value={currentAddress}
                    onChange={(e) => setCurrentAddress(e.target.value)}
                    placeholder="Enter address"
                />
                <button onClick={handleAddAddress}>Add Address</button>
            </div>

            <div>
                <h3>Addresses</h3>
                <ul>
                    {addresses.map((address, index) => (
                        <li key={index} onClick={() => handleSelectAddress(address)}>
                            {address}
                        </li>
                    ))}
                </ul>
            </div>

            {selectedAddress && (
                <div>
                    <h3>Tickets for {selectedAddress}</h3>
                    <div>
                        <input
                            type="text"
                            value={currentUrl}
                            onChange={(e) => setCurrentUrl(e.target.value)}
                            placeholder="Enter URL"
                        />
                        <input
                            type="text"
                            value={currentPosition}
                            onChange={(e) => setCurrentPosition(e.target.value)}
                            placeholder="Enter Position"
                        />
                        <input
                            type="text"
                            value={currentComment}
                            onChange={(e) => setCurrentComment(e.target.value)}
                            placeholder="Enter Comment"
                        />
                        <button onClick={() => handleAddTicket(selectedAddress)}>Add Ticket</button>
                    </div>

                    <ul>
                        {tickets[selectedAddress].map((ticket, index) => (
                            <li key={index}>
                                <p>URL: {ticket.url}</p>
                                <p>Position: {ticket.position}</p>
                                <p>Comment: {ticket.comment}</p>
                                <iframe src={ticket.url} title={`iframe-${index}`} width="300" height="200"></iframe>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Client;