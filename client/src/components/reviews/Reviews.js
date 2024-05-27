import React, { useEffect, useState, useRef } from 'react';
import { Fade } from 'react-awesome-reveal';
import { useInView } from 'react-intersection-observer';

function Reviews() {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [visible, setVisible] = useState(false);
    const [index, setIndex] = useState(0);
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.5, // Change this value as needed
    });

    const reviewsContainerRef = useRef(null);

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
        if (inView) {
            setVisible(true);
            setIndex(index + 1);
        }
    }, [inView]);

    const handleScroll = (scrollOffset) => {
        reviewsContainerRef.current.scrollLeft += scrollOffset;
    };

    return (
        <section id="reviews" className="bx-service-section bx-section padding-tb-80">
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
                            <div className="reviews-container" ref={reviewsContainerRef}>
                                {reviews.map((review, i) => (
                                    <div key={i} className={`review-item ${visible ? 'visible' : ''}`}>
                                        <div className="review-content">
                                            <p className="review-text">{review.review}</p>
                                            <p className="review-author">- {review.name}</p>
                                        </div>
                                    </div>
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