import axios from "axios";
import { useEffect, useState } from "react";
import { useLaunchParams } from "@telegram-apps/sdk-react";
import { Registration } from "./Components/Registration/Registration";
import { QuestionWindow } from "./Components/QuestionWindow/QuestionWindow";

//chacnge

export const App: React.FC = () => {
  const [isRegistered, setIsRegistered] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const userObj = useLaunchParams();

  useEffect(() => {
    const checkRegistration = async () => {
      try {
        console.log(userObj?.tgWebAppData?.user?.id);
        const response = await axios.get(
          "https://my-backend-cwvb.onrender.com/api/user/check",
          {
            params: {
              userId: userObj?.tgWebAppData?.user?.id,
            },
          }
        );
        console.log(response);
        console.log(typeof response.data.isRegistered);

        if (response.data.isRegistered === true) {
          console.log("переключил на тру");
          setIsRegistered(true);
        } else {
          console.log("переключил на фолс");
          setIsRegistered(false);
        }
      } catch (error) {
        console.error("Error checking registration:", error);
      } finally {
        setLoading(false);
      }
    };

    checkRegistration();
  }, [userObj]);

  if (loading) {
    return <div>Загрузка...</div>;
  }

  return isRegistered ? (
    <Registration userObj={userObj} setIsRegistered={setIsRegistered} />
  ) : (
    <QuestionWindow userObj={userObj} />
  );
};
