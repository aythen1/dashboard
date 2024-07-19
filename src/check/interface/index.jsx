import React, { useState } from 'react'


import styles from './index.module.css'


const Interface = ({
    page,
    setPage,
    plugins,
    children
}) => {

    const [messages, setMessages] = useState([{
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80',
        name: 'Stephanie',
        date: 'Jul, 18',
        data: `En el buscador se debe de poder buscar por los modulos que tengas de ver todos de ajustes`,
    },{
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80',
        name: 'Stephanie',
        date: 'Jul, 18',
        data: `En ajustes se debe poder seleccionar y poder añadir apartado de ajustes avanzados para poder agregar las rutas genericas en todas, revisar
        el resultado con Azul para que siempre sea el mismo o hacer un interpete de datos`,
    },{
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80',
        name: 'Stephanie',
        date: 'Jul, 18',
        data: `Calendario poder navegar y que se pueda ver todas las creaciones por fechas hacer un buscador que acepte, query, startDate, endDate, limit, etc..`,
    },{
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80',
        name: 'Stephanie',
        date: 'Jul, 18',
        data: `Hacer un dashboard de stats con las graficas que tenemos y algun diseño de codepen`,
    },{
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80',
        name: 'Stephanie',
        date: 'Jul, 18',
        data: `Crear una tabla y un popup dinamico en cada tipo de items (evento, precios, etc)`,
    },{
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80',
        name: 'Stephanie',
        date: 'Jul, 18',
        data: `Añadir el apartado de cliente para que pueda añadir avisos y tareas, de sus aplicaciones, estos avisos se recogen en 30 minutos de desactividad y se envian a info@aythen.com`,
    },{
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80',
        name: 'Stephanie',
        date: 'Jul, 18',
        data: `Crear un apartado para el admin para agregar usuarios y agregar empleados`,
    },{
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80',
        name: 'Stephanie',
        date: 'Jul, 18',
        data: `El admin puede asociar empleados a los clientes, entonces el empleado recibira als aletas, el empleado tiene un acceso para ver todos los proyectos
        y ver todos los tickets los cuales puede comentar y puede poner como realizado, esto al final del día se enviara a info@aythen.com una alerta.`,
    },{
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80',
        name: 'Stephanie',
        date: 'Jul, 18',
        data: `Terminar el login, habrá un apartado de recover-password pero no de register`,
    },{
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80',
        name: 'Stephanie',
        date: 'Jul, 18',
        data: `Poder personalizar la plataforma con [color-primary-n] y dark mode como en el aythen lite`,
    },{
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80',
        name: 'Stephanie',
        date: 'Jul, 18',
        data: `Añadir la vista agenda y la vista por meses en el calendario`,
    },{
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80',
        name: 'Stephanie',
        date: 'Jul, 18',
        data: `Que hayan subusuarios por si un cliente quiere dar acceso a otra persona, se puede gestionar desde arriba a la derecha`,
    },{
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80',
        name: 'Stephanie',
        date: 'Jul, 18',
        data: `En ajustes añadir también un testing como axios que compruebe si funciona y salga de colores, asi el usuario podrá ver`,
    },{
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80',
        name: 'Stephanie',
        date: 'Jul, 18',
        data: `Plugins que hacen falta: Productos, Suscripciones, Usuarios y Eventos. Añadir un lugar donde se vea todos los datos que se reciben e incluso poder interpretar un dato por otro para que se pueda cambiar. Tipo primera consulta, seleccionas cambias y guardas y ya se interpreta de esa forma. `,
    },{
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80',
        name: 'Stephanie',
        date: 'Jul, 18',
        data: `Revisar la web app `,
    },{
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80',
        name: 'Stephanie',
        date: 'Jul, 18',
        data: `En el admin en los usuarios agregar un método de pago de suscripciones, que podamos revisar quien esta pagando la suscripcion, poder solicitar, rechazar, y ver impagos`,
    },{
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80',
        name: 'Stephanie',
        date: 'Jul, 18',
        data: `Añadir un bot va a ser muy sencillo: el usuario (cliente) puede añadir comentarios de su aplicación, la idea es que pueda subir una foto y añadir marcas y comentarios o ver lo que el usuario (empleado) dio como terminado para que ponga si le gusta o no le gusta, esto se tiene que actualizar.
        El usuario (empleado) recibe y solo puede poner terminado, ya que los comentarios los recibiremos nosotros para hacer de intermediarios`,
    },{
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80',
        name: 'Stephanie',
        date: 'Jul, 18',
        data: `Trabajar el responsive de toda la plataforma los clientes se esperan que sea como una web app`,
    },{
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80',
        name: 'Stephanie',
        date: 'Jul, 18',
        data: `Buscar una landing template para resumir lo que hara este saas, para intentar ofrecerlo a otros clientes`,
    },{
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80',
        name: 'Stephanie',
        date: 'Jul, 18',
        data: `Crear un repositorio que sea como el oficial y que contenga información y las actualizaciones de los upgrwares [template]`,
    },{
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80',
        name: 'Stephanie',
        date: 'Jul, 18',
        data: `El home debe ser la parte del check, que tiene varias segmentaciones y pueda añadir al bot diferentes comentarios para crear tareas de mantenimiento`,
    }])

    return (
        <div className={styles['app-container']}>
            <div className={styles['app-header']}>
                <div className={styles['app-header-left']}>
                    <span className={styles['app-icon']}></span>
                    <p className={styles['app-name']}>Portfolio</p>
                    <div className={styles['search-wrapper']}>
                        <input className={styles['search-input']} type="text" placeholder="Search" />
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="feather feather-search" viewBox="0 0 24 24">
                            <defs></defs>
                            <circle cx="11" cy="11" r="8"></circle>
                            <path d="M21 21l-4.35-4.35"></path>
                        </svg>
                    </div>
                </div>
                <div className={styles['app-header-right']}>
                    <button className={styles['mode-switch']} title="Switch Theme">
                        <svg className="moon" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" width="24" height="24" viewBox="0 0 24 24">
                            <defs></defs>
                            <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"></path>
                        </svg>
                    </button>
                    <button className={styles['add-btn']} title="Add New Project">
                        <svg className={styles['btn-icon']} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                            <line x1="12" y1="5" x2="12" y2="19" />
                            <line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                    </button>
                    <button className={styles['profile-btn']}>
                        <img src="https://assets.codepen.io/3306515/IMG_2025.jpg" style={{ width: 'auto', height: 'auto' }} />
                        <span>Aybüke C.</span>
                    </button>
                </div>
                <button className={styles['messages-btn']}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-message-circle">
                        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                    </svg>
                </button>
            </div>
            <div className={styles['app-content']}>
                <div className={styles['app-sidebar']}>
                    <a
                        onClick={() => setPage('resume')}
                        className={`${styles['app-sidebar-link']} ${page == 'home' ? styles['active'] : ''}`}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-home">
                            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                            <polyline points="9 22 9 12 15 12 15 22" />
                        </svg>
                    </a>
                    <a
                        onClick={() => setPage('stats')}
                        className={`${styles['app-sidebar-link']} ${page == 'stats' ? styles['active'] : ''}`}
                    >
                        <svg className={`${styles['link-icon']} feather feather-pie-chart`} xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24">
                            <defs />
                            <path d="M21.21 15.89A10 10 0 118 2.83M22 12A10 10 0 0012 2v10z" />
                        </svg>
                    </a>
                    <a
                        onClick={() => setPage('calendar')}
                        className={`${styles['app-sidebar-link']} ${page == 'calendar' ? styles['active'] : ''}`}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-calendar">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                            <line x1="16" y1="2" x2="16" y2="6" />
                            <line x1="8" y1="2" x2="8" y2="6" />
                            <line x1="3" y1="10" x2="21" y2="10" />
                        </svg>
                    </a>
                    <a
                        onClick={() => setPage('settings')}
                        className={`${styles['app-sidebar-link']} ${page == 'settings' ? styles['active'] : ''}`}
                    >
                        <svg className={`${styles['link-icon']} feather feather-settings`} xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24">
                            <defs />
                            <circle cx="12" cy="12" r="3" />
                            <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
                        </svg>
                    </a>
                    ---
                    {plugins.map((plugin, index) => (
                        <div key={index} onClick={() => setPage(plugin.href)}>
                            <svg className={`${styles['link-icon']} feather feather-settings`} xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24">
                                <defs />
                                <circle cx="12" cy="12" r="3" />
                                <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
                            </svg>
                        </div>
                    ))}
                </div>
                <div className={styles['projects-section']}>
                    {children}
                </div>
                <div className={styles['messages-section']}>
                    <button className={styles['messages-close']}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-x-circle">
                            <circle cx="12" cy="12" r="10" />
                            <line x1="15" y1="9" x2="9" y2="15" />
                            <line x1="9" y1="9" x2="15" y2="15" />
                        </svg>
                    </button>
                    <div className={styles['projects-section-header']}>
                        <p>Client Messages</p>
                    </div>
                    <div className={styles['messages']}>
                        {messages.map((message, index) => (
                            <div key={index} className={styles['message-box']}>
                                <img src={message.avatar} style={{ width: 'auto', height: 'auto' }} alt="profile image" />
                                <div className={styles['message-content']}>
                                    <div className={styles['message-header']}>
                                        <div className={styles['name']}>{message.name}</div>
                                        <div className={styles['star-checkbox']}>
                                            <input type="checkbox" id="star-1" />
                                            <label htmlFor="star-1">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-star">
                                                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                                </svg>
                                            </label>
                                        </div>
                                    </div>
                                    <p className={styles['message-line']}>
                                        {message.data}
                                    </p>
                                    <p className={styles['message-line']} style={{ color: 'time' }}>
                                        {message.date}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Interface