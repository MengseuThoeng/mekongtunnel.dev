import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { MDXRemote } from 'next-mdx-remote/rsc'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import remarkGfm from 'remark-gfm'
import { getDoc, getAllDocSlugs, getPrevNext } from '@/lib/docs'
import DocSidebar from '@/components/doc-sidebar'
import DocContent, { DocNav } from '@/components/doc-content'
import mdxComponents from '@/components/mdx-components'

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
        {/* Animated content wrapper */}
        <DocContent title={doc.meta.title} description={doc.meta.description}>
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
        </DocContent>

        {/* Animated Prev / Next navigation */}
        <DocNav prev={prev} next={next} />
      </article>
    </div>
  )
}
