import React from 'react'

export default function CheckOnScreen(ref) {
    const [isIntersecting, setIntersecting] = React.useState(false)

    const observer = new IntersectionObserver(([entry]) =>
        setIntersecting(entry.isIntersecting)
    )

    React.useEffect(() => {
        observer.observe(ref.current)
        // Remove the observer as soon as the component is unmounted
        return () => {
            observer.disconnect()
        }
    }, [])

    return isIntersecting
}
