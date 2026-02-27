// Navigation items — no Node.js imports so this is safe to use in Client Components

export interface NavItem {
  slug: string
  title: string
  description: string
}

export const DOC_NAV: NavItem[] = [
  { slug: 'getting-started', title: 'Getting Started', description: 'What is MekongTunnel?' },
  { slug: 'installation', title: 'Installation', description: 'Install the mekong CLI' },
  { slug: 'cli-reference', title: 'CLI Reference', description: 'All flags and options' },
  { slug: 'how-it-works', title: 'How It Works', description: 'SSH tunnel architecture' },
  { slug: 'self-hosting', title: 'Self-Hosting', description: 'Run your own server' },
  { slug: 'configuration', title: 'Configuration', description: 'Environment variables' },
  { slug: 'stats-api', title: 'Stats API', description: 'Metrics JSON endpoint' },
  { slug: 'faq', title: 'FAQ', description: 'Common questions' },
]
