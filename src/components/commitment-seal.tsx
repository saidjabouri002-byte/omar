export function CommitmentSeal() {
  const points = Array.from({ length: 96 }, (_, i) => {
    const angle = (i * Math.PI) / 48 - Math.PI / 2;
    const radius = i % 2 === 0 ? 138 : 131;
    return `${150 + radius * Math.cos(angle)},${150 + radius * Math.sin(angle)}`;
  }).join(" ");
  return <div className="gold-commitment-emblem">
    <svg viewBox="0 0 300 300" aria-hidden="true" focusable="false">
      <defs><linearGradient id="seal-gold" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#8e6126"/><stop offset=".28" stopColor="#f6dfa5"/><stop offset=".5" stopColor="#c69a4e"/><stop offset=".75" stopColor="#f4d99a"/><stop offset="1" stopColor="#9c6b2a"/></linearGradient><radialGradient id="seal-face"><stop stopColor="#fffaf0"/><stop offset="1" stopColor="#f3dfb1"/></radialGradient></defs>
      <path d="M67 227 L43 290 L83 276 L106 297 L128 244 M233 227 L257 290 L217 276 L194 297 L172 244" fill="url(#seal-gold)"/>
      <polygon points={points} fill="url(#seal-gold)"/>
      <circle cx="150" cy="150" r="119" fill="url(#seal-face)" stroke="#9f7538" strokeWidth="1"/>
      <circle cx="150" cy="150" r="110" fill="none" stroke="#bc924e" strokeWidth="1.5" strokeDasharray="1 5" strokeLinecap="round"/>
      <circle cx="150" cy="150" r="101" fill="none" stroke="#d2ad6b"/>
      <path d="M133 86 L145 98 L168 73" fill="none" stroke="#956b2d" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M120 211 H180" stroke="#bd9656"/>
      <g fill="#ac803b"><path d="m150 221 2 5 6 .5-4.5 3.5 1.5 5.5-5-3-5 3 1.5-5.5-4.5-3.5 6-.5z"/></g>
    </svg>
    <div className="gold-emblem-copy"><strong>التزام بالمخرجات</strong><span>وضوح في التوقعات</span></div>
  </div>;
}
