import { Fade } from 'react-awesome-reveal';
import React, { useEffect, useState } from 'react';

function Service() {
    const [services, setServices] = useState([]);

    useEffect(() => {
        // Replace with your actual API endpoint
        const fetchServices = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/portfolio');
                const data = await response.json();
                setServices(data.record.services); // Adjust based on your API response structure
            } catch (error) {
                console.error('Error fetching services:', error);
            }
        };

        fetchServices();
    }, []);

    return (
        <div>
            <section id="service" className="bx-service-section bx-section padding-tb-80 body-bg">
                <div className="container">
                    <div className="row">
                        <Fade triggerOnce duration={2000} direction='up' delay={300} >
                            <div className="title">
                                <p className="light-txt">Top Mobile Development Services</p>
                                <h2>Crafting Innovative <span className="primary-clr">Mobile Solutions</span></h2>
                            </div>
                        </Fade>
                        {
                            services.map((service, index) => (
                                <Fade triggerOnce duration={2000} direction='up' delay={300} key={index} className="col-lg-4 col-md-12">
                                    <div className="section-card" style={{ marginBottom: '50px' }}>
                                        <div className="card-description">
                                            <img src={service.image} alt={service.name} />
                                            <div className="detailed-txt">
                                                <h5>{service.name}</h5>
                                                <p>{service.short_desc}</p>
                                            </div>
                                        </div>
                                    </div>
                                </Fade>
                            ))
                        }
                        <Fade triggerOnce duration={2000} direction='up' delay={300}>
                            <div className="border-bottom padding-tb-80"></div>
                        </Fade>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Service;