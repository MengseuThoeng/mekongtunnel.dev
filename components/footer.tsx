import Link from 'next/link'
import { GITHUB_URL } from '@/lib/github'

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-card mt-24">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl font-bold text-gold tracking-widest">MEKONG</span>
              <span className="text-xl font-bold text-dim tracking-widest">TUNNEL</span>
            </div>
            <p className="text-muted text-sm leading-relaxed">
              Open-source SSH tunneling. Expose your local server to the internet in one command.
            </p>
            <p className="text-muted/60 text-xs mt-3">
              by{' '}
              <a
                href="https://github.com/MuyleangIng"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold/70 hover:text-gold transition-colors"
              >
                Ing Muyleang
              </a>{' '}
              · KhmerStack
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-dim font-semibold text-sm mb-4 uppercase tracking-wider">Product</h3>
            <ul className="space-y-2.5">
              {[
                { label: 'Getting Started', href: '/docs/getting-started' },
                { label: 'Installation', href: '/docs/installation' },
                { label: 'CLI Reference', href: '/docs/cli-reference' },
                { label: 'Self-Hosting', href: '/docs/self-hosting' },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-muted text-sm hover:text-gold transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-dim font-semibold text-sm mb-4 uppercase tracking-wider">Links</h3>
            <ul className="space-y-2.5">
              {[
                { label: 'GitHub', href: GITHUB_URL },
                { label: 'Releases', href: `${GITHUB_URL}/releases` },
                { label: 'Blog', href: '/blog' },
                { label: 'Issues', href: `${GITHUB_URL}/issues` },
              ].map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    target={l.href.startsWith('http') ? '_blank' : undefined}
                    rel={l.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="text-muted text-sm hover:text-gold transition-colors"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-muted/60 text-xs">
            © 2026 MekongTunnel · MIT License
          </p>
          <p className="text-muted/40 text-xs">
            អុឹង មួយលៀង (Ing Muyleang)
          </p>
        </div>
      </div>
    </footer>
  )
}
