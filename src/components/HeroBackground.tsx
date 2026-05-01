import { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

const HeroBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const animRef = useRef<number>(0);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let W = canvas.width = window.innerWidth;
    let H = canvas.height = window.innerHeight;

    const onResize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);

    const onMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', onMouseMove);

    // ── Floating financial symbols ──────────────────────────────
    const SYMBOLS = ['₿', '$', '€', '£', '¥', '📈', 'Σ', 'Δ', 'λ', 'μ', 'σ', 'α', 'β', 'R²', 'p<0.05', 'ARIMA', 'DCF', 'ML', 'AI', 'SQL', 'GDP', 'IRR', 'NPV'];
    const COLORS = ['#feb300', '#ff5e6c', '#60a5fa', '#34d399', '#a78bfa', '#f472b6'];

    interface Particle {
      x: number; y: number; vx: number; vy: number;
      symbol: string; color: string; size: number;
      opacity: number; opacityDir: number; rotation: number; rotSpeed: number;
    }

    const particles: Particle[] = Array.from({ length: 55 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      symbol: SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      size: Math.random() * 10 + 8,
      opacity: Math.random() * 0.4 + 0.1,
      opacityDir: Math.random() > 0.5 ? 0.003 : -0.003,
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.01,
    }));

    // ── Candlestick bars ────────────────────────────────────────
    interface Candle {
      x: number; y: number; w: number; h: number;
      wickH: number; bullish: boolean; opacity: number; speed: number;
    }

    const candles: Candle[] = Array.from({ length: 18 }, (_, i) => ({
      x: (W / 18) * i + Math.random() * 40,
      y: H * 0.3 + Math.random() * H * 0.4,
      w: 8 + Math.random() * 10,
      h: 20 + Math.random() * 80,
      wickH: 10 + Math.random() * 30,
      bullish: Math.random() > 0.5,
      opacity: 0.06 + Math.random() * 0.08,
      speed: 0.2 + Math.random() * 0.3,
    }));

    // ── Grid nodes (network) ────────────────────────────────────
    interface Node {
      x: number; y: number; vx: number; vy: number; r: number;
    }

    const nodes: Node[] = Array.from({ length: 60 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      r: Math.random() * 2 + 1,
    }));

    // ── Chart line ──────────────────────────────────────────────
    const chartPoints: number[] = Array.from({ length: 80 }, (_, i) =>
      H * 0.6 + Math.sin(i * 0.3) * 40 + Math.random() * 30 - 15
    );
    let chartOffset = 0;

    // ── Main draw loop ──────────────────────────────────────────
    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      const mx = mouse.current.x;
      const my = mouse.current.y;

      // Dark/Light gradient background
      const isDark = theme === 'dark';
      const bg = ctx.createLinearGradient(0, 0, W, H);
      if (isDark) {
        bg.addColorStop(0, '#030712');
        bg.addColorStop(0.5, '#0a0f1e');
        bg.addColorStop(1, '#030712');
      } else {
        bg.addColorStop(0, '#fafafa');
        bg.addColorStop(0.5, '#f0f4ff');
        bg.addColorStop(1, '#fafafa');
      }
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);

      // Mouse radial glow
      const glow = ctx.createRadialGradient(mx, my, 0, mx, my, 300);
      glow.addColorStop(0, isDark ? 'rgba(254,179,0,0.06)' : 'rgba(254,179,0,0.08)');
      glow.addColorStop(0.5, isDark ? 'rgba(255,94,108,0.03)' : 'rgba(255,94,108,0.04)');
      glow.addColorStop(1, 'transparent');
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, W, H);

      // ── Draw network connections ──
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            const alpha = (1 - dist / 120) * (isDark ? 0.15 : 0.2);
            ctx.beginPath();
            ctx.strokeStyle = `rgba(254,179,0,${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // ── Draw & update nodes ──
      nodes.forEach(n => {
        // Mouse repulsion
        const dx = n.x - mx;
        const dy = n.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          n.vx += (dx / dist) * 0.3;
          n.vy += (dy / dist) * 0.3;
        }
        n.vx *= 0.99;
        n.vy *= 0.99;
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > W) n.vx *= -1;
        if (n.y < 0 || n.y > H) n.vy *= -1;

        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(254,179,0,0.5)';
        ctx.fill();
      });

      // ── Draw candlesticks ──
      candles.forEach(c => {
        c.y -= c.speed * 0.2;
        if (c.y < -100) c.y = H + 100;
        const color = c.bullish ? `rgba(52,211,153,${c.opacity})` : `rgba(255,94,108,${c.opacity})`;
        ctx.fillStyle = color;
        ctx.strokeStyle = color;
        ctx.lineWidth = 1;
        // Wick
        ctx.beginPath();
        ctx.moveTo(c.x + c.w / 2, c.y - c.wickH);
        ctx.lineTo(c.x + c.w / 2, c.y + c.h + c.wickH);
        ctx.stroke();
        // Body
        ctx.fillRect(c.x, c.y, c.w, c.h);
      });

      // ── Draw scrolling chart line ──
      chartOffset += 0.3;
      ctx.beginPath();
      ctx.strokeStyle = isDark ? 'rgba(254,179,0,0.15)' : 'rgba(254,179,0,0.4)';
      ctx.lineWidth = 1.5;
      for (let i = 0; i < chartPoints.length - 1; i++) {
        const x = (i / chartPoints.length) * W - (chartOffset % (W / chartPoints.length));
        if (i === 0) ctx.moveTo(x, chartPoints[i]);
        else ctx.lineTo(x, chartPoints[i]);
      }
      ctx.stroke();

      // Chart area fill
      ctx.beginPath();
      for (let i = 0; i < chartPoints.length; i++) {
        const x = (i / chartPoints.length) * W;
        if (i === 0) ctx.moveTo(x, chartPoints[i]);
        else ctx.lineTo(x, chartPoints[i]);
      }
      ctx.lineTo(W, H);
      ctx.lineTo(0, H);
      ctx.closePath();
      const chartGrad = ctx.createLinearGradient(0, H * 0.3, 0, H);
      chartGrad.addColorStop(0, isDark ? 'rgba(254,179,0,0.04)' : 'rgba(254,179,0,0.08)');
      chartGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = chartGrad;
      ctx.fill();

      // ── Draw floating symbols ──
      particles.forEach(p => {
        // Mouse attraction
        const dx = mx - p.x;
        const dy = my - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          p.vx += (dx / dist) * 0.02;
          p.vy += (dy / dist) * 0.02;
        }
        p.vx *= 0.98;
        p.vy *= 0.98;
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -50) p.x = W + 50;
        if (p.x > W + 50) p.x = -50;
        if (p.y < -50) p.y = H + 50;
        if (p.y > H + 50) p.y = -50;

        p.opacity += p.opacityDir;
        if (p.opacity > 0.5 || p.opacity < 0.05) p.opacityDir *= -1;
        p.rotation += p.rotSpeed;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;
        ctx.font = `${p.size}px 'Space Grotesk', monospace`;
        ctx.fillText(p.symbol, 0, 0);
        ctx.restore();
      });

      // ── Horizontal scan line ──
      const scanY = ((Date.now() * 0.05) % H);
      const scanGrad = ctx.createLinearGradient(0, scanY - 40, 0, scanY + 40);
      scanGrad.addColorStop(0, 'transparent');
      scanGrad.addColorStop(0.5, isDark ? 'rgba(254,179,0,0.03)' : 'rgba(254,179,0,0.05)');
      scanGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = scanGrad;
      ctx.fillRect(0, scanY - 40, W, 80);

      animRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
};

export default HeroBackground;
