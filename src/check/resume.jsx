import React from 'react'

import styles from './resume.module.css'

const Resume = () => {
    return (
        <div>
            <div className={styles['projects-section-header']}>
                <p>Projects</p>
                <p className={styles['time']}>December, 12</p>
            </div>
            <div className={styles['projects-section-line']}>
                <div className={styles['projects-status']}>
                    <div className={styles['item-status']}>
                        <span className={styles['status-number']}>45</span>
                        <span className={styles['status-type']}>In Progress</span>
                    </div>
                    <div className={styles['item-status']}>
                        <span className={styles['status-number']}>24</span>
                        <span className={styles['status-type']}>Upcoming</span>
                    </div>
                    <div className={styles['item-status']}>
                        <span className={styles['status-number']}>62</span>
                        <span className={styles['status-type']}>Total Projects</span>
                    </div>
                </div>
                <div className={styles['view-actions']}>
                    <button className={`${styles['view-btn']} ${styles['list-view']}`} title="List View">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-list">
                            <line x1="8" y1="6" x2="21" y2="6" />
                            <line x1="8" y1="12" x2="21" y2="12" />
                            <line x1="8" y1="18" x2="21" y2="18" />
                            <line x1="3" y1="6" x2="3.01" y2="6" />
                            <line x1="3" y1="12" x2="3.01" y2="12" />
                            <line x1="3" y1="18" x2="3.01" y2="18" />
                        </svg>
                    </button>
                    <button className={`${styles['view-btn']} ${styles['grid-view']} ${styles['active']}`} title="Grid View">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-grid">
                            <rect x="3" y="3" width="7" height="7" />
                            <rect x="14" y="3" width="7" height="7" />
                            <rect x="14" y="14" width="7" height="7" />
                            <rect x="3" y="14" width="7" height="7" />
                        </svg>
                    </button>
                </div>
            </div>
            <div className={`${styles['project-boxes']} ${styles['jsGridView']}`}>
                <div className={styles['project-box-wrapper']}>
                    <div className={styles['project-box']} style={{ backgroundColor: '#fee4cb' }}>
                        <div className={styles['project-box-header']}>
                            <span>December 10, 2020</span>
                            <div className={styles['more-wrapper']}>
                                <button className={styles['project-btn-more']}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-more-vertical">
                                        <circle cx="12" cy="12" r="1" />
                                        <circle cx="12" cy="5" r="1" />
                                        <circle cx="12" cy="19" r="1" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div className={styles['project-box-content-header']}>
                            <p className={styles['box-content-header']}>Web Designing</p>
                            <p className={styles['box-content-subheader']}>Prototyping</p>
                        </div>
                        <div className={styles['box-progress-wrapper']}>
                            <p className={styles['box-progress-header']}>Progress</p>
                            <div className={styles['box-progress-bar']}>
                                <span className={styles['box-progress']} style={{ width: '60%', backgroundColor: '#ff942e' }}></span>
                            </div>
                            <p className={styles['box-progress-percentage']}>60%</p>
                        </div>
                        <div className={styles['project-box-footer']}>
                            <div className={styles['participants']}>
                                <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80" style={{ width: 'auto', height: 'auto' }} alt="participant" />
                                <img src="https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTB8fG1hbnxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60" style={{ width: 'auto', height: 'auto' }} alt="participant" />
                                <button className={styles['add-participant']} style={{ color: '#ff942e' }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" className="feather feather-plus">
                                        <path d="M12 5v14M5 12h14" />
                                    </svg>
                                </button>
                            </div>
                            <div className={styles['days-left']} style={{ color: '#ff942e' }}>
                                2 Days Left
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles['project-box-wrapper']}>
                    <div className={styles['project-box']} style={{ backgroundColor: '#e9e7fd' }}>
                        <div className={styles['project-box-header']}>
                            <span>December 10, 2020</span>
                            <div className={styles['more-wrapper']}>
                                <button className={styles['project-btn-more']}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-more-vertical">
                                        <circle cx="12" cy="12" r="1" />
                                        <circle cx="12" cy="5" r="1" />
                                        <circle cx="12" cy="19" r="1" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div className={styles['project-box-content-header']}>
                            <p className={styles['box-content-header']}>Testing</p>
                            <p className={styles['box-content-subheader']}>Prototyping</p>
                        </div>
                        <div className={styles['box-progress-wrapper']}>
                            <p className={styles['box-progress-header']}>Progress</p>
                            <div className={styles['box-progress-bar']}>
                                <span className={styles['box-progress']} style={{ width: '50%', backgroundColor: '#4f3ff0' }}></span>
                            </div>
                            <p className={styles['box-progress-percentage']}>50%</p>
                        </div>
                        <div className={styles['project-box-footer']}>
                            <div className={styles['participants']}>
                                <img src="https://images.unsplash.com/photo-1596815064285-45ed8a9c0463?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1215&q=80" style={{ width: 'auto', height: 'auto' }} alt="participant" />
                                <img src="https://images.unsplash.com/photo-1583195764036-6dc248ac07d9?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2555&q=80" style={{ width: 'auto', height: 'auto' }} alt="participant" />
                                <button className={styles['add-participant']} style={{ color: '#4f3ff0' }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" className="feather feather-plus">
                                        <path d="M12 5v14M5 12h14" />
                                    </svg>
                                </button>
                            </div>
                            <div className={styles['days-left']} style={{ color: '#4f3ff0' }}>
                                2 Days Left
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles['project-box-wrapper']}>
                    <div className={styles['project-box']}>
                        <div className={styles['project-box-header']}>
                            <span>December 10, 2020</span>
                            <div className={styles['more-wrapper']}>
                                <button className={styles['project-btn-more']}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-more-vertical">
                                        <circle cx="12" cy="12" r="1" />
                                        <circle cx="12" cy="5" r="1" />
                                        <circle cx="12" cy="19" r="1" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div className={styles['project-box-content-header']}>
                            <p className={styles['box-content-header']}>Svg Animations</p>
                            <p className={styles['box-content-subheader']}>Prototyping</p>
                        </div>
                        <div className={styles['box-progress-wrapper']}>
                            <p className={styles['box-progress-header']}>Progress</p>
                            <div className={styles['box-progress-bar']}>
                                <span className={styles['box-progress']} style={{ width: '80%', backgroundColor: '#096c86' }}></span>
                            </div>
                            <p className={styles['box-progress-percentage']}>80%</p>
                        </div>
                        <div className={styles['project-box-footer']}>
                            <div className={styles['participants']}>
                                <img src="https://images.unsplash.com/photo-1587628604439-3b9a0aa7a163?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MjR8fHdvbWFufGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60" style={{ width: 'auto', height: 'auto' }} alt="participant" />
                                <img src="https://images.unsplash.com/photo-1596815064285-45ed8a9c0463?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1215&q=80" style={{ width: 'auto', height: 'auto' }} alt="participant" />
                                <button className={styles['add-participant']} style={{ color: '#096c86' }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" className="feather feather-plus">
                                        <path d="M12 5v14M5 12h14" />
                                    </svg>
                                </button>
                            </div>
                            <div className={styles['days-left']} style={{ color: '#096c86' }}>
                                2 Days Left
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles['project-box-wrapper']}>
                    <div className={styles['project-box']} style={{ backgroundColor: '#ffd3e2' }}>
                        <div className={styles['project-box-header']}>
                            <span>December 10, 2020</span>
                            <div className={styles['more-wrapper']}>
                                <button className={styles['project-btn-more']}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-more-vertical">
                                        <circle cx="12" cy="12" r="1" />
                                        <circle cx="12" cy="5" r="1" />
                                        <circle cx="12" cy="19" r="1" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div className={styles['project-box-content-header']}>
                            <p className={styles['box-content-header']}>UI Development</p>
                            <p className={styles['box-content-subheader']}>Prototyping</p>
                        </div>
                        <div className={styles['box-progress-wrapper']}>
                            <p className={styles['box-progress-header']}>Progress</p>
                            <div className={styles['box-progress-bar']}>
                                <span className={styles['box-progress']} style={{ width: '20%', backgroundColor: '#df3670' }}></span>
                            </div>
                            <p className={styles['box-progress-percentage']}>20%</p>
                        </div>
                        <div className={styles['project-box-footer']}>
                            <div className={styles['participants']}>
                                <img src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80" style={{ width: 'auto', height: 'auto' }} alt="participant" />
                                <img src="https://images.unsplash.com/photo-1587628604439-3b9a0aa7a163?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MjR8fHdvbWFufGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60" style={{ width: 'auto', height: 'auto' }} alt="participant" />
                                <button className={styles['add-participant']} style={{ color: '#df3670' }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" className="feather feather-plus">
                                        <path d="M12 5v14M5 12h14" />
                                    </svg>
                                </button>
                            </div>
                            <div className={styles['days-left']} style={{ color: '#df3670' }}>
                                2 Days Left
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles['project-box-wrapper']}>
                    <div className={styles['project-box']} style={{ backgroundColor: '#c8f7dc' }}>
                        <div className={styles['project-box-header']}>
                            <span>December 10, 2020</span>
                            <div className={styles['more-wrapper']}>
                                <button className={styles['project-btn-more']}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-more-vertical">
                                        <circle cx="12" cy="12" r="1" />
                                        <circle cx="12" cy="5" r="1" />
                                        <circle cx="12" cy="19" r="1" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div className={styles['project-box-content-header']}>
                            <p className={styles['box-content-header']}>Data Analysis</p>
                            <p className={styles['box-content-subheader']}>Prototyping</p>
                        </div>
                        <div className={styles['box-progress-wrapper']}>
                            <p className={styles['box-progress-header']}>Progress</p>
                            <div className={styles['box-progress-bar']}>
                                <span className={styles['box-progress']} style={{ width: '60%', backgroundColor: '#34c471' }}></span>
                            </div>
                            <p className={styles['box-progress-percentage']}>60%</p>
                        </div>
                        <div className={styles['project-box-footer']}>
                            <div className={styles['participants']}>
                                <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80" style={{ width: 'auto', height: 'auto' }} alt="participant" />
                                <img src="https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTB8fG1hbnxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60" style={{ width: 'auto', height: 'auto' }} alt="participant" />
                                <button className={styles['add-participant']} style={{ color: '#34c471' }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" className="feather feather-plus">
                                        <path d="M12 5v14M5 12h14" />
                                    </svg>
                                </button>
                            </div>
                            <div className={styles['days-left']} style={{ color: '#34c471' }}>
                                2 Days Left
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles['project-box-wrapper']}>
                    <div className={styles['project-box']} style={{ backgroundColor: '#d5deff' }}>
                        <div className={styles['project-box-header']}>
                            <span>December 10, 2020</span>
                            <div className={styles['more-wrapper']}>
                                <button className={styles['project-btn-more']}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-more-vertical">
                                        <circle cx="12" cy="12" r="1" />
                                        <circle cx="12" cy="5" r="1" />
                                        <circle cx="12" cy="19" r="1" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div className={styles['project-box-content-header']}>
                            <p className={styles['box-content-header']}>Web Designing</p>
                            <p className={styles['box-content-subheader']}>Prototyping</p>
                        </div>
                        <div className={styles['box-progress-wrapper']}>
                            <p className={styles['box-progress-header']}>Progress</p>
                            <div className={styles['box-progress-bar']}>
                                <span className={styles['box-progress']} style={{ width: '40%', backgroundColor: '#4067f9' }}></span>
                            </div>
                            <p className={styles['box-progress-percentage']}>40%</p>
                        </div>
                        <div className={styles['project-box-footer']}>
                            <div className={styles['participants']}>
                                <img src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80" style={{ width: 'auto', height: 'auto' }} alt="participant" />
                                <img src="https://images.unsplash.com/photo-1583195764036-6dc248ac07d9?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2555&q=80" style={{ width: 'auto', height: 'auto' }} alt="participant" />
                                <button className={styles['add-participant']} style={{ color: '#4067f9' }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" className="feather feather-plus">
                                        <path d="M12 5v14M5 12h14" />
                                    </svg>
                                </button>
                            </div>
                            <div className={styles['days-left']} style={{ color: '#4067f9' }}>
                                2 Days Left
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Resume