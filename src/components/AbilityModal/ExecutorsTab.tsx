const DEFAULT_COMMAND = `function getFullList($portList){
  $final = @();
  foreach ($p in $portList) {
    if ($p -like "*-*") {
      $minimax = $p.Split("-");
      for ($i = [int]$minimax[0]; $i -lt [int]$minimax[1]; $i++) {
        $final += ($i -as [string]);
      }
    }
  }
  return $final;
}`;

export const ExecutorsTab = () => {
  return (
    <div className="space-y-4">
      {/* Choose Dropdown */}
      <div>
        <select className="w-full bg-base-800 p-2 rounded">
          <option value="">Choose...</option>
          <option value="option1">Windows Default</option>
          <option value="option2">Linux Bash</option>
          {/* ...add your options here */}
        </select>
      </div>

      {/* Platform Radio */}
      <div className="flex flex-wrap gap-6 items-center">
        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="platform"
            defaultChecked
            className="accent-blue-500"
          />
          <span>Windows</span>
        </label>
        <label className="flex items-center gap-2">
          <input type="radio" name="platform" className="accent-blue-500" />
          <span>Linux</span>
        </label>
        <label className="flex items-center gap-2">
          <input type="radio" name="platform" className="accent-blue-500" />
          <span>OS X</span>
        </label>
      </div>

      {/* Executor Radio */}
      <div className="flex flex-wrap gap-6 items-center">
        {["psh", "cmd", "proc", "MNX", "Elastic"].map((ex) => (
          <label key={ex} className="flex items-center gap-2">
            <input type="radio" name="executor" className="accent-blue-500" />
            <span>{ex}</span>
          </label>
        ))}
      </div>

      {/* Payloads */}
      <div>
        <textarea
          className="bg-base-800 p-2 w-full rounded resize-none"
          placeholder="내용..."
          rows={3}
        />
      </div>

      {/* Command block */}
      <div>
        <label className="block text-sm font-medium mb-1">Command</label>
        <textarea
          className="bg-base-800 p-2 w-full rounded resize-none font-mono text-sm leading-relaxed"
          rows={6}
          defaultValue={DEFAULT_COMMAND}
        />
      </div>

      {/* Timeout + Cleanup */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Timeout</label>
          <input
            type="number"
            className="bg-base-800 p-2 rounded w-full"
            defaultValue={60}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Cleanup</label>
          <input
            type="number"
            className="bg-base-800 p-2 rounded w-full"
            defaultValue={60}
          />
        </div>
      </div>
    </div>
  );
};
