import React from 'react';
import Driver from '../common/icons/Driver';
import HazardDetector from '../common/hazardDetector/HazardDetector';
import DriverWatching from './driver/DriverWatching';
import WazeMap from '../common/maps/WazeMap';
import styles from './Main.module.scss';

interface Location {
  lat: number;
  lon: number;
}

export default function Main() {
  const [userLocation, setUserLocation] = React.useState<Location | undefined>(
    undefined
  );
  const [prevLocation, setPrevLocation] = React.useState<Location | undefined>(
    undefined
  );

  const successCallback = (geolocation: any) => {
    setUserLocation({
      lat: geolocation.coords.latitude,
      lon: geolocation.coords.longitude,
    });
  };

  const errorCallback = (error: any) => {
    console.log(error);
  };

  const geolocationOptions = {
    enableHighAccuracy: true,
    maximumAge: 10000,
    timeout: 5000,
  };

  React.useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        successCallback,
        errorCallback,
        geolocationOptions
      );
    }
  }, []);

  if (userLocation) {
    return (
      <div className={styles.container}>
        <DriverWatching
          currLat={userLocation.lat}
          currLon={userLocation.lon}
          prevLat={prevLocation?.lat}
          prevLon={prevLocation?.lon}
        />
        <WazeMap userLat={userLocation.lat} userLon={userLocation.lon} />
      </div>
    );
  }

  return <div>Loading...</div>;
}
