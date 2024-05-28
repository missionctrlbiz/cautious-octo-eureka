import React, { useEffect, useState } from 'react';
import { Fade } from 'react-awesome-reveal';

function Reviews() {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await fetch('https://silencecoderr-api.onrender.com/api');
                const data = await response.json();
                setReviews(data.record.reviews);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching reviews:', error);
                setLoading(false);
            }
        };       

        fetchReviews();
    }, []);

    if (loading) {
        return <div>Loading...</div>; // or your custom spinner
    }

    return (
        <section id="reviews" className="bx-service-section bx-section padding-tb-80">
            <div className="container">
                <div className="shape-1"></div>
                <div className="shape-2"></div>
                <div className="row mb-m-30">
                    <Fade triggerOnce duration={2000} direction='up' delay={300} className="title">
                        <p className="light-txt">Discover What Others Say</p>
                        <h2>Exploring<span className="primary-clr"> Customer Reviews</span></h2>
                    </Fade>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="reviews-container" style={{ overflowX: 'auto', whiteSpace: 'nowrap' }}>
                            <Fade triggerOnce duration={2000} direction='up' delay={400} className="reviews bx-box">
                                <ul className="timeline">
                                    {reviews.map((review, index) => (
                                        <Fade key={index} triggerOnce duration={2000} direction='up' delay={400} className="timeline-item">
                                            <li>
                                                <div className="timeline-marker"></div>
                                                <div className="timeline-content">
                                                    <div className="timeline-info">
                                                        <span>- {review.name}</span>
                                                    </div>
                                                    <p className="sub">{review.review}</p>
                                                </div>
                                            </li>
                                        </Fade>
                                    ))}
                                </ul>
                            </Fade>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Reviews;