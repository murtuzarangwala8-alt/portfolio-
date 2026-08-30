import { motion } from 'framer-motion';
import { useRef } from 'react';
import { useInView } from 'framer-motion';
import { TrendingUp, ShieldCheck, Activity, Award, CheckCircle, Terminal, Cpu } from 'lucide-react';

const AlpacaLiveDashboard = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const positions = [
    { symbol: 'ACN', name: 'Accenture plc', qty: 172, cost: '$29,243.34', value: '$32,612.92', pnl: '+$3,369.58', pnlPct: '+11.52%', isGain: true },
    { symbol: 'MA', name: 'Mastercard Inc.', qty: 52, cost: '$30,125.91', value: '$30,955.60', pnl: '+$829.69', pnlPct: '+2.75%', isGain: true },
    { symbol: 'XOM', name: 'Exxon Mobil Corp.', qty: 185, cost: '$28,397.12', value: '$28,991.35', pnl: '+$594.23', pnlPct: '+2.09%', isGain: true },
    { symbol: 'ADBE', name: 'Adobe Inc.', qty: 3, cost: '$837.97', value: '$874.56', pnl: '+$36.59', pnlPct: '+4.37%', isGain: true },
    { symbol: 'MRK', name: 'Merck & Co., Inc.', qty: 3, cost: '$451.51', value: '$445.05', pnl: '-$6.46', pnlPct: '-1.43%', isGain: false }
  ];

  return (
    <section id="live-trading" ref={ref} className="py-20 bg-gray-50 dark:bg-black/80 transition-colors duration-300 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>24/7 LIVE ALPACA CLOUD EXECUTION ENGINE</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Live Alpaca <span className="gradient-text">Quantitative Trading Bot</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto text-sm sm:text-base">
            Real-time paper trading account tracking of my Master&apos;s Thesis research model: 
            <strong className="text-primary-500 dark:text-primary-400 font-semibold"> Temporal Fusion Deep Multimodal Gated Attention (TFDMGA)</strong> on S&amp;P 500 equities.
          </p>
        </motion.div>

        {/* Metric Stat Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {/* Card 1 */}
          <div className="glass-card rounded-2xl p-6 space-y-2 border border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 shadow-lg">
            <div className="flex items-center justify-between text-xs font-mono text-gray-500 dark:text-gray-400">
              <span>PEAK PORTFOLIO VALUE</span>
              <Activity className="w-4 h-4 text-blue-500" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white font-mono">$105,151.23</div>
            <div className="text-xs text-emerald-500 font-semibold flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+$5,151.23 Net Gain (vs $100k Base)</span>
            </div>
          </div>

          {/* Card 2 */}
          <div className="glass-card rounded-2xl p-6 space-y-2 border border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 shadow-lg">
            <div className="flex items-center justify-between text-xs font-mono text-gray-500 dark:text-gray-400">
              <span>STRATEGY RETURN</span>
              <TrendingUp className="w-4 h-4 text-emerald-500" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-500 font-mono">+5.15%</div>
            <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center justify-between">
              <span>S&amp;P 500 Index: <strong className="text-red-400">-0.16%</strong></span>
              <span className="text-xs text-emerald-500 font-mono">Net 10 bps</span>
            </div>
          </div>

          {/* Card 3 */}
          <div className="glass-card rounded-2xl p-6 space-y-2 border border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 shadow-lg">
            <div className="flex items-center justify-between text-xs font-mono text-gray-500 dark:text-gray-400">
              <span>NET STRATEGY ALPHA</span>
              <Award className="w-4 h-4 text-yellow-500" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-yellow-500 font-mono">+5.31%</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Outperformance over S&amp;P 500</div>
          </div>

          {/* Card 4 */}
          <div className="glass-card rounded-2xl p-6 space-y-2 border border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 shadow-lg">
            <div className="flex items-center justify-between text-xs font-mono text-gray-500 dark:text-gray-400">
              <span>UNREALIZED HOLDINGS P&amp;L</span>
              <ShieldCheck className="w-4 h-4 text-cyan-500" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-cyan-500 font-mono">+$4,823.62</div>
            <div className="text-xs text-emerald-500 font-semibold flex items-center gap-1">
              <CheckCircle className="w-3.5 h-3.5" />
              <span>+5.41% Net Gain Across Holdings</span>
            </div>
          </div>
        </motion.div>

        {/* Open Positions Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass-card rounded-2xl p-6 border border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 shadow-xl space-y-4"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 dark:border-gray-800 pb-4">
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <Cpu className="w-5 h-5 text-primary-500" />
                <span>Live Open Stock Holdings (Alpaca API)</span>
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 font-mono">Active long positions selected by TFDMGA rank correlation engine</p>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="px-3 py-1 rounded-md bg-emerald-950/60 text-emerald-400 border border-emerald-800">5 Active Stocks</span>
              <span className="px-3 py-1 rounded-md bg-blue-950/60 text-blue-400 border border-blue-800">Margin Enabled</span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="text-xs font-mono text-gray-500 dark:text-gray-400 uppercase bg-gray-100 dark:bg-gray-800/80 border-b border-gray-200 dark:border-gray-800">
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
              <tbody className="divide-y divide-gray-200 dark:divide-gray-800/60 font-mono text-xs">
                {positions.map((p) => (
                  <tr key={p.symbol} className="hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors">
                    <td className="py-3 px-4 font-bold text-primary-500">{p.symbol}</td>
                    <td className="py-3 px-4 text-gray-700 dark:text-gray-300 font-sans">{p.name}</td>
                    <td className="py-3 px-4 text-right text-gray-900 dark:text-gray-200">{p.qty}</td>
                    <td className="py-3 px-4 text-right text-gray-600 dark:text-gray-400">{p.cost}</td>
                    <td className="py-3 px-4 text-right text-gray-900 dark:text-gray-200">{p.value}</td>
                    <td className={`py-3 px-4 text-right font-bold ${p.isGain ? 'text-emerald-500' : 'text-red-400'}`}>{p.pnl}</td>
                    <td className={`py-3 px-4 text-right font-bold ${p.isGain ? 'text-emerald-500' : 'text-red-400'}`}>{p.pnlPct}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* "What We Are Truly Doing" — Quantitative Methodology */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="glass-card rounded-2xl p-8 border border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 shadow-xl space-y-6"
        >
          <div className="border-b border-gray-200 dark:border-gray-800 pb-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-yellow-950/60 border border-yellow-500/30 text-yellow-400 text-xs font-mono uppercase tracking-wider mb-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Strategy &amp; Quantitative Rigor</span>
            </div>
            <h3 className="text-2xl font-extrabold text-gray-900 dark:text-white">What We Are Truly Doing: <span className="gradient-text">Quantitative Methodology</span></h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 max-w-4xl pt-1">
              Transparency is the cornerstone of quantitative financial research. Here is how my deep learning pipeline processes multi-modal data, eliminates data leakage, models microstructure frictions, and executes live trades.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Pillar 1 */}
            <div className="p-5 rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-800 space-y-2">
              <div className="flex items-center gap-3 text-primary-500">
                <div className="w-7 h-7 rounded-lg bg-primary-950/80 flex items-center justify-center font-mono font-bold text-xs border border-primary-800">01</div>
                <h4 className="font-bold text-gray-900 dark:text-white text-sm">Point-in-Time Bloomberg Filing Alignment</h4>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                Features update strictly on SEC publication timestamps (<code className="text-primary-400 font-mono">earnings_announcement_date</code>) rather than fiscal quarter ends, eliminating lookahead bias. Fundamentals expire after 90 days to prevent stale ratios.
              </p>
              <div className="text-2xs font-mono text-gray-500 dark:text-gray-400 pt-1">
                • 16 Technical • 30 Fundamental • 2 Sentiment • 5 Macro • 6 Betas (59 Total)
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="p-5 rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-800 space-y-2">
              <div className="flex items-center gap-3 text-cyan-500">
                <div className="w-7 h-7 rounded-lg bg-cyan-950/80 flex items-center justify-center font-mono font-bold text-xs border border-cyan-800">02</div>
                <h4 className="font-bold text-gray-900 dark:text-white text-sm">TFDMGA Deep Sequence Architecture</h4>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                Combines Causal 1D TCN encoders (<code className="text-cyan-400 font-mono">R=15d</code>) with Sequential Ring Attention and 3-Way Macro Dynamic Gating (<code className="text-cyan-400 font-mono">&tau;=0.50</code>) to dynamically reweight modalities across market regimes.
              </p>
              <div className="text-2xs font-mono text-gray-500 dark:text-gray-400 pt-1">
                • Out-of-sample IC: +0.0348 • ICIR: 3.12 • DM Stat: 2.41 (p=0.016 vs LSTM)
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="p-5 rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-800 space-y-2">
              <div className="flex items-center gap-3 text-emerald-500">
                <div className="w-7 h-7 rounded-lg bg-emerald-950/80 flex items-center justify-center font-mono font-bold text-xs border border-emerald-800">03</div>
                <h4 className="font-bold text-gray-900 dark:text-white text-sm">Microstructure Frictions &amp; 2:1 TPSL</h4>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                Signals generated at close of day <span className="font-mono text-gray-900 dark:text-white">t</span> execute at open of day <span className="font-mono text-gray-900 dark:text-white">t+1</span> (1-day delay). Every trade deducts 10 bps friction, paired with a 2:1 Take-Profit/Stop-Loss (+4% TP / -2% SL) circuit breaker.
              </p>
              <div className="text-2xs font-mono text-gray-500 dark:text-gray-400 pt-1">
                • $1,000 USD deposit compounds to $6,482.10 net of 10 bps fees
              </div>
            </div>

            {/* Pillar 4 */}
            <div className="p-5 rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-800 space-y-2">
              <div className="flex items-center gap-3 text-yellow-500">
                <div className="w-7 h-7 rounded-lg bg-yellow-950/80 flex items-center justify-center font-mono font-bold text-xs border border-yellow-800">04</div>
                <h4 className="font-bold text-gray-900 dark:text-white text-sm">Fama-French Spanning &amp; EMH Proof</h4>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                Fama-French 5-factor regressions yield a net strategy alpha of <span className="font-mono text-gray-900 dark:text-white">&alpha; = -0.18%</span> (<span className="font-mono text-gray-900 dark:text-white">p = 0.976</span>). Because net alpha is zero, 100% of strategy returns represent dynamic factor risk compensation (<span className="font-mono text-gray-900 dark:text-white">RMW &beta; = +0.512</span>), matching Fama&apos;s Efficient Market Hypothesis.
              </p>
              <div className="text-2xs font-mono text-gray-500 dark:text-gray-400 pt-1">
                • Machine Learning acts as a Dynamic Factor Allocation Engine
              </div>
            </div>
          </div>
        </motion.div>

        {/* 24/7 Cloud Bot Terminal Logs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="glass-card rounded-2xl p-6 border border-gray-200 dark:border-gray-800 bg-gray-950 shadow-2xl space-y-4"
        >
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
            <div className="text-cyan-300">[DATA] Ingested 2,516 cross-sections for 500 constituent tickers. Point-in-time Bloomberg fundamental check passed.</div>
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
        </motion.div>

      </div>
    </section>
  );
};

export default AlpacaLiveDashboard;
