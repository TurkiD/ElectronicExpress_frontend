
import "bootstrap/dist/css/bootstrap.min.css"

function NavigationBar() {
  return (
<section className="position-relative">
  <nav className="navbar navbar-expand-xl navbar-light bg-light-light py-4">
    <div className="container">
      <a className="navbar-brand navbar-nav mx-auto position-absolute top-50 start-50 translate-middle" href="#">
        <img className="img-fluid" src="" alt="" />
      </a>
      <button className="d-xl-none navbar-burger btn px-0 rounded-pill" style={{"border": "none"}} type="button" data-bs-toggle="collapse" data-bs-target="#nav01" aria-controls="nav01" aria-expanded="false">
        <svg width="44" height="16" viewBox="0 0 44 16" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="44" height="2" rx="1" fill="black"></rect><rect y="14" width="44" height="2" rx="1" fill="black"></rect></svg>
      </button>
      <div className="collapse navbar-collapse" id="nav05">
        <ul className="navbar-nav me-auto">
          <li className="nav-item me-4"><a className="nav-link" href="/">Home</a></li>
          <li className="nav-item"><a className="nav-link" href="/products">Products</a></li>
        </ul>
        <ul className="navbar-nav me-4">
          <li className="nav-item me-4"><a className="nav-link" href="/Dashboard">Dashboard</a></li>
          <li className="nav-item"><a className="nav-link" href="/login">Sign in</a></li>
        </ul>
        <div>
          <a className="btn btn-outline-dark d-flex align-items-center rounded-pill" href="/register">
            <span className="me-3">Sign up</span>
            <svg className="rotate-45" width="10" height="11" viewBox="0 0 10 11" fill="none" xmlns="">
              <path d="M9 1.5L1 9.5" stroke="currentColor" strokeWidth="1.3" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path>
              <path d="M9 8.83571V1.5H1.66429" stroke="currentColor" strokeWidth="1.3" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path>
            </svg>
          </a>
        </div>
      </div>
    </div>
  </nav>
</section>
  )
}
export default NavigationBar
