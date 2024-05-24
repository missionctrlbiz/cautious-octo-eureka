import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

function BgSlider() {
    const [isSliderOpen, setIsSliderOpen] = useState(false)
    const themeMode = useSelector((state) => state.image.themeMode);
    const navigate = useNavigate()



    const toggleSlider = (event) => {
        event.preventDefault();
        setIsSliderOpen(!isSliderOpen);
    };
    const closeSidebar = () => {
        setIsSliderOpen(false);
    };
    const handleLightBtn = () => {
        navigate("/")
    }

    const handleDarkBtn = () => {
        navigate("/dark")
    }

    return (
        <div>
            {isSliderOpen && <div className="br-tools-sidebar-overlay" onClick={toggleSlider} style={{ display: "block" }}></div>}

            <div className={`br-tools-sidebar ${isSliderOpen ? 'open-tools' : ''}`}>
                <a onClick={toggleSlider} href="/" className="br-tools-sidebar-toggle in-out" style={{ backgroundColor: "whitesmoke" }}>
                    <img style={{ width: "35px", color: "#777" }} src='assets/img/switcher/setting.svg' alt='switcher' />
                </a>
                {
                    isSliderOpen && (
                        <>
                            <div className="br-bar-title">
                                <h6>Tools</h6>
                                <div style={{ cursor: "pointer" }} onClick={closeSidebar} href="/" className="close-tools"><FontAwesomeIcon icon={faXmark} /></div>
                            </div>
                            <div className="br-tools-detail">
                                <div className="br-tools-block">
                                    <h3>Modes</h3>
                                    <div className="br-tools-rtl" >
                                        <div className={`mode-primary br-tools-item mode ltr ${themeMode === "light" ? 'active-rtl' : ''}`} data-br-mode-tool="ltr">
                                            <img style={{ cursor: "pointer" }} onClick={handleLightBtn} src="assets/img/switcher/lightimage.png" alt="ltr" />
                                            <p>LIGHT</p>
                                        </div>
                                        <div className={`mode-primary br-tools-item mode ltr ${themeMode === "dark" ? 'active-rtl' : ''}`} data-br-mode-tool="rtl">
                                            <img style={{ cursor: "pointer" }} onClick={handleDarkBtn} src="assets/img/switcher/darkimage.png" alt="rtl" />
                                            <p>DARK</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )
                }
            </div>
        </div>
    )
}

export default BgSlider
