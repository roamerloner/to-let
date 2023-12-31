import React from 'react'
import { Link } from 'react-router-dom'
import "../../styles/Header.css";

const Header = () => {
  return (
    <>
<nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container">
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
      <Link className="navbar-brand" to="/">
         To-Let
        </Link>
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/">Explore</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/offers">Offers</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link " to="/profile">Profile</Link>
        </li>
      </ul>
      <div className="dropdown">
        <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
          SignIn/SignUp
        </button>
        <ul className="dropdown-menu">
          <li><Link className="dropdown-item" to="/signin" >SignIn</Link></li>
          <li><Link className="dropdown-item" to="/signup" >SignUp</Link></li>
        </ul>
      </div>
    </div>
  </div>
</nav>

    </>
  )
}

export default Header