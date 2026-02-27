import type { Metadata } from 'next'
import { getReleases } from '@/lib/github'
import ReleaseCard from '@/components/release-card'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Blog & Releases',
  description: 'MekongTunnel release notes, updates, and announcements.',
}

export default async function BlogPage() {
  const releases = await getReleases()

  return (
    <div className="min-h-screen pt-32 pb-24 px-6">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <nav className="flex items-center gap-2 text-xs text-muted mb-6">
            <Link href="/" className="hover:text-gold transition-colors">Home</Link>
            <span>/</span>
            <span className="text-dim">Blog & Releases</span>
          </nav>
          <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/20 text-gold text-xs font-semibold px-3 py-1.5 rounded-full mb-5 uppercase tracking-widest">
            <span className="w-1.5 h-1.5 bg-gold rounded-full" />
            News & Updates
          </div>
          <h1 className="text-4xl font-extrabold text-dim mb-4">Blog & Releases</h1>
          <p className="text-muted text-lg leading-relaxed">
            Release notes, changelogs, and announcements for MekongTunnel.
            Pulled live from{' '}
            <a
              href="https://github.com/MuyleangIng/MekongTunnel/releases"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold hover:underline"
            >
              GitHub Releases
            </a>
            .
          </p>
        </div>

        {/* Release list */}
        {releases.length === 0 ? (
          <div className="text-center py-20 text-muted">
            <div className="text-4xl mb-4">📭</div>
            <p>No releases yet. Check back soon.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {releases.map((release) => (
              <ReleaseCard key={release.id} release={release} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
