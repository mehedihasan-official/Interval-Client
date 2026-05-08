import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ExchangeGetaways = ({ resort }) => {
  const [activeTab, setActiveTab] = useState("");
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [earliestDate, setEarliestDate] = useState("");
  const [latestDate, setLatestDate] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (!earliestDate || !latestDate) {
      alert("Please select both earliest and latest travel dates.");
      return;
    }
    const searchParams = {
      earliestDate,
      latestDate,
      adults,
      children,
      vacationType: activeTab,
    };
    localStorage.setItem("searchParams", JSON.stringify(searchParams));
    navigate("/available-unit", { state: { resort, searchParams } });
  };

  const isExchange = activeTab === "Exchange";
  const isGetaways = activeTab === "Getaways";

  return (
    <div className="p-4 md:p-6">
      <div className="flex justify-center mb-6">
        <button
          className={`px-6 py-2.5 font-semibold text-sm transition-all rounded-l-md border-2 ${isExchange ? "bg-[#18294B] text-white border-[#18294B]" : "border-gray-300 text-gray-700 hover:bg-gray-50"}`}
          onClick={() => setActiveTab("Exchange")}
        >
          Exchange <span className="text-xs opacity-75">(Points)</span>
        </button>
        <button
          className={`px-6 py-2.5 font-semibold text-sm transition-all rounded-r-md border-2 border-l-0 ${isGetaways ? "bg-amber-500 text-white border-amber-500" : "border-gray-300 text-gray-700 hover:bg-gray-50"}`}
          onClick={() => setActiveTab("Getaways")}
        >
          Getaways <span className="text-xs opacity-75">(Cash)</span>
        </button>
      </div>

      <div className="bg-white p-4 md:p-6 rounded-lg border shadow-sm">
        {isExchange && (
          <div>
            {/* Points Summary */}
            <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
              <h3 className="text-sm font-bold text-blue-800 mb-3 flex items-center gap-2">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 2a8 8 0 100 16 8 8 0 000-16zM9 11V5h2v6H9zm0 4v-2h2v2H9z" />
                </svg>
                Points Nightly Rate Reference
              </h3>

              <div className="max-w-md">
                <p className="text-[10px] uppercase tracking-wider text-blue-600 font-bold mb-2">
                  Points / Night
                </p>
                <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-[11px]">
                  {[
                    { t: "Studio", p: "2,000" },
                    { t: "1/1 Bed", p: "3k-4k" },
                    { t: "2/2 Bed", p: "4k-5k" },
                    { t: "3/3 Bed", p: "5k-7k" },
                    { t: "4/4 Bed", p: "8k-12k" },
                  ].map((u) => (
                    <div
                      key={u.t}
                      className="flex justify-between border-b border-blue-100 pb-1"
                    >
                      <span className="text-gray-600">{u.t}</span>
                      <span className="font-bold text-blue-700">{u.p}</span>
                    </div>
                  ))}
                </div>
              </div>
              <p className="text-[10px] text-gray-500 mt-3 italic">
                * Final points will be calculated based on the total number of
                nights selected.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-gray-700 font-medium mb-1 text-sm">
                  Earliest Travel Date
                </label>
                <input
                  type="date"
                  className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-300 focus:outline-none text-sm"
                  value={earliestDate}
                  min={new Date().toISOString().split("T")[0]}
                  onChange={(e) => setEarliestDate(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1 text-sm">
                  Latest Travel Date
                </label>
                <input
                  type="date"
                  className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-300 focus:outline-none text-sm"
                  value={latestDate}
                  min={earliestDate || new Date().toISOString().split("T")[0]}
                  onChange={(e) => setLatestDate(e.target.value)}
                />
              </div>
            </div>
            <hr className="my-4" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
              <div>
                <label className="block text-gray-700 font-medium mb-1 text-sm">
                  Adults
                </label>
                <select
                  className="w-full border rounded-md px-3 py-2 text-sm"
                  value={adults}
                  onChange={(e) => setAdults(parseInt(e.target.value, 10))}
                >
                  {Array.from({ length: 9 }, (_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1 text-sm">
                  Children
                </label>
                <select
                  className="w-full border rounded-md px-3 py-2 text-sm"
                  value={children}
                  onChange={(e) => setChildren(parseInt(e.target.value, 10))}
                >
                  {Array.from({ length: 10 }, (_, i) => (
                    <option key={i} value={i}>
                      {i}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <button
              className="w-full bg-[#18294B] text-white font-bold py-3 rounded-lg hover:bg-[#0f1d35] transition-colors"
              onClick={handleSearch}
            >
              Search Available Units (Points)
            </button>
          </div>
        )}

        {isGetaways && (
          <div>
            <div className="mb-5 p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <h2 className="text-lg font-bold text-[#18294B] mb-1">
                Getaway Vacation (Cash)
              </h2>
              <p className="text-sm text-gray-600">
                Book with cash at our competitive Last Call rates.
              </p>
              <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
                {[
                  { t: "Studio", p: "$50" },
                  { t: "1 Bedroom", p: "$60" },
                  { t: "2/2 Bed", p: "$72" },
                  { t: "3/3 Bed", p: "$80" },
                  { t: "4/4 Bed", p: "$100" },
                ].map((u) => (
                  <div
                    key={u.t}
                    className="bg-white border border-amber-100 rounded p-2 text-center"
                  >
                    <p className="font-semibold text-gray-700">{u.t}</p>
                    <p className="text-amber-600 font-bold">{u.p}</p>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-2">
                * Prices shown before tax
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-gray-700 font-medium mb-1 text-sm">
                  Earliest Travel Date
                </label>
                <input
                  type="date"
                  className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-amber-300 focus:outline-none text-sm"
                  value={earliestDate}
                  min={new Date().toISOString().split("T")[0]}
                  onChange={(e) => setEarliestDate(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1 text-sm">
                  Latest Travel Date
                </label>
                <input
                  type="date"
                  className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-amber-300 focus:outline-none text-sm"
                  value={latestDate}
                  min={earliestDate || new Date().toISOString().split("T")[0]}
                  onChange={(e) => setLatestDate(e.target.value)}
                />
              </div>
            </div>
            <hr className="my-4" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
              <div>
                <label className="block text-gray-700 font-medium mb-1 text-sm">
                  Adults
                </label>
                <select
                  className="w-full border rounded-md px-3 py-2 text-sm"
                  value={adults}
                  onChange={(e) => setAdults(parseInt(e.target.value, 10))}
                >
                  {Array.from({ length: 9 }, (_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1 text-sm">
                  Children
                </label>
                <select
                  className="w-full border rounded-md px-3 py-2 text-sm"
                  value={children}
                  onChange={(e) => setChildren(parseInt(e.target.value, 10))}
                >
                  {Array.from({ length: 10 }, (_, i) => (
                    <option key={i} value={i}>
                      {i}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <button
              className="w-full bg-amber-500 text-white font-bold py-3 rounded-lg hover:bg-amber-600 transition-colors"
              onClick={handleSearch}
            >
              Search Available Units (Cash)
            </button>
          </div>
        )}

        {!activeTab && (
          <div className="text-center py-10 text-gray-400">
            <svg
              className="w-12 h-12 mx-auto mb-3 opacity-30"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <p className="font-medium">Select a vacation type to begin.</p>
            <p className="text-sm mt-1">
              Choose <strong>Exchange</strong> to pay with points or{" "}
              <strong>Getaways</strong> to pay with cash.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExchangeGetaways;
