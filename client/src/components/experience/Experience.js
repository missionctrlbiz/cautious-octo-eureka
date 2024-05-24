import React, { useEffect, useState } from 'react';
import { Fade } from 'react-awesome-reveal';

function Experience() {
    const [education, setEducation] = useState([]);
    const [experience, setExperience] = useState([]);

    useEffect(() => {
        // Replace with your actual API endpoints
        const fetchEducation = async () => {
            try {
                const response = await fetch('/api');
                const data = await response.json();
                setEducation(data.record.education); // Adjust based on your API response structure
            } catch (error) {
                console.error('Error fetching education data:', error);
            }
        };

        const fetchExperience = async () => {
            try {
                const response = await fetch('/api');
                const data = await response.json();
                setExperience(data.record.experience); // Adjust based on your API response structure
            } catch (error) {
                console.error('Error fetching experience data:', error);
            }
        };

        fetchEducation();
        fetchExperience();
    }, []);

    return (
        <div>
            <section id="experience" className="bx-experience-section bx-section padding-tb-80">
                <div className="container">
                    <div className="shape-1"></div>
                    <div className="shape-2"></div>
                    <div className="row mb-m-30">
                        <Fade triggerOnce duration={2000} direction='up' delay={300} className="title" >
                            <p className="light-txt">Unlocking Knowledge</p>
                            <h2>Exploring<span className="primary-clr"> Academic Adventures</span></h2>
                        </Fade>



                        <div className="col-lg-6 col-md-12 col-sm-12">
                            <Fade triggerOnce duration={2000} direction='up' delay={400} className="education bx-box">
                                <h4>Education</h4>
                                <ul className="timeline">
                                    {education.map((data, index) => (
                                        <Fade triggerOnce duration={2000} direction='up' delay={400} key={index} className="timeline-item">
                                            <div className="timeline-marker"></div>
                                            <div className="timeline-content">
                                                <div className="timeline-info">
                                                    <span>{data.year}</span>
                                                </div>
                                                <h5 className="timeline-title">{data.school}</h5>
                                                <p className="sub">{data.short_desc}</p>
                                            </div>
                                        </Fade>
                                    ))}
                                </ul>
                            </Fade>
                        </div>
                        <div className="col-lg-6 col-md-12 col-sm-12">
                            <Fade triggerOnce duration={2000} direction='up' delay={300} className="experience bx-box">
                                <h4>Experience</h4>
                                <ul className="timeline">
                                    {experience.map((data, index) => (
                                        <Fade triggerOnce duration={2000} direction='up' delay={400} key={index} className="timeline-item">
                                            <div className="timeline-marker"></div>
                                            <div className="timeline-content">
                                                <div className="timeline-info">
                                                    <span>{data.year}</span>
                                                </div>
                                                <h5 className="timeline-title">{data.company}</h5>
                                                <p className="sub">{data.short_desc}</p>
                                            </div>
                                        </Fade>
                                    ))}
                                </ul>
                            </Fade>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Experience;