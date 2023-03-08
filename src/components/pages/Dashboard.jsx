import { Link } from "react-router-dom"

export const Dashboard = () => {

  return (
    <div>
      Dashboard
      <Link to={"/patients"}> pacientes </Link>
    </div>
  )
}