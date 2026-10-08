import { useMemo } from 'react';

function formatMetricValue(value, format) {
  if (format === 'percent') {
    return `${value.toFixed(1)}%`;
  }

  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1)}M`;
  }

  if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}K`;
  }

  return `${value}`;
}

export default function KPICard({ metric, onValueChange }) {
  const formatted = formatMetricValue(metric.value, metric.format);

  return (
    <article className="kpi-card">
      <header className="kpi-topline">
        <span>{metric.label}</span>
        <span className="delta-badge">{metric.delta}</span>
      </header>

      <div className="kpi-value-wrap">
        <input
          aria-label={metric.label}
          className="kpi-input"
          type="number"
          value={metric.value}
          onChange={(event) => onValueChange(metric.id, Number(event.target.value))}
          step={metric.format === 'percent' ? '0.1' : '1'}
        />
        <small>{metric.format === 'percent' ? '%' : 'value'}</small>
      </div>

      <div className="kpi-meta">
        <span>Live</span>
        <strong>{formatted}</strong>
      </div>
    </article>
  );
}
