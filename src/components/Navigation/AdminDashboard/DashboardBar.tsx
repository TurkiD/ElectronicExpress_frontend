import "./DashboardBar.css"
import "bootstrap/js/dist/dropdown"

const DashboardBar = () => {
  return (
    <div className="container-fluid col-md-12 sticky-top">
      <div className="row">
        <div className="bg-dark col-auto col-md-12 col-lg-8 min-vh-100 d-flex justify-content-between flex-column">
          <div>
            <a
              href=""
              className="text-decoration-none text-white d-none d-sm-inline d-flex align-item-center ms-3 mt-3"
            >
              <span className="ms-3 fs-5 d-none d-sm-inline">Brand</span>
            </a>
            <hr className="text-secondary d-none d-sm-block" />
            <ul className="nav nav-pills flex-column mt-3 mt-sm-0">
              <li className="nav-item text-white fs-4 my-1 py-sm-0">
                <a
                  href="/admin/dashboard"
                  className="nav-link text-decoration-none text-white"
                  aria-current="page"
                >
                  <i className="fa-solid fa-gauge fa-xs"></i>
                  <span className="ms-3 fs-5 d-none d-sm-inline">Dashboard</span>
                </a>
              </li>
              <li className="nav-item text-white fs-4 my-1 py-sm-0">
                <a
                  href="/admin/dashboard/users"
                  className="nav-link text-decoration-none text-white"
                  aria-current="page"
                >
                  <i className="fa-solid fa-users fa-xs"></i>
                  <span className="ms-3 fs-5 d-none d-sm-inline">Users</span>
                </a>
              </li>
              <li className="nav-item text-white fs-4 my-1  py-sm-0">
                <a
                  href="/admin/dashboard/orders"
                  className="nav-link text-decoration-none text-white"
                  aria-current="page"
                >
                  <i className="fa-solid fa-table fa-xs"></i>
                  <span className="ms-3 fs-5 d-none d-sm-inline">Orders</span>
                </a>
              </li>
              <li className="nav-item text-white fs-4 my-1  py-sm-0">
                <a
                  href="/admin/dashboard/categories"
                  className="nav-link text-decoration-none text-white"
                  aria-current="page"
                >
                  <i className="fa-solid fa-grip fa-xs"></i>
                  <span className="ms-3 fs-5 d-none d-sm-inline">Category</span>
                </a>
              </li>
              <li className="nav-item text-white fs-4 my-1 py-sm-0">
                <a
                  href="/admin/dashboard/products"
                  className="nav-link text-decoration-none text-white"
                  aria-current="page"
                >
                  <i className="fa-solid fa-grip fa-xs"></i>
                  <span className="ms-3 fs-5 d-none d-sm-inline">Products</span>
                </a>
              </li>
            </ul>
          </div>
          <div className="dropdown open">
            <a
              href=""
              className="text-decoration-none text-white dropdown-toggle p-3"
              type="button"
              id="triggerId"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="fa-regular fa-user"></i>
              <span className="ms-2 d-none d-sm-inline">Turki</span>
            </a>
            <div className="dropdown-menu" aria-labelledby="triggerId">
              <a href="" className="dropdown-item">
                Action
              </a>
              <a href="" className="dropdown-item">
                Disabled action
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardBar
