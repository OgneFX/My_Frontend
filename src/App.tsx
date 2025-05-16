import "./App.css";
import { useEffect, useState } from "react";
import { Slider } from "./Slider/Slider";

const images = [
  { id: 1, image: "/img1.jpg", title: "Первая" },
  { id: 2, image: "/img2.jpg", title: "Вторая" },
  { id: 3, image: "/img3.jpg", title: "Третья" },
  { id: 4, image: "/img4.jpg", title: "Четвёртая" },
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

  return (
    <>
      <button onClick={handlerButton}> ПРИВЕТ </button>
      <span> {user?.last_name}</span>
      <Slider slides={images} />
    </>
  );
};
