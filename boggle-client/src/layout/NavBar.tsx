import React from "react";
import {NavLink} from "react-router-dom";

function NavBar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <a className="navbar-brand" href="#">
                <span id="app-nav-title">BOGGLE</span>
            </a>
            <div className="collapse navbar-collapse" id="navbarText">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <NavLink exact className="nav-link" to="/" activeClassName="active">
                            Home
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/about" activeClassName="active">
                            About
                        </NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default NavBar;
