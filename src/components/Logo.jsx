import Paw from "../icons/paw.svg";
import HomeWithHeart from "../icons/home-with-heart.svg";

const Logo = () => {
    return (
        <div id="logo">
            <img src={Paw} className="logo-icon" alt="Pet Haven logo" />
            <img src={HomeWithHeart} className="logo-icon" alt="Pet Haven logo" />
            <span id="logo-text">
                The Pet Haven
            </span>
        </div>
    );
};

export default Logo;