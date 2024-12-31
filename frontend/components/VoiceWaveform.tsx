export default function VoiceWaveform() {
    return (
      <svg width="100" height="60" viewBox="0 0 100 60" aria-hidden="true">
        {[0, 1, 2, 3, 4].map((i) => (
          <rect
            key={i}
            x={i * 20}
            y="30"
            width="15"
            height="0"
            fill={['#EA4335', '#4285F4', '#FBBC05', '#34A853'][i % 4]}
          >
            <animate
              attributeName="height"
              values="10;60;10"
              dur="1s"
              repeatCount="indefinite"
              begin={`${i * 0.2}s`}
            />
          </rect>
        ))}
      </svg>
    )
  }