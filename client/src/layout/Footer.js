import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom'; // Import Link for navigation
import axios from 'axios';


function Footer() {
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [data, setData] = useState(null); // State to store fetched data
  const currentYear = new Date().getFullYear(); // Get the current year

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    // This will execute once the component has mounted
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Clean up function to remove the event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); // Empty dependency array to ensure this effect only runs once

  useEffect(() => {
    // Fetch data from API
    const fetchData = async () => {
      try {
          const response = await axios.get('https://cautious-octo-eureka.vercel.app/api/portfolio'); // Update the URL to your Express server
          setData(response.data);
      } catch (error) {
          console.error('Error fetching data:', error);
      }
  };

  fetchData();
}, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      {showScrollButton && (
        <div id="scrollup" style={{ color: "white" }} className="show" onClick={scrollToTop}>
          <FontAwesomeIcon icon={faArrowUp} />
        </div>
      )}

      <footer className="footer bg-clr" style={{ paddingBottom: "30px" }}>
        <div className="container">
          <div className="bx-footer-detail">
            <div className="bx-copy">
              Copyright &copy; {currentYear} <a onClick={(e) => handleSubmit(e)} className="site-name" href="/">
                {data?.record?.name || 'Loading...'} {/* Display fetched name or loading text */}
              </a> All rights reserved. <br/>
              Powered by <Link to="https://instagram.com/missionctrl.biz">MissionCTRL Creative Labs</Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;