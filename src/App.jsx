import RepoList from "./RepoList";
import RepoDetails from "./RepoDetails";
import TestErrorBoundary from "./TestErrorBoundary";
import PageNotFound from "./PageNotFound";
import { Route, Routes } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import "./assets/css/App.css";

function Home() {
  return (
    <>
      <header>
        <div className="wrapper">
          <h1>Joshua Emmanuel&apos;s Github Repositories</h1>
        </div>
      </header>
      <RepoList />
    </>
  );
}

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/repo/:repoName" element={<RepoDetails />} />
        <Route path="/error" element={<TestErrorBoundary />} />
        <Route path="/404" element={<PageNotFound />}></Route>
        <Route path="*" element={<PageNotFound />}></Route>
      </Routes>
    </ErrorBoundary>
  );
}

export default App;
