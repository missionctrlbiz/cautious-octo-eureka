import React, { useEffect, useState } from 'react';
import { Fade } from 'react-awesome-reveal';

function Service() {
    const [services, setServices] = useState([]);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await fetch('https://silencecoderr-api.onrender.com/api');
                const data = await response.json();
                
                // Add sequence number to each service
                const numberedServices = data.record.services.map((service, index) => ({
                    ...service,
                    number: index + 1 // Starting from 1
                }));

                setServices(numberedServices); // Adjust based on your API response structure
            } catch (error) {
                console.error('Error fetching services:', error);
            }
        };

        fetchServices();
    }, []);

    return (
        <div>
            <section id="service" className="bx-service-section bx-section body-bg" style={{ marginTop: `80px`, marginBottom: `20px` }}>
                <div className="container">
                    <div className="row">

                        <Fade triggerOnce duration={2000} direction='up' delay={300} >
                            <div className="title">
                                <p className="light-txt">Top Mobile Development Services</p>
                                <h2>Crafting Innovative <span className="primary-clr">Mobile Solutions</span></h2>
                            </div>
                        </Fade>
                        {services.map((service, index) => (
                            <Fade triggerOnce duration={2000} direction='up' delay={300} key={index} className="col-lg-4 col-md-12">
                                <div className="section-card" style={{ marginBottom: '50px' }}>
                                    <div className="sr-no">
                                        <h6>{service.number}</h6>
                                    </div>
                                    <div className="card-description">
                                        <img src={service.image} alt={service.name} style={{ width: '40%', height: '40%' }} />
                                        <div className="detailed-txt">
                                            <h5>{service.name}</h5>

                                            <p>{service.short_desc}</p>
                                        </div>
                                    </div>
                                </div>
                            </Fade>
                        ))}
                        <Fade triggerOnce duration={2000} direction='up' delay={300}>
                            <div className="border-bottom padding-tb-20"></div>
                        </Fade>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Service;