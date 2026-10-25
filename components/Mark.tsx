export function Mark({ size = 56 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true">
      <circle cx="32" cy="32" r="30.25" fill="#FAF5EE" stroke="#AD8546" strokeWidth="1.15" />
      <circle cx="32" cy="32" r="25.5" fill="none" stroke="#E9D6C6" strokeWidth="0.75" />
      <text
        x="32"
        y="41"
        textAnchor="middle"
        fill="#604638"
        fontFamily="Georgia, 'Palatino Linotype', Palatino, serif"
        fontSize="30"
      >
        P
      </text>
      <circle cx="44.5" cy="44.5" r="2.15" fill="#AD8546" />
    </svg>
  );
}
