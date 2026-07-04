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
  telegram: "https://t.me",
};

const INITIAL_EVENTS = [
  {
    id: "evt-108",
    kind: "airdrop",
    label: "Airdropped to 5,000 holders",
    amount: 1194250,
    recipients: 5000,
    signature: "3k3C8BQ7Q9cH8a66Y9Jj5yQb5BxYzg6QHr4fY2w9SGxMh7fVCuR4zc2nD1Lyhnk6bw5YZ7A2RCR21p7CV7xHe3QB",
    createdAt: "2026-07-04T10:20:00.000Z",
  },
  {
    id: "evt-107",
    kind: "buyback",
    label: "Bought 1,194,250 GOBLIN",
    amount: 38.72,
    signature: "5xNrUdNuHGwrypUrYFfAoUjZ39wW97vXH2nV7AHWnWikWcBvfJ6hkrP9D29aJjrdKLCSaVY4CyH6wzWgMzJ9eJ7j",
    createdAt: "2026-07-04T10:03:00.000Z",
  },
  {
    id: "evt-106",
    kind: "claim",
    label: "Creator fees claimed",
    amount: 46.91,
    signature: "2gt8CG2E1MS74Lq84QvF3M9kCW8T2yNP5DgMj1Xd5wMii9g8P3iK95rh9jN8cLkjVVFYqtx9hYj2vU9JWx6E8YhA",
    createdAt: "2026-07-04T10:01:00.000Z",
  },
  {
    id: "evt-105",
    kind: "airdrop",
    label: "Airdropped to 4,200 holders",
    amount: 780334,
    recipients: 4200,
    signature: "3b9sP8oFTV4J1mBMMizbWxk3FtMRWcfA6vSqmLrK5fW4XyL8wA5s6yM6PJ1rR7u2X71XzjHBf3MBQokM33eVdjQ1",
    createdAt: "2026-07-04T07:32:00.000Z",
  },
  {
    id: "evt-104",
    kind: "buyback",
    label: "Bought 780,334 GOBLIN",
    amount: 29.16,
    signature: "5ja8DngX3TGWwqJ9iqx3X8ktdMLqRjvSY7gNmsP9Se2EEvzT2AkKf29x6ZVwV9MZr8R8mQao8HHoL4GaR22mPUKf",
    createdAt: "2026-07-04T07:12:00.000Z",
  },
  {
    id: "evt-103",
    kind: "claim",
    label: "Creator fees claimed",
    amount: 34.7,
    signature: "4bYtJf5h9HhGEoH4fe2z9gx42iA5hPN4qfD3s2Gz7m8F8wmYVqaQw2vAqPAe8m7UobQvhZ6NwYxX5Nu9m4NCXY4S",
    createdAt: "2026-07-04T07:10:00.000Z",
  },
  {
    id: "evt-102",
    kind: "airdrop",
    label: "Airdropped to 3,200 holders",
    amount: 492001,
    recipients: 3200,
    signature: "4cDVXbG8x4TY8N7TGwNqJoZpW8CC92uD7wFQVh7rQx2J23D2BMyw26ppFf9yhM8xhdg56E9vtKmTP9Vwc5xAcXyA",
    createdAt: "2026-07-04T05:45:00.000Z",
  },
  {
    id: "evt-101",
    kind: "buyback",
    label: "Bought 492,001 GOBLIN",
    amount: 17.48,
    signature: "3cwH8QVSe8G1UADJzJr4tKYZGmVBwB9N2y6YfXWv7HiV2QfC8zc3r7RLBrFoqmBc5oAfmBUq1aTr5xqwgzVnH2tN",
    createdAt: "2026-07-04T05:33:00.000Z",
  },
];

const SIMULATED_EVENTS = [
  { kind: "claim", label: "Creator fees claimed", amount: 19.44 },
  { kind: "buyback", label: "Bought 301,240 GOBLIN", amount: 12.09 },
  { kind: "airdrop", label: "Airdropped to 2,000 holders", amount: 301240, recipients: 2000 },
];

function short(value, left = 6, right = 5) {
  if (!value) return "-";
  if (value.length <= left + right + 1) return value;
  return `${value.slice(0, left)}...${value.slice(-right)}`;
}

function num(value, decimals = 0) {
  if (value === null || value === undefined) return "-";
  return Number(value).toLocaleString(undefined, {
    maximumFractionDigits: decimals,
  });
}

