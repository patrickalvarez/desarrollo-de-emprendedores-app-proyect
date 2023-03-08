import { Outlet } from "react-router-dom"

export const Layout = () => {
  return (
    <div className="app">
      <div className="sidebar"></div>
      <div className="page">
        <div className="head">
          <div className="photo"></div>
        </div>
        <div className="content">
          <Outlet />
        </div>
      </div>
    </div>
  )
}