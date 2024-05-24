import { Fade } from 'react-awesome-reveal';
import { news } from '../../utility/news';
import NewsItem from './NewsItem';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function News() {

    const settings = {
        dots: false,
        infinite: true,
        arrows: false,
        speed: 1000,
        slidesToShow: 2,
        slidesToScroll: 2,
        autoplay: false,
        autoplaySpeed: 3000,
        adaptiveHeight: true,
        responsive: [
            {
                breakpoint: 1367,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                },
            },
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                },
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                },
            },
            {
                breakpoint: 575,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 0,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };


    return (
            <section id="news" className="bx-news-section bx-section padding-tb-80 bg-shape">
                <Fade triggerOnce duration={2000} direction='up' delay={300} className="container">
                    <div className="shape-1"></div>
                    <div className="shape-2"></div>
                    <div className="row">
                        <div className="title">
                            <p className="light-txt">blogs</p>
                            <h2>Latest<span className="primary-clr"> news</span></h2>
                        </div>
                    </div>
                    <div className="bx-news-detail">
                        <div className="row ">
                            <div className="news-slider">
                                <div className="carousel-wrap ">
                                    <Slider {...settings} className="owl-carousel news-carousel ">
                                        {
                                            news.map((data, index) => (
                                                <div key={index} className="item">
                                                    <NewsItem data={data} />
                                                </div>
                                            ))
                                        }
                                    </Slider>
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-12 col-sm-12 right-content offset-lg-6">
                                <div className="news-right-img">
                                    <img src="assets/img/news/img-1.jpg" alt="" />
                                </div>
                            </div>

                        </div>
                    </div>
                </Fade>
            </section>

    )
}

export default News
