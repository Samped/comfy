import { JSX } from 'react'

export const formatText = (text: string): JSX.Element => {
  // Split text by lines first to preserve line breaks
  const lines = text.split('\n')
  
  return (
    <>
      {lines.map((line, lineIndex) => {
        if (!line.trim()) {
          return <br key={lineIndex} />
        }
        
        // Process each line for formatting
        const formattedLine = processLine(line)
        
        return (
          <span key={lineIndex}>
            {formattedLine}
            {lineIndex < lines.length - 1 && <br />}
          </span>
        )
      })}
    </>
  )
}

const processLine = (line: string): JSX.Element[] => {
  const elements: JSX.Element[] = []
  let currentIndex = 0
  
  // Regex patterns for different formatting
  const patterns = [
    // Links: [text](url) or [text](url "title")
    {
      regex: /\[([^\]]+)\]\(([^)]+)(?:\s+"([^"]+)")?\)/g,
      render: (match: RegExpMatchArray, key: number) => (
        <a
          key={key}
          href={match[2]}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:text-blue-300 underline transition-colors"
          title={match[3] || match[1]}
        >
          {match[1]}
        </a>
      )
    },
    // Bold: **text** or __text__
    {
      regex: /\*\*([^*]+)\*\*|__([^_]+)__/g,
      render: (match: RegExpMatchArray, key: number) => (
        <strong key={key} className="font-bold text-white">
          {match[1] || match[2]}
        </strong>
      )
    },
    // Italic: *text* or _text_
    {
      regex: /\*([^*]+)\*|_([^_]+)_/g,
      render: (match: RegExpMatchArray, key: number) => (
        <em key={key} className="italic">
          {match[1] || match[2]}
        </em>
      )
    },
    // Capital/Uppercase: {{TEXT}} - renders text in uppercase
    {
      regex: /\{\{([^}]+)\}\}/g,
      render: (match: RegExpMatchArray, key: number) => (
        <span key={key} className="uppercase font-semibold text-blue-300">
          {match[1]}
        </span>
      )
    },
    // Highlight: ==text==
    {
      regex: /==([^=]+)==/g,
      render: (match: RegExpMatchArray, key: number) => (
        <mark key={key} className="bg-yellow-500/30 text-yellow-200 px-1 rounded">
          {match[1]}
        </mark>
      )
    },
    // Code: `code`
    {
      regex: /`([^`]+)`/g,
      render: (match: RegExpMatchArray, key: number) => (
        <code key={key} className="bg-gray-800 text-green-300 px-2 py-1 rounded text-sm font-mono">
          {match[1]}
        </code>
      )
    }
  ]
  
  // Find all matches and their positions
  const matches: Array<{
    match: RegExpMatchArray
    start: number
    end: number
    pattern: typeof patterns[0]
  }> = []
  
  patterns.forEach(pattern => {
    const regex = new RegExp(pattern.regex.source, 'g')
    let match
    
    while ((match = regex.exec(line)) !== null) {
      matches.push({
        match,
        start: match.index!,
        end: match.index! + match[0].length,
        pattern
      })
    }
  })
  
  // Sort matches by position
  matches.sort((a, b) => a.start - b.start)
  
  // Remove overlapping matches (keep the first one)
  const validMatches: Array<{
    match: RegExpMatchArray
    start: number
    end: number
    pattern: typeof patterns[0]
  }> = []
  for (const match of matches) {
    if (!validMatches.some(vm => 
      (match.start >= vm.start && match.start < vm.end) ||
      (match.end > vm.start && match.end <= vm.end)
    )) {
      validMatches.push(match)
    }
  }
  
  // Build the formatted elements
  let elementKey = 0
  
  validMatches.forEach((matchInfo) => {
    // Add text before the match
    if (matchInfo.start > currentIndex) {
      const beforeText = line.slice(currentIndex, matchInfo.start)
      if (beforeText) {
        elements.push(
          <span key={elementKey++} className="text-gray-300">
            {beforeText}
          </span>
        )
      }
    }
    
    // Add the formatted match
    elements.push(matchInfo.pattern.render(matchInfo.match, elementKey++))
    
    currentIndex = matchInfo.end
  })
  
  // Add remaining text
  if (currentIndex < line.length) {
    const remainingText = line.slice(currentIndex)
    if (remainingText) {
      elements.push(
        <span key={elementKey++} className="text-gray-300">
          {remainingText}
        </span>
      )
    }
  }
  
  // If no formatting was found, return the original line
  if (elements.length === 0) {
    elements.push(
      <span key={0} className="text-gray-300">
        {line}
      </span>
    )
  }
  
  return elements
} 