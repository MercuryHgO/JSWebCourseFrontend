import {CourseBrowser} from "./Courses/CourseBrowser.tsx";
import {BrowserRouter, Route, Routes, } from "react-router-dom";
import AuthPage from "./Auth/AuthPage.tsx";


function Header() {
  return <>
        <div className={'header-pattern'} />
          <header>
              <a href={'/'}>Courses</a>
              <a href={'/auth'}>Log in</a>
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
