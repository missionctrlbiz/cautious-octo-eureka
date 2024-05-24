import { useEffect, useRef, useState } from 'react';
import { Fade } from "react-awesome-reveal";
import BgSlider from '../backgroundslider/BgSlider';
import axios from 'axios';

function Hero() {
    const shape1Ref = useRef(null);
    const shape2Ref = useRef(null);
    const shape3Ref = useRef(null);
    const shape4Ref = useRef(null);
    const shape5Ref = useRef(null);
    const [isOpen, setIsOpen] = useState(false);
    const [heroData, setHeroData] = useState({
        name: '',
        sub: '',
        short_info: ''
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://silencecoderr-portfolio-api.vercel.app/api'); // Replace with your actual API endpoint
                setHeroData(response.data.record);
            } catch (error) {
                console.error('Error fetching data', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const parallaxMouse = () => {
            const elements = [
                { el: shape1Ref.current, rate: 0.2, invert: true, range: 400 },
                { el: shape2Ref.current, rate: 0.2, invert: true, range: 400 },
                { el: shape4Ref.current, rate: 0.2, invert: false, range: 400 },
                { el: shape5Ref.current, rate: 0.2, invert: false, range: 400 },
                { el: shape3Ref.current, rate: 0.12, invert: true, range: 400 }
            ];

            const handleMouseMove = (event) => {
                const mouseX = event.clientX;
                const mouseY = event.clientY;
                elements.forEach(({ el, rate, invert, range }) => {
                    const rect = el.getBoundingClientRect();
                    const centerX = rect.left + rect.width / 2;
                    const centerY = rect.top + rect.height / 2;
                    let xPos = (mouseX - centerX) * rate;
                    let yPos = (mouseY - centerY) * rate;
                    if (invert) {
                        xPos = Math.min(Math.max(xPos, -range), range);
                        yPos = Math.min(Math.max(yPos, -range), range);
                    }
                    el.style.transform = `translate3d(${xPos}px, ${yPos}px, 10px)`;
                });
            };

            window.addEventListener('mousemove', handleMouseMove);

            return () => {
                window.removeEventListener('mousemove', handleMouseMove);
            };
        };

        parallaxMouse();

        return () => {
            window.removeEventListener('scroll', parallaxMouse);
        };
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsOpen(!isOpen);
    }

    return (
        <div>
            <section id="home" className="bx-home home-section bx-section padding-tb-80 bg-shape-hero">
                <div style={{ float: "right" }}>
                    {isOpen ? null : <BgSlider />}
                </div>

                <img ref={shape1Ref} id="shape1" className="parallax" src="assets/img/bg/shape-1.png" alt="shape" />

                <img ref={shape2Ref} id="shape2" className="parallax" src="assets/img/bg/shape-2.png" alt="shape" />

                <img ref={shape3Ref} id="shape3" className="parallax" src="assets/img/bg/shape-3.png" alt="shape" />

                <img ref={shape4Ref} id="shape4" className="parallax" src="assets/img/bg/shape-4.png" alt="shape" />

                <img ref={shape5Ref} id="shape5" className="parallax" src="assets/img/bg/shape-5.png" alt="shape" />

                <div className="container p-0">
                    <div className="row">
                        <div style={{ margin: "auto" }} className="col-md-6">
                            <Fade triggerOnce duration={2000} direction='up' className="basic-details">
                                <div className="info">
                                    <span className="primary-color">Hello, My name is</span>
                                    <h1>{heroData.name}</h1>
                                    <h2>{heroData.sub}</h2>
                                    <p>{heroData.short_info}</p>
                                    <div className="buttons">
                                        <a onClick={handleSubmit} className="custom-btn bx-btn" href="/">Hire Me</a>
                                    </div>
                                </div>
                            </Fade>
                        </div>
                        <div className="col-md-6">
                            <div className="profile-img">
                                <div className="profile-detail">
                                    <img src="assets/img/bg/girl.png" alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Hero;
