import PageTitle from "@/components/PageTitle"
import "./Home.css"
import Navigationbar from "@/components/Navigation/Navigationbar"

export const HomePage = () => {
  return (
    <>
      <Navigationbar />
      <PageTitle title="Home" />
      <section className="jumbotron pt-5">
        <div className="container text-center">
          <h1 className="display-4">Redefine Your Digital Lifestyle</h1>
          <p className="lead text-muted fs-3">
          Elevate your living with 
          the best electronic products at ElectroExpress.
          </p>
          {/* <a className="btn btn-primary my-2" href="#">
            Sign up for free
          </a>
          <a className="btn btn-link my-2" href="#">
            Read more
          </a> */}
        </div>
      </section>
      <div
        id="carouselExampleInterval"
        className="carousel slide w-80 container text-center pt-5"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          <div className="carousel-item active" data-bs-interval="10000">
            <img
              src="https://images.unsplash.com/photo-1515940175183-6798529cb860?q=80&w=1929&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              className="d-block w-100 img-header"
              alt=""
            />
          </div>
          <div className="carousel-item" data-bs-interval="2000">
            <img
              src="https://images.unsplash.com/photo-1515940175183-6798529cb860?q=80&w=1929&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              className="d-block w-100 img-header"
              alt=""
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://images.unsplash.com/photo-1515940175183-6798529cb860?q=80&w=1929&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              className="d-block img-header"
              alt=""
            />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleInterval"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleInterval"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </>
  )
}
