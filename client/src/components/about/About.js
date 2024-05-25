import { useEffect, useState } from 'react';
import axios from 'axios';
import { Fade } from 'react-awesome-reveal';
import { Link } from 'react-router-dom';


function About() {
    const [data, setData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://silencecoderr-api.onrender.com/api'); // Update the URL to your Express server
                setData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <section id="about" className={`bx-about-section bx-section padding-b-80 ${"#about" ? "padding-top" : ""}`}>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 col-lg-6">
                            <Fade triggerOnce duration={2000} direction='up' delay={300} className="sec-img">
                                <img src="assets/img/about/img-1.jpg" alt="" />
                            </Fade>
                        </div>
                        <Fade triggerOnce duration={2000} direction='up' delay={300} className="col-md-12 col-lg-6">
                            <div className="detailed-content">
                                <div className="title">
                                    <p className="light-txt">About me</p>
                                    <h2>{data.record?.sub}</h2>
                                    <p>{data.record?.short_info}</p>
                                </div>
                                <div className="personal-detail">
                                    <div className="content">
                                        <div className="left">
                                            <div className="name pb">
                                                <span className="info">Full Name:</span>
                                                <span className="detail"> {data.record?.name}</span>
                                            </div>
                                            <div className="address pb">
                                                <div className="address">
                                                    <span className="info">Address:</span><br />
                                                    <span className="detail"> {data.record?.contact?.address}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="right">
                                            <div className="ph pb">
                                                <span className="info">Phone No:</span>
                                                <span className="detail"><Link to={`tel:${data.record?.contact?.phone}`}>{data.record?.contact?.phone}</Link>
                                                </span>
                                            </div>

                                            <div className="email pb">
                                                <span className="info">Email:</span>
                                                <span className="detail"><Link to={`mailto:${data.record?.contact?.email}`}>{data.record?.contact?.email}</Link></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Fade>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default About;