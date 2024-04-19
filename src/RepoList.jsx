import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./assets/css/RepoList.css";
import githubMark from "./assets/images/github-mark.svg";

function RepoList() {
  const [repos, setRepos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showViewMore, setShowViewMore] = useState(true);
  const [fetchingRepos, setFetchingRepos] = useState(false);

  const fetchRepos = () => {
    fetch(
      `https://api.github.com/users/joshua-emmanuel/repos?per_page=6&page=${currentPage}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.length === 0) {
          setShowViewMore(false);
        } else {
          setRepos([...repos, ...data]);
          setShowViewMore(true);
        }
        setFetchingRepos(false);
      });
  };

  useEffect(() => {
    fetchRepos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  const viewMore = () => {
    setCurrentPage(currentPage + 1);
    setFetchingRepos(true);
  };

  return (
    <section className="repo-list">
      <div className="wrapper">
        {repos.length > 0 ? (
          <>
            <div className="repos">
              {repos.map((repo, index) => (
                <div className="repo" key={index}>
                  <div className="repo__title">
                    <img src={githubMark} alt="" />
                    <h2>{repo.name}</h2>
                  </div>
                  <Link
                    aria-label={`Open ${repo.name}`}
                    to={`/repo/${repo.name}`}
                  ></Link>
                </div>
              ))}
            </div>
            {fetchingRepos && (
              <div className="loading-more-repos">
                <p>Loading...</p>
              </div>
            )}
            <div className="view-more-div">
              <button className="view-more-btn" onClick={viewMore}>
                {showViewMore ? "View More Repos" : "No more repos"}
              </button>
            </div>
          </>
        ) : (
          <div className="loading-repos">
            <p>Loading repositories...</p>
          </div>
        )}
      </div>
    </section>
  );
}

export default RepoList;
