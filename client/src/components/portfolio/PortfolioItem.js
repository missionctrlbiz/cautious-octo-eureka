import FancyBox from './Fancybox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import Zoomout from './Zoomout';

function PortfolioItem({ data }) {

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    return (
        <>
            <Zoomout className="col-lg-4 col-md-6 col-xs-12" >
                <div
                    className="hovereffect">
                    <div className="portfolio-img">
                        <img src={data.image} alt="development" />
                        <h3>
                            <span>{data.title}</span>
                            {data.subtitle && <span>{data.subtitle}</span>}
                        </h3>
                    </div>
                    <div className="overlay">
                        <div className="overlay-info">
                            <a onClick={(e) => handleSubmit(e)} className="info" href="/">{data.description}</a>
                            <a className="info" data-fancybox="gallery"
                                href={data.link}><FontAwesomeIcon icon={faArrowRight} /></a>
                        </div>
                        <FancyBox />
                    </div>
                </div>
            </Zoomout>
        </>

    )
}

export default PortfolioItem
