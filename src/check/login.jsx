import React, { useState } from 'react';
import styles from './login.module.css';

const Login = ({ user, setUser }) => {


    const handleSubmit = (e) => {
        e.preventDefault();


        if (user.user == '1234' && user.password == '1234') {
            setUser({
                ...user,
                token: '1234'
            })
        }
    };


    return (
        <div className={styles.container}>
            <div className={styles["content-container"]}>
                <div className={styles["left-column"]}>
                    <figure>
                        <img id="img5" src="https://www.instagram.com/static/images/homepage/screenshot5.jpg/0a2d3016f375.jpg" />
                        <img id="img4" src="https://www.instagram.com/static/images/homepage/screenshot4.jpg/842fe5699220.jpg" />
                        <img id="img3" src="https://www.instagram.com/static/images/homepage/screenshot3.jpg/f0c687aa6ec2.jpg" />
                        <img id="img2" src="https://www.instagram.com/static/images/homepage/screenshot2.jpg/6f03eb85463c.jpg" />
                        <img id="img1" src="https://www.instagram.com/static/images/homepage/screenshot1.jpg/d6bf0c928b5a.jpg" />
                    </figure>
                </div>
                <div className={styles["right-column"]}>
                    <section className={styles["top-section"]}>
                        <header>
                            <img className={styles.logo} src="https://i.ibb.co/mGD0vzz/instagram-logo.png" />
                        </header>
                        <div className={styles.login}>
                            <div className={styles["login-form-div"]}>
                                <form id="login-form">
                                    <input type="text" id="username" required />
                                    <span className={styles["username-ph"]}>Teléfono, usuario o correo electrónico</span>
                                    <input type="password" id="password" required />
                                    <span className={styles["password-ph"]}>Contraseña</span>
                                    <input type="submit" value="Iniciar sesión" />
                                </form>
                            </div>
                            <div className={styles["login-spacer"]}>
                                <div className={styles["inline-border"]}></div>
                                <div className="">O</div>
                                <div className={styles["inline-border"]}></div>
                            </div>
                            <div className={styles["login-facebook"]}>
                                <p className={styles["facebook-text"]}><a href="#">Iniciar sesión con Facebook</a></p>
                            </div>
                            <div className={styles["login-forgot"]}>
                                <p><a href="#">¿Has olvidado la contraseña?</a></p>
                            </div>
                        </div>
                    </section>
                    <div className={styles.register}>
                        <p>¿No tienes una cuenta? <a href="#">Regístrate</a></p>
                    </div>
                    <div className={styles["mobile-app"]}>
                        <p>Descarga la aplicación.</p>
                        <div className={styles.stores}>
                            <div className={styles["app-store"]}>
                                <a href="https://itunes.apple.com/app/instagram/id389801252?pt=428156&ct=igweb.loginPage.badge&mt=8&vt=lo">
                                    <img src="https://i.ibb.co/jgSzMBQ/app-store.png" />
                                </a>
                            </div>
                            <div className={styles["google-play"]}>
                                <a href="https://play.google.com/store/apps/details?id=com.instagram.android&referrer=utm_source%3Dinstagramweb%26utm_campaign%3DloginPage%26ig_mid%3D0C5ECF3B-C22A-45AC-B9B3-7B4C7CB42666%26utm_content%3Dlo%26utm_medium%3Dbadge">
                                    <img src="https://i.ibb.co/F44HJZd/google-play.png" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <footer>
                <div className={styles["footer-divs"]}>
                    <div className={styles["footer-links"]}>
                        <div><a href="#">Información</a></div>
                        <div><a href="#">Blog</a></div>
                        <div><a href="#">Empleo</a></div>
                        <div><a href="#">Ayuda</a></div>
                        <div><a href="#">API</a></div>
                        <div><a href="#">Privacidad</a></div>
                        <div><a href="#">Condiciones</a></div>
                        <div><a href="#">Cuentas destacadas</a></div>
                        <div><a href="#">Hashtags</a></div>
                        <div><a href="#">Ubicaciones</a></div>
                        <div><a href="#">Instagram Lite</a></div>
                    </div>
                    <div className={styles["footer-links"]}>
                        <div><a href="#">Belleza</a></div>
                        <div><a href="#">Danza</a></div>
                        <div><a href="#">Fitness</a></div>
                        <div><a href="#">Comida y bebida</a></div>
                        <div><a href="#">Casa y jardín</a></div>
                        <div><a href="#">Música</a></div>
                        <div><a href="#">Artes visuales</a></div>
                    </div>
                </div>
                <div className={styles["footer-down"]}>
                    <span className={styles.language}>
                        <select aria-label="Cambiar idioma de visualización" className={styles.hztqj}>
                            <option value="af">Afrikaans</option>
                            <option value="cs">Čeština</option>
                            <option value="da">Dansk</option>
                            <option value="de">Deutsch</option>
                            <option value="el">Ελληνικά</option>
                            <option value="en">English</option>
                            <option value="en-gb">English (UK)</option>
                            <option value="es" selected="selected">Español (España)</option>
                            <option value="es-la">Español</option>
                            <option value="fi">Suomi</option>
                            <option value="fr">Français</option>
                            <option value="id">Bahasa Indonesia</option>
                            <option value="it">Italiano</option>
                            <option value="ja">日本語</option>
                            <option value="ko">한국어</option>
                            <option value="ms">Bahasa Melayu</option>
                            <option value="nb">Norsk</option>
                            <option value="nl">Nederlands</option>
                            <option value="pl">Polski</option>
                            <option value="pt-br">Português (Brasil)</option>
                            <option value="pt">Português (Portugal)</option>
                            <option value="ru">Русский</option>
                            <option value="sv">Svenska</option>
                            <option value="th">ภาษาไทย</option>
                            <option value="tl">Filipino</option>
                            <option value="tr">Türkçe</option>
                            <option value="zh-cn">中文(简体)</option>
                            <option value="zh-tw">中文(台灣)</option>
                            <option value="bn">বাংলা</option>
                            <option value="gu">ગુજરાતી</option>
                            <option value="hi">हिन्दी</option>
                            <option value="hr">Hrvatski</option>
                            <option value="hu">Magyar</option>
                            <option value="kn">ಕನ್ನಡ</option>
                            <option value="ml">മലയാളം</option>
                            <option value="mr">मराठी</option>
                            <option value="ne">नेपाली</option>
                            <option value="pa">ਪੰਜਾਬੀ</option>
                            <option value="si">සිංහල</option>
                            <option value="sk">Slovenčina</option>
                            <option value="ta">தமிழ்</option>
                            <option value="te">తెలుగు</option>
                            <option value="vi">Tiếng Việt</option>
                            <option value="zh-hk">中文(香港)</option>
                            <option value="bg">Български</option>
                            <option value="fr-ca">Français (Canada)</option>
                            <option value="ro">Română</option>
                            <option value="sr">Српски</option>
                            <option value="uk">Українська</option>
                        </select>
                    </span>
                    <span className={styles.copyright}>© 2021 Instagram from Facebook</span>
                </div>
            </footer>
        </div>
    )
    // return (
    //     <div className={styles.loginContainer}>
    //         <form onSubmit={handleSubmit} className={styles.loginForm}>
    //             <div className={styles.formGroup}>
    //                 <label htmlFor="id">ID:</label>
    //                 <input
    //                     type="text"
    //                     id="id"
    //                     value={user.user}
    //                     onChange={(e) => setUser({ ...user, user: e.target.value })}
    //                     className={styles.inputField}
    //                 />
    //             </div>
    //             <div className={styles.formGroup}>
    //                 <label htmlFor="password">Password:</label>
    //                 <input
    //                     type="password"
    //                     id="password"
    //                     value={user.password}
    //                     onChange={(e) => setUser({ ...user, password: e.target.value })}
    //                     className={styles.inputField}
    //                 />
    //             </div>
    //             <button type="submit" className={styles.submitButton}>Login</button>
    //         </form>
    //     </div>
    // );
};

export default Login;