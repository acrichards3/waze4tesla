import React from 'react';
import DriverWatching from './driver/DriverWatching';
import WazeMap from '../common/maps/WazeMap';
import TestSquare from '../common/icons/TestSquare';
import useComponentCoordinates from '~/functions/useComponentCoordinates';
import handleHazardCollision from '~/functions/handleHazardCollision';
import parseHazards from '~/functions/parseHazards';
import Loading from '../common/icons/Loading';
import styles from './Main.module.scss';

interface Location {
  lat: number;
  lon: number;
}

export default function Main() {
  // const location1 = { lat: 35.967281, lon: -79.056969 };
  // const location2 = { lat: 35.966545, lon: -79.057515 };
  // const location3 = { lat: 35.966154, lon: -79.058889 };
  const [userLocation, setUserLocation] = React.useState<Location | undefined>(undefined); // prettier-ignore
  const [prevLocation, setPrevLocation] = React.useState<Location | undefined>(undefined); // prettier-ignore
  const [hazardDetectorPosition, setHazardDetectorPosition] = React.useState<{x: number; y: number;}>({ x: 0, y: 0 }); // prettier-ignore
  const [iconPositions, setIconPositions] = React.useState<{ x: number; y: number }[]>([{ x: 0, y: 0 }]); // prettier-ignore

  const { componentRef, getCoordinates } = useComponentCoordinates();
  const isMountedRef = React.useRef(false);

  console.log(parseHazards(), 'HAZARDS');

  // const changeLocation1 = () => {
  //   setUserLocation(location1);
  // };
  // const changeLocation2 = () => {
  //   setUserLocation(location2);
  // };
  // const changeLocation3 = () => {
  //   setUserLocation(location3);
  // };

  // Get coordinates when componentRef updates
  React.useEffect(() => {
    isMountedRef.current = true;
    const handleGetCooridinates = () => {
      const coordinates = getCoordinates();
      if (
        coordinates &&
        (iconPositions[0]?.x !== coordinates.x ||
          iconPositions[0]?.y !== coordinates.y)
      ) {
        setIconPositions([coordinates]);
      }
    };

    if (componentRef.current) {
      handleGetCooridinates();
    }

    // Cleanup on unmount
    return () => {
      isMountedRef.current = false;
    };
  }, [getCoordinates, componentRef]);

  // Fetch geolocation data
  React.useEffect(() => {
    if ('geolocation' in navigator) {
      const intervalId = setInterval(() => {
        navigator.geolocation.getCurrentPosition(
          (geolocation) => {
            if (!isMountedRef.current) return; // prevent state update after unmount
            const newLocation = {
              lat: geolocation.coords.latitude,
              lon: geolocation.coords.longitude,
            };
            setUserLocation(newLocation);
          },
          (error) => console.log(error),
          { enableHighAccuracy: true, maximumAge: 10000, timeout: 5000 }
        );
      }, 5000); // Update every 5 seconds

      // Cleanup on unmount
      return () => {
        clearInterval(intervalId);
        isMountedRef.current = false;
      };
    }
  }, []);

  // Update previous location when user location changes
  React.useEffect(() => {
    setPrevLocation(userLocation);
  }, [userLocation]);

  // Detect collisions
  React.useEffect(() => {
    let prevIconPositions = iconPositions;
    let prevHazardDetectorPosition = hazardDetectorPosition;

    iconPositions.forEach((currIcon) => {
      if (!currIcon) return;
      const collisionDetected = handleHazardCollision(
        {
          x: currIcon.x,
          y: currIcon.y,
          width: 30,
          height: 30,
        },
        {
          x: hazardDetectorPosition.x,
          y: hazardDetectorPosition.y,
          width: 100,
          height: 500,
        }
      );

      // Only update state if collision is detected and position has changed
      if (
        collisionDetected &&
        (prevIconPositions !== iconPositions ||
          prevHazardDetectorPosition !== hazardDetectorPosition)
      ) {
        prevIconPositions = iconPositions;
        prevHazardDetectorPosition = hazardDetectorPosition;
      }
    });
  }, [iconPositions, hazardDetectorPosition]);

  // Render components
  if (userLocation) {
    return (
      <div className={styles.container}>
        <DriverWatching
          currLat={userLocation.lat}
          currLon={userLocation.lon}
          prevLat={prevLocation?.lat}
          prevLon={prevLocation?.lon}
          setPosition={setHazardDetectorPosition}
        />
        {/* <TestSquare ref={componentRef} /> */}
        <WazeMap userLat={userLocation.lat} userLon={userLocation.lon} />
      </div>
    );
  }

  return <Loading />;
}
