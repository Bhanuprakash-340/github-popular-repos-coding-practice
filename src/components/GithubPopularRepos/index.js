import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class GithubPopularRepos extends Component {
  state = {
    activeTabId: languageFiltersData[0].id,
    repositoriesData: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getRepositoriesData()
  }

  getRepositoriesData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {activeTabId} = this.state
    const url = `https://apis.ccbp.in/popular-repos?language=${activeTabId}`
    const response = await fetch(url)
    // console.log(response)
    if (response.ok === true) {
      const fetchedData = await response.json()
      //   console.log(fetchedData)
      const updatedData = fetchedData.popular_repos.map(eachData => ({
        id: eachData.id,
        avatarUrl: eachData.avatar_url,
        forksCount: eachData.forks_count,
        issuesCount: eachData.issues_count,
        name: eachData.name,
        starsCount: eachData.stars_count,
      }))
      this.setState({
        repositoriesData: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  setActiveTabId = id => {
    this.setState({activeTabId: id}, this.getRepositoriesData)
  }

  renderLanguagesList = () => {
    const {activeTabId} = this.state

    return (
      <ul className="buttons-container">
        {languageFiltersData.map(eachButton => (
          <LanguageFilterItem
            languageButtonDetails={eachButton}
            key={eachButton.id}
            setActiveTabId={this.setActiveTabId}
            activeTab={eachButton.id === activeTabId}
          />
        ))}
      </ul>
    )
  }

  renderRepositoryLists = () => {
    const {repositoriesData} = this.state
    return (
      <ul className="repositories-list-container">
        {repositoriesData.map(each => (
          <RepositoryItem repDetails={each} key={each.id} />
        ))}
      </ul>
    )
  }

  renderLoadingView = () => (
    <div testid="loader">
      <Loader color="#0284c7" height={50} type="ThreeDots" width={50} />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-image"
      />
      <h1 className="failure-text">Something Went Wrong</h1>
    </div>
  )

  renderRepositories = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderRepositoryLists()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="app-container">
        <div className="content-container">
          <h1 className="heading">Popular</h1>
          {this.renderLanguagesList()}
          {this.renderRepositories()}
        </div>
      </div>
    )
  }
}

export default GithubPopularRepos
