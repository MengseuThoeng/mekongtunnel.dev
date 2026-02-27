const STEPS = [
  {
    number: '01',
    title: 'Run the CLI',
    description: 'Run `mekong 3000` in your terminal. The CLI connects to MekongTunnel via SSH reverse port forwarding.',
    code: 'mekong 3000',
    icon: '⌨️',
  },
  {
    number: '02',
    title: 'Get a Public URL',
    description: 'The server assigns a unique HTTPS subdomain and displays it in your terminal. The URL is copied to clipboard automatically.',
    code: 'https://happy-tiger-a1b2.mekongtunnel.dev',
    icon: '🔗',
  },
  {
    number: '03',
    title: 'Share & Demo',
    description: 'Paste the URL anywhere — your phone, a client\'s browser, a webhook endpoint. All traffic proxies through to your local app.',
    code: 'curl https://happy-tiger-a1b2.mekongtunnel.dev',
    icon: '🌐',
  },
]

export default function HowItWorks() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-gold text-sm font-semibold uppercase tracking-widest mb-3">Simple by design</p>
          <h2 className="text-3xl md:text-4xl font-bold text-dim">How it works</h2>
          <p className="text-muted mt-4 max-w-xl mx-auto">
            MekongTunnel uses standard SSH reverse port forwarding. No agents, no proprietary protocol, no account required.
          </p>
        </div>

        <div className="relative">
          {/* Connector line */}
          <div className="hidden md:block absolute top-16 left-[calc(16.67%-1px)] right-[calc(16.67%-1px)] h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

          <div className="grid md:grid-cols-3 gap-8">
            {STEPS.map((step, i) => (
              <div key={i} className="relative flex flex-col items-center text-center md:items-start md:text-left">
                {/* Number badge */}
                <div className="relative z-10 w-12 h-12 rounded-full bg-card border border-gold/30 flex items-center justify-center mb-6 shrink-0">
                  <span className="text-gold font-mono font-bold text-sm">{step.number}</span>
                </div>

                <div className="text-2xl mb-3">{step.icon}</div>
                <h3 className="text-dim font-semibold text-lg mb-2">{step.title}</h3>
                <p className="text-muted text-sm leading-relaxed mb-4">{step.description}</p>

                <div className="w-full bg-[#0a0a14] border border-white/10 rounded-lg px-3 py-2 font-mono text-xs text-code break-all">
                  {step.code}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Architecture note */}
        <div className="mt-16 bg-card border border-white/5 rounded-xl p-6 md:p-8">
          <div className="flex flex-col md:flex-row items-start gap-6">
            <div className="shrink-0 w-10 h-10 rounded-lg bg-gold/10 border border-gold/20 flex items-center justify-center text-lg">
              🏗️
            </div>
            <div>
              <h3 className="text-dim font-semibold mb-2">Under the hood</h3>
              <p className="text-muted text-sm leading-relaxed mb-4">
                Your SSH client sends a <code className="text-code text-xs bg-white/5 px-1.5 py-0.5 rounded">tcpip-forward</code> request to the server.
                The server opens an internal TCP listener, assigns you a subdomain, and terminates TLS on port 443.
                When a browser hits your URL, the server opens a <code className="text-code text-xs bg-white/5 px-1.5 py-0.5 rounded">forwarded-tcpip</code> SSH channel
                back through your connection to your local app.
              </p>
              <div className="font-mono text-xs text-white/40 leading-6 whitespace-pre overflow-x-auto bg-[#0a0a14] rounded-lg p-4 border border-white/5">
{`Browser → HTTPS :443 → TLS termination → Tunnel registry
                                              ↓
                              forwarded-tcpip SSH channel
                                              ↓
                                    Your SSH client
                                              ↓
                                    localhost:3000`}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
