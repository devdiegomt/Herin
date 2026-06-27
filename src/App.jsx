import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './auth/AuthContext'
import RequireAuth from './auth/RequireAuth'
import Home from './pages/Home'
import ProductDetail from './pages/ProductDetail'
import Login from './pages/admin/Login'
import Dashboard from './pages/admin/Dashboard'
import ProductEditor from './pages/admin/ProductEditor'

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="font-body antialiased">
          <Routes>
            {/* Público */}
            <Route path="/" element={<Home />} />
            <Route path="/producto/:slug" element={<ProductDetail />} />

            {/* Admin */}
            <Route path="/admin/login" element={<Login />} />
            <Route path="/admin" element={<RequireAuth><Dashboard /></RequireAuth>} />
            <Route path="/admin/producto/:id" element={<RequireAuth><ProductEditor /></RequireAuth>} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  )
}
