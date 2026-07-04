import { useEffect, useMemo, useState } from "react";

const TOKEN = {
  name: "ANSEM GOBLINS",
  ticker: "GOBLIN",
  mint: "ANSEMGOBLINS111111111111111111111111111111111",
  target: "ANSEM",
};

const LINKS = {
  pumpfun: "https://pump.fun",
  dexscreener: "https://dexscreener.com",
  twitter: "https://x.com",
};

const SIGNAL = [
  { label: "Community", value: "X", suffix: "only" },
  { label: "Chain", value: "Solana", suffix: "mainnet" },
  { label: "Engine", value: "Fee -> Buyback", suffix: "auto cycle" },
  { label: "Focus", value: "Holders", suffix: "drop-first" },
];

const STEPS = [
  {
    id: "01",
    title: "claim fees",
    body: "Creator fees are routed into a public execution flow with no hidden wallet hop.",
  },
  {
    id: "02",
    title: "buy $goblin",
    body: "The claim is converted into market buybacks. Transactions remain transparent and verifiable.",
  },
  {
    id: "03",
    title: "drop to ansem",
    body: "Qualified holders receive the drop directly from the cycle output. No claim page required.",
  },
];

const RULES = [
  {
    title: "no dust",
    body: "Wallets below minimum threshold are excluded from drops.",
  },
  {
    title: "proof first",
    body: "Every cycle is intended to be auditable on-chain.",
  },
  {
    title: "no team bag",
    body: "No hidden insider allocation baked into the flow.",
  },
  {
    title: "event cadence",
    body: "Cycles trigger on treasury conditions, not fake daily promises.",
  },
];

const TOKEN_FACTS = [
  "Token-2022",
  "6 decimals",
  "Solana mainnet",
  "Community-led",
  "X only",
];

const AIRDROP_SOURCE = "./data/airdrops.json";

function short(value, left = 6, right = 5) {
  if (!value) return "-";
  if (value.length <= left + right + 1) return value;
  return `${value.slice(0, left)}...${value.slice(-right)}`;
}

function num(value) {
  const n = Number(value);
  if (!Number.isFinite(n)) return "-";
  return n.toLocaleString(undefined, { maximumFractionDigits: 2 });
}

function fmtDate(value) {
  if (!value) return "-";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "-";
  return new Intl.DateTimeFormat(undefined, {
    year: "numeric",
    month: "short",
    day: "2-digit",
  }).format(d);
}

function Stat({ label, value, suffix }) {
  return (
    <div className="card stat">
      <p className="mono tiny">{label}</p>
      <p className="display stat-value">
        {value}
        {suffix ? <span className="mono stat-suffix"> {suffix}</span> : null}
      </p>
    </div>
  );
}

