export default function VerifiedBadge({ size = 14 }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="#0095F6"
      style={{ width: size, height: size }}
      className="inline-block ml-0.5"
    >
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
    </svg>
  );
}
