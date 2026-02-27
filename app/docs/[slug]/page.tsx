import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { MDXRemote } from 'next-mdx-remote/rsc'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import remarkGfm from 'remark-gfm'
import { getDoc, getAllDocSlugs, getPrevNext, DOC_NAV } from '@/lib/docs'
import DocSidebar from '@/components/doc-sidebar'
import mdxComponents from '@/components/mdx-components'
import Link from 'next/link'

export async function generateStaticParams() {
  return getAllDocSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const doc = getDoc(slug)
  if (!doc) return {}
  return {
    title: doc.meta.title,
    description: doc.meta.description,
  }
}

export default async function DocPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const doc = getDoc(slug)
  if (!doc) notFound()

  const { prev, next } = getPrevNext(slug)

  return (
    <div className="flex min-h-screen pt-16">
      <DocSidebar currentSlug={slug} />

      <article className="flex-1 min-w-0 px-6 lg:px-12 py-12 max-w-4xl mx-auto lg:mx-0">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-muted mb-8">
          <Link href="/" className="hover:text-gold transition-colors">Home</Link>
          <span>/</span>
          <Link href="/docs/getting-started" className="hover:text-gold transition-colors">Docs</Link>
          <span>/</span>
          <span className="text-dim">{doc.meta.title}</span>
        </nav>

        {/* Metadata header */}
        <div className="mb-10 pb-8 border-b border-white/5">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gold mb-3">{doc.meta.title}</h1>
          {doc.meta.description && (
            <p className="text-muted text-lg leading-relaxed">{doc.meta.description}</p>
          )}
        </div>

        {/* MDX content */}
        <div className="prose max-w-none">
          <MDXRemote
            source={doc.content}
            components={mdxComponents}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm],
                rehypePlugins: [
                  rehypeSlug,
                  [rehypeAutolinkHeadings, { behavior: 'wrap' }],
                  [rehypePrettyCode, { theme: 'one-dark-pro' }],
                ],
              },
            }}
          />
        </div>

        {/* Prev / Next navigation */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row gap-4">
          {prev && (
            <Link
              href={`/docs/${prev.slug}`}
              className="flex-1 group flex flex-col gap-1 bg-card border border-white/5 hover:border-gold/20 rounded-xl p-5 transition-all"
            >
              <span className="text-muted text-xs flex items-center gap-1">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Previous
              </span>
              <span className="text-dim font-semibold group-hover:text-gold transition-colors">{prev.title}</span>
            </Link>
          )}
          {next && (
            <Link
              href={`/docs/${next.slug}`}
              className="flex-1 group flex flex-col gap-1 bg-card border border-white/5 hover:border-gold/20 rounded-xl p-5 transition-all sm:items-end"
            >
              <span className="text-muted text-xs flex items-center gap-1">
                Next
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
              <span className="text-dim font-semibold group-hover:text-gold transition-colors">{next.title}</span>
            </Link>
          )}
        </div>
      </article>
    </div>
  )
}
