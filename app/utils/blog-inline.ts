// Malá podmnožina Markdownu v texte článkov (odseky, položky, takeaway):
// **tučné**, `kód` a [text](https://…). Výsledok ide do v-html, preto sa
// najprv escapuje celé HTML a odkazy sú povolené len na https://.

const HTML_ESCAPES: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;'
}

function escapeHtml(text: string) {
  return text.replace(/[&<>"']/g, (char) => HTML_ESCAPES[char]!)
}

function formatText(text: string) {
  return text
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\[([^\]]+)\]\((https:\/\/[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>')
}

export function blogInline(text: string) {
  // nepárne časti medzi spätnými apostrofmi sú kód — v ňom sa nič ďalšie nemení
  return escapeHtml(text)
    .split('`')
    .map((part, i, parts) => {
      if (i % 2 === 0) return formatText(part)
      // posledná časť bez párového apostrofu ostane obyčajný text
      return i === parts.length - 1 ? `\`${formatText(part)}` : `<code>${part}</code>`
    })
    .join('')
}
