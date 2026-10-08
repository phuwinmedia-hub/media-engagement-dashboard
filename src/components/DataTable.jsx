export default function DataTable({ rows, onCellChange }) {
  return (
    <div className="table-scroll">
      <table className="data-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Platform</th>
            <th>Tier</th>
            <th>Reach</th>
            <th>Mentions</th>
            <th>Sentiment</th>
            <th>Link</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id}>
              <td>
                <input
                  value={row.title}
                  onChange={(event) => onCellChange(row.id, 'title', event.target.value)}
                />
              </td>
              <td>
                <select
                  value={row.platform}
                  onChange={(event) => onCellChange(row.id, 'platform', event.target.value)}
                >
                  <option>Digital</option>
                  <option>Print</option>
                  <option>Social</option>
                  <option>TV</option>
                </select>
              </td>
              <td>
                <select
                  value={row.tier}
                  onChange={(event) => onCellChange(row.id, 'tier', event.target.value)}
                >
                  <option>Premium</option>
                  <option>Mid-Tier</option>
                  <option>Emerging</option>
                </select>
              </td>
              <td>
                <input
                  type="number"
                  value={row.reach}
                  onChange={(event) => onCellChange(row.id, 'reach', Number(event.target.value))}
                />
              </td>
              <td>
                <input
                  type="number"
                  value={row.mentions}
                  onChange={(event) => onCellChange(row.id, 'mentions', Number(event.target.value))}
                />
              </td>
              <td>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={row.sentiment}
                  onChange={(event) => onCellChange(row.id, 'sentiment', Number(event.target.value))}
                />
              </td>
              <td>
                <input
                  value={row.link}
                  onChange={(event) => onCellChange(row.id, 'link', event.target.value)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
