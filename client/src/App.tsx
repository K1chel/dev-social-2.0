import { Route, Routes } from "react-router-dom";

import { PublicLayout } from "@/components/layout/public-layout";
import { PrivateLayout } from "@/components/layout/private-layout";
import { privateRoutes, publicRoutes } from "@/lib/routes";
import { NotFoundPage } from "@/pages/not-found-page";
import { useRecoilValue } from "recoil";
import { userAtom } from "@/atoms/user-atom";

const App = () => {
  const user = useRecoilValue(userAtom);

  return (
    <>
      <Routes>
        <Route element={<PublicLayout user={user} />}>
          {publicRoutes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={<route.element />}
            />
          ))}
        </Route>
        <Route element={<PrivateLayout user={user} />}>
          {privateRoutes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={<route.element />}
            />
          ))}
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
};

export default App;
