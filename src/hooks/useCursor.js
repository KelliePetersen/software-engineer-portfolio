import { useEffect, useRef } from 'react'

export default function useCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return

    // popover=manual puts the element in the top layer without blocking interaction
    const cursorLayer = document.createElement('div')
    cursorLayer.popover = 'manual'
    cursorLayer.className = 'cursor-layer'
    document.body.appendChild(cursorLayer)

    const dot = document.createElement('div')
    dot.className = 'cursor-dot'
    cursorLayer.appendChild(dot)
    dotRef.current = dot

    const ring = document.createElement('div')
    ring.className = 'cursor-ring'
    cursorLayer.appendChild(ring)
    ringRef.current = ring

    cursorLayer.showPopover()

    const HOVER_SELECTORS =
      'a, button, [role="button"], input, textarea, select, label'

    let mouseX = 0
    let mouseY = 0
    let ringX = 0
    let ringY = 0
    let visible = false
    let rafId // cleanup for requestAnimationFrame

    function onMouseMove(e) {
      mouseX = e.clientX
      mouseY = e.clientY
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`
      if (!visible) {
        visible = true
        cursorLayer.classList.add('cursor-layer--visible')
        ringX = mouseX
        ringY = mouseY
      }
    }

    function onMouseOver(e) {
      if (e.target.closest(HOVER_SELECTORS)) {
        dot.classList.add('cursor-dot--hover')
        ring.classList.add('cursor-ring--hover')
      }
    }

    function onMouseOut(e) {
      if (e.target.closest(HOVER_SELECTORS)) {
        dot.classList.remove('cursor-dot--hover')
        ring.classList.remove('cursor-ring--hover')
      }
    }

    function onClick(e) {
      const ripple = document.createElement('div')
      ripple.className = 'cursor-ripple'
      ripple.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
      cursorLayer.appendChild(ripple)
      ripple.addEventListener('animationend', () => ripple.remove(), {
        once: true,
      })
    }

    // Adds the cursor back to the top layer when a dialog is opened
    // MutationObserver is more reliable than simply toggling on dialog.open across browsers
    // (e.g. Firefox toggles before the dialog is on the top layer)
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (
          mutation.target.tagName === 'DIALOG' &&
          mutation.target.hasAttribute('open')
        ) {
          cursorLayer.hidePopover()
          cursorLayer.showPopover()
          break
        }
      }
    })
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['open'],
      subtree: true,
    })

    function animate() {
      ringX += (mouseX - ringX) * 0.12
      ringY += (mouseY - ringY) * 0.12
      ring.style.transform = `translate(${ringX}px, ${ringY}px)`
      rafId = requestAnimationFrame(animate)
    }

    rafId = requestAnimationFrame(animate)

    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseover', onMouseOver)
    document.addEventListener('mouseout', onMouseOut)
    document.addEventListener('click', onClick)

    // Prevent duplicate cursors on remount
    return () => {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseover', onMouseOver)
      document.removeEventListener('mouseout', onMouseOut)
      document.removeEventListener('click', onClick)
      observer.disconnect()
      cancelAnimationFrame(rafId)
      cursorLayer.remove()
    }
  }, [])
}
