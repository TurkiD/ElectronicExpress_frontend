import React from "react"
import { Helmet } from "react-helmet"
const PageTitle = (props: { title: string }) => {
  return (
    <Helmet>
      <title>{props.title}</title>
    </Helmet>
  )
}

export default PageTitle
