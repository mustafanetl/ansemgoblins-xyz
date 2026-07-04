import { useState } from "react";

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
  { label: "Network", value: "Solana", suffix: "mainnet" },
  { label: "Focus", value: "Buybacks", suffix: "plus drops" },
  { label: "Style", value: "Black Bull", suffix: "goblin mode" },
];

function short(value, left = 6, right = 5) {
  if (!value) return "-";
  if (value.length <= left + right + 1) return value;
  return `${value.slice(0, left)}...${value.slice(-right)}`;
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

  return (
    <div className="page">
      <header className="topbar">
        <div className="container topbar-inner">
          <a href="#top" className="brand">
            <span className="brand-logo">$</span>
            <span className="display brand-text">{TOKEN.target} GOBLINS</span>
          </a>
          <nav className="mono nav-links">
            <a href="#stats">stats</a>
            <a href="#how">how</a>
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
              <div className="mono tiny hot">/ return to goblin season</div>
              <h1 className="display hero-title">
                we are the <span className="hot">{TOKEN.target.toLowerCase()} goblins.</span>
              </h1>
              <p className="mono hero-sub">
                Creator fees come in. ${TOKEN.ticker} is bought back on-chain. Every cycle the bag drops on $
                {TOKEN.target} holders. No claim site. No team wallet. X only, no Telegram.
              </p>
              <div className="hero-actions">
                <a className="btn btn-hot" href={LINKS.pumpfun} target="_blank" rel="noreferrer">
                  buy on pump.fun {"->"}
                </a>
                <a
                  className="btn btn-ghost"
                  href={`https://solscan.io/token/${TOKEN.mint}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  solscan {"->"}
                </a>
                <a className="btn btn-ghost" href={LINKS.twitter} target="_blank" rel="noreferrer">
                  join on x {"->"}
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
            </div>
          </div>
        </section>

        <section id="stats" className="section">
          <div className="container">
            <div className="section-head">
              <h2 className="display">
                <span className="mono tiny hot">/01</span> project signal
              </h2>
            </div>
            <div className="stats-grid">
              {SIGNAL.map((item) => (
                <Stat key={item.label} label={item.label} value={item.value} suffix={item.suffix} />
              ))}
            </div>
          </div>
        </section>

        <section className="section section-art">
          <div className="container art-banner">
            <div className="mono tiny hot">/ ride the black bull</div>
            <h3 className="display">Short Kings. Black Bulls.</h3>
            <p className="mono">Grab the bull. Raid hard. Feed holders.</p>
          </div>
        </section>

        <section id="how" className="section">
          <div className="container">
            <div className="section-head">
              <h2 className="display">
                <span className="mono tiny hot">/02</span> how it works
              </h2>
            </div>
            <div className="steps">
              <article className="card">
                <p className="mono tiny hot">step 01</p>
                <h4 className="display">claim the fees</h4>
                <p>Creator fees are permissionlessly swept from vaults into treasury execution flow.</p>
              </article>
              <article className="card">
                <p className="mono tiny hot">step 02</p>
                <h4 className="display">buy ${TOKEN.ticker}</h4>
                <p>Every SOL of claim is used for market buybacks. Every transaction is posted and verifiable.</p>
              </article>
              <article className="card">
                <p className="mono tiny hot">step 03</p>
                <h4 className="display">drop on ${TOKEN.target}</h4>
                <p>Snapshot holders, apply anti-sybil filters, and send drops directly. No claim website required.</p>
              </article>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="section-head">
              <h2 className="display">
                <span className="mono tiny hot">/03</span> house rules
              </h2>
            </div>
            <div className="rules">
              <article className="card">
                <p className="display">no dust</p>
                <p>Wallets below minimum threshold are excluded.</p>
              </article>
              <article className="card">
                <p className="display">proof first</p>
                <p>Claim, buyback, and airdrop txs are all public.</p>
              </article>
              <article className="card">
                <p className="display">no team bag</p>
                <p>No hidden allocation for insiders.</p>
              </article>
              <article className="card">
                <p className="display">no fixed schedule</p>
                <p>Drops execute when treasury conditions are met.</p>
              </article>
            </div>
          </div>
        </section>

        <section id="token" className="section">
          <div className="container">
            <div className="section-head">
              <h2 className="display">
                <span className="mono tiny hot">/04</span> token
              </h2>
            </div>
            <div className="token-card card">
              <p className="mono tiny muted">contract address</p>
              <code className="token-ca">{TOKEN.mint}</code>
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
              <p className="mono tiny muted">${TOKEN.ticker} - token-2022 - 6 decimals - solana mainnet</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-inner">
          <div>
            <h5 className="display">ansem goblins.</h5>
            <p className="mono muted">A community experiment. Not financial advice. Verify every transaction.</p>
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
