import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./assets/css/RepoList.css";
import githubMark from "./assets/images/github-mark.svg";

function RepoList() {
  const [repos, setRepos] = useState([]);
  const [originalRepos, setOriginalRepos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showViewMore, setShowViewMore] = useState(true);
  const [showViewMoreBtn, setShowViewMoreBtn] = useState(true);
  const [fetchingRepos, setFetchingRepos] = useState(false);
  const [searchingRepos, setSearchingRepos] = useState(false);
  const [reposLoadingState, setReposLoadingState] = useState(
    "Loading repositories..."
  );

  const fetchRepos = () => {
    fetch(
      `https://api.github.com/users/joshua-emmanuel/repos?per_page=6&page=${currentPage}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.length === 0) {
          setShowViewMore(false);
        } else {
          setOriginalRepos([...originalRepos, ...data]);
          setRepos([...repos, ...data]);
          setShowViewMore(true);
        }
        setFetchingRepos(false);
      });
  };

  const filterRepos = (searchInput) => {
    setSearchingRepos(true);
    if (searchInput === "") {
      setRepos(originalRepos);
      setShowViewMoreBtn(true);
      setSearchingRepos(false);
      return;
    }
    fetch(`https://api.github.com/users/joshua-emmanuel/repos`)
      .then((response) => response.json())
      .then((data) => {
        const filteredRepos = data.filter((data) =>
          data.name.toLowerCase().includes(searchInput)
        );
        setCurrentPage(1);
        setSearchingRepos(false);
        setShowViewMoreBtn(false);
        setRepos(filteredRepos);
        if (filteredRepos.length === 0) setReposLoadingState("No repos found");
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

  function debounce(callback, wait, immediate) {
    let timeout;
    return function () {
      const context = this;
      const args = arguments;
      const later = function () {
        timeout = null;
        if (!immediate) callback.apply(context, args);
      };
      const callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) callback.apply(context, args);
    };
  }

  const searchForRepo = debounce((event) => {
    event.preventDefault();
    const inputValue = event.target.value.trim().toLowerCase();
    filterRepos(inputValue);
  }, 500);

  return (
    <section className="repo-list">
      <div className="wrapper">
        <form className="repo-list__search">
          <svg
            className={searchingRepos ? "hidden" : ""}
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
              clipRule="evenodd"
            />
          </svg>

          <svg
            className={`spinner ${searchingRepos ? "" : "hidden"}`}
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="#000000"
            viewBox="0 0 256 256"
          >
            <path d="M136,32V64a8,8,0,0,1-16,0V32a8,8,0,0,1,16,0Zm37.25,58.75a8,8,0,0,0,5.66-2.35l22.63-22.62a8,8,0,0,0-11.32-11.32L167.6,77.09a8,8,0,0,0,5.65,13.66ZM224,120H192a8,8,0,0,0,0,16h32a8,8,0,0,0,0-16Zm-45.09,47.6a8,8,0,0,0-11.31,11.31l22.62,22.63a8,8,0,0,0,11.32-11.32ZM128,184a8,8,0,0,0-8,8v32a8,8,0,0,0,16,0V192A8,8,0,0,0,128,184ZM77.09,167.6,54.46,190.22a8,8,0,0,0,11.32,11.32L88.4,178.91A8,8,0,0,0,77.09,167.6ZM72,128a8,8,0,0,0-8-8H32a8,8,0,0,0,0,16H64A8,8,0,0,0,72,128ZM65.78,54.46A8,8,0,0,0,54.46,65.78L77.09,88.4A8,8,0,0,0,88.4,77.09Z"></path>
          </svg>

          <input
            type="text"
            name="search-input"
            placeholder="Search for repos"
            onChange={searchForRepo}
          />
        </form>
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
              {showViewMoreBtn && (
                <button
                  className="view-more-btn"
                  onClick={viewMore}
                  data-disabled={!showViewMore}
                >
                  {showViewMore ? "View More Repos" : "No more repos"}
                </button>
              )}
            </div>
          </>
        ) : (
          <div className="loading-repos">
            <p>{reposLoadingState}</p>
          </div>
        )}
      </div>
    </section>
  );
}

export default RepoList;
