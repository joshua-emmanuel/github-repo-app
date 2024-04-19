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
          <h1>Joshua&apos;s Github Repos</h1>
        </div>
      </header>
      <RepoList />
    </>
  );
}

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div className="error-boundary">
      <div className="wrapper" role="alert">
        <h2>Something went wrong:</h2>
        <pre>{error.message}</pre>
        <button onClick={resetErrorBoundary}>Try again</button>
      </div>
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
