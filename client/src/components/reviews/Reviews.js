import React, { useEffect, useState } from 'react';
import './Reviews.css';


function Reviews() {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);

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

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
        }, 3000); // Change slide every 3 seconds
        return () => clearInterval(interval);
    }, [reviews.length]);

    if (loading) {
        return <div>Loading...</div>; // or your custom spinner
    }

    return (
        <section id="reviews" className="bx-service-section bx-section padding-tb-80">
            <div className="container">
                <div className="shape-1"></div>
                <div className="shape-2"></div>
                
                <div className="row mb-m-30">
                    <div className="title">
                        <p className="light-txt">Discover What Others Say</p>
                        <h2>Exploring<span className="primary-clr"> Customer Reviews</span></h2>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="reviews-container">
                            <div className="review-wrapper" style={{ transform: `translateX(${-currentIndex * 100}%)`, transition: 'transform 0.5s ease-in-out', marginBottom: `0px` }}>
                                {reviews.map((review, index) => (
                                    <div
                                        key={index}
                                        className="review-item"
                                        style={{ marginBottom: `0px` }}
                                    >
                                        <div className="review-content" style={{ marginBottom: `0px` }}>

                                            <blockquote>

                                                <p className="review-text">{review.review}</p>
                                            </blockquote>
                                            {review.picture && <img src={review.picture} alt={review.name} className="review-picture" />}
                                            <p className="review-author">- {review.name}</p>
                                            
                                            {review.location && <p className="review-location">{review.location}</p>}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Reviews;