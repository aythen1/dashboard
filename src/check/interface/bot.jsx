// Esto va a ser un bot lo importante es que al principio este escondido y haya un botton abajo a la derecha.
// Luego quiero crear una estructura json que pueda añadir preguntas tipo A B C D y el usuario tambien pueda escribir otra respuesta o seleccionar la predeterminada
// Añademe todos los actions que hagan falta
// Que al darle enter se envie un mensaje y responda
// Lo voy a conectar a gpt que estara en mi backend hazme el react con su actions


import React, { useState } from 'react';
import styles from './bot.module.css';

const Bot = () => {
    const [visible, setVisible] = useState(false);
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');

    const toggleChat = () => {
        setVisible(!visible);
    };

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const sendMessage = async () => {
        if (inputValue.trim()) {
            const userMessage = {
                type: 'user',
                text: inputValue,
            };
            setMessages([...messages, userMessage]);
            setInputValue('');

            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: inputValue }),
            });

            const data = await response.json();
            const botMessage = {
                type: 'bot',
                text: data.reply,
            };
            setMessages([...messages, userMessage, botMessage]);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    };

    return (
        <div className={styles.botContainer}>
            <button className={styles.botButton} onClick={toggleChat}>
                {visible ? 'Close Chat' : 'Open Chat'}
            </button>
            <div className={`${styles.chatWindow} ${visible ? 'visible' : ''}`}>
                <div className={styles.messages}>
                    {messages.map((msg, index) => (
                        <div key={index} className={msg.type === 'user' ? 'user-message' : 'bot-message'}>
                            {msg.text}
                        </div>
                    ))}
                </div>
                <div className={styles.inputContainer}>
                    <input
                        type="text"
                        value={inputValue}
                        onChange={handleInputChange}
                        onKeyPress={handleKeyPress}
                        placeholder="Type your message here..."
                    />
                    <button onClick={sendMessage}>Send</button>
                </div>
            </div>
        </div>
    );
};

export default Bot;