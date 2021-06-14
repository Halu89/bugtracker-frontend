import searchIcon from "../../images/icons/search-outline.svg";
import { filtersType } from "./ProjectList";

const ProjectFilters = ({
  filters,
  setFilters,
}: {
  filters: filtersType;
  setFilters: React.Dispatch<React.SetStateAction<filtersType>>;
}) => {
  return (
    <div className="filters">
      <h2>Filters</h2>
      <div className="filters__search-input">
        <input
          type="text"
          placeholder="Name"
          aria-label="Project Name"
          onChange={(e) => {
            const projectName = e.currentTarget.value;
            setFilters({ ...filters, name: projectName });
          }}
          value={filters.name}
        />
        <img src={searchIcon} alt="search"></img>
      </div>
      <div className="filters__team-buttons">
        <button
          className={filters.author ? "active" : ""}
          onClick={() => {
            setFilters({ ...filters, author: !filters.author });
          }}
        >
          Author
        </button>
        <button
          className={filters.admins ? "active" : ""}
          onClick={() => {
            setFilters({ ...filters, admins: !filters.admins });
          }}
        >
          Admin
        </button>
        <button
          className={filters.member ? "active" : ""}
          onClick={() => {
            setFilters({ ...filters, member: !filters.member });
          }}
        >
          Member
        </button>
      </div>
      <label className="filters__issues-open" htmlFor="checkbox">
        <input
          type="checkbox"
          name="issues_open"
          id="checkbox"
          onChange={() => {
            setFilters({ ...filters, issueOpen: !filters.issueOpen });
          }}
        />
        <span className="checkbox-label">Only with issues open</span>
      </label>
    </div>
  );
};

export default ProjectFilters;
