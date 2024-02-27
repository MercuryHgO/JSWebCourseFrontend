import {CourseBrowser} from "./Courses/CourseBrowser.tsx";
import {BrowserRouter, Route, Routes,} from "react-router-dom";
import AuthPage from "./Auth/AuthPage.tsx";
import {ProfileHeaderWidget} from "./ProfileHeaderWidget.tsx";
import AdminPanelPage from "./AdminPanel/AdminPanelPage.tsx";


function Header() {
  return <>
          <header>
              <a href={'/auth'}>Log in</a>
              <a href={'/'}>Courses</a>
              <ProfileHeaderWidget />
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
                <Route path={'/auth'} element={<AuthPage />} />
                <Route path={'/adminPanel'} element={<AdminPanelPage />} />
            </Routes>
        </main>
    </BrowserRouter>
  )
}

export default App
