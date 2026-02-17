const Stamp = () => {
  const GREEN = '#16a34a' // trust green

  return (
    <svg
      width="120"
      height="120"
      viewBox="0 0 200 200"
      style={{
        opacity: 0.85,
        transform: 'rotate(-8deg) translate(-6px, 6px)', // REAL stamp feel
      }}
    >
      {/* Outer bold ring */}
      <circle
        cx="100"
        cy="100"
        r="88"
        fill="none"
        stroke={GREEN}
        strokeWidth="3"
      />

      {/* Inner dashed ring */}
      <circle
        cx="100"
        cy="100"
        r="72"
        fill="none"
        stroke={GREEN}
        strokeWidth="1.5"
        strokeDasharray="4 4"
        opacity="0.75"
      />

      {/* Curved paths */}
      <defs>
        <path id="topCurve" d="M 30 100 A 70 70 0 0 1 170 100" />
        <path id="bottomCurve" d="M 170 100 A 70 70 0 0 1 30 100" />
      </defs>

      {/* TOP TEXT */}
      <text
        fill={GREEN}
        fontSize="13"
        fontWeight="700"
        letterSpacing="2.4"
      >
        <textPath href="#topCurve" startOffset="50%" textAnchor="middle">
          CODEMATE
        </textPath>
      </text>

      {/* CENTER TEXT */}
      <text
        x="100"
        y="108"
        textAnchor="middle"
        fill={GREEN}
        fontSize="14"
        fontWeight="800"
        letterSpacing="1"
      >
        EST. 2025
      </text>

      {/* BOTTOM TEXT */}
      <text
        fill={GREEN}
        fontSize="11"
        fontWeight="600"
        letterSpacing="1.6"
      >
        <textPath href="#bottomCurve" startOffset="50%" textAnchor="middle">
          BUILD SMART · SHIP FAST
        </textPath>
      </text>
    </svg>
  )
}

export default Stamp
