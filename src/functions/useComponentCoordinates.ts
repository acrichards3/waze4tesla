import { useRef } from 'react';

const useComponentCoordinates = () => {
  const componentRef = useRef<HTMLDivElement | null>(null);

  const getCoordinates = () => {
    const element = componentRef.current;
    if (element) {
      const rect = element.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;
      return { x, y }; // returns the center point
    }
    return null;
  };

  return { componentRef, getCoordinates };
};

export default useComponentCoordinates;
