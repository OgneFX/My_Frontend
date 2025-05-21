import { useState } from "react";
import { Slider } from "./MobileSlider/MobileSlider";
import { DesktopSlider } from "./DesktopSlider/DesktopSlider";
import { isMobile, isDesktop } from "react-device-detect";
import { initData } from "@telegram-apps/sdk";

const images = [
  { id: 1, image: "/img1.jpeg", title: "Первая" },
  { id: 2, image: "/img2.jpg", title: "Вторая" },
  { id: 3, image: "/img1.jpeg", title: "Третья" },
  { id: 4, image: "/img2.jpg", title: "Четвёртая" },
  { id: 5, image: "/img1.jpeg", title: "Пятьd" },
];

export const App: React.FC = () => {
  const [user, setUser] = useState<string | undefined>(undefined);

  const handlerButton = () => {
    console.log("hm");
    console.log(initData.raw);
    console.log("ha");
    console.log(initData.user);
    setUser(initData.user()?.first_name);
  };

  const checkDevice = () => {
    if (isMobile) {
      return <Slider slides={images} />;
    } else if (isDesktop) {
      return <DesktopSlider slides={images} />;
    }
  };

  return (
    <>
      <button onClick={handlerButton}> ПРИВЕТ </button>
      <span> {`Привет ${user}`}</span>
      {checkDevice()}
    </>
  );
};
