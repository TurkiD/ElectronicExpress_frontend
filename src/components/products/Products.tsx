import { useEffect } from "react"
import Sidebar from "../layout/sidebars/Sidebar"

import { FaBagShopping } from "react-icons/fa6"
import { title } from "process"

const Products = () => {
  const products = [
    {
      id: 1,
      title: "Iphone 11",
      img: "https://m.media-amazon.com/images/I/81KoSSAwH2L._SL1500_.jpg"
    },
    {
      id: 2,
      title: "Iphone 12",
      img: "https://m.media-amazon.com/images/I/81KoSSAwH2L._SL1500_.jpg"
    },
    {
      id: 3,
      title: "Iphone 13",
      img: "https://m.media-amazon.com/images/I/81KoSSAwH2L._SL1500_.jpg"
    },
    {
      id: 4,
      title: "Iphone 11",
      img: "https://m.media-amazon.com/images/I/81KoSSAwH2L._SL1500_.jpg"
    },
    {
      id: 5,
      title: "Iphone 12",
      img: "https://m.media-amazon.com/images/I/81KoSSAwH2L._SL1500_.jpg"
    },
    {
      id: 6,
      title: "Iphone 13",
      img: "https://m.media-amazon.com/images/I/81KoSSAwH2L._SL1500_.jpg"
    }
  ]

  useEffect(() => {
    console.log("fetch data")
  }, [])

  return (
    <>
      <Sidebar />
      <section className="card-container">
        {products &&
          products.length > 0 &&
          products.map((product) => (
            <section key={product.id} className="card">
              <img className="card-img" src={product.img} alt="lap-top" />
              <div className="card-details">
                <h3 className="card-title">{product.title}</h3>
                <section className="card-review">
                  <p>review here</p>
                  <span className="total-review">total review here</span>
                </section>
                <section className="card-price">
                  <div className="price">
                    <del>$300 price here</del> $200 new price
                  </div>
                  <div className="bag">
                    <FaBagShopping className="bag-icon" />
                  </div>
                </section>
              </div>
            </section>
          ))}
      </section>
    </>
  )
}

export default Products
