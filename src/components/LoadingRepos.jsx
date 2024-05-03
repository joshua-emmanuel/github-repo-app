import "../assets/css/LoadingRepos.css";

// eslint-disable-next-line react/prop-types
function LoadingRepos({ loadingText }) {
  return (
    <div className="loading-repos">
      <p>{loadingText}</p>
    </div>
  );
}

export default LoadingRepos;
