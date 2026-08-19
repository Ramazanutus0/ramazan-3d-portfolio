import { useEffect, useRef } from 'react'

export function useMouseTracker() {
  const mouse = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Normalize to [-1, 1]
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1
      mouse.current.y = -((e.clientY / window.innerHeight) * 2 - 1)
    }

    const handleDeviceOrientation = (e) => {
      if (e.gamma !== null && e.beta !== null) {
        mouse.current.x = Math.max(-1, Math.min(1, e.gamma / 30))
        mouse.current.y = Math.max(-1, Math.min(1, (e.beta - 30) / 30))
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('deviceorientation', handleDeviceOrientation)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('deviceorientation', handleDeviceOrientation)
    }
  }, [])

  return mouse
}
