function NewsItem({ data }) {

    const handleSubmit = (e) => {
        e.preventDefault()

    }

    return (
            <div className="card margin-right">
                <div className="news-card-details">
                    <img className='responsive' src={data.image} alt="" />
                    <p className="primary-clr">By Admin <span className="comments">- 04 Comments</span>
                    </p>
                    <h5>Lorem ipsum dolor sit amet.</h5>
                    <div className="read-more-btn">Read More <a onClick={(e) => handleSubmit(e)} href='/' className="info"><i
                        className="fa-solid fa-arrow-right"></i></a></div>
                </div>
            </div>
    )
}

export default NewsItem
