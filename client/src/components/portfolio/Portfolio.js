import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { Fade } from 'react-awesome-reveal';
import './Portfolio.css';

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
        slidesToShow: 3, // Show 3 items at a time
        slidesToScroll: 1, // Scroll 1 item at a time
        arrows: false,
        autoplay: true,
        autoplaySpeed: 3000,
        adaptiveHeight: true,
        responsive: [
            {
                breakpoint: 1024, // Screen width of 1024px or less
                settings: {
                    slidesToShow: 2, // Show 2 items at a time
                    slidesToScroll: 1, // Scroll 1 item at a time
                },
            },
            {
                breakpoint: 600, // Screen width of 600px or less
                settings: {
                    slidesToShow: 1, // Show 1 item at a time
                    slidesToScroll: 1, // Scroll 1 item at a time
                },
            },
        ],
    };

    const fetchData = async () => {
        try {
            await new Promise((resolve) => setTimeout(resolve, 2000));
            const apiResponse = await fetch('https://silencecoderr-api.onrender.com/api');
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
                <div>Loading...</div>
            </div>
        );
    }

    if (error) {
        return <div>Error fetching data: {error.message}</div>;
    }

    return (
        <section name="portfolio" id="portfolio" className="bx-contact-section bx-section padding-tb-80 body-bg">
            <div className="portfolio-section" style={{ marginTop: `50px` }}>
            <Fade triggerOnce duration={2000} direction='up' delay={300} >
                            <div className="title">
                                <p className="light-txt">My Portfolio</p>
                                <h2>Recent <span className="primary-clr">Works</span></h2>
                            </div>
                        </Fade>
                    <div className="container">
                    <div className="row">
                        <Fade triggerOnce duration={2000} direction="up" delay={300}>
                            {appScreens && appScreens.length > 0 ? (
                                <Slider {...settings}>
                                    {appScreens.map((item, index) => (
                                        <div key={index} className="portfolio-item">
                                            <img src={item.image} alt={item.name} className="portfolio-image" />
                                            <p className="portfolio-name">{item.name}</p>
                                            <p className="portfolio-desc">{item.short_desc}</p>
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
