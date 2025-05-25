import axios from "axios";

interface ApiResponse {
  success: boolean;
  message: string;
  data?: any;
}

export const useTelegramAuth = () => {
  const registerUser = async (userData: any): Promise<ApiResponse> => {
    try {
      const res = await axios.post<ApiResponse>(
        "https://my-backend-cwvb.onrender.com/api/user",
        userData
      );
      if (res.data.success) {
        console.log("✅ Успешная регистрация:", res.data.message);
        return res.data;
      } else {
        throw new Error("Неожиданный формат ответа от сервера");
      }
    } catch (e) {
      console.error("Registration failed:", e);
      throw e;
    }
  };

  return { registerUser };
};
