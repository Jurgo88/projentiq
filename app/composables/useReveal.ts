export function useReveal() {
  const target = ref<HTMLElement | null>(null)
  const pending = ref(false)

  onMounted(() => {
    const el = target.value
    if (!el || !('IntersectionObserver' in window)) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    // skip elements already in (or near) the viewport on load — only
    // animate content the user actually scrolls to reveal
    const { top } = el.getBoundingClientRect()
    if (top < window.innerHeight * 0.9) return

    pending.value = true

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          pending.value = false
          observer.disconnect()
        }
      },
      { threshold: 0.15 }
    )
    observer.observe(el)

    onUnmounted(() => observer.disconnect())
  })

  return { target, pending }
}
