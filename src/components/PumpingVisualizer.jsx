function PumpingVisualizer({ split, pumped }) {

  if (!split) {
    return (
      <div className="glass-card">
        <div className="card-header">
          <div className="card-icon teal">🔬</div>
          <div>
            <div className="card-title">Decomposition & Pumping</div>
            <div className="card-title-sub">Split and pump results appear here</div>
          </div>
        </div>
        <div className="empty-state">
          <div className="empty-state-icon">✂️</div>
          <div className="empty-state-title">No decomposition yet</div>
          <div className="empty-state-desc">
            Generate a string first, then click "Split" to decompose it into x · y · z segments
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card">

      <div className="card-header">
        <div className="card-icon teal">🔬</div>
        <div>
          <div className="card-title">Decomposition & Pumping</div>
          <div className="card-title-sub">
            |xy| ≤ p, |y| ≥ 1
          </div>
        </div>
      </div>

      <div className="split-container">

        {/* Labels */}
        <div className="split-labels">
          <div className="split-label">
            <span className="split-label-dot x-dot" />
            x = "{split.x}"
          </div>
          <div className="split-label">
            <span className="split-label-dot y-dot" />
            y = "{split.y}"
          </div>
          <div className="split-label">
            <span className="split-label-dot z-dot" />
            z = "{split.z}"
          </div>
        </div>

        {/* Visual split display */}
        <div className="split-display">
          <span className="split-segment segment-x">{split.x}</span>
          <span className="split-separator">·</span>
          <span className="split-segment segment-y">{split.y}</span>
          <span className="split-separator">·</span>
          <span className="split-segment segment-z">{split.z}</span>
        </div>

        {/* Pumped string output */}
        {pumped && (
          <div className="pumped-section">
            <div className="section-label">Pumped Result: x · yⁱ · z</div>
            <div className="pumped-display">
              {pumped}
            </div>
          </div>
        )}

      </div>

    </div>
  );
}

export default PumpingVisualizer;