export default function App() {
  const [status, setStatus] = useState("");
  const [airdropState, setAirdropState] = useState({
    loading: true,
    error: "",
    updatedAt: null,
  });
  const [airdropLogs, setAirdropLogs] = useState([]);

  const copyText = async (text, message = "copied") => {
    try {
      await navigator.clipboard.writeText(text);
      setStatus(message);
      setTimeout(() => setStatus(""), 1300);
    } catch {
      setStatus("copy failed");
      setTimeout(() => setStatus(""), 1300);
    }
  };

  useEffect(() => {
    const controller = new AbortController();

    async function loadAirdrops() {
      try {
        setAirdropState({ loading: true, error: "", updatedAt: null });
        const res = await fetch(AIRDROP_SOURCE, { cache: "no-store", signal: controller.signal });
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }
        const payload = await res.json();
        const entries = Array.isArray(payload?.entries) ? payload.entries : Array.isArray(payload) ? payload : [];
        const normalized = entries
          .map((entry, idx) => ({
            key: entry.id || `${entry.tx || "row"}-${idx}`,
            timestamp: entry.timestamp || entry.date || null,
            wallets: entry.wallets ?? entry.recipients ?? null,
            amount: entry.amount ?? null,
            tx: entry.tx || entry.signature || "",
          }))
          .filter((entry) => entry.tx || entry.timestamp || entry.wallets !== null || entry.amount !== null);

        setAirdropLogs(normalized);
        setAirdropState({
          loading: false,
          error: "",
          updatedAt: payload?.updatedAt || null,
        });
      } catch (error) {
        if (error.name === "AbortError") return;
        setAirdropLogs([]);
        setAirdropState({
          loading: false,
          error: "Airdrop feed not reachable yet.",
          updatedAt: null,
        });
      }
    }

    loadAirdrops();
    return () => controller.abort();
  }, []);

  const airdropMeta = useMemo(() => {
    if (airdropState.updatedAt) {
      return `last update: ${fmtDate(airdropState.updatedAt)}`;
    }
    return "last update: pending";
  }, [airdropState.updatedAt]);

  return (
    <div className="page">
      <header className="topbar">
        <div className="container topbar-inner">
          <a href="#top" className="brand">
            <span className="brand-logo">$</span>
            <span className="display brand-text">{TOKEN.target} GOBLINS</span>
          </a>
          <nav className="mono nav-links">
            <a href="#signal">signal</a>
            <a href="#airdrops">airdrops</a>
            <a href="#how">how</a>
            <a href="#rules">rules</a>
            <a href="#token">token</a>
          </nav>
          <a className="btn btn-hot" href={LINKS.pumpfun} target="_blank" rel="noreferrer">
            buy ${TOKEN.ticker} {"->"}
          </a>
        </div>
      </header>

      <main>
        <section id="top" className="hero">
          <div className="container hero-inner">
            <div className="hero-copy">
              <div className="mono tiny hot">/ ansem goblins protocol</div>
              <h1 className="display hero-title">
                black bull <span className="hot">goblins.</span>
              </h1>
              <p className="mono hero-sub">
                Creator fees route into buybacks, then cycle into holder drops. Clean flow, public trail, no fake
                social noise. X only. No Telegram.
              </p>
              <div className="hero-tags">
                <span className="chip mono">no claim page</span>
                <span className="chip mono">no team wallet</span>
                <span className="chip mono">on-chain focus</span>
              </div>
              <div className="hero-actions">
                <a className="btn btn-hot" href={LINKS.pumpfun} target="_blank" rel="noreferrer">
                  buy on pump.fun {"->"}
                </a>
                <a
                  className="btn btn-ghost"
                  href={LINKS.dexscreener}
                  target="_blank"
                  rel="noreferrer"
                >
                  chart on dex {"->"}
                </a>
                <a className="btn btn-ghost" href={LINKS.twitter} target="_blank" rel="noreferrer">
                  follow on x {"->"}
                </a>
              </div>
              <div className="contract mono">
                <span className="tiny">CA</span>
                <code>{short(TOKEN.mint, 12, 10)}</code>
                <button onClick={() => copyText(TOKEN.mint, "contract copied")}>copy</button>
              </div>
            </div>

            <div className="hero-art" aria-label="Fee Goblin riding the black bull mascot">
              <img className="hero-rider" src="/assets/goblin-bull-hero.png" alt="Fee Goblin riding black bull" />
              <span className="hero-badge mono">black bull mode</span>
            </div>
          </div>
        </section>

        <section id="signal" className="section">
          <div className="container">
            <div className="section-head">
              <h2 className="display">
                <span className="mono tiny hot">/01</span> project signal
              </h2>
            </div>
            <p className="section-lead mono">
              Minimal stack, clear mission. Keep the cycle readable and keep the community aligned.
            </p>
            <div className="stats-grid">
              {SIGNAL.map((item) => (
                <Stat key={item.label} label={item.label} value={item.value} suffix={item.suffix} />
              ))}
            </div>
          </div>
        </section>

        <section className="section section-art">
          <div className="container art-banner">
            <div className="mono tiny hot">/ raid posture</div>
            <h3 className="display">No Noise. Full Send.</h3>
            <p className="mono">Grab the bull. Push the cycle. Reward the holders.</p>
          </div>
        </section>

        <section id="airdrops" className="section">
          <div className="container">
            <div className="section-head">
              <h2 className="display">
                <span className="mono tiny hot">/02</span> airdrop board
              </h2>
            </div>
            <p className="section-lead mono">
              This board is live-ready. No fake entries are shown; real on-chain drop records will appear here.
            </p>
            <div className="card airdrop-board">
              <div className="airdrop-head mono tiny">
                <span>date</span>
                <span>wallets</span>
                <span>amount</span>
                <span>tx</span>
              </div>
              <div className="airdrop-body">
                {airdropState.loading ? (
                  <div className="airdrop-empty mono">Loading feed...</div>
                ) : null}
                {!airdropState.loading && airdropState.error ? (
                  <div className="airdrop-empty mono">{airdropState.error}</div>
                ) : null}
                {!airdropState.loading && !airdropState.error && airdropLogs.length === 0 ? (
                  <div className="airdrop-empty mono">
                    No airdrop data yet. First verified drop will populate this section.
                  </div>
                ) : null}
                {!airdropState.loading && !airdropState.error && airdropLogs.length > 0
                  ? airdropLogs.map((entry) => (
                      <div key={entry.key} className="airdrop-row mono">
                        <span>{fmtDate(entry.timestamp)}</span>
                        <span>{num(entry.wallets)}</span>
                        <span>{num(entry.amount)}</span>
                        {entry.tx ? (
                          <button
                            className="airdrop-tx"
                            onClick={() => copyText(entry.tx, "tx copied")}
                            title="Copy transaction signature"
                          >
                            {short(entry.tx, 7, 6)}
                          </button>
                        ) : (
                          <span>-</span>
                        )}
                      </div>
                    ))
                  : null}
              </div>
            </div>
            <p className="mono tiny muted airdrop-meta">source: {AIRDROP_SOURCE} | {airdropMeta}</p>
          </div>
        </section>

        <section id="how" className="section">
          <div className="container">
            <div className="section-head">
              <h2 className="display">
                <span className="mono tiny hot">/03</span> how it works
              </h2>
            </div>
            <p className="section-lead mono">
              One loop, three steps. Keep execution direct and publicly checkable.
            </p>
            <div className="steps">
              {STEPS.map((step) => (
                <article key={step.id} className="card">
                  <p className="mono tiny hot">step {step.id}</p>
                  <h4 className="display">{step.title}</h4>
                  <p>{step.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="rules" className="section">
          <div className="container">
            <div className="section-head">
              <h2 className="display">
                <span className="mono tiny hot">/04</span> house rules
              </h2>
            </div>
            <p className="section-lead mono">
              Guardrails matter. The cleaner the rules, the cleaner the culture.
            </p>
            <div className="rules">
              {RULES.map((rule) => (
                <article key={rule.title} className="card">
                  <p className="display">{rule.title}</p>
                  <p>{rule.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="token" className="section">
          <div className="container">
            <div className="section-head">
              <h2 className="display">
                <span className="mono tiny hot">/05</span> token
              </h2>
            </div>
            <div className="token-card card">
              <p className="mono tiny muted">contract address</p>
              <code className="token-ca">{TOKEN.mint}</code>
              <div className="token-facts">
                {TOKEN_FACTS.map((fact) => (
                  <span key={fact} className="chip mono">
                    {fact}
                  </span>
                ))}
              </div>
              <div className="token-actions">
                <button className="btn btn-ghost" onClick={() => copyText(TOKEN.mint, "contract copied")}>
                  copy CA
                </button>
                <a className="btn btn-ghost" href={`https://solscan.io/token/${TOKEN.mint}`} target="_blank" rel="noreferrer">
                  solscan
                </a>
                <a className="btn btn-ghost" href={LINKS.dexscreener} target="_blank" rel="noreferrer">
                  dexscreener
                </a>
                <a className="btn btn-hot" href={LINKS.pumpfun} target="_blank" rel="noreferrer">
                  buy on pump.fun {"->"}
                </a>
              </div>
              <p className="mono tiny muted">${TOKEN.ticker} - transparent cycle concept - always verify on-chain</p>
            </div>
          </div>
        </section>

        <section className="section section-cta">
          <div className="container">
            <div className="card cta-card">
              <p className="mono tiny hot">/ join the raid</p>
              <h3 className="display">x is home. goblins move fast.</h3>
              <p className="mono">If you ride this, keep it clean: verify first, then act.</p>
              <div className="hero-actions">
                <a className="btn btn-hot" href={LINKS.twitter} target="_blank" rel="noreferrer">
                  open x {"->"}
                </a>
                <a className="btn btn-ghost" href={LINKS.pumpfun} target="_blank" rel="noreferrer">
                  buy ${TOKEN.ticker} {"->"}
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-inner">
          <div>
            <h5 className="display">ansem goblins.</h5>
            <p className="mono muted">
              Community-built culture layer. Not financial advice. Verify every wallet action before you click.
            </p>
            <div className="footer-links">
              <a className="btn btn-ghost" href={LINKS.twitter} target="_blank" rel="noreferrer">
                x
              </a>
            </div>
          </div>
          <div className="footer-art">
            <img src="/assets/goblin-transparent.png" alt="Fee Goblin mascot" />
          </div>
        </div>
      </footer>

      {status ? <div className="toast mono">{status}</div> : null}
    </div>
  );
}
