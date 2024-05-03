/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import githubMark from "../assets/images/github-mark.svg";

function RepoCard({ repo }) {
  return (
    <div className="repo">
      <div className="repo__title">
        <img src={githubMark} alt="" />
        <h2>{repo.name}</h2>
      </div>
      <Link aria-label={`Open ${repo.name}`} to={`/repo/${repo.name}`}></Link>
    </div>
  );
}

export default RepoCard;
