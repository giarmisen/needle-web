export default function EditorialFooter() {
  return (
    <footer className="mt-8 border-t-4 border-[#0a0a0a] pt-4">
      <div className="flex items-center justify-end gap-3">
        <span className="text-[11px] text-[#888888] [font-family:Arial,Helvetica,sans-serif]">Georgina Armisen</span>
        <a
          href="https://www.linkedin.com/in/giarmisen/"
          target="_blank"
          rel="noreferrer"
          className="text-[#888888] hover:text-[#0a0a0a]"
          aria-label="LinkedIn"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
            <path d="M4.98 3.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.64h.05c.53-1 1.84-2.05 3.79-2.05C21 8.59 21 11 21 14.1V21h-4v-6.1c0-1.45-.03-3.31-2.02-3.31-2.02 0-2.33 1.58-2.33 3.2V21h-4V9Z" />
          </svg>
        </a>
        <a
          href="https://open.spotify.com/user/jirafisima"
          target="_blank"
          rel="noreferrer"
          className="text-[#888888] hover:text-[#0a0a0a]"
          aria-label="Spotify"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2Zm4.65 14.54a.62.62 0 0 1-.85.2c-2.33-1.42-5.26-1.74-8.7-.95a.62.62 0 0 1-.28-1.2c3.77-.86 7.01-.5 9.63 1.1.3.18.4.57.2.85Zm1.21-2.68a.78.78 0 0 1-1.07.25c-2.66-1.64-6.71-2.12-9.86-1.17a.78.78 0 1 1-.45-1.5c3.6-1.08 8.07-.55 11.13 1.34.37.23.49.71.25 1.08Zm.1-2.8c-3.19-1.9-8.45-2.08-11.5-1.15a.94.94 0 1 1-.55-1.79c3.5-1.06 9.31-.85 13.01 1.35a.94.94 0 0 1-.96 1.59Z" />
          </svg>
        </a>
        <a
          href="https://github.com/giarmisen"
          target="_blank"
          rel="noreferrer"
          className="text-[#888888] hover:text-[#0a0a0a]"
          aria-label="GitHub"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
            <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.18-3.37-1.18-.45-1.16-1.1-1.47-1.1-1.47-.9-.61.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.88 1.52 2.31 1.08 2.88.83.09-.64.35-1.08.63-1.33-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.99 1.03-2.7-.11-.25-.45-1.28.1-2.67 0 0 .84-.27 2.75 1.03A9.5 9.5 0 0 1 12 6.8c.85 0 1.7.11 2.5.34 1.9-1.3 2.74-1.03 2.74-1.03.55 1.39.21 2.42.11 2.67.64.71 1.02 1.61 1.02 2.7 0 3.84-2.34 4.69-4.57 4.94.36.31.68.91.68 1.84v2.73c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
          </svg>
        </a>
      </div>
    </footer>
  );
}

