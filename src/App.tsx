import { useEffect, useState } from "react";
import { Slider } from "./MobileSlider/MobileSlider";
import { DesktopSlider } from "./DesktopSlider/DesktopSlider";
import { isMobile, isDesktop } from "react-device-detect";
import { useLaunchParams } from "@telegram-apps/sdk-react";
import { useTelegramAuth } from "./customHooks/useTelegramAuth";

const images = [
  { id: 1, image: "/img1.jpeg", title: "Первая" },
  { id: 2, image: "/img2.jpg", title: "Вторая" },
  { id: 3, image: "/img1.jpeg", title: "Третья" },
  { id: 4, image: "/img2.jpg", title: "Четвёртая" },
  { id: 5, image: "/img1.jpeg", title: "Пятьd" },
]; //временное решение

export const App: React.FC = () => {
  const [user, setUser] = useState<string | undefined>(undefined);
  const [regionIndex, setRegionIndex] = useState<number | undefined>(undefined);
  const [isRegistered, setIsRegistered] = useState(false);
  const { registerUser } = useTelegramAuth();

  const userObj = useLaunchParams();
  console.info(userObj);

  useEffect(() => {
    if (userObj?.tgWebAppData?.user?.first_name) {
      setUser(userObj.tgWebAppData.user.first_name);
    }
  }, [userObj]);

  const handleRegistrationClick = async () => {
    if (userObj?.tgWebAppData?.user?.first_name) {
      setUser(userObj.tgWebAppData.user.first_name);
    }
    const payload = {
      ...userObj,
      regionIndex: regionIndex,
    };

    const response = await registerUser(payload);
    if (response.success) {
      setIsRegistered(true);
    }
  };

  const checkDevice = () => {
    if (isMobile) {
      return <Slider slides={images} setRegionIndex={setRegionIndex} />;
    } else if (isDesktop) {
      return <DesktopSlider slides={images} setRegionIndex={setRegionIndex} />;
    }
  };

  if (isRegistered) {
    return <div>Здесь вопросы</div>;
  }

  return (
    <>
      <span> {`Привет ${user} выбери регион`}</span>
      {checkDevice()}
      <span>{`${isRegistered}`}</span>
      <button onClick={handleRegistrationClick}> ВЫБРАТЬ </button>
    </>
  );
};
