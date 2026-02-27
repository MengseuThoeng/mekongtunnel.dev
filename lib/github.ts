export const GITHUB_REPO = 'MuyleangIng/MekongTunnel'
export const GITHUB_URL = `https://github.com/${GITHUB_REPO}`

export interface Release {
  id: number
  tag_name: string
  name: string
  body: string
  published_at: string
  html_url: string
  prerelease: boolean
  draft: boolean
}

export interface RepoStats {
  stars: number
  forks: number
}

export async function getReleases(): Promise<Release[]> {
  try {
    const res = await fetch(
      `https://api.github.com/repos/${GITHUB_REPO}/releases`,
      {
        headers: { Accept: 'application/vnd.github+json' },
        next: { revalidate: 3600 },
      }
    )
    if (!res.ok) return getMockReleases()
    const data = await res.json()
    const releases = data.filter((r: Release) => !r.draft)
    return releases.length > 0 ? releases : getMockReleases()
  } catch {
    return getMockReleases()
  }
}

export async function getRelease(tag: string): Promise<Release | null> {
  try {
    const res = await fetch(
      `https://api.github.com/repos/${GITHUB_REPO}/releases/tags/${tag}`,
      {
        headers: { Accept: 'application/vnd.github+json' },
        next: { revalidate: 3600 },
      }
    )
    if (!res.ok) return getMockReleases().find((r) => r.tag_name === tag) ?? null
    return res.json()
  } catch {
    return getMockReleases().find((r) => r.tag_name === tag) ?? null
  }
}

export async function getRepoStats(): Promise<RepoStats> {
  try {
    const res = await fetch(`https://api.github.com/repos/${GITHUB_REPO}`, {
      headers: { Accept: 'application/vnd.github+json' },
      next: { revalidate: 3600 },
    })
    if (!res.ok) return { stars: 0, forks: 0 }
    const data = await res.json()
    return { stars: data.stargazers_count ?? 0, forks: data.forks_count ?? 0 }
  } catch {
    return { stars: 0, forks: 0 }
  }
}

function getMockReleases(): Release[] {
  return [
    {
      id: 1,
      tag_name: 'v1.0.0',
      name: 'v1.0.0 — Initial Release',
      body: `## What's New\n\n- Initial public release of MekongTunnel\n- \`mekong\` CLI client with auto-reconnect, QR code, and clipboard copy\n- SSH reverse port forwarding server\n- Abuse protection with rate limiting and IP blocking\n- WebSocket support\n- Phishing warning interstitial page\n- Stats endpoint at \`localhost:9090\`\n\n## Installation\n\nSee the [installation docs](/docs/installation) for platform-specific instructions.`,
      published_at: '2025-01-01T00:00:00Z',
      html_url: `${GITHUB_URL}/releases/tag/v1.0.0`,
      prerelease: false,
      draft: false,
    },
  ]
}
