import { useEffect, useState } from 'react';
import { headermanu } from '../utility/headermanu';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList } from '@fortawesome/free-solid-svg-icons';
import { Link as ScrollLink } from 'react-scroll';

function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeMenuItem, setActiveMenuItem] = useState('#home');
    const [loaded, setLoaded] = useState(true);
    const [isNavbarOpen, setIsNavbarOpen] = useState(false);
    const themeMode = useSelector((state) => state.image.themeMode);

    const handleClick = (e, href) => {
        e.preventDefault();
        setActiveMenuItem(href);
        setIsNavbarOpen(false);

        const targetElement = document.querySelector(href);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    }

    useEffect(() => {
        const handleScroll = () => {
            const topMenu = document.querySelector(".navbar-nav");
            const topMenuHeight = topMenu ? topMenu.offsetHeight : 0;
            const fromTop = window.scrollY + topMenuHeight;

            const scrollItems = headermanu.map(data => document.querySelector(data.href));
            const cur = scrollItems.filter(item => item && item.offsetTop < fromTop).pop();
            const id = cur ? cur.id : "";

            setActiveMenuItem(`#${id}`);

            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

            if (scrollTop >= 10) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        const handleLoad = () => {
            setLoaded(false);
            const loader = document.querySelector(".bx-overlay");
            if (loader) {
                loader.style.opacity = "0";
            }
        };
        window.addEventListener("load", handleLoad);
        setTimeout(() => {
            setLoaded(false);
        }, 1000);
        return () => {
            window.removeEventListener("load", handleLoad);
        };
    }, []);

    const handlesubmit = (e) => {
        e.preventDefault();
    }

    return (
        <>
            {loaded && (
                <div id="bx-overlay">
                    <span className="loader"> </span>
                </div>
            )}
            <header className={`bx-static ${isScrolled ? (themeMode === "dark" ? 'bx-fixed bg' : 'bx-fixed') : ''}`}>
                <div className="container">
                    <div className="nav-sec padding-b-50">
                        <nav className="navbar navbar-expand-lg navbar-dark">
                            <div className="container-fluid">
                                <a onClick={(e) => handlesubmit(e)} href='/'
                                    className={`navbar-brand ${themeMode === "light" ? "" : ""}`}>
                                    {themeMode === "light" ? (
                                        <img src="assets/img/logo/logo.png" alt="logo" />
                                    ) : (
                                        <img src="assets/img/logo/logo-dark.png" alt="logo" />
                                    )}
                                </a>
                                <button
                                    style={{ color: "#777" }}
                                    onClick={() => setIsNavbarOpen(!isNavbarOpen)}
                                    className={`navbar-toggler button-collapse ${isNavbarOpen ? 'collapsed' : ''}`}
                                    type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#navbarSupportedContent"
                                    aria-controls="navbarSupportedContent"
                                    aria-expanded="false"
                                    aria-label="Toggle navigation">
                                    <FontAwesomeIcon icon={faList} />
                                </button>
                                <div className={`collapse navbar-collapse ${isNavbarOpen ? 'show' : ''}`}
                                    id="navbarSupportedContent">
                                    <ul className="navbar-nav" id="top-menu">
                                        {headermanu.map((data, index) => (
                                            <li key={index}
                                                className={`nav-item ${activeMenuItem === data.href ? "active" : ""}`}>
                                                <a onClick={(e) => handleClick(e, data.href)}
                                                    className="nav-link br-nav"
                                                    aria-current="page"
                                                    href={data.href}>{data.title}</a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <ScrollLink
                                    to="contact"
                                    smooth={true}
                                    duration={500}
                                    className="custom-btn bx-btn m-r-5px"
                                >
                                    Get In Touch
                                </ScrollLink>
                            </div>
                        </nav>
                    </div>
                </div>
            </header>
        </>
    );
}

export default Header;


// import { useEffect, useState } from 'react';
// import { headermanu } from '../utility/headermanu';
// import { useSelector } from 'react-redux';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faList } from '@fortawesome/free-solid-svg-icons';
// import { Link as ScrollLink } from 'react-scroll';


// function Header() {
//     const [isScrolled, setIsScrolled] = useState(true);
//     const [activeMenuItem, setActiveMenuItem] = useState('#home');
//     const [loaded, setLoaded] = useState(true);
//     const [isNavbarOpen, setIsNavbarOpen] = useState(false);
//     const themeMode = useSelector((state) => state.image.themeMode);

//     const handleClick = (e, href) => {
//         e.preventDefault();
//         setActiveMenuItem(href)
//         setIsNavbarOpen();

//         const targetElement = document.querySelector(href);
//         if (targetElement) {
//             targetElement.scrollIntoView({ behavior: 'smooth' });
//         }

//         const topMenu = document.querySelector(".navbar-nav");
//         const topMenuHeight = topMenu ? topMenu.offsetHeight : 0;
//         const target = document.querySelector(href);
//         const offsetTop = target ? target.offsetTop - topMenuHeight + 1 : 0;
//         window.scrollTo({
//             top: offsetTop,
//             behavior: "smooth"
//         });
//     }
//     useEffect(() => {
//         const handleScroll = () => {
//             const topMenu = document.querySelector(".navbar-nav");
//             const topMenuHeight = topMenu ? topMenu.offsetHeight : 0;
//             const fromTop = window.scrollY + topMenuHeight;

//             const scrollItems = headermanu.map(data => document.querySelector(data.href));
//             const cur = scrollItems.filter(item => item.offsetTop < fromTop).pop();
//             const id = cur ? cur.id : "";

//             setActiveMenuItem(`#${id}`);

//             const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

//             if (scrollTop >= 10) {
//                 setIsScrolled(true);
//             } else {
//                 setIsScrolled(false);
//             }

//             window.addEventListener('scroll', handleScroll);

//             return () => {
//                 window.removeEventListener('scroll', handleScroll);
//             };
//         };

//         window.addEventListener('scroll', handleScroll);
//         return () => {
//             window.removeEventListener('scroll', handleScroll);
//         };
//     }, []);

//     useEffect(() => {
//         const handleLoad = () => {
//             setLoaded(false);
//             const loader = document.querySelector(".bx-overlay");
//             if (loader) {
//                 loader.style.opacity = "0";
//             }
//         };
//         window.addEventListener("load", handleLoad);
//         setTimeout(() => {
//             setLoaded(false);
//         }, 1000);
//         return () => {
//             window.removeEventListener("load", handleLoad);
//         };
//     }, []);


//     const handlesubmit = (e) => {
//         e.preventDefault()
//     }

//     return (
//         <>
//             {loaded && (
//                 <div id="bx-overlay">
//                     <span className="loader"> </span>
//                 </div>
//             )}
//             <header  className={`bx-static ${isScrolled ? (themeMode === "dark" ? 'bx-fixed bg' : 'bx-fixed') : ''}`}>
//                 <div className="container">
//                     <div className="nav-sec padding-b-50">
//                         <nav className="navbar navbar-expand-lg navbar-dark">
//                             <div className="container-fluid">
//                                 <a onClick={(e) => handlesubmit(e)} href='/'
//                                     className={`navbar-brand ${themeMode === "light" ? "" : ""}`}>
//                                     {themeMode === "light" ? (
//                                         <img src="assets/img/logo/logo.png" alt="logo" />
//                                     ) : (
//                                         <img src="assets/img/logo/logo-dark.png" alt="logo" />
//                                     )}
//                                 </a>
//                                 <button
//                                     style={{ color: "#777" }}
//                                     onClick={() => setIsNavbarOpen(!isNavbarOpen)}
//                                     className={`navbar-toggler button-collapse ${isNavbarOpen ? 'collapsed' : ''}`}
//                                     type="button"
//                                     data-bs-toggle="collapse"
//                                     data-bs-target="#navbarSupportedContent"
//                                     aria-controls="navbarSupportedContent"
//                                     aria-expanded="false"
//                                     aria-label="Toggle navigation">
//                                     <FontAwesomeIcon icon={faList} />

//                                 </button>
//                                 <div className={`collapse navbar-collapse ${isNavbarOpen ? 'show' : ''}`}
//                                     id="navbarSupportedContent">
//                                     <ul className="navbar-nav" id="top-menu">
//                                         {
//                                             headermanu.map((data, index) => (
//                                                 <li key={index}
//                                                     className={`nav-item ${activeMenuItem === data.href ? "active" : ""}`}>
//                                                     <a onClick={(e) => handleClick(e, data.href)}
//                                                         className="nav-link br-nav"
//                                                         aria-current="page"
//                                                         href={data.href}>{data.title}</a>
//                                                 </li>
//                                             ))
//                                         }
//                                     </ul>
//                                 </div>
//                                 <ScrollLink
//                                 to="contact"
//                                 smooth={true}
//                                 duration={500}
//                                 className="custom-btn bx-btn m-r-5px"
//                             >
//                                 Get In Touch
//                             </ScrollLink>
//                             </div>
//                         </nav>
//                     </div>
//                 </div>
//             </header>
//         </>
//     )
// }

// export default Header
