import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { DOC_NAV, type NavItem } from './nav'

export type { NavItem } from './nav'
export { DOC_NAV } from './nav'

const DOCS_DIR = path.join(process.cwd(), 'content/docs')

export interface DocMeta {
  title: string
  description: string
  order?: number
}

export interface Doc {
  slug: string
  meta: DocMeta
  content: string
}

export function getAllDocSlugs(): string[] {
  return DOC_NAV.map((d) => d.slug)
}

export function getDoc(slug: string): Doc | null {
  const filePath = path.join(DOCS_DIR, `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return null
  const fileContent = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(fileContent)
  return {
    slug,
    meta: data as DocMeta,
    content,
  }
}

export function getPrevNext(slug: string): { prev: NavItem | null; next: NavItem | null } {
  const idx = DOC_NAV.findIndex((d) => d.slug === slug)
  return {
    prev: idx > 0 ? DOC_NAV[idx - 1] : null,
    next: idx < DOC_NAV.length - 1 ? DOC_NAV[idx + 1] : null,
  }
}
