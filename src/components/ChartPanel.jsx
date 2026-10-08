import { chartSeries } from '../data/mockDashboard';

export default function ChartPanel() {
  const maxValue = Math.max(...chartSeries.map((point) => point.value));

  return (
    <div className="chart-panel">
      <div className="section-header">
        <h3>Engagement Trend</h3>
        <span>Monthly</span>
      </div>

      <div className="chart-bars" aria-label="Engagement chart">
        {chartSeries.map((point) => (
          <div key={point.month} className="bar-group">
            <div
              className="bar"
              style={{ height: `${(point.value / maxValue) * 100}%` }}
              title={`${point.month}: ${point.value}%`}
            />
            <span>{point.month}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
