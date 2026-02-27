import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'
import { getRelease, getReleases, GITHUB_URL } from '@/lib/github'
import { formatDate } from '@/lib/utils'
import Link from 'next/link'

export async function generateStaticParams() {
  const releases = await getReleases()
  return releases.map((r) => ({ slug: r.tag_name }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const release = await getRelease(slug)
  if (!release) return {}
  return {
    title: release.name || release.tag_name,
    description: `MekongTunnel ${release.tag_name} release notes`,
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const release = await getRelease(slug)
  if (!release) notFound()

  return (
    <div className="min-h-screen pt-32 pb-24 px-6">
      <div className="max-w-3xl mx-auto">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-muted mb-8">
          <Link href="/" className="hover:text-gold transition-colors">Home</Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-gold transition-colors">Blog</Link>
          <span>/</span>
          <span className="text-dim font-mono">{release.tag_name}</span>
        </nav>

        {/* Header */}
        <div className="mb-10 pb-8 border-b border-white/5">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="bg-gold/10 text-gold border border-gold/20 text-xs font-mono px-2.5 py-1 rounded-full">
              {release.tag_name}
            </span>
            {release.prerelease && (
              <span className="bg-purple/10 text-purple border border-purple/20 text-xs px-2 py-0.5 rounded-full">
                pre-release
              </span>
            )}
            <time className="text-muted text-sm">{formatDate(release.published_at)}</time>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-gold mb-3">
            {release.name || release.tag_name}
          </h1>
          <a
            href={release.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-gold transition-colors"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
            </svg>
            View on GitHub
          </a>
        </div>

        {/* Release body rendered as Markdown */}
        {release.body ? (
          <div className="prose max-w-none">
            <MDXRemote
              source={release.body}
              options={{
                mdxOptions: {
                  remarkPlugins: [remarkGfm],
                  rehypePlugins: [
                    rehypeSlug,
                    [rehypePrettyCode, { theme: 'one-dark-pro' }],
                  ],
                },
              }}
            />
          </div>
        ) : (
          <p className="text-muted italic">No release notes provided.</p>
        )}

        {/* Back */}
        <div className="mt-16 pt-8 border-t border-white/5">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-muted hover:text-gold transition-colors text-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            All releases
          </Link>
        </div>
      </div>
    </div>
  )
}
