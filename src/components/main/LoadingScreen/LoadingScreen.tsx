import React from "react";
import styles from "./LoadingScreen.module.scss";
import Image from "next/image";
import { Loader } from "~/components/common/Loader/Loader";

export const LoadingScreen: React.FC = () => {
  return (
    <>
      <div className={styles.logoContainer}>
        <Image className={styles.logo} alt="logo" src="/images/waze4TeslaLogo.png" width={200} height={50} />
      </div>
      <strong className={styles.text}>Gathering your location...</strong>
      <div className={styles.loader}>
        <Loader />
      </div>
      <div className={styles.imageContainer}>
        <Image className={styles.image} alt="map-background" src="/images/mapBackground.jpg" fill />
      </div>
    </>
  );
};
