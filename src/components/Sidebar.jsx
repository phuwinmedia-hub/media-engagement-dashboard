export default function Sidebar({ items, activeItem, onSelect }) {
  return (
    <aside className="sidebar">
      <div className="brand-block">
        <div className="brand-mark">P</div>
        <div>
          <p className="eyebrow">Campaign</p>
          <h2>Phuwin x Tommy Hilfiger</h2>
        </div>
      </div>

      <nav className="side-nav" aria-label="Main navigation">
        {items.map((item) => (
          <button
            key={item}
            className={activeItem === item ? 'nav-item active' : 'nav-item'}
            onClick={() => onSelect(item)}
            type="button"
          >
            {item}
          </button>
        ))}
      </nav>
    </aside>
  );
}
