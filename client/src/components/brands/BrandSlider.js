import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import { Fade } from 'react-awesome-reveal';

import './BrandSlider.css';

function BrandSlider() {
    const [brands, setBrands] = useState([]);

    useEffect(() => {
        const fetchBrands = async () => {
            try {
                const response = await fetch('https://silencecoderr-api.onrender.com/api'); // Adjust URL accordingly
                const data = await response.json();
                setBrands(data.record.brands);
            } catch (error) {
                console.error('Error fetching brands:', error);
            }
        };

        fetchBrands();
    }, []);

    const settings = {
        dots: false,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 3000, // Adjust autoplay speed as needed
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                }
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3,
                }
            },
        ]
    };

    return (
        <div>
            <section id="service" className="bx-service-section bx-section primary-clr" style={{ marginTop: `80px`, marginBottom: `20px` }}>
                <div className="container">
                    <div className="row">
                        <Fade triggerOnce duration={2000} direction='up' delay={300} >
                            <div className="title">
                                <p className="light-txt">Discover Brands</p>
                                <h2>Crafting Innovative <span className="primary-clr">Solutions for Our Partners</span></h2>
                            </div>
                        </Fade>
                        <Slider {...settings}>
                            {brands.map((brand, index) => (
                                <div key={index} className="brand-slide">
                                    <a href={brand.redirect} target="_blank" rel="noopener noreferrer">
                                        <img src={brand.pic} alt={`brand-${index}`} />
                                    </a>
                                </div>
                            ))}
                        </Slider>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default BrandSlider;
