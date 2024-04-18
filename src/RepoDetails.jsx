import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./assets/css/RepoDetails.css";

function RepoDetails() {
  const [repoDetails, setRepoDetails] = useState({});
  const { repoName } = useParams();

  const fetchRepoDetails = () => {
    fetch(`https://api.github.com/repos/joshua-emmanuel/${repoName}`)
      .then((response) => response.json())
      .then((data) => setRepoDetails(data));
  };

  useEffect(() => {
    fetchRepoDetails();
  }, []);

  return (
    <div className="repo-details">
      {Object.keys(repoDetails).length > 0 ? (
        <div className="wrapper">
          <h1>{repoDetails.name}</h1>
          <p>Description: {repoDetails.description ?? "No description"}</p>
          <p>Main Language: {repoDetails.language}</p>
          <p>Forks: {repoDetails.forks}</p>
          <p>
            Live-Site:{" "}
            {repoDetails.homepage !== null ? (
              <a href={repoDetails.homepage}>{repoDetails.homepage}</a>
            ) : (
              "None"
            )}
          </p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default RepoDetails;
