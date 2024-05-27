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
                console.log('Received data:', data); // Log the received data
                setReviews(data.record.data.reviews);
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
        <section id="reviews" className="bx-service-section bx-section padding-tb-80 ">
            <div className="container">
                <div className="shape-1"></div>
                <div className="shape-2"></div>
                <div className="row mb-m-30">
                    <Fade triggerOnce duration={2000} direction='up' delay={300} className="title" >
                        <p className="light-txt">Discover What Others Say</p>
                        <h2>Exploring<span className="primary-clr"> Customer Reviews</span></h2>
                    </Fade>
                </div>
                <div className="row">
                    <div className="col-lg-6 col-md-12 col-sm-12">
                        <Fade triggerOnce duration={2000} direction='up' delay={400} className="reviews bx-box">
                            <div className="reviews-container">
                                {reviews.map((review, index) => (
                                    <Fade triggerOnce duration={2000} direction='up' delay={400} key={index} className="review-item">
                                        <div className="review-content">
                                            <p className="review-text">{review.review}</p>
                                            <p className="review-author">- {review.name}</p>
                                        </div>
                                    </Fade>
                                ))}
                            </div>
                        </Fade>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Reviews;