import "./App.css";
import { useEffect, useState } from "react";

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
    </>
  );
};
