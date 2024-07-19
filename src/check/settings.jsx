import React from 'react'

import styles from './settings.module.css'

const Settings = () => {
    const options = [{
        title: 'Usuarios registrados',
        action: [{
            title: 'Ver todos los usuarios',
            active: true
        }, {
            title: 'Añadir usuario',
            active: true
        }, {
            title: 'Modificar usuario',
            active: true
        }, {
            title: 'Eliminar usuario',
            active: true
        }]
    }, {
        title: 'Eventos creados totales',
        action: [{
            title: 'Ver todos los evento',
            active: true
        }, {
            title: 'Añadir evento',
            active: true
        }, {
            title: 'Modificar evento',
            active: true
        }, {
            title: 'Eliminar evento',
            active: true
        }]
    }, {
        title: 'Precios de licencias',
        action: [{
            title: 'Ver todas licencia',
            active: true
        }, {
            title: 'Añadir licencia',
            active: true
        }, {
            title: 'Modificar licencia',
            active: true
        }, {
            title: 'Eliminar licencia',
            active: true
        }]
    }, {
        title: 'Precios de licencias',
        action: [{
            title: 'Ver todos los evento',
            active: true
        }, {
            title: 'Añadir evento',
            active: true
        }, {
            title: 'Modificar evento',
            active: true
        }, {
            title: 'Eliminar evento',
            active: true
        }]
    }]


    return (
        <div>
            <div className={styles.alert}>
                <b>

                </b>
                <p>

                </p>
            </div>
            <ul className={styles.settings}>
                {options.map((item, index) => (
                    <li key={index}>
                        <b className={styles.title}>
                            {item.title}
                        </b>
                        <ul className={styles.actions}>
                            {item.action.map((item, index) => (
                                <li key={index}>
                                    {item.title}
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>

        </div>
    )
}

export default Settings