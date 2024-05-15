// import PageTitle from "@/components/PageTitle"
import React from "react"

export const Home = () => {
  return (
    <section className="jumbotron">
      <div className="container text-center">
        <h1 className="display-4">The New Internet</h1>
        <p className="lead text-muted">
          Decentralized, secure, private. The PiperNet is on its way to revolutionize every
          smartphone, PC, and smart-fridge near you.
        </p>
        <a className="btn btn-primary my-2" href="#">
          Sign up for free
        </a>
        <a className="btn btn-link my-2" href="#">
          Read more
        </a>
      </div>
    </section>
  )
}
