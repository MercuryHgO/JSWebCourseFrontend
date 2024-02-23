import {CourseBrowser} from "./Courses/CourseBrowser.tsx";
import {BrowserRouter, Route, Routes,} from "react-router-dom";
import AuthPage from "./Auth/AuthPage.tsx";
import {ProfileHeaderWidget} from "./ProfileHeaderWidget.tsx";


function Header() {
  return <>
        <div className={'header-pattern'} />
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
            </Routes>
        </main>
    </BrowserRouter>
  )
}

export default App
