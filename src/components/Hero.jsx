import { useEffect, useState } from "react"

const Hero = () => {

    const [slideNum, setSlideNum] = useState(1);

    useEffect(() => {
        const advanceSlide = () => {
            clearInterval(slideInterval);
            if (slideNum === 6) {
                setSlideNum(1)
            } else { 
                setSlideNum(slideNum + 1);
            }
        }
        const slideInterval = setInterval(advanceSlide, 10000);
    }, [slideNum]);

    return <div id="hero" className={`hero-img-${slideNum}`}></div>
}

export default Hero;