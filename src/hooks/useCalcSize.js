import {useEffect, useState} from 'react';

export default function useCalcSize() {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  useEffect(() => {
    const updateWidth = () => {
      setWidth(window.innerWidth * 0.84);
    };
    const updateHeight = () => {
      setHeight(window.innerHeight * 0.8);
    };
    window.addEventListener('resize', updateHeight);
    window.addEventListener('resize', updateWidth);
    updateWidth();
    updateHeight();
    return () => {
      window.removeEventListener('resize', updateWidth);
      window.removeEventListener('resize', updateHeight);
    };
  }, []);
  return {width, height};
}
