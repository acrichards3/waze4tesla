import React from "react";
import styles from "./LoadingScreen.module.scss";
import Image from "next/image";
import { Loader } from "~/components/common/Loader/Loader";

export const LoadingScreen: React.FC = () => {
  return (
    <>
      <div className={styles.container}>
        <span className={styles.text}>Gathering current location</span>
        <Loader />
      </div>
      <div className={styles.imageContainer}>
        <Image className={styles.image} alt="map-background" src="/images/mapBackground.jpg" fill />
      </div>
    </>
  );
};
