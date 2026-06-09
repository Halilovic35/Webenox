import { useEffect } from 'react'

const SITE_ORIGIN = 'https://webenox.de'
const DEFAULT_OG_IMAGE = `${SITE_ORIGIN}/images/og-image.png`

function upsertMeta(attr, key, content) {
  let el = document.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function upsertCanonical(href) {
  let link = document.querySelector('link[rel="canonical"]')
  if (!link) {
    link = document.createElement('link')
    link.setAttribute('rel', 'canonical')
    document.head.appendChild(link)
  }
  link.setAttribute('href', href)
}

/**
 * Updates document title + indexable meta for SPA routes (legal pages, etc.).
 */
export default function SeoHead({ title, description, path = '/', image = DEFAULT_OG_IMAGE }) {
  useEffect(() => {
    const url = `${SITE_ORIGIN}${path}`

    document.title = title
    upsertMeta('name', 'description', description)
    upsertMeta('name', 'robots', 'index, follow')
    upsertCanonical(url)

    upsertMeta('property', 'og:type', 'website')
    upsertMeta('property', 'og:url', url)
    upsertMeta('property', 'og:title', title)
    upsertMeta('property', 'og:description', description)
    upsertMeta('property', 'og:image', image)

    upsertMeta('name', 'twitter:card', 'summary_large_image')
    upsertMeta('name', 'twitter:url', url)
    upsertMeta('name', 'twitter:title', title)
    upsertMeta('name', 'twitter:description', description)
    upsertMeta('name', 'twitter:image', image)
  }, [title, description, path, image])

  return null
}
