const Loader = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-50 z-50 animate-pulse">
    <svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: "#1E3A8A", stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: "#9333EA", stopOpacity: 1 }} />
        </linearGradient>
      </defs>
      <circle
        cx="50"
        cy="50"
        r="20"
        stroke="url(#grad)"
        strokeWidth="4"
        fill="none"
        strokeDasharray="10 10"
        strokeLinecap="round"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0 50 50"
          to="360 50 50"
          dur="1.5s"
          repeatCount="indefinite"
        />
      </circle>
    </svg>
  </div>
);

export default Loader;
