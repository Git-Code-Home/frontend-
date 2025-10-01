"use client"

import { Navigate } from "react-router-dom"

interface EmployeeRouteProps {
  children: React.ReactNode
}

const EmployeeRoute = ({ children }: EmployeeRouteProps) => {
  const token = localStorage.getItem("employeeToken")

  if (!token) {
    return <Navigate to="/employee/login" replace />
  }

  return <>{children}</>
}

export default EmployeeRoute
