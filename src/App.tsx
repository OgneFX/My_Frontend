import axios from "axios";
import { useEffect, useState } from "react";
import { useLaunchParams } from "@telegram-apps/sdk-react";
import { Registration } from "./Components/Registration/Registration";
import { QuestionWindow } from "./Components/QuestionWindow/QuestionWindow";
import { BottomNav } from "./Components/BottomNav/BottomNav";

//chacnge

export const App: React.FC = () => {
  const [isRegistered, setIsRegistered] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"home" | "questions" | "settings">(
    "home"
  );
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
        if (response.data.isRegistered === true) {
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

  if (!isRegistered) {
    return <Registration userObj={userObj} setIsRegistered={setIsRegistered} />;
  }

  return (
    <div style={{ paddingBottom: "80px" }}>
      {activeTab === "home"} {/*&& <Home />*/}
      {activeTab === "questions" && <QuestionWindow userObj={userObj} />}
      {activeTab === "settings"} {/*&& <Settings />*/}
      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
};
