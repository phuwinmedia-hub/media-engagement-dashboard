import { useEffect, useMemo, useState } from 'react';
import Sidebar from './components/Sidebar';
import FilterPanel from './components/FilterPanel';
import KPICard from './components/KPICard';
import DataTable from './components/DataTable';
import ChartPanel from './components/ChartPanel';
import { initialDashboard, platformOptions, tierOptions, dateRangeOptions } from './data/mockDashboard';

const defaultFilters = {
  dateRange: '30d',
  platform: 'All',
  tier: 'All'
};

function App() {
  const [dashboard, setDashboard] = useState(() => {
    const saved = localStorage.getItem('media-dashboard-state');
    return saved ? JSON.parse(saved) : initialDashboard;
  });

  const [filters, setFilters] = useState(defaultFilters);
  const [activeNav, setActiveNav] = useState('Overview');

  useEffect(() => {
    localStorage.setItem('media-dashboard-state', JSON.stringify(dashboard));
  }, [dashboard]);

  const filteredRows = useMemo(() => {
    return dashboard.rows.filter((row) => {
      const platformMatch = filters.platform === 'All' || row.platform === filters.platform;
      const tierMatch = filters.tier === 'All' || row.tier === filters.tier;
      return platformMatch && tierMatch;
    });
  }, [dashboard.rows, filters]);

  const computedMetrics = useMemo(() => {
    const reach = filteredRows.reduce((sum, row) => sum + row.reach, 0);
    const mentions = filteredRows.reduce((sum, row) => sum + row.mentions, 0);
    const engagement = filteredRows.length
      ? filteredRows.reduce((sum, row) => sum + row.sentiment, 0) / filteredRows.length
      : 0;
    const share = filteredRows.length ? (mentions / 400) * 100 : 0;

    return [
      { id: 'reach', label: 'Total Reach', value: reach, delta: '+18.2%', format: 'number' },
      { id: 'mentions', label: 'Media Mentions', value: mentions, delta: '+12.4%', format: 'number' },
      { id: 'engagement', label: 'Engagement Rate', value: engagement, delta: '+1.9%', format: 'percent' },
      { id: 'shareOfVoice', label: 'Share of Voice', value: share, delta: '+4.6%', format: 'percent' }
    ];
  }, [filteredRows]);

  const updateMetric = (id, newValue) => {
    setDashboard((current) => ({
      ...current,
      metrics: current.metrics.map((metric) =>
        metric.id === id ? { ...metric, value: newValue } : metric
      )
    }));
  };

  const updateRow = (id, field, value) => {
    setDashboard((current) => ({
      ...current,
      rows: current.rows.map((row) => (row.id === id ? { ...row, [field]: value } : row))
    }));
  };

  const toggleWidget = (widgetId) => {
    setDashboard((current) => ({
      ...current,
      widgets: current.widgets.map((widget) =>
        widget.id === widgetId ? { ...widget, visible: !widget.visible } : widget
      )
    }));
  };

  const exportDashboard = () => {
    const blob = new Blob([JSON.stringify(dashboard, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'media-dashboard-export.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  const importDashboard = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (readEvent) => {
      try {
        const parsed = JSON.parse(String(readEvent.target?.result || '{}'));
        setDashboard(parsed);
      } catch (error) {
        console.error('Invalid dashboard JSON', error);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="app-shell">
      <Sidebar items={['Overview', 'Coverage', 'Audience', 'Insights', 'Settings']} activeItem={activeNav} onSelect={setActiveNav} />

      <main className="main-panel">
        <header className="topbar">
          <div>
            <p className="eyebrow">Dashboard</p>
            <h1>Media Engagement</h1>
          </div>

          <div className="toolbar-actions">
            <button type="button" className="ghost-button">Save</button>
            <button type="button" className="ghost-button" onClick={exportDashboard}>Export</button>
            <label className="ghost-button file-input-wrap">
              Import
              <input type="file" accept="application/json" onChange={importDashboard} />
            </label>
          </div>
        </header>

        <section className="controls-panel">
          <FilterPanel
            filters={filters}
            onChange={(key, value) => setFilters((current) => ({ ...current, [key]: value }))}
            platformOptions={platformOptions}
            tierOptions={tierOptions}
            dateRangeOptions={dateRangeOptions}
          />
        </section>

        <section className="widget-controls">
          {dashboard.widgets.map((widget) => (
            <button
              key={widget.id}
              type="button"
              className={widget.visible ? 'widget-toggle active' : 'widget-toggle'}
              onClick={() => toggleWidget(widget.id)}
            >
              {widget.visible ? 'Hide' : 'Show'} {widget.label}
            </button>
          ))}
        </section>

        {dashboard.widgets.find((widget) => widget.id === 'kpis')?.visible && (
          <section className="metrics-grid" aria-label="Key performance indicators">
            {computedMetrics.map((metric) => (
              <KPICard key={metric.id} metric={metric} onValueChange={updateMetric} />
            ))}
          </section>
        )}

        <section className="content-grid">
          {dashboard.widgets.find((widget) => widget.id === 'chart')?.visible && (
            <ChartPanel />
          )}

          {dashboard.widgets.find((widget) => widget.id === 'table')?.visible && (
            <div className="table-panel">
              <div className="section-header">
                <h3>Coverage Log</h3>
                <span>{filteredRows.length} Items</span>
              </div>
              <DataTable rows={filteredRows} onCellChange={updateRow} />
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
