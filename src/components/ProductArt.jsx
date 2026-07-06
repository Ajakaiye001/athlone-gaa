import './ProductArt.css'

// Chalk line drawings, like kit sketched on the tactics board.
// Every path uses pathLength=100 so the hover redraw animation is uniform.
const P = (d, extra = {}) => <path d={d} pathLength="100" {...extra} />

const ART = {
  jersey: (
    <>
      {P('M35 22 L20 30 L14 48 L26 53 L28 44 L28 92 L72 92 L72 44 L74 53 L86 48 L80 30 L65 22 C60 30 40 30 35 22 Z')}
      {P('M28 60 L72 60 M28 72 L72 72')}
      <circle cx="41" cy="40" r="4.5" pathLength="100" />
    </>
  ),
  'jersey-away': (
    <>
      {P('M35 22 L20 30 L14 48 L26 53 L28 44 L28 92 L72 92 L72 44 L74 53 L86 48 L80 30 L65 22 C60 30 40 30 35 22 Z')}
      {P('M28 52 L72 52 L72 64 L28 64 Z')}
      <circle cx="41" cy="40" r="4.5" pathLength="100" />
    </>
  ),
  football: (
    <>
      <circle cx="50" cy="57" r="34" pathLength="100" />
      {P('M22 44 C38 52 62 52 78 44 M22 70 C38 62 62 62 78 70 M50 23 L50 91')}
    </>
  ),
  sliotar: (
    <>
      <circle cx="50" cy="57" r="26" pathLength="100" />
      {P('M32 39 C44 50 44 64 32 75 M68 39 C56 50 56 64 68 75')}
    </>
  ),
  hurley: (
    <>
      {P('M58 14 L52 68 C50 80 42 88 32 90 C22 92 16 84 18 76 C20 68 30 64 38 66 C46 68 48 60 49 52 L54 13 Z')}
      {P('M55 26 L60 27')}
    </>
  ),
}

export default function ProductArt({ kind, className = '' }) {
  return (
    <svg
      viewBox="0 0 100 108"
      className={`product-art ${className}`}
      aria-hidden
      focusable="false"
    >
      {ART[kind] || ART.football}
    </svg>
  )
}
