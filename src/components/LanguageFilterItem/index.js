import './index.css'

const LanguageFilterItem = props => {
  const {languageButtonDetails, setActiveTabId, activeTab} = props
  const {id, language} = languageButtonDetails

  const activeLanguageTab = activeTab ? 'nav-buttons active' : 'nav-buttons'

  const onClickButton = () => {
    setActiveTabId(id)
  }

  return (
    <li className="each-button">
      <button
        type="button"
        className={activeLanguageTab}
        onClick={onClickButton}
      >
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
