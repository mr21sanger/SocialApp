import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import NavbarBox from "./component/NavbarBox";
import Container from "./component/Container";
import Topbar from "./component/Topbar";
import { useProfileContext } from "./Reducer/profileReducer";
import Loading from "./component/Loading";
import {
  authPage,
  chatPage,
  homePage,
  notificationPage,
  profilePage,
} from "./Pages/Export";

function App() {
  const { loading, getUser, isLoggedIn } = useProfileContext();
  const id = localStorage.getItem("id");
  const [userId, setUserId] = useState(id);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      getUser(id);
    }
    isLoggedIn ?    navigate("/") : navigate("/auth")

  }, [id, isLoggedIn]);

  return (
    <>
      <div className="w-screen h-screen flex md:flex-row flex-col-reverse justify-start md:gap-5 overflow-hidden">
        {isLoggedIn ? <NavbarBox /> : null}
        <Container>
          
          <Routes>
            <Route path="/" element={homePage} />
            <Route path="/notification" element={notificationPage} />
            <Route path="/chat" element={chatPage} />
            <Route path="/profile/:id" element={profilePage} />
            <Route path="/auth" element={authPage} />
          </Routes>
        </Container>
        {isLoggedIn ? <Topbar /> : null}
        {loading ? <Loading /> : null}
      </div>
    </>
  );
}

export default App;
