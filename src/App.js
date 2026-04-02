import Simulator from "./pages/Simulator";

function App() {
  return (
    <div className="app">

      {/* Header */}
      <header className="header">
        <div className="header-inner">
          <div className="header-brand">
            <div className="header-icon">λ</div>
            <div>
              <div className="header-title">Pumping Lemma</div>
              <div className="header-subtitle">Interactive Simulator</div>
            </div>
          </div>
          <div className="header-badge">
            <span className="header-badge-dot" />
            Formal Languages
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="main-content">

        {/* Hero Banner */}
        <section className="hero-section">
          <h1 className="hero-title">Pumping Lemma Simulator</h1>
          <p className="hero-description">
            Explore the pumping lemma interactively — generate strings, decompose them into
            <em> x·y·z</em>, pump <em>y</em>, and observe whether the language holds.
          </p>
        </section>

        <Simulator />

      </main>

      {/* Footer */}
      <footer className="footer">
        Built for Theory of Computation — Understanding regularity through pumping.
      </footer>

    </div>
  );
}

export default App;