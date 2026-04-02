function StringDisplay({ string }) {

  return (
    <div className="glass-card">

      <div className="card-header">
        <div className="card-icon pink">📝</div>
        <div>
          <div className="card-title">Generated String</div>
          <div className="card-title-sub">
            {string
              ? `Length: ${string.length} characters`
              : "Waiting for generation"
            }
          </div>
        </div>
      </div>

      <div className={`string-display ${string ? "has-content" : ""}`}>
        {string ? (
          string
        ) : (
          <span className="string-placeholder">
            Select a language and click "Generate String" to begin
          </span>
        )}
      </div>

    </div>
  );
}

export default StringDisplay;