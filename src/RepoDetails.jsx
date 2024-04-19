import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./assets/css/RepoDetails.css";
import githubMark from "./assets/images/github-mark.svg";

function RepoDetails() {
  const [repoDetails, setRepoDetails] = useState({});
  const { repoName } = useParams();

  useEffect(() => {
    const fetchRepoDetails = () => {
      fetch(`https://api.github.com/repos/joshua-emmanuel/${repoName}`)
        .then((response) => response.json())
        .then((data) => setRepoDetails(data));
    };

    fetchRepoDetails();
  }, [repoName]);

  return (
    <div className="repo-details">
      {Object.keys(repoDetails).length > 0 ? (
        <div className="wrapper">
          <div className="repo-details__text">
            <h1>
              <img src={githubMark} alt="" />
              <span>{repoDetails.name}</span>
            </h1>
            <div className="repo-details__body-text">
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
          </div>
          <div className="repo-details__btns">
            <a className="repo-details__btn" href="/">
              Go back home
            </a>
            <a className="repo-details__btn" href={repoDetails.html_url}>
              View on github
            </a>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default RepoDetails;
