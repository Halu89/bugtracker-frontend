import searchIcon from "../../images/icons/search-outline.svg";

export interface IssuesFilterProps {}

const IssuesFilter: React.SFC<IssuesFilterProps> = () => {
  return (
    <div className="filters">
      <h2>Filters</h2>
      <div className="filters__search__input">
        <header>
          <h3 className="filters__search__headers">Search by</h3>
        </header>
        <label htmlFor="title" className="title-filter">
          Title :
          <input
            type="text"
            placeholder="Title"
            id="title"
            aria-label="Search by issue title"
          />
          <img src={searchIcon} alt="search"></img>
        </label>
        <label htmlFor="statusText" className="status-filter">
          Status text :
          <input
            type="text"
            id="statusText"
            placeholder="Status"
            aria-label="Search by status text"
          />
          <img src={searchIcon} alt="search"></img>
        </label>
      </div>
      <div className="filters__checkboxes">
        <label className="filters__checkbox" htmlFor="open-checkbox">
          <input type="checkbox" name="issues_open" id="open-checkbox" />
          <span className="checkbox-label">Show open issues</span>
        </label>
        <label className="filters__checkbox" htmlFor="closed-checkbox">
          <input type="checkbox" name="issues_open" id="closed-checkbox" />
          <span className="checkbox-label">Show closed issues</span>
        </label>
        <label className="filters__checkbox" htmlFor="toMe">
          <input type="checkbox" name="issues_open" id="toMe" />
          <span className="checkbox-label">Only issues assigned to me</span>
        </label>
      </div>
    </div>
  );
};

export default IssuesFilter;
