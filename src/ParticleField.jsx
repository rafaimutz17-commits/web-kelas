import React, { useEffect, useRef } from 'react'

// Elegant Light Architectural Node & Grid Canvas
export default function ParticleField() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const NODE_COUNT = 45
    const nodes = Array.from({ length: NODE_COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 2 + 1.2,
      color: Math.random() > 0.4 ? '#9b3932' : '#b58b4c',
      alpha: Math.random() * 0.35 + 0.15,
    }))

    let mouseX = canvas.width / 2
    let mouseY = canvas.height / 2
    const onMouse = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }
    window.addEventListener('mousemove', onMouse)

    let animId
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      nodes.forEach((node) => {
        // Subtle magnetic attraction
        const dx = mouseX - node.x
        const dy = mouseY - node.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 180) {
          node.vx += (dx / dist) * 0.015
          node.vy += (dy / dist) * 0.015
        }

        node.vx *= 0.985
        node.vy *= 0.985
        node.x += node.vx
        node.y += node.vy

        // Screen wrap
        if (node.x < 0) node.x = canvas.width
        if (node.x > canvas.width) node.x = 0
        if (node.y < 0) node.y = canvas.height
        if (node.y > canvas.height) node.y = 0

        // Draw architectural node cross/dot
        ctx.beginPath()
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2)
        ctx.fillStyle = node.color
        ctx.globalAlpha = node.alpha
        ctx.fill()
      })

      // Draw subtle CAD coordinate lines between nearby nodes
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 140) {
            ctx.beginPath()
            ctx.moveTo(nodes[i].x, nodes[i].y)
            ctx.lineTo(nodes[j].x, nodes[j].y)
            ctx.strokeStyle = '#b58b4c'
            ctx.globalAlpha = (1 - dist / 140) * 0.15
            ctx.lineWidth = 0.75
            ctx.stroke()
          }
        }
      }

      ctx.globalAlpha = 1
      animId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouse)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.85 }}
    />
  )
}
