import PageTitle from "@/components/PageTitle"
import DashboardBar from "@/components/Navigation/AdminDashboard/DashboardBar"

export const DashboardPage = () => {
  return (
    <div className="container-fluid">
      <PageTitle title="Dashboard" />
      <div className="row">
        <div className="col-2 mx-0 px-0">
          <DashboardBar />
        </div>
        <div className="col-10 mx-0 px-0">
          <h1>Dashboard</h1>
        </div>
      </div>
    </div>
  )
}
