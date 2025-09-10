import { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'

const RequireAdmin = ({ children }: { children: ReactNode }) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('adminToken') : null
  const location = useLocation()
  if (!token) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />
  }
  return <>{children}</>
}

export default RequireAdmin

