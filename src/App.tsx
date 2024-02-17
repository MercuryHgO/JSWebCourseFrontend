import {CourseBrowser} from "./CourseBrowser.tsx";


function Header() {
  return <header>
    СДЕЛАЙ ХЕДЕР
  </header>;
}

function App() {
  return (
    <>
      <Header />
        <main>
            <CourseBrowser />
        </main>
    </>
  )
}

export default App
