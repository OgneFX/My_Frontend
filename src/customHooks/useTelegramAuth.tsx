import axios from "axios";

export const useTelegramAuth = () => {
  const registerUser = async (userData: any) => {
    try {
      const res = await axios.post("/api/register", userData);
      return res.data;
    } catch (e) {
      console.error("Registration failed:", e);
      throw e;
    }
  };

  return { registerUser };
};
