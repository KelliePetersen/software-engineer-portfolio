import { useEffect, useRef, useImperativeHandle, forwardRef } from 'react'
import Matter from 'matter-js'

const MatterBackground = forwardRef(function MatterBackground(_, ref) {
  const canvasRef = useRef(null)
  const engineRef = useRef(null)

  useImperativeHandle(ref, () => ({
    spawnCircle() {
      const engine = engineRef.current
      if (!engine) return

      const colorKey = Math.random() < 0.5 ? '--primary' : '--secondary'
      const color = getComputedStyle(document.documentElement)
        .getPropertyValue(colorKey)
        .trim()

      const radius = 18 + Math.random() * 28
      const x = radius + Math.random() * (window.innerWidth - radius * 2)

      const circle = Matter.Bodies.circle(x, -radius * 2, radius, {
        restitution: 0.5,
        friction: 0.15,
        frictionAir: 0.01,
        render: {
          fillStyle: color,
          strokeStyle: 'transparent',
          lineWidth: 0,
        },
      })
      circle._colorKey = colorKey

      Matter.Composite.add(engine.world, circle)
    },
  }))

  useEffect(() => {
    const canvas = canvasRef.current
    const { Engine, Render, Runner, Bodies, Composite, Body } = Matter

    const engine = Engine.create()
    engineRef.current = engine

    const render = Render.create({
      element: null,
      canvas,
      engine,
      options: {
        width: window.innerWidth,
        height: window.innerHeight,
        background: 'transparent',
        wireframes: false,
      },
    })

    const runner = Runner.create()

    // Attach mouse to document.body so events bubble from anywhere on the page.
    // The canvas is pointer-events:none and behind the content, so attaching to
    // the canvas directly would never fire. Coordinates match because the canvas
    // is fixed at top:0 left:0, identical to the viewport origin.
    const mouse = Matter.Mouse.create(document.body)
    // Prevent Matter from blocking page scroll
    mouse.element.removeEventListener('mousewheel', mouse.mousewheel)
    mouse.element.removeEventListener('DOMMouseScroll', mouse.mousewheel)
    // Disable touch interaction with matter elements on touch devices, so page scrolling still works
    mouse.element.removeEventListener('touchmove', mouse.mousemove)
    mouse.element.removeEventListener('touchstart', mouse.mousedown)
    mouse.element.removeEventListener('touchend', mouse.mouseup)

    const mouseConstraint = Matter.MouseConstraint.create(engine, {
      mouse,
      constraint: { stiffness: 0.2, render: { visible: false } },
    })
    Matter.Composite.add(engine.world, mouseConstraint)
    render.mouse = mouse

    Matter.Events.on(mouseConstraint, 'startdrag', () =>
      document.body.classList.add('matter-dragging')
    )
    Matter.Events.on(mouseConstraint, 'enddrag', () =>
      document.body.classList.remove('matter-dragging')
    )

    const thickness = 60
    const ground = Bodies.rectangle(
      window.innerWidth / 2,
      window.innerHeight + thickness / 2,
      window.innerWidth + 200,
      thickness,
      { isStatic: true, render: { fillStyle: 'transparent' } }
    )
    const leftWall = Bodies.rectangle(
      -thickness / 2,
      window.innerHeight / 2,
      thickness,
      window.innerHeight * 3,
      { isStatic: true, render: { fillStyle: 'transparent' } }
    )
    const rightWall = Bodies.rectangle(
      window.innerWidth + thickness / 2,
      window.innerHeight / 2,
      thickness,
      window.innerHeight * 3,
      { isStatic: true, render: { fillStyle: 'transparent' } }
    )

    Composite.add(engine.world, [ground, leftWall, rightWall])

    Render.run(render)
    Runner.run(runner, engine)

    // Clean up bodies that have settled far below the viewport
    const cleanupInterval = setInterval(() => {
      const bodies = Composite.allBodies(engine.world)
      bodies.forEach((body) => {
        if (!body.isStatic && body.position.y > window.innerHeight + 200) {
          Composite.remove(engine.world, body)
        }
      })
    }, 5000)

    function handleMouseMove(e) {
      const bodies = Composite.allBodies(engine.world)
      const hits = Matter.Query.point(bodies, { x: e.clientX, y: e.clientY })
      const overBall = hits.some((b) => !b.isStatic)
      document.body.style.cursor = overBall ? 'pointer' : ''
    }

    window.addEventListener('mousemove', handleMouseMove)

    function handleResize() {
      const w = window.innerWidth
      const h = window.innerHeight
      render.canvas.width = w
      render.canvas.height = h
      render.options.width = w
      render.options.height = h

      Body.setPosition(ground, { x: w / 2, y: h + thickness / 2 })
      Body.setPosition(rightWall, { x: w + thickness / 2, y: h / 2 })
    }

    window.addEventListener('resize', handleResize)

    const themeObserver = new MutationObserver(() => {
      const style = getComputedStyle(document.documentElement)
      Composite.allBodies(engine.world).forEach((body) => {
        if (!body.isStatic && body._colorKey) {
          body.render.fillStyle = style.getPropertyValue(body._colorKey).trim()
        }
      })
    })
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    })

    return () => {
      clearInterval(cleanupInterval)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
      themeObserver.disconnect()
      Render.stop(render)
      Runner.stop(runner)
      Engine.clear(engine)
      render.textures = {}
    }
  }, [])

  return <canvas ref={canvasRef} className="matter-canvas" />
})

export default MatterBackground
