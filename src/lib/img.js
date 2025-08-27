export function optimizeImageUrl(originalUrl, { width = 400, height, fit = 'cover' } = {}) {
  if (!originalUrl) return originalUrl
  try {
    const encoded = encodeURIComponent(originalUrl.replace(/^https?:\/\//, ''))
    const params = [`w=${width}`, `fit=${fit}`]
    if (height) params.push(`h=${height}`)
    return `https://images.weserv.nl/?url=${encoded}&${params.join('&')}`
  } catch {
    return originalUrl
  }
}

