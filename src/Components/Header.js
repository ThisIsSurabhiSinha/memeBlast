import React from "react"
import brandLogo  from  "../images/brand-logo2.png"
export default function()
{
    return(
        <>
   <nav className="navbar navbar-expand-lg my-nav-bar">
  <div className="container-fluid ">

  <a className="navbar-brand text-light fw-bold" href="#">
    <img
      src={brandLogo}
      alt="Logo"
      width={50}
      height={40}
      className="d-inline-block align-text-center"
    />
    MemeBlast
  </a>

   <div className="text-end text-light">
    Meme generator
   </div>
  </div>
</nav>

          
</>   

    )
}