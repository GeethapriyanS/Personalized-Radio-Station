import "../../css/Radio.css"
import {Link} from "react-router-dom";
const Header = ()=>{
    return (
        <div>
            <h1>Personalized Radio Station</h1>
            <h2>Pick a genre, choose a station, start listening and Create a Custom Playlist</h2>
            <div className="stations-style">
            <Link to="/" className="link"><span className="stations-button">English</span></Link>
            <Link to="/tamil" className="link"><span className="stations-button">Tamil</span></Link></div>
        </div>
    )
}
export default Header;