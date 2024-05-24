import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { Fade } from 'react-awesome-reveal';

const Portfolio = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [appScreens, setAppScreens] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 3000,
        adaptiveHeight: true,
    };

    const renderPlaceholders = () => {
        const placeholders = [];
        for (let i = 0; i < 8; i++) {
            placeholders.push(
                <div key={i} className="placeholder-screen">
                    <img
                        src="https://place-hold.it/375x812/#fefef/#000.png&bold&fontsize=14"
                        alt={`Placeholder ${i + 1}`}
                    />
                </div>
            );
        }
        return placeholders;
    };

    const fetchData = async () => {
        try {
            await new Promise((resolve) => setTimeout(resolve, 2000));
            const apiResponse = await fetch('https://silencecoderr-portfolio-api.vercel.app/api/portfolio');
            const responseData = await apiResponse.json();
            setAppScreens(responseData.recent_works);

            setIsLoading(false);
        } catch (error) {
            setError(error);
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return (
            <div className="portfolio-section">
                <h2>Recent Works</h2>
                <div className="placeholder-container">{renderPlaceholders()}</div>
            </div>
        );
    }

    if (error) {
        return <div>Error fetching data: {error.message}</div>;
    }

    return (
        <section name="portfolio" id="portfolio" className="bx-contact-section bx-section padding-tb-80 body-bg">
            <div className="portfolio-section">
                <Fade triggerOnce duration={2000} direction="up" delay={300} className="title">
                    <p className="light-txt">My Portfolio</p>
                    <h2>Our Recent <span className="primary-clr"> Works</span></h2>
                </Fade>
                <div className="container">
                    <div className="row">
                        <Fade triggerOnce duration={2000} direction="up" delay={300}>
                            {appScreens && appScreens.length > 0 ? (
                                <Slider {...settings}>
                                    {appScreens.map((item, index) => (
                                        <div key={index}>
                                            <img src={item.image} alt={item.name} />
                                            <p>{item.short_desc}</p>
                                        </div>
                                    ))}
                                </Slider>
                            ) : (
                                <div>No recent works available</div>
                            )}
                        </Fade>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Portfolio;