type ToolbarProps = {
  color: string;
  setColor: (color: string) => void;
  lineWidth: number;
  setLineWidth: (width: number) => void;
  onClear: () => void;
};

export default function Toolbar({
  color,
  setColor,
  lineWidth,
  setLineWidth,
  onClear,
}: ToolbarProps) {
  return (
    <div className="bg-white shadow-md rounded-xl px-6 py-4 mb-6 flex items-center justify-between">
      {/* Left - Title */}
      <h2 className="text-2xl font-semibold text-gray-800">CollabCanvas</h2>

      {/* Right - Controls */}
      <div className="flex items-center gap-5">
        {/* Color Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setColor("black")}
            className={`w-7 h-7 rounded-full border-2 transition ${
              color === "black"
                ? "ring-2 ring-offset-2 ring-black"
                : "border-gray-300"
            } bg-black`}
          />
          <button
            onClick={() => setColor("red")}
            className={`w-7 h-7 rounded-full border-2 transition ${
              color === "red"
                ? "ring-2 ring-offset-2 ring-black"
                : "border-gray-300"
            } bg-red-500`}
          />
          <button
            onClick={() => setColor("blue")}
            className={`w-7 h-7 rounded-full border-2 transition ${
              color === "blue"
                ? "ring-2 ring-offset-2 ring-black"
                : "border-gray-300"
            } bg-blue-500`}
          />
        </div>

        {/* Stroke Width */}
        <select
          value={lineWidth}
          onChange={(e) => setLineWidth(Number(e.target.value))}
          className="px-3 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value={1}>Thin</option>
          <option value={3}>Medium</option>
          <option value={6}>Thick</option>
          <option value={10}>Extra Thick</option>
        </select>

        {/* Clear Button */}
        <button
          onClick={onClear}
          className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-600 transition shadow-sm"
        >
          Clear
        </button>
      </div>
    </div>
  );
}
