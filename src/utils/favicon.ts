const createSvgIcon = (content: string) => `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <style>
    .accent { fill: #09090b; stroke: none; }
    path, circle, line { stroke: #09090b; }
    @media (prefers-color-scheme: dark) {
      .accent { fill: #f4f4f5; }
      path, circle, line { stroke: #f4f4f5; }
    }
  </style>
  ${content}
</svg>
`.trim();

const ICONS = {
  default: `
    <circle cx="12" cy="12" r="9" stroke-width="1" stroke-dasharray="2 2" />
    <circle cx="12" cy="12" r="3" class="accent" />
  `,
  work: `
    <path d="M12 2v3M12 19v3M2 12h3M19 12h3" stroke-width="1" />
    <circle cx="12" cy="12" r="5" stroke-width="2" />
    <circle cx="12" cy="12" r="2" class="accent" />
    <path d="M7 3H3v4M21 7V3h-4M17 21h4v-4M3 17v4h4" stroke-width="1" />
  `,
  break: `
    <path d="M2 14c3-3 6-3 9 0s6 3 9 0" stroke-width="2" />
    <circle cx="12" cy="7" r="3" class="accent" />
    <path d="M12 18v3" stroke-width="1" />
  `
};

// Default
// <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="120" height="120" fill="none" stroke="#09090b" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"> <circle cx="12" cy="12" r="9" stroke-width="1" stroke-dasharray="2 2" /> <circle cx="12" cy="12" r="3" fill="#09090b" stroke="none" /> </svg>
// Work
// <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="120" height="120" fill="none" stroke="#09090b" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"> <path d="M12 2v3M12 19v3M2 12h3M19 12h3" stroke-width="1" /> <circle cx="12" cy="12" r="5" stroke-width="2" /> <circle cx="12" cy="12" r="2" fill="#09090b" stroke="none" /> <path d="M7 3H3v4M21 7V3h-4M17 21h4v-4M3 17v4h4" stroke-width="1" /> </svg>
// Break
// <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="120" height="120" fill="none" stroke="#09090b" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"> <path d="M2 14c3-3 6-3 9 0s6 3 9 0" stroke-width="2" /> <circle cx="12" cy="7" r="3" fill="#09090b" stroke="none" /> <path d="M12 18v3" stroke-width="1" /> </svg>


export type FaviconType = keyof typeof ICONS;

export function setFavicon(type: FaviconType) {
  let link = document.querySelector("link[rel*='icon']") as HTMLLinkElement;
  if (!link) {
    link = document.createElement('link');
    link.rel = 'icon';
    document.head.appendChild(link);
  }

  link.type = 'image/svg+xml';
  const svg = createSvgIcon(ICONS[type]);
  const encoded = encodeURIComponent(svg);
  link.href = `data:image/svg+xml,${encoded}`;
}
