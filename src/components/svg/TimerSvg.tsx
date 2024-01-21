import { useState, useEffect } from 'react'

type TimerSvgType = {
    duration: number
    isRunning: boolean
}

export default function TimerSvg({ duration, isRunning }: TimerSvgType) {
    const circumference = 2 * Math.PI * 53
    const [dashOffset, setDashOffset] = useState(0)

    useEffect(() => {
        if (isRunning) {
            const interval = setInterval(() => {
                setDashOffset((oldOffset) => {
                    const newOffset = oldOffset + circumference / duration
                    return newOffset < circumference ? newOffset : circumference
                })
            }, 1000)

            return () => clearInterval(interval)
        } else {
            setDashOffset(0)
        }
    }, [isRunning, duration])

    return (
        <svg viewBox="0 0 110 110" width="110" height="110">
            <circle
                cx="55"
                cy="55"
                r="53"
                fill="none"
                stroke="#FFD000"
                strokeWidth="4"
                strokeDasharray={`${circumference}px`}
                style={{
                    transform: 'rotate(-90deg)',
                    transformOrigin: 'center center',
                    transition: 'stroke-dashoffset 1s linear',
                    strokeDashoffset: `${dashOffset}px`,
                }}
            />
        </svg>
    )
}
