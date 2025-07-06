import { MoblieSlider } from "../Sliders/MobileSlider/MobileSlider";
import { DesktopSlider } from "../Sliders/DesktopSlider/DesktopSlider";
import { isMobile, isDesktop } from "react-device-detect";
import { mapImages } from "../../Data/SliderInRegistration";
import { useTelegramAuth } from "../../customHooks/useTelegramAuth";
import React, { useState } from "react";
import type { LaunchParams } from "@telegram-apps/sdk-react";
import styles from "./registration.module.scss";

interface RegistrationProps {
  userObj: LaunchParams;
  setIsRegistered: (i: boolean) => void;
}

export const Registration: React.FC<RegistrationProps> = ({
  userObj,
  setIsRegistered,
}) => {
  const [regionIndex, setRegionIndex] = useState<number | undefined>(undefined);

  const { registerUser } = useTelegramAuth();

  const handleRegistrationClick = async () => {
    const payload = {
      ...userObj,
      regionIndex: regionIndex,
    };

    const response = await registerUser(payload);
    if (response.message) {
      setIsRegistered(true);
    } else {
      console.error("Registration failed");
    }
  };

  const checkDevice = () => {
    if (isMobile) {
      return (
        <MoblieSlider slides={mapImages} setRegionIndex={setRegionIndex} />
      );
    } else if (isDesktop) {
      return (
        <DesktopSlider slides={mapImages} setRegionIndex={setRegionIndex} />
      );
    }
  };

  return (
    <div className={styles.registration}>
      <h1 className={styles.registration__text}>
        {" "}
        {`Добро пожаловать в Society Mind Research`}
      </h1>
      {checkDevice()}
      <button
        className={styles.registration__button}
        onClick={handleRegistrationClick}
      >
        {" "}
        ВЫБРАТЬ{" "}
      </button>
    </div>
  );
};
