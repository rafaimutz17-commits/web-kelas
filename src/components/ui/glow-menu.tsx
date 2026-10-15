import { motion, useReducedMotion } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'
import { Link } from 'react-router-dom'

export type GlowMenuItem = {
  icon: LucideIcon
  label: string
  to: string
}

type GlowMenuProps = {
  items: GlowMenuItem[]
  activePath: string
}

const faceTransition = {
  type: 'spring' as const,
  stiffness: 150,
  damping: 22,
}

export function GlowMenu({ items, activePath }: GlowMenuProps) {
  const reduceMotion = useReducedMotion()

  return (
    <nav
      aria-label="Navigasi utama"
      className="relative rounded-xl border border-[#b58b4c]/20 bg-gradient-to-b from-white/70 to-white/35 p-1 shadow-[0_5px_16px_rgba(77,48,25,0.08)] backdrop-blur-lg"
    >
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute -inset-1 rounded-2xl opacity-0"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(181,139,76,0.18), rgba(135,44,43,0.07) 52%, transparent 76%)',
        }}
        initial={false}
        whileHover={reduceMotion ? undefined : { opacity: 1 }}
        transition={{ duration: 0.45 }}
      />
      <ul className="relative z-10 flex items-center gap-0.5">
        {items.map(({ icon: Icon, label, to }) => {
          const isActive = activePath === to

          return (
            <li key={to}>
              <motion.div
                className="rounded-xl"
                initial="rest"
                whileHover={reduceMotion ? undefined : 'hover'}
                style={{ perspective: 600 }}
              >
                <Link
                  to={to}
                  aria-label={label}
                  title={label}
                  aria-current={isActive ? 'page' : undefined}
                  className={`relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-lg p-1.5 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#872c2b] ${
                  isActive
                    ? 'bg-[#872c2b]/10 text-[#872c2b]'
                    : 'text-slate-600 hover:text-[#872c2b]'
                  }`}
                >
                  <motion.span
                    aria-hidden="true"
                    className="flex items-center"
                    variants={{
                      rest: { rotateX: 0, opacity: 1 },
                      hover: { rotateX: -88, opacity: 0 },
                    }}
                    transition={faceTransition}
                    style={{ transformOrigin: 'center bottom', transformStyle: 'preserve-3d' }}
                  >
                    <Icon className="h-3 w-3 shrink-0" />
                  </motion.span>
                  <motion.span
                    aria-hidden="true"
                    className="absolute inset-0 flex items-center justify-center"
                    variants={{
                      rest: { rotateX: 88, opacity: 0 },
                      hover: { rotateX: 0, opacity: 1 },
                    }}
                    transition={faceTransition}
                    style={{ transformOrigin: 'center top', transformStyle: 'preserve-3d' }}
                  >
                    <Icon className="h-3 w-3 shrink-0" />
                  </motion.span>
                </Link>
              </motion.div>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
