function ExplanationPanel({ result, customRegex }) {

  if (result === null) {
    return (
      <div className="glass-card">
        <div className="card-header">
          <div className="card-icon emerald">📖</div>
          <div>
            <div className="card-title">How It Works</div>
            <div className="card-title-sub">Follow these steps to explore the pumping lemma</div>
          </div>
        </div>

        <div className="explanation-steps">

          <div className="explanation-step">
            <div className="step-number">1</div>
            <div className="step-content">
              <div className="step-title">Choose a Language</div>
              <div className="step-desc">Select a formal language from the panel or define your own regex pattern.</div>
            </div>
          </div>

          <div className="explanation-step">
            <div className="step-number">2</div>
            <div className="step-content">
              <div className="step-title">Generate a String</div>
              <div className="step-desc">Click "Generate String" to create a string s ∈ L with |s| ≥ p.</div>
            </div>
          </div>

          <div className="explanation-step">
            <div className="step-number">3</div>
            <div className="step-content">
              <div className="step-title">Split into x · y · z</div>
              <div className="step-desc">Decompose the string satisfying |xy| ≤ p and |y| ≥ 1.</div>
            </div>
          </div>

          <div className="explanation-step">
            <div className="step-number">4</div>
            <div className="step-content">
              <div className="step-title">Pump the String</div>
              <div className="step-desc">Choose a value for i and compute x · yⁱ · z.</div>
            </div>
          </div>

          <div className="explanation-step">
            <div className="step-number">5</div>
            <div className="step-content">
              <div className="step-title">Check Membership</div>
              <div className="step-desc">Verify if the pumped string still belongs to the language.</div>
            </div>
          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="glass-card result-panel">

      <div className="card-header">
        <div className="card-icon amber">📊</div>
        <div>
          <div className="card-title">Conclusion</div>
          <div className="card-title-sub">Pumping lemma analysis result</div>
        </div>
      </div>

      {result ? (
        <div className="result-content accept">
          <span className="result-icon">✅</span>
          <div className="result-text">
            <span className="result-title">Pumped String Accepted</span>
            <span className="result-desc">
              The pumped string xy<sup>i</sup>z still belongs to the language.
              {customRegex
                ? " It matches the provided regex pattern."
                : " This pumping is consistent with regularity — the language may be regular."
              }
            </span>
          </div>
        </div>
      ) : (
        <div className="result-content reject">
          <span className="result-icon">❌</span>
          <div className="result-text">
            <span className="result-title">Pumped String Rejected</span>
            <span className="result-desc">
              The pumped string xy<sup>i</sup>z no longer belongs to the language.
              {customRegex
                ? " It no longer matches the provided regex pattern."
                : " This decomposition breaks membership — evidence the language is not regular."
              }
            </span>
          </div>
        </div>
      )}

    </div>
  );
}

export default ExplanationPanel;