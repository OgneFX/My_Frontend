import { useEffect, useState } from "react";
import { Slider } from "./MobileSlider/MobileSlider";
import { DesktopSlider } from "./DesktopSlider/DesktopSlider";
import { isMobile, isDesktop } from "react-device-detect";

const images = [
  { id: 1, image: "/img1.jpeg", title: "Первая" },
  { id: 2, image: "/img2.jpg", title: "Вторая" },
  { id: 3, image: "/img1.jpeg", title: "Третья" },
  { id: 4, image: "/img2.jpg", title: "Четвёртая" },
  { id: 5, image: "/img1.jpeg", title: "Пятьd" },
];

export const App: React.FC = () => {
  const [user, setUser] = useState<Telegram.WebAppUser | null>(null);

  useEffect(() => {
    const tg = window.Telegram.WebApp;
    tg.ready();
    if (tg) {
      tg.expand();
      tg.requestFullscreen();
      tg.setSwipeBehavior?.({
        allow_vertical_swipe: false,
      });
      if (tg.initDataUnsafe?.user) {
        setUser(tg.initDataUnsafe.user);
      }
    }
  }, []);

  const handlerButton = () => {
    if (user) {
      console.log(user);
    } else {
      console.log("Пользователь не найден");
    }
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
      <span> {user?.last_name}</span>
      {checkDevice()}
    </>
  );
};
