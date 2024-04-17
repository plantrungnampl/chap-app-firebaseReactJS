import { Navigate, Outlet } from 'react-router-dom'

export const AuthLayout = () => {
  const isAuthenticated = false
  return (
    <div>
      {isAuthenticated ? (
        <Navigate to="/"/>
      ) : (
        <section>
          <Outlet />
        </section>
      )}
    </div>
  )
}
