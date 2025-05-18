import "./App.css";
import { useEffect, useState } from "react";
import { Slider } from "./MobileSlider/MobileSlider";
import { DesktopSlider } from "./DesktopSlider/DesktopSlider";
import { isMobile, isDesktop } from "react-device-detect";

const images = [
  { id: 1, image: "/img1.jpeg", title: "Первая" },
  { id: 2, image: "/img1.jpeg", title: "Вторая" },
  { id: 3, image: "/img1.jpeg", title: "Третья" },
  { id: 4, image: "/img1.jpeg", title: "Четвёртая" },
  { id: 5, image: "/img1.jpeg", title: "Пять" },
];

export const App: React.FC = () => {
  const [user, setUser] = useState<Telegram.WebAppUser | null>(null);

  useEffect(() => {
    const tg = window.Telegram.WebApp;
    tg.ready();
    console.log(tg.initData);
    console.log(tg.initDataUnsafe);
    if (tg.initDataUnsafe?.user) {
      setUser(tg.initDataUnsafe.user);
    }
  }, []);

  const handlerButton = () => {
    if (user) {
      console.log(user);
    } else {
      console.log("Пользователь не найден");
    }
  };
  console.log(isMobile);
  console.log(isDesktop);

  const checkDevice = (images: any) => {
    if (isMobile) {
      return <Slider slides={images} />;
    } else if (isDesktop) {
      return <DesktopSlider slides={images} />;
    }
  };

  return (
    <>
      <button onClick={handlerButton}> ПРИВЕТ </button>
      <span> {user?.last_name}</span>
      {checkDevice(images)}
    </>
  );
};
