import { Link } from "react-router-dom";

const HomePage = () => {
    return(
        <div className="home container ">
            <p>Home Page</p>
            <Link to='/form'>Acheter un sweat</Link>
        </div>
    )
}

export default HomePage;