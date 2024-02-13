import {CoursesBrowser} from "./CoursesBrowser.tsx";


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
            <CoursesBrowser />
        </main>
    </>
  )
}

export default App
