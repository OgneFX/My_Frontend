import { Registration } from "./pages/Registration/Registration";
import { Questions } from "./pages/Questions/Questions";
import { Settings } from "./pages/Settings/Settings";
import { Home } from "./pages/Home/Home";
import { Navigate, Route, Routes } from "react-router";
import { useCheckRegistration } from "./customHooks/useCheckRegistration";
import { PrivateRoute } from "./routers/PrivateRoute";

//chacnge

export const App: React.FC = () => {
  const { isRegistered, isLoading, isError, refetch, userObj } =
    useCheckRegistration();
  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  if (isError) {
    return <div>Ошибка...</div>;
  }

  return (
    <Routes>
      {/* Public route: страница регистрации.
            Если пользователь уже зарегистрирован — редиректим его на "/" (или на /questions) */}
      <Route
        path='/registration'
        element={
          isRegistered ? (
            <Navigate to='/' replace />
          ) : (
            <Registration userObj={userObj} onSuccess={refetch} />
          )
        }
      />

      {/* Private routes: все вложенные маршруты будут доступны только если PrivateRoute разрешит */}
      <Route element={<PrivateRoute isRegistered={isRegistered} />}>
        <Route path='/' element={<Home />} />
        <Route path='/questions' element={<Questions userObj={userObj} />} />
        <Route path='/settings' element={<Settings />} />
      </Route>

      {/* Fallback: на любой неизвестный путь — отправляем в зависимости от статуса */}
      <Route
        path='*'
        element={<Navigate to={isRegistered ? "/" : "/registration"} replace />}
      />
    </Routes>
  );
};
