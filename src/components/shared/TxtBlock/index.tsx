import useSWR from 'swr'
import classes from '../style.module.css'
import measureText from '../../../utils/helpers/measureText'
import { useEffect, useState } from 'react'
import { useAppContext } from '../../../utils/provider/AppContext'

export default function TxtBlock() {
    const { setStart, start } = useAppContext()
    const [text, setText] = useState('')
    const [marginLeft, setMarginLeft] = useState(0)

    const { data } = useSWR<string[]>(
        'https://baconipsum.com/api/?type=all-meat&sentences=5',
        (url: string) => fetch(url).then((res) => res.json()),
    )

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === ' ') {
                e.preventDefault()
            }
            if (!start) {
                setStart(true)
            }
            if (e.key === 'Delete' || e.key === 'Backspace') {
                setText((prevText) => {
                    const updatedText = prevText.slice(0, -1)
                    setMarginLeft(measureText(updatedText))
                    return updatedText
                })
            } else if (e.key.length === 1) {
                setText((prevText) => {
                    const updatedText = prevText + e.key
                    setMarginLeft(measureText(updatedText))
                    return updatedText
                })
            }
        }

        document.addEventListener('keydown', handleKeyDown)

        return () => {
            document.removeEventListener('keydown', handleKeyDown)
        }
    }, [])

    const createMarkup = () => {
        if (!data) return 'Loading...'
        const originText = data.join(' ')
        return Array.from(originText).map((char, index) => {
            let style = {}
            if (index < text.length) {
                style = { color: char === text[index] ? 'green' : 'red' }
            }
            const displayChar: string = char === ' ' ? '\u00A0' : char
            return (
                <span key={index} style={style}>
                    {displayChar}
                </span>
            )
        })
    }

    return (
        <div className={classes.txtcontainer}>
            <div style={{ marginLeft: `-${marginLeft}px` }}>
                {createMarkup()}
            </div>
        </div>
    )
}
