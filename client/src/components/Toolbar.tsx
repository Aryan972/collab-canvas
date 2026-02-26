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
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-xl font-semibold">
        CollabCanvas Board
      </h2>

      <div className="flex items-center gap-3">
        {/* Color Buttons */}
        <button
          onClick={() => setColor("black")}
          className={`w-6 h-6 rounded-full border ${
            color === "black" ? "ring-2 ring-black" : ""
          } bg-black`}
        />
        <button
          onClick={() => setColor("red")}
          className={`w-6 h-6 rounded-full border ${
            color === "red" ? "ring-2 ring-black" : ""
          } bg-red-500`}
        />
        <button
          onClick={() => setColor("blue")}
          className={`w-6 h-6 rounded-full border ${
            color === "blue" ? "ring-2 ring-black" : ""
          } bg-blue-500`}
        />

        {/* Stroke Width */}
        <select
          value={lineWidth}
          onChange={(e) => setLineWidth(Number(e.target.value))}
          className="px-2 py-1 border rounded-md"
        >
          <option value={1}>Thin</option>
          <option value={3}>Medium</option>
          <option value={6}>Thick</option>
          <option value={10}>Extra Thick</option>
        </select>

        {/* Clear */}
        <button
          onClick={onClear}
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
        >
          Clear
        </button>
      </div>
    </div>
  );
} 