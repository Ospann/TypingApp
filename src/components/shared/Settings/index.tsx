import { useState, useEffect } from 'react'
import { useAppContext } from '../../../utils/provider/AppContext'
import classes from '../style.module.css'
import TimerSvg from '../../svg/TimerSvg'
export default function Settings() {
    const { start, setStart } = useAppContext()
    const [seconds, setSeconds] = useState(60)

    useEffect(() => {
        let interval: number | undefined
        if (start) {
            interval = setInterval(() => {
                setSeconds((prevSeconds) => {
                    if (prevSeconds === 1) {
                        clearInterval(interval)
                        setStart(false)
                        return 60
                    } else {
                        return prevSeconds - 1
                    }
                })
            }, 1000)
        } else if (!start && seconds !== 60) {
            clearInterval(interval)
            setSeconds(60)
        }

        return () => clearInterval(interval)
    }, [start, seconds, setStart])

    return (
        <div className={classes.settings}>
            <p>TYPING SPEED TEST</p>
            <h1>Test your typing skills</h1>
            <section className={classes.subsettings}>
                <div className={classes.timer}>
                    <div>
                        <span>{seconds}</span>
                        <span>secs</span>
                    </div>
                    <TimerSvg duration={seconds} isRunning={start} />
                </div>
                <section className={classes.statistic}>
                    <div className={classes.scoreCard}>
                        <span>avg words</span>
                        <strong>0</strong>
                    </div>
                    <div className={classes.scoreCard}>
                        <span>avg letter</span>
                        <strong>0</strong>
                    </div>
                    <div className={classes.scoreCard}>
                        <span>last result</span>
                        <strong>0</strong>
                    </div>
                </section>
            </section>
        </div>
    )
}
