import {CourseBrowser} from "./Courses/CourseBrowser.tsx";
import {BrowserRouter, Route, Routes,} from "react-router-dom";
import AuthLoginPage from "./Auth/AuthLoginPage.tsx";
import {ProfileHeaderWidget} from "./ProfileHeaderWidget.tsx";
import AdminPanelPage from "./AdminPanel/AdminPanelPage.tsx";
import AuthRegisterPage from "./Auth/AuthRegisterPage.tsx";


function Header() {
  return <>
          <header>
              <ProfileHeaderWidget />
              <a href={'/'}>Курс</a>
          </header>
      </>
}

function App() {
  return (
    <BrowserRouter>
      <Header />
        <main>
            <Routes>
                <Route path={'/'} element={<CourseBrowser />} />
                <Route path={'/login'} element={<AuthLoginPage />} />
                <Route path={'/register'} element={<AuthRegisterPage />} />
                <Route path={'/adminPanel'} element={<AdminPanelPage />} />
            </Routes>
        </main>
    </BrowserRouter>
  )
}

export default App
