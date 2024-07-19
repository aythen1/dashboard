import React from 'react'

import styles from './calendar.module.css'


import {
    generateMonthDays,
    daysOfWeek,
} from '@/views/app/pages/Projects/calendar/utils'


const Calendar = () => {
    return (
        <div>
            hello world
            <CalendarMonth />
        </div>
    )
}

export default Calendar








export const CalendarMonth = ({ handleEvent }) => {
    const weeks = generateMonthDays()

    const handleCellClick = (day) => {
        console.log(`Clicked on: ${day}`);
        // handleEvent()
    };

    return (
        <table className={styles.calendarMonth} border="1">
            <thead>
                <tr>
                    {daysOfWeek.map((day, index) => (
                        <th key={index}>{day}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {weeks.map((week, weekIndex) => (
                    <tr key={weekIndex}>
                        {week.map((day, dayIndex) => (
                            <td key={dayIndex} onClick={() => handleCellClick(day)}>
                                <div className={styles.day}>
                                    <b>{day}</b>
                                    <ul>
                                        <li>
                                            <div className={styles.dot} />
                                            <div className={styles.info}>
                                                <span>
                                                    11am
                                                </span>
                                                <b>
                                                    Aythen meet
                                                </b>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );


}

