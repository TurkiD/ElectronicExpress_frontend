import DashboardBar from "@/components/Navigation/AdminDashboard/DashboardBar"
import React from "react"

const AdminProducts = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-2 mx-0 px-0">
          <DashboardBar />
        </div>
        <div className="col-10 mx-0 px-0">
          <h1>Products</h1>
          <section className="card">
            <div className="card-details">
              <h3 className="card-title">Name</h3>
              <section className="card-review">
                <p>review here</p>
                <span className="total-review">total review here</span>
              </section>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default AdminProducts
