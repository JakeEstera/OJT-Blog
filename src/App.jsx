import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Landing from './pages/Landing.jsx'
import Home from './pages/Home.jsx'
import Weekly from './pages/Weekly.jsx'
import WeeklyEntry from './pages/WeeklyEntry.jsx'
import Profile from './pages/Profile.jsx'
import NotFound from './pages/NotFound.jsx'

export default function App() {
  return (
    <Routes>
      {/* Landing: the lanyard ID card, then on to the blog. */}
      <Route index element={<Landing />} />
      <Route element={<Layout />}>
        <Route path="home" element={<Home />} />
        <Route path="weekly" element={<Weekly />} />
        <Route path="weekly/:week" element={<WeeklyEntry />} />
        <Route path="profile" element={<Profile />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
