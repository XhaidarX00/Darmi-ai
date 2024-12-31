export default function TypingAnimation() {
    return (
      <span className="flex space-x-1">
        {[0, 1, 2].map((i) => (
          <span key={i} className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.2}s` }} />
        ))}
      </span>
    )
  }