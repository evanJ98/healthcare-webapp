import React from "react";
import Button from 'react-bootstrap/Button';
import { NavLink } from "react-router-dom";

const Home = () => {
    return (
        <div>
            <Button className="home" size="lg" href="/login" variant="primary" type="submit">
                Log In as Patient
            </Button>

            <Button className="home" size="lg" variant="primary" type="submit">
                Log In as Doctor
            </Button>
            <br></br>
            <NavLink className="notice" to="/signup">New Here? Sign Up</NavLink>

        </div>
    )
}

export default Home;