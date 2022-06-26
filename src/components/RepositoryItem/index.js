import './index.css'

const RepositoryItem = props => {
  const {repDetails} = props
  const {avatarUrl, forksCount, issuesCount, starsCount, name} = repDetails

  return (
    <li className="repository">
      <img src={avatarUrl} alt={name} className="repo-img" />
      <h1 className="repo-name">{name}</h1>
      <div className="icons-text-container">
        <div className="icon-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
            alt="stars"
            className="icon"
          />
          <p className="repo-text">{starsCount} stars</p>
        </div>
        <div className="icon-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
            alt="forks"
            className="icon"
          />
          <p className="repo-text">{forksCount} forks</p>
        </div>
        <div className="icon-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
            alt="open issues"
            className="icon"
          />
          <p className="repo-text">{issuesCount} open issues</p>
        </div>
      </div>
    </li>
  )
}

export default RepositoryItem
