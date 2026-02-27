import Link from 'next/link'
import { type Release } from '@/lib/github'
import { formatDate, stripMarkdown } from '@/lib/utils'

interface ReleaseCardProps {
  release: Release
}

export default function ReleaseCard({ release }: ReleaseCardProps) {
  const summary = stripMarkdown(release.body || '')

  return (
    <article className="group relative bg-card border border-white/5 rounded-xl p-6 hover:border-gold/20 transition-all duration-300 hover:bg-surface/50">
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="flex items-center gap-3">
          <span className="bg-gold/10 text-gold border border-gold/20 text-xs font-mono px-2.5 py-1 rounded-full">
            {release.tag_name}
          </span>
          {release.prerelease && (
            <span className="bg-purple/10 text-purple border border-purple/20 text-xs px-2 py-0.5 rounded-full">
              pre-release
            </span>
          )}
        </div>
        <time className="text-muted text-xs shrink-0 pt-1">
          {formatDate(release.published_at)}
        </time>
      </div>

      <h2 className="text-dim font-semibold text-lg mb-2 group-hover:text-gold transition-colors">
        {release.name || release.tag_name}
      </h2>

      {summary && (
        <p className="text-muted text-sm leading-relaxed mb-4 line-clamp-2">{summary}</p>
      )}

      <Link
        href={`/blog/${release.tag_name}`}
        className="text-gold/70 hover:text-gold text-sm font-medium inline-flex items-center gap-1.5 transition-colors"
      >
        Read release notes
        <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </Link>
    </article>
  )
}
