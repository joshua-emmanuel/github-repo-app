import "../assets/css/ViewMoreButton.css";

// eslint-disable-next-line react/prop-types
function ViewMoreButton({ showViewMore, viewMore, fetchingMoreRepos }) {
  return (
    <button
      className="view-more-btn"
      onClick={viewMore}
      data-disabled={!showViewMore || fetchingMoreRepos}
    >
      {showViewMore && fetchingMoreRepos
        ? "Loading..."
        : showViewMore
        ? "View More"
        : "No more repos"}
    </button>
  );
}

export default ViewMoreButton;
