function PumpingControl({
  p,
  setP,
  i,
  setI,
  onGenerate,
  onSplit,
  onPump,
  hasString,
  hasSplit,
  isCustom,
  customString,
  setCustomString
}) {

  return (
    <div className="glass-card">

      <div className="card-header">
        <div className="card-icon teal">⚙️</div>
        <div>
          <div className="card-title">Pumping Controls</div>
          <div className="card-title-sub">Configure and execute pumping</div>
        </div>
      </div>

      {/* Pumping length */}
      <div className="form-group">
        <label className="form-label" htmlFor="pumping-length">
          Pumping Length (p)
        </label>
        <input
          id="pumping-length"
          className="form-input"
          type="number"
          min="1"
          max="20"
          value={p}
          onChange={(e) => setP(e.target.value)}
        />
      </div>

      {/* Custom string input OR generate button */}
      {isCustom ? (
        <div className="form-group">
          <label className="form-label" htmlFor="custom-string">
            Your String
          </label>
          <input
            id="custom-string"
            className="form-input"
            type="text"
            value={customString}
            onChange={(e) => setCustomString(e.target.value)}
            placeholder="e.g. aabbb, ababab, aaabbbccc"
            spellCheck="false"
            autoComplete="off"
          />
          <div className="form-hint">
            Enter a string to test with the pumping lemma
          </div>
          <button
            id="btn-set-string"
            className="btn btn-primary"
            onClick={onGenerate}
            disabled={!customString.trim()}
            style={{ marginTop: '0.7rem' }}
          >
            <span className="btn-icon">📥</span>
            Set String
          </button>
        </div>
      ) : (
        <div className="form-group">
          <button
            id="btn-generate"
            className="btn btn-primary"
            onClick={onGenerate}
          >
            <span className="btn-icon">✦</span>
            Generate String
          </button>
        </div>
      )}

      {/* Split button */}
      <div className="form-group">
        <button
          id="btn-split"
          className="btn btn-secondary"
          onClick={onSplit}
          disabled={!hasString}
        >
          <span className="btn-icon">✂</span>
          Split into x · y · z
        </button>
      </div>

      {/* Pumping value */}
      <div className="form-group">
        <label className="form-label" htmlFor="pumping-value">
          Pumping Value (i)
        </label>
        <input
          id="pumping-value"
          className="form-input"
          type="number"
          min="0"
          max="50"
          value={i}
          onChange={(e) => setI(e.target.value)}
        />
      </div>

      {/* Pump button */}
      <div className="form-group">
        <button
          id="btn-pump"
          className="btn btn-accent"
          onClick={onPump}
          disabled={!hasSplit}
        >
          <span className="btn-icon">🔁</span>
          Pump String
        </button>
      </div>

    </div>
  );
}

export default PumpingControl;