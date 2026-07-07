const TerminalTag = () => {
  return (
    <div className="flex items-center gap-3 font-mono text-xs text-slate">
      <span className="border border-line rounded-full px-3 py-1">
        ~/aarush/portfolio <span className="text-amber">(main)</span>
      </span>
      <span className="border border-line rounded-full px-3 py-1">
        v1.0.0
      </span>
    </div>
  );
};

export default TerminalTag;