function ago(ts) {
  const diff = Math.max(0, Date.now() - new Date(ts).getTime());
  const s = Math.floor(diff / 1000);
  if (s < 60) return `${s}s ago`;
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

function Row({ event, isNew, onCopy }) {
  return (
    <div className={`feed-row ${isNew ? "is-new" : ""}`}>
      <span className={`badge badge-${event.kind}`}>{event.kind}</span>
      <span className="feed-label">{event.label}</span>
      <span className="feed-amount">
        {event.kind === "buyback" ? `${num(event.amount, 2)} SOL` : num(event.amount)}
      </span>
      <button className="mono feed-copy" onClick={() => onCopy(event.signature, "signature copied")}>
        {short(event.signature)}
      </button>
      <a
        className="mono feed-time"
        href={`https://solscan.io/tx/${event.signature}`}
        target="_blank"
        rel="noreferrer"
      >
        {ago(event.createdAt)}
      </a>
    </div>
  );
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
  const [events, setEvents] = useState(INITIAL_EVENTS);
  const [newIds, setNewIds] = useState(new Set());
  const [status, setStatus] = useState("");
  const [live, setLive] = useState(false);

  useEffect(() => {
    const ready = setTimeout(() => setLive(true), 900);
    return () => clearTimeout(ready);
  }, []);

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i >= SIMULATED_EVENTS.length) return;
      const seed = SIMULATED_EVENTS[i];
      const evt = {
        ...seed,
        id: `sim-${Date.now()}-${i}`,
        signature: `S${Math.random().toString(36).slice(2)}${Math.random().toString(36).slice(2)}${Math.random().toString(36).slice(2)}`,
        createdAt: new Date().toISOString(),
      };
      setEvents((prev) => [evt, ...prev].slice(0, 40));
      setNewIds(new Set([evt.id]));
      setTimeout(() => setNewIds(new Set()), 1100);
      i += 1;
    }, 20000);
    return () => clearInterval(timer);
  }, []);

  const stats = useMemo(() => {
    const buybacks = events.filter((e) => e.kind === "buyback");
    const airdrops = events.filter((e) => e.kind === "airdrop");
    const solRecycled = buybacks.reduce((sum, e) => sum + Number(e.amount || 0), 0);
    const walletsPaid = airdrops.reduce((sum, e) => sum + Number(e.recipients || 0), 0);
    return {
      solRecycled,
      buybackCount: buybacks.length,
      walletsPaid,
      lastDropAt: airdrops[0]?.createdAt,
    };
  }, [events]);

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
            <a href="#live">feed</a>
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
                {TOKEN.target} holders. No claim site. No team wallet. Just script and proof.
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
          <div className="hero-live mono">
            <span className={`dot ${live ? "is-live" : ""}`} />
            {live ? "live on solana" : "connecting"}
          </div>
        </section>

        <section id="live" className="section">
          <div className="container">
            <div className="section-head">
              <h2 className="display">
                <span className="mono tiny hot">/01</span> live feed
              </h2>
              <span className="mono tiny muted">
                <span className={`dot ${live ? "is-live" : ""}`} /> buybacks + airdrops
              </span>
            </div>
            <div className="card feed">
              {events.map((event) => (
                <Row key={event.id} event={event} isNew={newIds.has(event.id)} onCopy={copyText} />
              ))}
            </div>
            <div className="mono tiny muted">// all signatures verifiable on solscan</div>
          </div>
        </section>

        <section id="stats" className="section">
          <div className="container">
            <div className="section-head">
              <h2 className="display">
                <span className="mono tiny hot">/02</span> on-chain proof
              </h2>
            </div>
            <div className="stats-grid">
              <Stat label="SOL recycled" value={num(stats.solRecycled, 2)} suffix="SOL" />
              <Stat label="buybacks" value={num(stats.buybackCount)} />
              <Stat label="wallets paid" value={num(stats.walletsPaid)} />
              <Stat label="last drop" value={stats.lastDropAt ? ago(stats.lastDropAt).replace(" ago", "") : "-"} suffix="ago" />
            </div>
          </div>
        </section>

        <section className="section section-art">
          <div className="container art-banner">
            <div className="mono tiny hot">/ ride the black bull</div>
            <h3 className="display">short kings. black bulls.</h3>
            <p className="mono">
              Grab the bull. Raid fees. Feed holders.
            </p>
          </div>
        </section>

        <section id="how" className="section">
          <div className="container">
            <div className="section-head">
              <h2 className="display">
                <span className="mono tiny hot">/03</span> how it works
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
                <span className="mono tiny hot">/04</span> house rules
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
          <div className="container token-card card">
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
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-inner">
          <div>
            <h5 className="display">ansem goblins.</h5>
            <p className="mono muted">A community experiment. Not financial advice. Verify every transaction.</p>
            <div className="footer-links">
              <a className="btn btn-ghost" href={LINKS.twitter} target="_blank" rel="noreferrer">
                x / twitter
              </a>
              <a className="btn btn-ghost" href={LINKS.telegram} target="_blank" rel="noreferrer">
                telegram
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
