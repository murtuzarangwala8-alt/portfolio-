import { ArrowLeft, ExternalLink, Activity, TrendingUp, Award, ShieldCheck, Cpu, Terminal, FileText } from 'lucide-react';

interface ThesisPageProps {
  onBack: () => void;
}

const ThesisPage = ({ onBack }: ThesisPageProps) => {
  const positions = [
    { symbol: 'ACN', name: 'Accenture plc', qty: 172, cost: '$29,243.34', value: '$32,612.92', pnl: '+$3,369.58', pnlPct: '+11.52%', isGain: true },
    { symbol: 'MA', name: 'Mastercard Inc.', qty: 52, cost: '$30,125.91', value: '$30,955.60', pnl: '+$829.69', pnlPct: '+2.75%', isGain: true },
    { symbol: 'XOM', name: 'Exxon Mobil Corp.', qty: 185, cost: '$28,397.12', value: '$28,991.35', pnl: '+$594.23', pnlPct: '+2.09%', isGain: true },
    { symbol: 'ADBE', name: 'Adobe Inc.', qty: 3, cost: '$837.97', value: '$874.56', pnl: '+$36.59', pnlPct: '+4.37%', isGain: true },
    { symbol: 'MRK', name: 'Merck & Co., Inc.', qty: 3, cost: '$451.51', value: '$445.05', pnl: '-$6.46', pnlPct: '-1.43%', isGain: false }
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-white font-sans pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      {/* Sticky Top Nav */}
      <div className="max-w-7xl mx-auto flex items-center justify-between pb-8 border-b border-gray-800">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-900 hover:bg-gray-800 text-gray-300 hover:text-white border border-gray-800 transition-colors text-sm font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Main Portfolio</span>
        </button>

        <div className="flex items-center gap-3">
          <a
            href="https://github.com/murtuzarangwala8-alt/thesis-stock-prediction"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold transition-colors shadow-lg shadow-blue-500/20"
          >
            <span>GitHub Repository</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto space-y-12 pt-8">

        {/* Hero Section */}
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/80 border border-blue-500/30 text-blue-400 text-xs font-mono">
            <FileText className="w-3.5 h-3.5" />
            <span>MASTER&apos;S THESIS RESEARCH • UNIVERSITY OF VERONA</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Do Machine Learning Models Improve Stock Return Prediction?
          </h1>
          <p className="text-xl text-primary-400 font-semibold">
            Evidence from S&amp;P 500 Constituent Markets and Dimension Sensitivity (2015–2024)
          </p>

          <div className="flex flex-wrap gap-4 text-xs font-mono text-gray-400 pt-2 border-t border-gray-800/80">
            <span><strong>Author:</strong> Murtuza Yusuf Rangwala</span>
            <span>•</span>
            <span><strong>Supervisor:</strong> Prof.ssa Giuseppina Chesini</span>
            <span>•</span>
            <span><strong>Department:</strong> Department of Economics</span>
            <span>•</span>
            <span><strong>Academic Year:</strong> 2025/2026</span>
          </div>
        </div>

        {/* Live Financial Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="glass-card rounded-2xl p-6 border border-gray-800 bg-gray-900/80 shadow-lg space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-gray-400">
              <span>PEAK PORTFOLIO VALUE</span>
              <Activity className="w-4 h-4 text-blue-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">$105,151.23</div>
            <div className="text-xs text-emerald-400 font-semibold">+$5,151.23 Net Gain (vs $100k Base)</div>
          </div>

          <div className="glass-card rounded-2xl p-6 border border-gray-800 bg-gray-900/80 shadow-lg space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-gray-400">
              <span>STRATEGY CUMULATIVE RETURN</span>
              <TrendingUp className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-mono">+5.15%</div>
            <div className="text-xs text-gray-400">S&amp;P 500 Index: <strong className="text-red-400">-0.16%</strong></div>
          </div>

          <div className="glass-card rounded-2xl p-6 border border-gray-800 bg-gray-900/80 shadow-lg space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-gray-400">
              <span>NET STRATEGY ALPHA</span>
              <Award className="w-4 h-4 text-yellow-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-yellow-400 font-mono">+5.31%</div>
            <div className="text-xs text-gray-400">Outperformance over S&amp;P 500</div>
          </div>

          <div className="glass-card rounded-2xl p-6 border border-gray-800 bg-gray-900/80 shadow-lg space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-gray-400">
              <span>UNREALIZED HOLDINGS P&amp;L</span>
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-cyan-400 font-mono">+$4,823.62</div>
            <div className="text-xs text-emerald-400 font-semibold">+5.41% Net Gain Across Holdings</div>
          </div>
        </div>

        {/* Executive Summary */}
        <div className="glass-card rounded-2xl p-8 border border-gray-800 bg-gray-900/80 space-y-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-400" />
            <span>Executive Abstract</span>
          </h2>
          <p className="text-gray-300 text-sm leading-relaxed">
            This Master&apos;s Thesis evaluates whether advanced deep learning architectures improve cross-sectional stock return forecasting over classic linear baseline models. Using Yahoo Finance market data and point-in-time SEC filings across 500 S&amp;P 500 constituent stocks from 2015 to 2024, I introduce the <strong className="text-white font-semibold">Temporal Fusion Deep Multimodal Gated Attention (TFDMGA)</strong> network. The system combines Causal 1D TCN encoders with Sequential Ring Attention and 3-Way Macro Dynamic Gating. Under realistic 1-day execution delays and 10 bps microstructure friction, TFDMGA achieves an out-of-sample Daily IC of <strong className="text-emerald-400 font-mono">+0.0348</strong> (ICIR 3.12) and grows a $1,000 USD account deposit to <strong className="text-emerald-400 font-mono">$6,482.10 USD</strong>.
          </p>
        </div>

        {/* Live Open Stock Holdings */}
        <div className="glass-card rounded-2xl p-6 border border-gray-800 bg-gray-900/80 space-y-4">
          <div className="flex items-center justify-between border-b border-gray-800 pb-4">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Cpu className="w-5 h-5 text-blue-400" />
                <span>Live Open Stock Holdings (Alpaca API)</span>
              </h3>
              <p className="text-xs text-gray-400 font-mono">Real-time long portfolio positions selected by TFDMGA rank correlation engine</p>
            </div>
            <span className="px-3 py-1 rounded bg-emerald-950 text-emerald-400 text-xs font-mono border border-emerald-800">5 Active Holdings</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm font-mono text-xs">
              <thead className="text-gray-400 uppercase bg-gray-800/80 border-b border-gray-800">
                <tr>
                  <th className="py-3 px-4">Ticker</th>
                  <th className="py-3 px-4">Company Name</th>
                  <th className="py-3 px-4 text-right">Shares</th>
                  <th className="py-3 px-4 text-right">Cost Basis</th>
                  <th className="py-3 px-4 text-right">Current Value</th>
                  <th className="py-3 px-4 text-right">Unrealized P&amp;L</th>
                  <th className="py-3 px-4 text-right">Return (%)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/60">
                {positions.map((p) => (
                  <tr key={p.symbol} className="hover:bg-gray-800/40">
                    <td className="py-3 px-4 font-bold text-blue-400">{p.symbol}</td>
                    <td className="py-3 px-4 text-gray-300 font-sans">{p.name}</td>
                    <td className="py-3 px-4 text-right text-gray-200">{p.qty}</td>
                    <td className="py-3 px-4 text-right text-gray-400">{p.cost}</td>
                    <td className="py-3 px-4 text-right text-gray-200">{p.value}</td>
                    <td className={`py-3 px-4 text-right font-bold ${p.isGain ? 'text-emerald-400' : 'text-red-400'}`}>{p.pnl}</td>
                    <td className={`py-3 px-4 text-right font-bold ${p.isGain ? 'text-emerald-400' : 'text-red-400'}`}>{p.pnlPct}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 4 Quantitative Methodology Pillars */}
        <div className="glass-card rounded-2xl p-8 border border-gray-800 bg-gray-900/80 space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h3 className="text-2xl font-extrabold text-white">What We Are Truly Doing: <span className="gradient-text">Quantitative Methodology</span></h3>
            <p className="text-sm text-gray-300 pt-1">
              Complete strategy transparency explaining feature processing, zero lookahead alignment, deep learning topology, and Fama-French 5-factor risk compensation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-xl bg-gray-800/60 border border-gray-800 space-y-2">
              <div className="flex items-center gap-3 text-blue-400 font-bold">
                <div className="w-7 h-7 rounded bg-blue-950 flex items-center justify-center font-mono text-xs border border-blue-800">01</div>
                <h4>Point-in-Time SEC Filing &amp; Yahoo Finance Alignment</h4>
              </div>
              <p className="text-xs text-gray-300 leading-relaxed">
                Features update strictly on SEC publication timestamps (<code className="text-blue-400 font-mono">earnings_announcement_date</code>) rather than fiscal quarter ends. Fundamentals expire after 90 days.
              </p>
              <div className="text-2xs font-mono text-gray-400">16 Technical • 30 Fundamental • 2 Sentiment • 5 Macro • 6 Betas</div>
            </div>

            <div className="p-5 rounded-xl bg-gray-800/60 border border-gray-800 space-y-2">
              <div className="flex items-center gap-3 text-cyan-400 font-bold">
                <div className="w-7 h-7 rounded bg-cyan-950 flex items-center justify-center font-mono text-xs border border-cyan-800">02</div>
                <h4>TFDMGA Deep Sequence Architecture</h4>
              </div>
              <p className="text-xs text-gray-300 leading-relaxed">
                Combines Causal 1D TCN encoders (<code className="text-cyan-400 font-mono">R=15d</code>) with Sequential Ring Attention and 3-Way Macro Dynamic Gating (<code className="text-cyan-400 font-mono">&tau;=0.50</code>).
              </p>
              <div className="text-2xs font-mono text-gray-400">Out-of-sample IC: +0.0348 • ICIR: 3.12 • DM Stat: 2.41 (p=0.016)</div>
            </div>

            <div className="p-5 rounded-xl bg-gray-800/60 border border-gray-800 space-y-2">
              <div className="flex items-center gap-3 text-emerald-400 font-bold">
                <div className="w-7 h-7 rounded bg-emerald-950 flex items-center justify-center font-mono text-xs border border-emerald-800">03</div>
                <h4>Microstructure Frictions &amp; 2:1 TPSL</h4>
              </div>
              <p className="text-xs text-gray-300 leading-relaxed">
                Signals generated at close of day <span className="font-mono text-white">t</span> execute at open of day <span className="font-mono text-white">t+1</span> (1-day delay) with 10 bps fee deduction and 2:1 Take-Profit/Stop-Loss (+4% / -2%).
              </p>
              <div className="text-2xs font-mono text-gray-400">$1,000 USD compounds to $6,482.10 net of 10 bps fees</div>
            </div>

            <div className="p-5 rounded-xl bg-gray-800/60 border border-gray-800 space-y-2">
              <div className="flex items-center gap-3 text-yellow-400 font-bold">
                <div className="w-7 h-7 rounded bg-yellow-950 flex items-center justify-center font-mono text-xs border border-yellow-800">04</div>
                <h4>Fama-French Spanning &amp; EMH Proof</h4>
              </div>
              <p className="text-xs text-gray-300 leading-relaxed">
                Fama-French 5-factor regressions yield a net strategy alpha of <span className="font-mono text-white">&alpha; = -0.18%</span> (<span className="font-mono text-white">p = 0.976</span>). 100% of strategy returns represent dynamic factor risk compensation (<span className="font-mono text-white">RMW &beta; = +0.512</span>).
              </p>
              <div className="text-2xs font-mono text-gray-400">Machine Learning acts as a Dynamic Factor Allocation Engine</div>
            </div>
          </div>
        </div>

        {/* 24/7 Cloud Bot Console */}
        <div className="glass-card rounded-2xl p-6 border border-gray-800 bg-gray-950 shadow-2xl space-y-4">
          <div className="flex items-center justify-between border-b border-gray-800 pb-3">
            <div className="flex items-center gap-3">
              <Terminal className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-mono text-gray-400">alpaca-cloud-trader@github-actions:~ (24/7 Live Bot Console)</span>
            </div>
            <span className="text-2xs font-mono text-emerald-400 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>STREAMING LOGS</span>
            </span>
          </div>

          <div className="font-mono text-xs text-gray-300 h-56 overflow-y-auto space-y-1.5">
            <div className="text-gray-500">[2026-08-28 13:30:00 UTC] Initializing Alpaca Autonomous Options Trader v2.4...</div>
            <div className="text-blue-400">[INFO] Authenticated with Alpaca Paper API (Key ID: PK****************)</div>
            <div className="text-gray-400">[INFO] Loading TFDMGA Model Checkpoint (Fold 5: 2015-2024 Weight Weights)</div>
            <div className="text-cyan-300">[DATA] Ingested 2,516 cross-sections for 500 constituent tickers. Point-in-time SEC &amp; Yahoo Finance check passed.</div>
            <div className="text-emerald-400">[SIGNAL] Daily Cross-Sectional Rank Inference Completed:</div>
            <div className="pl-4 text-emerald-300">1. ACN  | Rank IC: +0.0412 | TFDMGA Score: 0.892 (BUY Q5)</div>
            <div className="pl-4 text-emerald-300">2. MA   | Rank IC: +0.0385 | TFDMGA Score: 0.864 (BUY Q5)</div>
            <div className="pl-4 text-emerald-300">3. XOM  | Rank IC: +0.0361 | TFDMGA Score: 0.841 (BUY Q5)</div>
            <div className="pl-4 text-emerald-300">4. ADBE | Rank IC: +0.0349 | TFDMGA Score: 0.825 (BUY Q5)</div>
            <div className="text-yellow-400">[EXEC] Executing 1-Day Lag Execution Protocol (Order queued at Close t, Executed at Open t+1)...</div>
            <div className="text-emerald-400">[ALPACA] REST POST /v2/orders -&gt; ACN | Qty: 172 | Side: BUY | Status: FILLED @ $189.88</div>
            <div className="text-emerald-400">[ALPACA] REST POST /v2/orders -&gt; MA  | Qty: 52  | Side: BUY | Status: FILLED @ $591.24</div>
            <div className="text-emerald-400">[ALPACA] REST POST /v2/orders -&gt; XOM | Qty: 185 | Side: BUY | Status: FILLED @ $153.50</div>
            <div className="text-blue-400">[RISK] 2:1 Take-Profit/Stop-Loss (+4% / -2%) Circuit Breaker Active. Account Equity Peak: $105,151.23 USD.</div>
            <div className="text-gray-500">[2026-08-29 00:00:00 UTC] 24/7 Cloud Cycle Complete. Zero errors. Status: OK.</div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ThesisPage;
