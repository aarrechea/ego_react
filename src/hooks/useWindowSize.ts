// Imports
import React, { useLayoutEffect, useState } from 'react';



// Window size
function useWindowSize() {
    const [size, setSize] = useState([0, 0]);
  
    useLayoutEffect(() => {
        function updateSize() {
            setSize([window.innerWidth, window.innerHeight]);
        }

        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);

    }, []);
    
    return size;
}



// Exports
export default useWindowSize;