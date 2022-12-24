import { useEffect, useState } from "react";
import { Container, Col, Row } from "react-bootstrap";
import "../styles/Hero.css";

const Hero = () => {
    const [slideNum, setSlideNum] = useState(1);

    useEffect(() => {
        const advanceSlide = () => {
            clearInterval(slideInterval);
            if (slideNum === 6) {
                setSlideNum(1);
            } else {
                setSlideNum(slideNum + 1);
            }
        };
        const slideInterval = setInterval(advanceSlide, 10000);
    }, [slideNum]);

    return (
        <div id="hero">
            <div
                id="hero-img"
                className={`d-flex align-items-center hero-img-${slideNum}`}
            >
                <Container className="my-4">
                    <Row>
                        <Col lg={6}>
                            <div id="hero-text">
                                <h2 id="hero-text-header">Welcome to The Pet Haven! 🐶😺</h2>
                                <p>
                                    Whether you're ready to open your heart and
                                    home to a new furry companion for the long
                                    haul and adopt, or volunteer as a foster
                                    parent in the short-term, you've come to the
                                    right place. You can also browse the pets
                                    who have sought haven with us if it's not
                                    the right time to make a commitment as a
                                    human member of the Pet Haven family.
                                </p>
                                <p>
                                    We are an accredited pet adoption agency and
                                    pride ourselves on the highest ethical
                                    standards and humane treatment of the
                                    animals in our care. We also thoroughly vet
                                    all our adoptive and foster pet parents.
                                </p>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    );
};

export default Hero;
