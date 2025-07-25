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
        const response = await axios.get(
          "https://my-backend-cwvb.onrender.com/api/user/check",
          {
            params: {
              userId: userObj?.tgWebAppData?.user?.id,
            },
          }
        );
        if (response.data.isRegistered) {
          setIsRegistered(true);
        } else {
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
