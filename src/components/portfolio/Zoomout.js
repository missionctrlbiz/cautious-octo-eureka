import { useEffect, useState } from 'react';
import { Zoom } from 'react-awesome-reveal';

function Zoomout({ children, category, data, ...rest }) {
    const [triggerAnimation, setTriggerAnimation] = useState(false);

    useEffect(() => {

        setTriggerAnimation(true);


        const timeout = setTimeout(() => {
            setTriggerAnimation(false);
        }, rest.duration || 1000);

        return () => clearTimeout(timeout);
    }, [category, rest.duration]);
    return (
        <Zoom className='row' {...rest} triggerOnce trigger={triggerAnimation}>
            {children}
        </Zoom>
    )
}

export default Zoomout
