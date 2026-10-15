import { BrowserRouter as Router, useLocation, useRoutes } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useLayoutEffect } from 'react'
import { Landmark, Sparkles } from 'lucide-react'
import './index.css'
import { SiteContentProvider } from './lib/siteContent'
import Home from './pages/Home'
import Members from './pages/Members'
import Courses from './pages/Courses'
import CourseDetail from './pages/CourseDetail'
import About from './pages/About'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'
import Login from './pages/Login'
import Admin from './pages/Admin'

function RomanEdgeOrnaments() {
  const { scrollY } = useScroll()
  const leftY = useTransform(scrollY, [0, 1600], [0, -135])
  const rightY = useTransform(scrollY, [0, 1600], [0, 190])

  return (
    <div className="roman-edge-ornaments" aria-hidden="true">
      <motion.div className="roman-edge-medallion roman-edge-left" style={{ y: leftY }}>
        <Landmark />
      </motion.div>
      <motion.div className="roman-edge-medallion roman-edge-right" style={{ y: rightY }}>
        <svg viewBox="0 0 48 48" fill="none">
          <path d="M24 6c-8 4-11 12-8 19 2 5 6 9 11 12M24 6c8 4 11 12 8 19-2 5-6 9-11 12" stroke="currentColor" strokeWidth="1.7" />
          <path d="M14 14c4 0 7 2 8 6m-8 1c4 0 8 2 10 6m6-13c-4 0-7 2-8 6m8 1c-4 0-8 2-10 6M12 12l3 1m-3 5 3 1m-1 5 4 1m20-12-3 1m3 5-3 1m1 5-4 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </motion.div>
      <motion.div className="roman-edge-spark roman-edge-left-bottom" style={{ y: rightY }}>
        <Sparkles />
      </motion.div>
    </div>
  )
}

// Page transition wrapper
function PageTransition({ children }) {
  return <div className="page-transition">{children}</div>
}

function AnimatedRoutes() {
  const location = useLocation()
  const route = useRoutes([
    { path: '/', element: <Home /> },
    { path: '/members', element: <Members /> },
    { path: '/courses', element: <Courses /> },
    { path: '/course/:id', element: <CourseDetail /> },
    { path: '/about', element: <About /> },
    { path: '/contact', element: <Contact /> },
    { path: '/login', element: <Login /> },
    { path: '/admin', element: <Admin /> },
    { path: '*', element: <NotFound /> },
  ])

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [location.pathname])

  return (
    <PageTransition key={location.pathname}>{route}</PageTransition>
  )
}

function App() {
  return (
    <div className="roman-site min-h-screen cad-grid-bg text-slate-800">
      <Router>
        <SiteContentProvider>
          <AnimatedRoutes />
        </SiteContentProvider>
      </Router>
      <RomanEdgeOrnaments />
    </div>
  )
}

export default App
