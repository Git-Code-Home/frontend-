"use client"

import { Navigate } from "react-router-dom"

interface EmployeeRouteProps {
  children: React.ReactNode
}

const AgentRoute = ({ children }: EmployeeRouteProps) => {
  const token = localStorage.getItem("agentToken")

  if (!token) {
    return <Navigate to="/agent/login" replace />
  }

  return <>{children}</>
}

export default AgentRoute;
