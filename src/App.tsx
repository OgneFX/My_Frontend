import axios from "axios";
import { useEffect, useState } from "react";
import { useLaunchParams } from "@telegram-apps/sdk-react";
import { Registration } from "./Components/Registration/Registration";
import { QuestionWindow } from "./Components/QuestionWindow/QuestionWindow";

//chacnge

export const App: React.FC = () => {
  const [isRegistered, setIsRegistered] = useState(false);
  const userObj = useLaunchParams();
  useEffect(() => {
    const checkRegistration = async () => {
      try {
        console.log("Отправка на сервер для чека");
        const response = await axios.get(
          "https://my-backend-cwvb.onrender.com/api/user/check",
          {
            params: {
              userId: userObj?.tgWebAppData?.user?.id,
            },
          }
        );
        if (response.data.isRegistered) {
          console.log(
            "Получил данные с сервера о том, что пользователь зареган"
          );
          setIsRegistered(true);
        } else {
          console.log(
            "Получил данные с сервера о том, что пользователь НЕ зареган"
          );
          setIsRegistered(false);
        }
      } catch (error) {
        console.error("Error checking registration:", error);
      }
    };

    checkRegistration();
  }, [userObj]);

  return isRegistered ? (
    <QuestionWindow userObj={userObj} />
  ) : (
    <Registration userObj={userObj} setIsRegistered={setIsRegistered} />
  );
};
