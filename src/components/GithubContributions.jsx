import { useEffect, useState } from "react";

const GITHUB_USERNAME = "AarushGaikwad";
const API_URL = `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=all`;

// Level 0-4 (as returned by the API) mapped to an amber intensity scale,
// so the graph matches our palette instead of GitHub's green.
const levelColor = {
  0: "bg-line",
  1: "bg-amber/25",
  2: "bg-amber/50",
  3: "bg-amber/75",
  4: "bg-amber",
};

const DAY_LABELS = ["", "Mon", "", "Wed", "", "Fri", ""];

// Groups a flat list of {date, count, level} into a grid of weeks
// (columns), each holding up to 7 days (rows, Sun -> Sat) — same
// layout GitHub itself uses for the contribution calendar.
function buildWeeks(yearContributions, year) {
  const byDate = new Map(yearContributions.map((d) => [d.date, d]));

  const jan1 = new Date(`${year}-01-01T00:00:00Z`);
  const dec31 = new Date(`${year}-12-31T00:00:00Z`);
  const gridStart = new Date(jan1);
  gridStart.setUTCDate(gridStart.getUTCDate() - gridStart.getUTCDay());

  const weeks = [];
  let cursor = new Date(gridStart);
  let week = [];

  while (cursor <= dec31) {
    const iso = cursor.toISOString().slice(0, 10);
    const inYear = cursor >= jan1;
    week.push(inYear ? byDate.get(iso) ?? { date: iso, count: 0, level: 0 } : null);

    if (week.length === 7) {
      weeks.push(week);
      week = [];
    }
    cursor.setUTCDate(cursor.getUTCDate() + 1);
  }
  if (week.length) weeks.push(week);

  return weeks;
}

const GithubContributions = () => {
  const [status, setStatus] = useState("loading"); // loading | error | ready
  const [contributions, setContributions] = useState([]);
  const [years, setYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState(null);

  useEffect(() => {
    let cancelled = false;

    fetch(API_URL)
      .then((res) => {
        if (!res.ok) throw new Error(`GitHub contributions API returned ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (cancelled) return;
        const yearList = Object.keys(data.total)
          .filter((y) => y !== "lastYear")
          .sort((a, b) => b - a);

        setContributions(data.contributions);
        setYears(yearList);
        setSelectedYear(yearList[0]);
        setStatus("ready");
      })
      .catch(() => {
        if (!cancelled) setStatus("error");
      });

    return () => {
      cancelled = true;
    };
  }, []);

  if (status === "loading") {
    return (
      <p className="text-slate font-mono text-sm text-center">
        Loading contributions…
      </p>
    );
  }

  if (status === "error") {
    return (
      <p className="text-slate font-mono text-sm text-center">
        Couldn't load GitHub contributions right now.
      </p>
    );
  }

  const yearData = contributions.filter((d) => d.date.startsWith(selectedYear));
  const weeks = buildWeeks(yearData, selectedYear);
  const yearTotal = yearData.reduce((sum, d) => sum + d.count, 0);

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
        <p className="font-mono text-sm text-slate">
          <span className="text-paper">{yearTotal}</span> contributions in{" "}
          {selectedYear}
        </p>
        <div className="flex gap-2">
          {years.map((year) => (
            <button
              key={year}
              onClick={() => setSelectedYear(year)}
              className={`font-mono text-xs px-3 py-1 rounded-full border transition-colors
                ${
                  year === selectedYear
                    ? "border-amber text-amber"
                    : "border-line text-slate hover:text-paper"
                }`}
            >
              {year}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-[3px] overflow-x-auto pb-2">
        <div className="flex flex-col gap-[3px] mr-1">
          {DAY_LABELS.map((label, i) => (
            <span
              key={i}
              className="h-[11px] text-[9px] leading-[11px] text-slate font-mono"
            >
              {label}
            </span>
          ))}
        </div>

        {weeks.map((week, wi) => (
          <div key={wi} className="flex flex-col gap-[3px]">
            {week.map((day, di) =>
              day ? (
                <div
                  key={di}
                  title={`${day.date}: ${day.count} contribution${day.count === 1 ? "" : "s"}`}
                  className={`w-[11px] h-[11px] rounded-sm ${levelColor[day.level] ?? "bg-line"}`}
                />
              ) : (
                <div key={di} className="w-[11px] h-[11px]" />
              )
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GithubContributions;