import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import Threads from './Threads'

const introText = 'HELLO WORLD!'

function IntroSplash({ isExiting }) {
  const letterRefs = useRef([])

  useEffect(() => {
    const letters = letterRefs.current.filter(Boolean)
    if (!letters.length) return undefined

    gsap.set(letters, { opacity: 0, y: 34, filter: 'blur(6px)' })
    const timeline = gsap.timeline()
    timeline.to(letters, {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 0.68,
      ease: 'power3.out',
      stagger: 0.08,
    })

    return () => timeline.kill()
  }, [])

  return (
    <div className={`intro-splash ${isExiting ? 'intro-splash--exit' : ''}`}>
      <Threads className="intro-splash__threads" color={[0.58, 0.45, 1]} amplitude={0.9} distance={0.2} />
      <div className="intro-splash__veil" aria-hidden="true" />
      <div className="intro-splash__content">
        <h1 className="intro-splash__title">
          {introText.split('').map((char, index) => (
            <span
              key={`${char}-${index}`}
              className="intro-splash__glyph"
              ref={(element) => {
                letterRefs.current[index] = element
              }}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </h1>
      </div>
    </div>
  )
}

export default IntroSplash
