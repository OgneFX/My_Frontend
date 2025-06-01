import { useEffect, useState } from "react";
import axios from "axios";
import type { IQuestion } from "../../interfaces/interfaces";
import type { LaunchParams } from "@telegram-apps/sdk-react";
import styles from "./questionWindows.module.scss";

interface QuestionWindowProps {
  userObj: LaunchParams;
}

//Исправить исчезновение карточки, проверять нажатие на сервере. d

export const QuestionWindow: React.FC<QuestionWindowProps> = ({ userObj }) => {
  const [questions, setQuestions] = useState<IQuestion[]>([]);
  const userId = userObj?.tgWebAppData?.user?.id;
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get<IQuestion[]>(
          "https://my-backend-cwvb.onrender.com/api/questions"
        );
        setQuestions(response.data);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
      fetchQuestions();
    };
  }, []);

  const handleAnswer = async (questionId: number, optionId: number) => {
    try {
      await axios.post(
        "https://my-backend-cwvb.onrender.com/api/questions/answer",
        {
          questionId,
          optionId,
          userId,
        }
      );
      setQuestions((prev) => prev.filter((q) => q.id !== questionId));
    } catch (error) {}
  };

  return (
    <div className={styles.page}>
      <h2>Ежедневные вопросы</h2>

      {questions.map((question) => (
        <div key={question.id} className={styles.card}>
          <p className={styles.category}>{question.category}</p>
          <p className={styles.title}>{question.title}</p>
          <div className={styles.options}>
            {question.options.map((opt) => (
              <button
                key={opt.id}
                onClick={() => handleAnswer(question.id, opt.id)}
                className={styles.optionButton}
              >
                {opt.text}
              </button>
            ))}
          </div>
        </div>
      ))}

      {questions.length === 0 && (
        <p className={styles.done}>Все вопросы на сегодня пройдены 🎉</p>
      )}
    </div>
  );
};
