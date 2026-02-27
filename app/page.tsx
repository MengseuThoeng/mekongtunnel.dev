import Hero from '@/components/hero'
import HowItWorks from '@/components/how-it-works'
import InstallTabs from '@/components/install-tabs'
import FeatureCard from '@/components/feature-card'
import Link from 'next/link'
import { GITHUB_URL } from '@/lib/github'

const FEATURES = [
  {
    icon: '↺',
    title: 'Auto-reconnect',
    description: 'The mekong CLI automatically reconnects with exponential backoff if the tunnel drops.',
  },
  {
    icon: '📱',
    title: 'QR Code',
    description: 'Your public URL is printed as a QR code in the terminal. Scan with your phone instantly.',
  },
  {
    icon: '⚡',
    title: 'WebSocket Support',
    description: 'WebSocket connections are detected and proxied transparently. No special config needed.',
  },
  {
    icon: '🔒',
    title: 'HTTPS by Default',
    description: 'TLS is terminated at the server. Every tunnel gets a valid HTTPS URL out of the box.',
  },
  {
    icon: '⚙️',
    title: 'Zero Config',
    description: "One command. No YAML, no accounts, no dashboard. Just your port and you're live.",
  },
  {
    icon: '🛡️',
    title: 'Abuse Protection',
    description: 'Per-IP rate limiting, sliding-window connection limits, and automatic IP blocking for abusers.',
  },
  {
    icon: '📊',
    title: 'Live Request Log',
    description: 'Every HTTP request is streamed live to your SSH terminal — method, path, status, and latency.',
  },
  {
    icon: '🌐',
    title: 'Self-Hostable',
    description: 'Run your own MekongTunnel server on any VPS. Full control, your own domain, MIT licensed.',
  },
]

const LIMITS = [
  { label: 'Max tunnels per IP', value: '3' },
  { label: 'Total server tunnels', value: '1,000' },
  { label: 'Requests per tunnel', value: '10/s' },
  { label: 'Max request body', value: '128 MB' },
  { label: 'WebSocket transfer', value: '1 GB' },
  { label: 'Inactivity timeout', value: '2 hours' },
  { label: 'Max tunnel lifetime', value: '24 hours' },
  { label: 'SSH handshake timeout', value: '30s' },
]

export default function LandingPage() {
  return (
    <>
      <Hero />

      <InstallTabs />

      <HowItWorks />

      {/* Features grid */}
      <section className="py-20 px-6" style={{ background: 'rgba(22,22,42,0.3)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-gold text-sm font-semibold uppercase tracking-widest mb-3">
              Everything you need
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-dim">Built-in features</h2>
            <p className="text-muted mt-4 max-w-xl mx-auto">
              No plugins, no extensions. Everything ships in a single ~6 MB binary.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {FEATURES.map((f) => (
              <FeatureCard key={f.title} {...f} />
            ))}
          </div>
        </div>
      </section>

      {/* Limits table */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-gold text-sm font-semibold uppercase tracking-widest mb-3">Transparent</p>
            <h2 className="text-3xl md:text-4xl font-bold text-dim">Server limits</h2>
            <p className="text-muted mt-4">
              All limits apply to the public hosted instance. Self-hosters can adjust everything via env vars.
            </p>
          </div>
          <div className="bg-card border border-white/5 rounded-xl overflow-hidden">
            {LIMITS.map((l, i) => (
              <div
                key={l.label}
                className={`flex items-center justify-between px-6 py-4 ${
                  i < LIMITS.length - 1 ? 'border-b border-white/5' : ''
                }`}
              >
                <span className="text-muted text-sm">{l.label}</span>
                <span className="text-gold font-mono font-semibold text-sm">{l.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Self-host CTA */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto bg-gradient-to-br from-card via-surface to-card border border-gold/15 rounded-2xl p-10 md:p-14 text-center relative overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at center, rgba(255,215,0,0.04), transparent)' }}
          />
          <div className="relative z-10">
            <p className="text-gold text-sm font-semibold uppercase tracking-widest mb-4">Open Source</p>
            <h2 className="text-3xl md:text-4xl font-bold text-dim mb-4">
              Run your own tunnel server
            </h2>
            <p className="text-muted leading-relaxed mb-8 max-w-lg mx-auto">
              MekongTunnel is MIT licensed. Deploy on any VPS with Docker in under 5 minutes.
              Your domain, your rules, your data.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link
                href="/docs/self-hosting"
                className="inline-flex items-center gap-2 bg-gold text-bg font-bold px-6 py-3 rounded-xl text-sm hover:bg-yellow-300 transition-colors"
              >
                Self-Hosting Guide
              </Link>
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-dim font-semibold px-6 py-3 rounded-xl text-sm transition-all"
              >
                View Source
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
