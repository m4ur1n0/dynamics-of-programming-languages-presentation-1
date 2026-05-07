interface CodePanelProps {
  codeLines: string[];
  highlightedLines: number[];
}

export default function CodePanel({ codeLines, highlightedLines }: CodePanelProps) {
  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 bg-slate-950 rounded-lg border border-slate-700 overflow-auto p-3">
        <div className="font-mono text-[0.9rem] leading-relaxed">
          {codeLines.map((line, index) => {
            const lineNum = index + 1;
            const isHighlighted = highlightedLines.includes(lineNum);

            return (
              <div
                key={lineNum}
                className={`flex items-start py-0.5 px-2 rounded transition-all duration-200 gap-3 ${
                  isHighlighted
                    ? 'bg-cyan-500/30 border-l-4 border-cyan-400 -ml-1 pl-1'
                    : ''
                }`}
              >
                <span className="text-slate-600 select-none mr-3 w-6 text-right flex-shrink-0 text-xs">
                  {lineNum}
                </span>
                <span
                  className={`transition-colors duration-200 whitespace-pre ${
                    isHighlighted ? 'text-white font-medium' : 'text-slate-300'
                  }`}
                >
                  {line || ' '}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
