import { useState } from "react";
import LanguageSelector from "../components/LanguageSelector";
import PumpingControl from "../components/PumpingControl";
import StringDisplay from "../components/StringDisplay";
import PumpingVisualizer from "../components/PumpingVisualizer";
import ExplanationPanel from "../components/ExplanationPanel";

import {
  generateString,
  splitString,
  pumpString,
  checkLanguage
} from "../utils/pumpingLogic";

function Simulator() {

  const [language, setLanguage] = useState("anbn");
  const [p, setP] = useState(3);
  const [string, setString] = useState("");
  const [split, setSplit] = useState(null);
  const [i, setI] = useState(0);
  const [pumped, setPumped] = useState("");
  const [result, setResult] = useState(null);

  // Custom language state
  const [customRegex, setCustomRegex] = useState("");
  const [customString, setCustomString] = useState("");

  const isCustom = language === "custom";

  // Track which step the user is on for the step indicator
  const getStep = () => {
    if (result !== null) return 3;
    if (split) return 2;
    if (string) return 1;
    return 0;
  };

  const step = getStep();

  // Reset state when language changes
  const handleLanguageChange = (newLang) => {
    setLanguage(newLang);
    setString("");
    setSplit(null);
    setPumped("");
    setResult(null);
  };

  const handleGenerate = () => {
    let s;
    if (isCustom) {
      s = customString.trim();
    } else {
      s = generateString(language, p);
    }
    setString(s);
    setSplit(null);
    setPumped("");
    setResult(null);
  };

  const handleSplit = () => {
    if (!string) return;
    const sp = splitString(string, p);
    setSplit(sp);
    setPumped("");
    setResult(null);
  };

  const handlePump = () => {
    if (!split) return;
    const ps = pumpString(split, i);
    setPumped(ps);
    const res = checkLanguage(ps, language, customRegex);
    setResult(res);
  };

  return (
    <>
      {/* Step indicator */}
      <div className="steps-indicator">
        <div className={`step-dot ${step >= 1 ? (step > 1 ? 'completed' : 'active') : ''}`} />
        <div className={`step-dot ${step >= 2 ? (step > 2 ? 'completed' : 'active') : ''}`} />
        <div className={`step-dot ${step >= 3 ? 'active' : ''}`} />
      </div>

      <div className="simulator-grid">

        {/* Left sidebar */}
        <div className="sidebar-panel">

          <LanguageSelector
            language={language}
            setLanguage={handleLanguageChange}
            customRegex={customRegex}
            setCustomRegex={setCustomRegex}
          />

          <PumpingControl
            p={p}
            setP={setP}
            i={i}
            setI={setI}
            onGenerate={handleGenerate}
            onSplit={handleSplit}
            onPump={handlePump}
            hasString={!!string}
            hasSplit={!!split}
            isCustom={isCustom}
            customString={customString}
            setCustomString={setCustomString}
          />

        </div>

        {/* Right content */}
        <div className="content-panel">

          <StringDisplay string={string} />

          <PumpingVisualizer
            split={split}
            pumped={pumped}
          />

          <ExplanationPanel result={result} customRegex={isCustom ? customRegex : null} />

        </div>

      </div>
    </>
  );
}

export default Simulator;