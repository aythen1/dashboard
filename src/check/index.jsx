import React, { useEffect, useState, Suspense, lazy } from 'react'
import mapPlugins from './plugin';


// import fs from 'fs';

// Login 
// Aqui en el login que el usuario pueda poner su id y el empleado igual
// y la contraseña que sea generada automaticamente. 

// Que haya un token para comprobarlo y hacer solicitudes
// ---

// Si eres empleado vas a ver un portal con todos los tickets y mensajes del usuario como si fuera un gmail 
// https://codepen.io/aybukeceylan/details/OJRNbZp

// --
// Poder enviar mensajes 

// https://codepen.io/marcode_ely/pen/gOBJMEV

// -------

// Si eres un usuario de una plataforma

// Que puedas ver todos los tickets que has puesto

// Poder hablar con un bot

// Poder añadir bots y poderlos poder quitar

// 1. El bot puede añadir nuevas fotos con comentarios y se enviara un email con nuevos comentarios a la hora
// 2. El bot muestra el trabajo realizado por el empelado y cuando le da okey se envia otro email a la hora

//  ----------------------------
// -- El admin que pueda crear un empleado y un usuario y ver las suscripciones activas

import Login from './login'

import Interface from './interface'

import Settings from './settings'
import Admin from './admin'
import Client from './client'
// import Work from './work'
import Resume from './resume'
import Calendar from './calendar'
import Stats from './stats'

const Check = () => {

    const [page, setPage] = useState('settings')

    const [user, setUser] = useState({
        user: '',
        password: '',
        token: '1',
    })


    const [info, setInfo] = useState({
        inProgress: 45,
        upComing: 24,
        total: 62
    })


    const [plugins, setPlugins] = useState([{
        href: 'event'
    }])

    // ------------------------------------------------
    const [IsPlugin, setIsPlugin] = useState(false)
    const interfaces = [
        'settings',
        'admin',
        'client',
        'stats',
        'work',
        'calendar',
        'resume'
    ]


    // useEffect(() => {
    //     if (interfaces.includes(page)) {
    //         setIsPlugin(false)
    //     } else {

    //          leer en la carpeta ./plugin/[page] si existe
    //          lo pone en setIsPlugin como page, si no existe en la ruta
    //          poner setIsPlugin(false)

    //         setIsPlugin(true)
    //     }
    // }, [page])

    useEffect(() => {
        console.log('1224')
        if (interfaces.includes(page)) {
            setIsPlugin(false);
        } else {
            console.log('aaaaaaaaaaaaaaa1', page, mapPlugins)
            if (mapPlugins[page]) {
                console.log('bbbbb', page)
                const loadComponent = async () => {
                    const { default: LoadedComponent } = await mapPlugins[page]();
                    setIsPlugin(() => LoadedComponent);
                };
                loadComponent();

            } else {
                console.log('aaaaaaaaaaaaa')
                setIsPlugin(false);
            }
        }
    }, [page]);

    return (
        <>
            {!user.token ? (
                <Login user={user} setUser={setUser} />
            ) : (
                <Interface
                    plugins={plugins}
                    page={page}
                    setPage={setPage}
                >
                    {!IsPlugin ? (
                        <>
                            {page == 'settings' ? (
                                <Settings />
                            ) : page == 'admin' ? (
                                <Admin />
                            ) : page == 'client' ? (
                                <Client />
                            ) : page == 'stats' ? (
                                <Stats />
                            ) : page == 'calendar' ? (
                                <Calendar />
                            ) : page == 'resume' && (
                                <Resume />
                            )}
                        </>
                    ) : (
                        <>
                            <Suspense fallback={<div>Loading...</div>}>
                                <IsPlugin />
                            </Suspense>
                        </>
                    )}
                </Interface>
            )}
        </>
    )
}

export default Check