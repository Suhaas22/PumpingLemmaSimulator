import { useState } from "react";

const languages = [
  { value: "anbn",   formula: "L = aⁿ bⁿ",     type: "Not Regular" },
  { value: "anbncn", formula: "L = aⁿ bⁿ cⁿ",   type: "Not CFL" },
  { value: "abstar", formula: "L = (ab)*",       type: "Regular" },
  { value: "anbm",   formula: "L = aⁿ bᵐ",      type: "Regular" },
  { value: "wcwr",   formula: "L = wcwᴿ",        type: "Not Regular" },
  { value: "custom", formula: "Custom Language",  type: "User Defined" },
];

function LanguageSelector({ language, setLanguage, customRegex, setCustomRegex }) {

  const [regexError, setRegexError] = useState("");

  const handleRegexChange = (value) => {
    setCustomRegex(value);
    // Validate the regex
    if (value.trim() === "") {
      setRegexError("");
      return;
    }
    try {
      new RegExp("^" + value + "$");
      setRegexError("");
    } catch (e) {
      setRegexError("Invalid regex pattern");
    }
  };

  return (
    <div className="glass-card">

      <div className="card-header">
        <div className="card-icon purple">🔤</div>
        <div>
          <div className="card-title">Select Language</div>
          <div className="card-title-sub">Choose a formal language or define your own</div>
        </div>
      </div>

      <div className="language-options">
        {languages.map((lang) => (
          <div
            key={lang.value}
            className={`language-option ${language === lang.value ? "active" : ""}`}
            onClick={() => setLanguage(lang.value)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && setLanguage(lang.value)}
            id={`language-option-${lang.value}`}
          >
            <div className="language-radio" />
            <span className="language-formula">{lang.formula}</span>
            <span className="language-type">{lang.type}</span>
          </div>
        ))}
      </div>

      {/* Custom language regex input */}
      {language === "custom" && (
        <div className="custom-language-section">
          <div className="form-group">
            <label className="form-label" htmlFor="custom-regex">
              Language Pattern (Regex)
            </label>
            <input
              id="custom-regex"
              className={`form-input ${regexError ? "form-input-error" : ""}`}
              type="text"
              value={customRegex}
              onChange={(e) => handleRegexChange(e.target.value)}
              placeholder="e.g. (ab)*c+ or a*b*"
              spellCheck="false"
              autoComplete="off"
            />
            {regexError && (
              <div className="form-error">{regexError}</div>
            )}
            <div className="form-hint">
              Enter a regex to define language membership. The string will be tested against <code>^your_pattern$</code>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default LanguageSelector;