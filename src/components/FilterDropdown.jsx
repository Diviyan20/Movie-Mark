import "../css/FilterDropdown.css";
function FilterDropdown({ filter, setFilter }) {
  return (
    <div className="dropdown-container">
      <label htmlFor="filter-dropdown">
        Filter by
        <select
          name="filter-dropdown"
          id="filter-dropdown"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="popular">Popular</option>
          <option value="latest">Latest</option>
          <option value="a-z">A - Z</option>
        </select>
      </label>
    </div>
  );
}

export default FilterDropdown;
