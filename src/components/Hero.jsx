import { useContext, useEffect, useState } from "react";
import { Container, Col, Row } from "react-bootstrap";
import { UserContext } from "../contexts/UserContext";
import "../styles/Hero.css";

const Hero = () => {
    const [slideNum, setSlideNum] = useState(1);

    const { isLoggedIn, currentUser } = useContext(UserContext);

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

    const currentHour = new Date().getHours();
    let timeOfDay = "";
    if (currentHour >= 0 && currentHour < 12) {
        timeOfDay = "morning";
    } else if (currentHour >= 12 && currentHour < 6) {
        timeOfDay = "afternoon";
    } else if (currentHour >= 6 && currentHour < 9) {
        timeOfDay = "evening";
    } else {
        timeOfDay = "night";
    }

    return (
        <div id="hero">
            <div
                id="hero-img"
                className={`d-flex align-items-center hero-img-${slideNum}`}
            >
                <Container className="my-4">
                    <Row>
                        <Col lg={isLoggedIn ? "auto" : 6}>
                            <div id="hero-text">
                                {isLoggedIn ? (
                                    <h1 className="mb-0">Good {timeOfDay}, {currentUser.firstName}! 👋</h1>
                                ) : (
                                    <>
                                        <h2 id="hero-text-header">
                                            Welcome to The Pet Haven! 🐶😺
                                        </h2>
                                        <p>
                                            Whether you're ready to open your
                                            heart and home to a new furry
                                            companion for the long haul and
                                            adopt, or volunteer as a foster
                                            parent in the short-term, you've
                                            come to the right place. You can
                                            also browse the pets who have sought
                                            haven with us if it's not the right
                                            time to make a commitment as a human
                                            member of the Pet Haven family.
                                        </p>
                                        <p>
                                            We are an accredited pet adoption
                                            agency and pride ourselves on the
                                            highest ethical standards and humane
                                            treatment of the animals in our
                                            care. We also thoroughly vet all our
                                            adoptive and foster pet parents.
                                        </p>
                                    </>
                                )}
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    );
};

export default Hero;
