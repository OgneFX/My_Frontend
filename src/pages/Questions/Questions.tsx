import { useEffect, useState } from "react";
import type { IQuestion } from "../../interfaces/interfaces";
import type { LaunchParams } from "@telegram-apps/sdk-react";
import styles from "./Questions.module.scss";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

interface QuestionWindowProps {
  userObj: LaunchParams;
}

const fetchQuestions = async (userId?: number) => {
  const res = await fetch(
    `https://my-backend-cwvb.onrender.com/api/question?userId=${userId}`
  );
  if (!res.ok) throw new Error("Ошибка при получении вопросов");
  return res.json();
};

const sendAnswer = async ({
  questionId,
  optionId,
  userId,
}: {
  questionId: number;
  optionId: number;
  userId: number;
}) => {
  const res = await fetch(
    "https://my-backend-cwvb.onrender.com/api/question/answer",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ questionId, optionId, userId }),
    }
  );
  if (!res.ok) throw new Error("Ошибка при отправке ответа");
  return res.json();
};

const formatRemaining = (until: string, now: number) => {
  const diff = new Date(until).getTime() - now;
  if (diff <= 0) return "⏰ Время вышло";

  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  const remHours = hours % 24;
  const remMinutes = minutes % 60;

  const parts: string[] = [];
  if (days > 0) parts.push(`${days}д`);
  if (remHours > 0) parts.push(`${remHours}ч`);
  parts.push(`${remMinutes}м`);

  return parts.join(" ");
};

//Исправить исчезновение карточки, проверять нажатие на сервере.
//Интерфейс сделать новый - это базовый тест

export const Questions: React.FC<QuestionWindowProps> = ({ userObj }) => {
  const userId = userObj?.tgWebAppData?.user?.id;

  const queryClient = useQueryClient();

  const {
    data: questions = [],
    isLoading,
    isError,
  } = useQuery<IQuestion[]>({
    queryKey: ["questions", userId],
    queryFn: () => fetchQuestions(userId),
    enabled: !!userId,
  });
  console.log("ВОПРОСЫ", questions);

  const mutation = useMutation({
    mutationFn: sendAnswer,
    onSuccess: (_, variables) => {
      queryClient.setQueryData<IQuestion[]>(["questions", userId], (old) =>
        old ? old.filter((q) => q.id !== variables.questionId) : []
      );
    },
  });

  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 60_000); // раз в минуту
    return () => clearInterval(interval);
  }, []);

  if (isLoading) return <p className={styles.done}>Загрузка вопросов...</p>;
  if (isError) return <p className={styles.done}>Ошибка загрузки вопросов</p>;

  if (!userId) {
    return (
      <div className={styles.page}>
        <h2 className={styles.heading}>Ежедневные вопросы</h2>
        <p className={styles.done}>
          Для просмотра вопросов требуется авторизация Telegram.
        </p>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <h2 className={styles.heading}>Ежедневные вопросы</h2>

      {questions.map((question) => (
        <div key={question.id} className={styles.card}>
          <div className={styles.cardHeader}>
            <span className={styles.category}>📂 {question.category}</span>
            <span className={styles.date}>
              ⏳ {formatRemaining(question.activeUntil.toString(), now)}
            </span>
          </div>

          <p className={styles.title}>{question.title}</p>
          <p className={styles.date}>
            👤 Автор: {question.author || "неизвестен"}
          </p>

          <div className={styles.options}>
            {question.options.map((opt) => (
              <button
                key={opt.id}
                onClick={() =>
                  mutation.mutate({
                    questionId: question.id,
                    optionId: opt.id,
                    userId,
                  })
                }
                className={styles.optionButton}
                disabled={mutation.isPending}
              >
                {opt.text}
              </button>
            ))}
          </div>
        </div>
      ))}

      {questions.length === 0 && (
        <p className={styles.done}>🎉 Все вопросы на сегодня пройдены</p>
      )}
    </div>
  );
};
