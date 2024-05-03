import { useEffect, useState } from "react";
import "./assets/css/RepoList.css";
import debounce from "./util/debounce";
import RepoSearch from "./components/RepoSearch";
import RepoCard from "./components/RepoCard";
import LoadingRepos from "./components/LoadingRepos";
import ViewMoreButton from "./components/ViewMoreButton";

function RepoList() {
  const [repos, setRepos] = useState([]);
  const [originalRepos, setOriginalRepos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showViewMore, setShowViewMore] = useState(true);
  const [showViewMoreBtn, setShowViewMoreBtn] = useState(true);
  const [fetchingMoreRepos, setFetchingMoreRepos] = useState(false);
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
          setReposLoadingState("No repos found");
        } else {
          setOriginalRepos([...originalRepos, ...data]);
          setRepos([...repos, ...data]);
          setShowViewMore(true);
        }
        setFetchingMoreRepos(false);
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
    fetch(`https://api.github.com/users/joshua-emmanuel/repos?per_page=100`)
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
    setFetchingMoreRepos(true);
  };

  const searchForRepo = debounce((event) => {
    event.preventDefault();
    const inputValue = event.target.value.trim().toLowerCase();
    filterRepos(inputValue);
  }, 500);

  return (
    <section className="repo-list">
      <div className="wrapper">
        <RepoSearch
          searchingRepos={searchingRepos}
          searchForRepo={searchForRepo}
        />
        {repos.length > 0 ? (
          <>
            <div className="repos">
              {repos.map((repo) => (
                <RepoCard key={repo.id} repo={repo} />
              ))}
            </div>
            <div className="view-more-div">
              {showViewMoreBtn && (
                <ViewMoreButton
                  fetchingMoreRepos={fetchingMoreRepos}
                  showViewMore={showViewMore}
                  viewMore={viewMore}
                />
              )}
            </div>
          </>
        ) : (
          <LoadingRepos loadingText={reposLoadingState} />
        )}
      </div>
    </section>
  );
}

export default RepoList;
