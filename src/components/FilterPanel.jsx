export default function FilterPanel({ filters, onChange, platformOptions, tierOptions, dateRangeOptions }) {
  return (
    <div className="filter-panel">
      <label>
        <span>Date Range</span>
        <select value={filters.dateRange} onChange={(event) => onChange('dateRange', event.target.value)}>
          {dateRangeOptions.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </label>

      <label>
        <span>Platform</span>
        <select value={filters.platform} onChange={(event) => onChange('platform', event.target.value)}>
          {platformOptions.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </label>

      <label>
        <span>Media Tier</span>
        <select value={filters.tier} onChange={(event) => onChange('tier', event.target.value)}>
          {tierOptions.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </label>
    </div>
  );
}
