// import { useQuery } from "@tanstack/react-query"

// import { Button } from "./components/ui/button"
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle
// } from "./components/ui/card"
// import { Product } from "./types"
import { useEffect } from "react"
import api from "./api"

import "./App.css"

function App() {
  const getProducts = async () => {
    try {
      console.log("I am running");
      const res = await api.get("/products")
      // return res.data
      console.log(res.data.data.items);
      
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }

  useEffect(() => {
    getProducts()
  
  }, [])
  

  // // Queries
  // const { data, error } = useQuery<Product[]>({
  //   queryKey: ["products"],
  //   queryFn: getProducts
  // })

  return (
    <div className="App">
      <h1>Welcome to the e-commerce app</h1>
      {/* <h1 className="text-2xl uppercase mb-10">Products</h1>

      <section className="flex flex-col md:flex-row gap-4 justify-between max-w-6xl mx-auto">
        {data?.map((product) => (
          <Card key={product.id} className="w-[350px]">
            <CardHeader>
              <CardTitle>{product.name}</CardTitle>
              <CardDescription>Some Description here</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Card Content Here</p>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Add to cart</Button>
            </CardFooter>
          </Card>
        ))}
      </section>
      {error && <p className="text-red-500">{error.message}</p>} */}
    </div>
  )
}

export default App
