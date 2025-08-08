import styles from "./BottomNav.module.scss";
import { FaHome, FaQuestionCircle, FaCog } from "react-icons/fa";

interface BottomNavProps {
  activeTab: "home" | "questions" | "settings";
  setActiveTab: (tab: "home" | "questions" | "settings") => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  setActiveTab,
}) => {
  return (
    <nav className={styles.navbar}>
      <button
        className={`${styles.navButton} ${
          activeTab === "home" ? styles.active : ""
        }`}
        onClick={() => setActiveTab("home")}
      >
        <FaHome />
      </button>
      <button
        className={`${styles.navButton} ${
          activeTab === "questions" ? styles.active : ""
        }`}
        onClick={() => setActiveTab("questions")}
      >
        <FaQuestionCircle />
      </button>
      <button
        className={`${styles.navButton} ${
          activeTab === "settings" ? styles.active : ""
        }`}
        onClick={() => setActiveTab("settings")}
      >
        <FaCog />
      </button>
    </nav>
  );
};
