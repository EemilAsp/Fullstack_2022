import React from "react"

interface Header {
  header: string
}

const Header = (props: Header): JSX.Element => {
  return (
    <div>
      <h1>{props.header}</h1>
    </div>
  )
}

export default Header
