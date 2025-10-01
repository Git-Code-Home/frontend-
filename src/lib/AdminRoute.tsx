"use client"

import { Navigate } from "react-router-dom"

interface AdminRouteProps {
  children: React.ReactNode
}

const AdminRoute = ({ children }: AdminRouteProps) => {
  const token = localStorage.getItem("adminToken")

  if (!token) {
    return <Navigate to="/admin/login" replace />
  }

  return <>{children}</>
}

export default AdminRoute
