"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { barlow } from "./fonts";
import s from "./trilo-app.module.css";

/* ---- Sample league (made-up league and handles; statuses match the bot) -- */

type Status = "pending" | "completed" | "sim" | "fw";
type Side = {
  team: string;
  abbr: string;
  color: string;
  user?: string;
  cpu?: boolean;
};
type Game = {
  id: string;
  a: Side;
  b: Side;
  status: Status;
  winner?: "a" | "b";
  auto?: boolean;
  mine?: boolean;
  live?: boolean;
};

const t = (team: string, abbr: string, color: string, user?: string): Side =>
  user ? { team, abbr, color, user } : { team, abbr, color, cpu: true };

const WEEK9: Game[] = [
  {
    id: "g1",
    a: t("Clemson", "CLEM", "#f56600", "tigerpaw"),
    b: t("Michigan", "MICH", "#ffcb05", "you"),
    status: "pending",
    mine: true,
    live: true,
  },
  {
    id: "g2",
    a: t("Tennessee", "TENN", "#ff8200", "rockytop"),
    b: t("LSU", "LSU", "#7b2cbf", "bayoubengal"),
    status: "pending",
  },
  {
    id: "g3",
    a: t("Florida", "FLA", "#0f5bd8", "gatorchomp"),
    b: t("Colorado", "COLO", "#cfb87c", "primetime"),
    status: "pending",
  },
  {
    id: "g4",
    a: t("Missouri", "MIZ", "#f1b82d", "tigerstripe"),
    b: t("USC", "USC", "#c41e3a", "fighton"),
    status: "pending",
  },
  {
    id: "g5",
    a: t("Miami", "MIA", "#f47321", "canes_k"),
    b: t("Oklahoma", "OU", "#a32036", "boomer"),
    status: "completed",
  },
  {
    id: "g6",
    a: t("Oregon", "ORE", "#154733", "duckszn"),
    b: t("Auburn", "AUB", "#e87722", "wareagle"),
    status: "completed",
  },
  {
    id: "g7",
    a: t("Washington", "UW", "#4b2e83", "dawgpound"),
    b: t("Texas", "TEX", "#bf5700", "hookem"),
    status: "completed",
  },
  {
    id: "g8",
    a: t("Georgia", "UGA", "#ba0c2f", "dawgcheck"),
    b: t("Baylor", "BAY", "#154734", "sicem"),
    status: "completed",
  },
  {
    id: "g9",
    a: t("Indiana", "IU", "#990000", "hoosier"),
    b: t("Texas A&M", "TAMU", "#500000", "gigem"),
    status: "sim",
  },
  {
    id: "g10",
    a: t("Navy", "NAVY", "#00205b", "goatlocker"),
    b: t("Notre Dame", "ND", "#c99700", "irish"),
    status: "sim",
  },
  {
    id: "g11",
    a: t("Alabama", "BAMA", "#9e1b32", "rolltide"),
    b: t("Utah", "UTAH", "#cc0000"),
    status: "fw",
    winner: "a",
    auto: true,
  },
  {
    id: "g12",
    a: t("Arkansas", "ARK", "#9d2235", "woopig"),
    b: t("South Carolina", "SC", "#73000a"),
    status: "fw",
    winner: "a",
    auto: true,
  },
  {
    id: "g13",
    a: t("Georgia Tech", "GT", "#b3a369"),
    b: t("Ohio State", "OSU", "#bb0000", "buckeye"),
    status: "fw",
    winner: "b",
    auto: true,
  },
  {
    id: "g14",
    a: t("Penn State", "PSU", "#041e42", "wearepsu"),
    b: t("UCLA", "UCLA", "#2d68c4"),
    status: "fw",
    winner: "a",
    auto: true,
  },
  {
    id: "g15",
    a: t("Nebraska", "NEB", "#e41c38", "gbr"),
    b: t("Vanderbilt", "VAN", "#866d4b", "commodore"),
    status: "fw",
    winner: "b",
  },
];

const STATUS_LABEL: Record<Status, string> = {
  pending: "Pending",
  completed: "Completed",
  sim: "Fair sim",
  fw: "Force win",
};

type Request = {
  id: number;
  who: string;
  player: string;
  pos: string;
  attr: string;
  amount: number;
  status: "pending" | "approved" | "denied";
};

const MY_REQUESTS: Request[] = [
  {
    id: 41,
    who: "you",
    player: "J. Carter",
    pos: "QB",
    attr: "THP",
    amount: 2,
    status: "approved",
  },
  {
    id: 47,
    who: "you",
    player: "D. Mills",
    pos: "WR",
    attr: "SPD",
    amount: 1,
    status: "pending",
  },
  {
    id: 39,
    who: "you",
    player: "T. Reed",
    pos: "CB",
    attr: "MCV",
    amount: 3,
    status: "denied",
  },
];

const QUEUE: Request[] = [
  {
    id: 48,
    who: "rolltide",
    player: "K. Hayes",
    pos: "RB",
    attr: "ACC",
    amount: 2,
    status: "pending",
  },
  {
    id: 49,
    who: "duckszn",
    player: "M. Ortiz",
    pos: "LB",
    attr: "TAK",
    amount: 1,
    status: "pending",
  },
  {
    id: 50,
    who: "canes_k",
    player: "B. Lewis",
    pos: "WR",
    attr: "CTH",
    amount: 3,
    status: "pending",
  },
];

const POSITIONS = ["QB", "RB", "WR", "TE", "OL", "DL", "LB", "CB", "S", "K"];
const ATTRS = [
  "SPD",
  "ACC",
  "AGI",
  "STR",
  "THP",
  "THA",
  "CTH",
  "MCV",
  "TAK",
  "BSK",
];

/* ---- Shell ---------------------------------------------------------------- */

type Screen = "league" | "week" | "points" | "commish";
type View = "default" | "loading" | "empty" | "error";
type Role = "member" | "commish";

const SCREENS: { id: Screen; label: string; note: string }[] = [
  {
    id: "league",
    label: "League",
    note: "What matters this week: the advance deadline, your game and what just changed.",
  },
  {
    id: "week",
    label: "Week",
    note: "Every matchup with its status. Tap a game to set the result, the way the bot’s reactions work today.",
  },
  {
    id: "points",
    label: "Points",
    note: "Spend attribute points on player upgrades. The form stops a request you can’t afford before it’s sent.",
  },
  {
    id: "commish",
    label: "Commish",
    note: "The commissioner’s tools: import a week from a screenshot, review what the AI read, and clear the approval queue.",
  },
];

const VIEWS: { id: View; label: string }[] = [
  { id: "default", label: "Default" },
  { id: "loading", label: "Loading" },
  { id: "empty", label: "Empty" },
  { id: "error", label: "Error" },
];

function useRovingKeys(count: number, index: number, set: (i: number) => void) {
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const onKeyDown = (e: KeyboardEvent) => {
    const step =
      e.key === "ArrowRight" || e.key === "ArrowDown"
        ? 1
        : e.key === "ArrowLeft" || e.key === "ArrowUp"
          ? -1
          : 0;
    if (!step) return;
    e.preventDefault();
    const next = (index + step + count) % count;
    set(next);
    refs.current[next]?.focus();
  };
  return { refs, onKeyDown };
}

function Radios<T extends string>({
  label,
  options,
  value,
  onChange,
  className,
}: {
  label: string;
  options: { id: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
  className?: string;
}) {
  const i = options.findIndex((o) => o.id === value);
  const { refs, onKeyDown } = useRovingKeys(options.length, i, (n) =>
    onChange(options[n].id),
  );
  return (
    <div
      className={className}
      role="radiogroup"
      aria-label={label}
      onKeyDown={onKeyDown}
    >
      {options.map((o, j) => (
        <button
          key={o.id}
          ref={(el) => {
            refs.current[j] = el;
          }}
          type="button"
          role="radio"
          aria-checked={o.id === value}
          tabIndex={o.id === value ? 0 : -1}
          onClick={() => onChange(o.id)}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

export function TriloApp() {
  const [screen, setScreen] = useState<Screen>("league");
  const [view, setView] = useState<View>("default");
  const [role, setRole] = useState<Role>("commish");
  const [games, setGames] = useState(WEEK9);
  const [open, setOpen] = useState<string | null>(null);
  const [toast, setToast] = useState<{
    text: string;
    undo?: () => void;
  } | null>(null);
  const toastTimer = useRef<number | undefined>(undefined);

  const notify = (text: string, undo?: () => void) => {
    window.clearTimeout(toastTimer.current);
    setToast({ text, undo });
    toastTimer.current = window.setTimeout(() => setToast(null), 4000);
  };

  const go = (sc: Screen) => {
    setScreen(sc);
    setOpen(null);
  };

  const setResult = (id: string, status: Status, winner?: "a" | "b") => {
    const before = games;
    setGames((g) =>
      g.map((x) =>
        x.id === id ? { ...x, status, winner, auto: false, live: false } : x,
      ),
    );
    setOpen(null);
    const game = before.find((x) => x.id === id)!;
    const label =
      status === "fw"
        ? `Force win: ${winner === "a" ? game.a.team : game.b.team}`
        : STATUS_LABEL[status];
    notify(`${game.a.abbr} vs ${game.b.abbr} marked ${label}`, () =>
      setGames(before),
    );
  };

  const tabs = SCREENS.filter((x) => role === "commish" || x.id !== "commish");
  const current = SCREENS.find((x) => x.id === screen)!;

  return (
    <div className={s.wrap}>
      <div className={`${s.device} ${barlow.variable}`}>
        <div className={s.phone}>
          <div className={s.status} aria-hidden>
            <span>9:41</span>
            <span className={s.island} />
            <span className={s.statusIcons}>
              <i />
              <i />
              <b />
            </span>
          </div>

          <header className={s.appBar}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/work/trilo-app/logo.webp" alt="" className={s.appLogo} />
            <div className={s.leagueName}>
              <b>Delta Dynasty</b>
              <span>CFB · Season 3</span>
            </div>
            <span className={s.roleChip}>
              {role === "commish" ? "Commish" : "Member"}
            </span>
          </header>

          <div className={s.scroll}>
            {view === "error" && (
              <div className={s.banner} role="status">
                <b>Can’t reach Discord right now.</b>
                <span>Showing what synced 2 minutes ago.</span>
                <button type="button" onClick={() => setView("default")}>
                  Retry
                </button>
              </div>
            )}
            {view === "loading" ? (
              <Skeleton />
            ) : screen === "league" ? (
              <LeagueScreen
                games={games}
                view={view}
                onOpenGame={(id) => {
                  go("week");
                  setOpen(id);
                }}
                onGo={go}
              />
            ) : screen === "week" ? (
              <WeekScreen
                games={games}
                view={view}
                onOpen={setOpen}
                role={role}
                onGo={go}
              />
            ) : screen === "points" ? (
              <PointsScreen view={view} notify={notify} />
            ) : (
              <CommishScreen view={view} notify={notify} />
            )}
          </div>

          <AnimatePresence>
            {open && (
              <GameSheet
                key={open}
                game={games.find((g) => g.id === open)!}
                onClose={() => setOpen(null)}
                onSet={setResult}
              />
            )}
          </AnimatePresence>

          <AnimatePresence>
            {toast && (
              <motion.div
                className={s.toast}
                role="status"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
              >
                <span>{toast.text}</span>
                {toast.undo && (
                  <button
                    type="button"
                    onClick={() => {
                      toast.undo?.();
                      setToast(null);
                    }}
                  >
                    Undo
                  </button>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          <nav className={s.tabBar} aria-label="App sections">
            {tabs.map((x) => (
              <button
                key={x.id}
                type="button"
                aria-current={screen === x.id ? "page" : undefined}
                onClick={() => go(x.id)}
              >
                <TabIcon id={x.id} />
                {x.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      <aside className={s.panel}>
        <div className={s.panelGroup}>
          <p className={s.panelLabel}>Screen</p>
          <Radios
            label="Screen"
            options={tabs}
            value={screen}
            onChange={go}
            className={s.panelRadios}
          />
          <p className={s.panelNote}>{current.note}</p>
        </div>
        <div className={s.panelGroup}>
          <p className={s.panelLabel}>State</p>
          <Radios
            label="State"
            options={VIEWS}
            value={view}
            onChange={setView}
            className={s.panelRadios}
          />
        </div>
        <div className={s.panelGroup}>
          <p className={s.panelLabel}>Signed in as</p>
          <Radios
            label="Role"
            options={[
              { id: "commish", label: "Commissioner" },
              { id: "member", label: "League member" },
            ]}
            value={role}
            onChange={(r) => {
              setRole(r);
              if (r === "member" && screen === "commish") go("league");
            }}
            className={s.panelRadios}
          />
        </div>
        <button
          type="button"
          className={s.reset}
          onClick={() => {
            setGames(WEEK9);
            setView("default");
            go("league");
          }}
        >
          Reset the prototype
        </button>
      </aside>
    </div>
  );
}

function TabIcon({ id }: { id: Screen }) {
  const d: Record<Screen, ReactNode> = {
    league: (
      <path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-6h-4v6H5a1 1 0 0 1-1-1z" />
    ),
    week: (
      <>
        <rect x="4" y="5" width="16" height="15" rx="2" />
        <path d="M4 10h16M9 3v4M15 3v4" />
      </>
    ),
    points: (
      <path d="M12 3l2.6 5.6 6 .7-4.5 4.1 1.2 6L12 16.4 6.7 19.4l1.2-6L3.4 9.3l6-.7z" />
    ),
    commish: (
      <>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6" />
      </>
    ),
  };
  return (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinejoin="round"
      strokeLinecap="round"
      aria-hidden
    >
      {d[id]}
    </svg>
  );
}

function Skeleton() {
  return (
    <div className={s.skeleton} aria-label="Loading" role="status">
      <span style={{ height: 132 }} />
      <span style={{ height: 18, width: "40%" }} />
      <span style={{ height: 76 }} />
      <span style={{ height: 76 }} />
      <span style={{ height: 76 }} />
    </div>
  );
}

/* ---- League -------------------------------------------------------------- */

function useCountdown(ms: number) {
  const [end, setEnd] = useState<number | null>(null);
  const [now, setNow] = useState(0);
  useEffect(() => {
    const start = Date.now();
    setEnd(start + ms);
    setNow(start);
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, [ms]);
  const left = end === null ? ms : Math.max(0, end - now);
  const h = Math.floor(left / 3.6e6);
  const m = Math.floor((left % 3.6e6) / 6e4);
  const sec = Math.floor((left % 6e4) / 1000);
  return { h, m, sec };
}

function counts(games: Game[]) {
  return {
    completed: games.filter((g) => g.status === "completed").length,
    sim: games.filter((g) => g.status === "sim").length,
    fw: games.filter((g) => g.status === "fw").length,
    pending: games.filter((g) => g.status === "pending").length,
  };
}

function LeagueScreen({
  games,
  view,
  onOpenGame,
  onGo,
}: {
  games: Game[];
  view: View;
  onOpenGame: (id: string) => void;
  onGo: (s: Screen) => void;
}) {
  const { h, m, sec } = useCountdown((14 * 60 + 22) * 60 * 1000);
  const c = counts(games);
  const settled = games.length - c.pending;
  const mine = games.find((g) => g.mine)!;
  if (view === "empty") {
    return (
      <Empty
        title="The season hasn’t started"
        text="Once your commissioner imports Week 1, your matchup and the advance deadline show up here."
      />
    );
  }
  return (
    <div className={s.stack}>
      <section className={s.hero}>
        <div className={s.heroTop}>
          <span className={s.kicker}>Week 9</span>
          <span className={s.heroLabel}>Next advance in</span>
        </div>
        <p
          className={s.countdown}
          aria-label={`${h} hours ${m} minutes until the next advance`}
        >
          {h}
          <small>h</small> {String(m).padStart(2, "0")}
          <small>m</small>{" "}
          <span className={s.secs}>{String(sec).padStart(2, "0")}s</span>
        </p>
        <div
          className={s.progress}
          aria-label={`${settled} of ${games.length} games settled`}
        >
          <span
            style={{ width: `${(c.completed / games.length) * 100}%` }}
            data-k="completed"
          />
          <span
            style={{ width: `${(c.sim / games.length) * 100}%` }}
            data-k="sim"
          />
          <span
            style={{ width: `${(c.fw / games.length) * 100}%` }}
            data-k="fw"
          />
        </div>
        <p className={s.heroFoot}>
          <b>
            {settled} of {games.length}
          </b>{" "}
          games settled · {c.pending} pending
        </p>
      </section>

      <p className={s.sectionLabel}>Your game</p>
      <button
        type="button"
        className={s.myGame}
        onClick={() => onOpenGame(mine.id)}
      >
        <div className={s.myTeams}>
          <TeamMark side={mine.a} />
          <span className={s.vs}>vs</span>
          <TeamMark side={mine.b} />
        </div>
        <div className={s.myMeta}>
          {mine.live && mine.status === "pending" ? (
            <span className={s.live}>
              <i /> Streaming now
            </span>
          ) : (
            <StatusPill game={mine} />
          )}
          <span className={s.myCta}>Set result →</span>
        </div>
      </button>

      <p className={s.sectionLabel}>Latest</p>
      <ul className={s.feed}>
        <li>
          <span className={s.feedDot} data-k="completed" />
          <span>
            <b>Georgia vs Baylor</b> marked Completed
          </span>
          <time>2m</time>
        </li>
        <li>
          <span className={s.feedDot} data-k="fw" />
          <span>
            <b>Ohio State</b> force win over Georgia Tech (CPU)
          </span>
          <time>18m</time>
        </li>
        <li>
          <span className={s.feedDot} data-k="points" />
          <span>
            <b>@rolltide</b> requested RB K. Hayes ACC +2
          </span>
          <time>1h</time>
        </li>
      </ul>
      <button type="button" className={s.linkBtn} onClick={() => onGo("week")}>
        See all Week 9 games
      </button>
    </div>
  );
}

// Dark text on light team colors (Michigan maize, Mizzou gold) keeps badges readable.
function textOn(hex: string) {
  const [r, g, b] = [1, 3, 5].map(
    (i) => parseInt(hex.slice(i, i + 2), 16) / 255,
  );
  const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return lum > 0.55 ? "#141414" : "#ffffff";
}

function TeamMark({ side, size = "md" }: { side: Side; size?: "sm" | "md" }) {
  return (
    <span className={s.teamMark} data-size={size}>
      <span
        className={s.badge}
        style={{ background: side.color, color: textOn(side.color) }}
      >
        {side.abbr.slice(0, 4)}
      </span>
      <span className={s.teamText}>
        <b>{side.team}</b>
        <span>
          {side.cpu ? "CPU" : side.user === "you" ? "You" : `@${side.user}`}
        </span>
      </span>
    </span>
  );
}

function StatusPill({ game }: { game: Game }) {
  const label =
    game.status === "fw"
      ? `FW ${game.winner === "a" ? game.a.abbr : game.b.abbr}${game.auto ? " · auto" : ""}`
      : STATUS_LABEL[game.status];
  return (
    <span className={s.pill} data-k={game.status}>
      {label}
    </span>
  );
}

/* ---- Week ----------------------------------------------------------------- */

type Filter = "all" | "pending" | "settled";

function WeekScreen({
  games,
  view,
  onOpen,
  role,
  onGo,
}: {
  games: Game[];
  view: View;
  onOpen: (id: string) => void;
  role: Role;
  onGo: (s: Screen) => void;
}) {
  const [week, setWeek] = useState(9);
  const [filter, setFilter] = useState<Filter>("all");
  const empty = view === "empty" || week === 10;
  const list =
    week < 9
      ? games.map((g) => ({
          ...g,
          status: "completed" as Status,
          live: false,
          auto: false,
        }))
      : games;
  const shown = list.filter((g) =>
    filter === "all"
      ? true
      : filter === "pending"
        ? g.status === "pending"
        : g.status !== "pending",
  );
  return (
    <div className={s.stack}>
      <div className={s.weeks} role="tablist" aria-label="Week">
        {[7, 8, 9, 10].map((w) => (
          <button
            key={w}
            type="button"
            role="tab"
            aria-selected={week === w}
            onClick={() => setWeek(w)}
          >
            <small>Week</small>
            {w}
          </button>
        ))}
      </div>
      {empty ? (
        <Empty
          title={`No games for Week ${week === 10 ? 10 : week} yet`}
          text={
            role === "commish"
              ? "Import the schedule from a screenshot and the matchups appear here."
              : "Your commissioner hasn’t posted this week’s schedule yet."
          }
          action={
            role === "commish"
              ? { label: "Import a schedule", onClick: () => onGo("commish") }
              : undefined
          }
        />
      ) : (
        <>
          <Radios
            label="Filter"
            options={[
              { id: "all", label: `All ${list.length}` },
              {
                id: "pending",
                label: `Pending ${list.filter((g) => g.status === "pending").length}`,
              },
              { id: "settled", label: "Settled" },
            ]}
            value={filter}
            onChange={setFilter}
            className={s.filters}
          />
          <ul className={s.games}>
            {shown.map((g) => (
              <li key={g.id}>
                <button
                  type="button"
                  className={s.gameRow}
                  onClick={() => week === 9 && onOpen(g.id)}
                  data-mine={g.mine ?? false}
                >
                  <span className={s.gameSides}>
                    <TeamMark side={g.a} size="sm" />
                    <TeamMark side={g.b} size="sm" />
                  </span>
                  {g.live && g.status === "pending" ? (
                    <span className={s.live}>
                      <i /> Live
                    </span>
                  ) : (
                    <StatusPill game={g} />
                  )}
                </button>
              </li>
            ))}
            {shown.length === 0 && (
              <li className={s.none}>
                Nothing here. Every game this week is settled.
              </li>
            )}
          </ul>
        </>
      )}
    </div>
  );
}

function GameSheet({
  game,
  onClose,
  onSet,
}: {
  game: Game;
  onClose: () => void;
  onSet: (id: string, st: Status, w?: "a" | "b") => void;
}) {
  const reduce = useReducedMotion();
  const [choice, setChoice] = useState<string>(
    game.status === "fw" ? `fw-${game.winner}` : game.status,
  );
  const opts = [
    { id: "completed", label: "Completed", hint: "Played head to head" },
    { id: "sim", label: "Fair sim", hint: "Simmed with no thumb on the scale" },
    {
      id: "fw-a",
      label: `Force win · ${game.a.team}`,
      hint: game.a.cpu ? "CPU team" : `@${game.a.user}`,
    },
    {
      id: "fw-b",
      label: `Force win · ${game.b.team}`,
      hint: game.b.cpu
        ? "CPU team"
        : game.b.user === "you"
          ? "You"
          : `@${game.b.user}`,
    },
  ];
  const apply = () => {
    if (choice.startsWith("fw-"))
      onSet(game.id, "fw", choice.slice(3) as "a" | "b");
    else onSet(game.id, choice as Status);
  };
  return (
    <>
      <motion.button
        type="button"
        aria-label="Close"
        className={s.scrim}
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />
      <motion.div
        className={s.sheet}
        role="dialog"
        aria-label={`${game.a.team} vs ${game.b.team}`}
        initial={reduce ? { opacity: 0 } : { y: "100%" }}
        animate={reduce ? { opacity: 1 } : { y: 0 }}
        exit={reduce ? { opacity: 0 } : { y: "100%" }}
        transition={{ type: "spring", stiffness: 380, damping: 38 }}
      >
        <span className={s.grabber} aria-hidden />
        <div className={s.sheetTeams}>
          <TeamMark side={game.a} />
          <span className={s.vs}>vs</span>
          <TeamMark side={game.b} />
        </div>
        <p className={s.sectionLabel}>Set the result</p>
        <div className={s.choices} role="radiogroup" aria-label="Result">
          {opts.map((o) => (
            <button
              key={o.id}
              type="button"
              role="radio"
              aria-checked={choice === o.id}
              onClick={() => setChoice(o.id)}
              className={s.choice}
            >
              <span className={s.radio} aria-hidden />
              <span>
                <b>{o.label}</b>
                <small>{o.hint}</small>
              </span>
            </button>
          ))}
        </div>
        <button
          type="button"
          className={s.primary}
          onClick={apply}
          disabled={choice === "pending"}
        >
          Save result
        </button>
        <p className={s.sheetFoot}>
          The matchup channel in Discord updates too. You can undo for a few
          seconds.
        </p>
      </motion.div>
    </>
  );
}

/* ---- Points --------------------------------------------------------------- */

function PointsScreen({
  view,
  notify,
}: {
  view: View;
  notify: (t: string) => void;
}) {
  const [available, setAvailable] = useState(7);
  const [requests, setRequests] = useState(MY_REQUESTS);
  const [player, setPlayer] = useState("");
  const [pos, setPos] = useState("WR");
  const [attr, setAttr] = useState("SPD");
  const [amount, setAmount] = useState(2);
  const [touched, setTouched] = useState(false);
  if (view === "empty")
    return (
      <Empty
        title="No points yet"
        text="Your commissioner hands out points for wins, streams and league events. They’ll show up here."
      />
    );
  const tooMany = amount > available;
  const missing = player.trim().length < 2;
  const submit = () => {
    setTouched(true);
    if (tooMany || missing) return;
    setRequests((r) => [
      {
        id: 51,
        who: "you",
        player: player.trim(),
        pos,
        attr,
        amount,
        status: "pending",
      },
      ...r,
    ]);
    setAvailable((a) => a - amount);
    setPlayer("");
    setTouched(false);
    notify(`Requested ${pos} ${player.trim()} ${attr} +${amount}`);
  };
  return (
    <div className={s.stack}>
      <section className={s.balance}>
        <div>
          <span className={s.kicker}>Available</span>
          <p className={s.bigNum}>{available}</p>
        </div>
        <div>
          <span className={s.heroLabel}>Earned this season</span>
          <p className={s.midNum}>15</p>
        </div>
      </section>

      <form
        className={s.form}
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
        noValidate
      >
        <p className={s.formTitle}>Request an upgrade</p>
        <label className={s.field} data-error={touched && missing}>
          <span>Player</span>
          <input
            value={player}
            onChange={(e) => setPlayer(e.target.value)}
            placeholder="e.g. D. Mills"
            maxLength={40}
          />
          {touched && missing && <small>Add the player’s name.</small>}
        </label>
        <div className={s.fieldRow}>
          <label className={s.field}>
            <span>Position</span>
            <select value={pos} onChange={(e) => setPos(e.target.value)}>
              {POSITIONS.map((p) => (
                <option key={p}>{p}</option>
              ))}
            </select>
          </label>
          <label className={s.field}>
            <span>Attribute</span>
            <select value={attr} onChange={(e) => setAttr(e.target.value)}>
              {ATTRS.map((p) => (
                <option key={p}>{p}</option>
              ))}
            </select>
          </label>
        </div>
        <div className={s.field} data-error={tooMany}>
          <span>Points</span>
          <div className={s.stepper}>
            <button
              type="button"
              onClick={() => setAmount((a) => Math.max(1, a - 1))}
              aria-label="One less point"
            >
              −
            </button>
            <output aria-live="polite">{amount}</output>
            <button
              type="button"
              onClick={() => setAmount((a) => Math.min(10, a + 1))}
              aria-label="One more point"
            >
              +
            </button>
          </div>
          {tooMany && (
            <small>
              You have {available}. Lower the amount or earn more first.
            </small>
          )}
        </div>
        <button type="submit" className={s.primary} disabled={tooMany}>
          Send to commissioner
        </button>
      </form>

      <p className={s.sectionLabel}>Your requests</p>
      <ul className={s.requests}>
        {requests.map((r) => (
          <li key={r.id}>
            <span>
              <b>
                {r.pos} {r.player}
              </b>
              <small>
                {r.attr} +{r.amount}
              </small>
            </span>
            <span className={s.pill} data-k={r.status}>
              {r.status === "pending"
                ? "Pending"
                : r.status === "approved"
                  ? "Approved"
                  : "Denied"}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ---- Commish -------------------------------------------------------------- */

type ImportStep = "start" | "reading" | "review" | "done";

// What the AI read from the screenshot. One name needed matching (Ucla to UCLA).
const EXTRACTED: { id: string; text: string; flag?: "check" }[] = WEEK9.map(
  (g) => ({
    id: g.id,
    text: `${g.a.team} vs ${g.b.team}`,
    ...(g.id === "g14" ? { flag: "check" as const } : {}),
  }),
)
  // Anything the reviewer needs to check comes first.
  .sort((x, y) => Number(!!y.flag) - Number(!!x.flag));

function CommishScreen({
  view,
  notify,
}: {
  view: View;
  notify: (t: string) => void;
}) {
  const reduce = useReducedMotion();
  const [step, setStep] = useState<ImportStep>("start");
  const [rows, setRows] = useState(EXTRACTED);
  const [queue, setQueue] = useState(QUEUE);
  const read = () => {
    setStep("reading");
    window.setTimeout(() => setStep("review"), reduce ? 0 : 1800);
  };
  if (view === "empty")
    return (
      <Empty
        title="Nothing to review"
        text="No schedule waiting and no point requests. Enjoy the quiet week."
      />
    );
  const failed = view === "error" && step === "reading";
  return (
    <div className={s.stack}>
      <section className={s.importCard}>
        <div className={s.importHead}>
          <span className={s.kicker}>Import Week 10</span>
          <span className={s.heroLabel}>From a schedule screenshot</span>
        </div>

        {step === "start" && (
          <>
            <div className={s.shot}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/trilo/schedule.jpg"
                alt="Schedule screenshot from the game"
              />
            </div>
            <button type="button" className={s.primary} onClick={read}>
              Read schedule
            </button>
          </>
        )}

        {step === "reading" &&
          (failed ? (
            <div className={s.readError} role="alert">
              <b>Couldn’t read this screenshot.</b>
              <span>
                Try a full-screen capture without the game’s menu covering the
                list. Up to 5 images at once.
              </span>
              <button
                type="button"
                className={s.secondary}
                onClick={() => setStep("start")}
              >
                Try another image
              </button>
            </div>
          ) : (
            <div className={s.shot} data-scanning="true">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/trilo/schedule.jpg" alt="" />
              <span className={s.scanLine} aria-hidden />
              <span className={s.scanLabel} role="status">
                Reading matchups…
              </span>
            </div>
          ))}

        {step === "review" && (
          <>
            <p className={s.reviewNote}>
              Found <b>{rows.length} matchups</b>. Skipped 1 CPU vs CPU game.
              Check anything flagged before creating channels.
            </p>
            <ul className={s.extracted}>
              {rows.map((r) => (
                <li key={r.id} data-flag={r.flag ?? "none"}>
                  <span>
                    {r.text}
                    {r.flag && <small>Read as “Ucla.” Matched to UCLA.</small>}
                  </span>
                  <button
                    type="button"
                    aria-label={`Remove ${r.text}`}
                    onClick={() =>
                      setRows((x) => x.filter((y) => y.id !== r.id))
                    }
                  >
                    ×
                  </button>
                </li>
              ))}
              <li data-flag="skip">
                <span>
                  Arizona vs Ole Miss<small>CPU vs CPU · skipped</small>
                </span>
              </li>
            </ul>
            <button
              type="button"
              className={s.primary}
              onClick={() => {
                setStep("done");
                notify(`Created ${rows.length} channels in Week 10`);
              }}
            >
              Create {rows.length} matchup channels
            </button>
          </>
        )}

        {step === "done" && (
          <div className={s.done}>
            <b>Week 10 is ready.</b>
            <span>
              {rows.length} channels created, players tagged, and the status
              tracker added to each game.
            </span>
            <button
              type="button"
              className={s.secondary}
              onClick={() => {
                setRows(EXTRACTED);
                setStep("start");
              }}
            >
              Start over
            </button>
          </div>
        )}
      </section>

      <div className={s.queueHead}>
        <p className={s.sectionLabel}>Point requests · {queue.length}</p>
        {queue.length > 1 && (
          <button
            type="button"
            className={s.linkBtn}
            onClick={() => {
              setQueue([]);
              notify("Approved all requests");
            }}
          >
            Approve all
          </button>
        )}
      </div>
      {queue.length === 0 ? (
        <p className={s.none}>All caught up.</p>
      ) : (
        <ul className={s.requests}>
          {queue.map((r) => (
            <li key={r.id}>
              <span>
                <b>
                  {r.pos} {r.player}
                </b>
                <small>
                  @{r.who} · {r.attr} +{r.amount}
                </small>
              </span>
              <span className={s.queueActions}>
                <button
                  type="button"
                  aria-label={`Deny request from @${r.who}`}
                  onClick={() =>
                    setQueue((q) => q.filter((x) => x.id !== r.id))
                  }
                >
                  Deny
                </button>
                <button
                  type="button"
                  data-primary="true"
                  onClick={() => {
                    setQueue((q) => q.filter((x) => x.id !== r.id));
                    notify(`Approved ${r.pos} ${r.player} for @${r.who}`);
                  }}
                >
                  Approve
                </button>
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function Empty({
  title,
  text,
  action,
}: {
  title: string;
  text: string;
  action?: { label: string; onClick: () => void };
}) {
  return (
    <div className={s.empty}>
      <span className={s.emptyIcon} aria-hidden>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/work/trilo-app/logo.webp" alt="" />
      </span>
      <b>{title}</b>
      <span>{text}</span>
      {action && (
        <button type="button" className={s.primary} onClick={action.onClick}>
          {action.label}
        </button>
      )}
    </div>
  );
}

/* ---- Design system ------------------------------------------------------- */

const TOKENS = [
  { name: "ink", value: "#111315", role: "App background" },
  { name: "surface-1", value: "#181A1C", role: "Cards" },
  { name: "surface-2", value: "#24272A", role: "Inputs, raised rows" },
  { name: "line", value: "#373C41", role: "Dividers" },
  { name: "flame", value: "#FF6B35", role: "Brand, primary actions" },
  { name: "gold", value: "#F3AA07", role: "Brand gradient, points" },
];

const STATUS_TOKENS = [
  {
    k: "pending",
    label: "Pending",
    value: "#9AA0A6",
    use: "Waiting on a result",
  },
  {
    k: "completed",
    label: "Completed",
    value: "#3DDC84",
    use: "Played head to head",
  },
  { k: "sim", label: "Fair sim", value: "#A78BFA", use: "Simmed fairly" },
  {
    k: "fw",
    label: "Force win",
    value: "#5BA8FF",
    use: "Winner chosen, often vs CPU",
  },
  {
    k: "live",
    label: "Live",
    value: "#FF4D4D",
    use: "Someone is streaming the game",
  },
];

export function TriloSystem() {
  return (
    <div className={`${s.system} ${barlow.variable}`}>
      <div className={s.sysBlock}>
        <p className={s.sysLabel}>Color</p>
        <div className={s.sysSwatches}>
          {TOKENS.map((x) => (
            <div key={x.name}>
              <span style={{ background: x.value }} />
              <b>{x.name}</b>
              <small>{x.role}</small>
              <code>{x.value}</code>
            </div>
          ))}
        </div>
      </div>
      <div className={s.sysBlock}>
        <p className={s.sysLabel}>Game status</p>
        <p className={s.sysNote}>
          Each status keeps one color everywhere: the pill, the progress bar and
          the activity feed. Color is never the only signal; every pill also
          says what it means.
        </p>
        <div className={s.sysStatuses}>
          {STATUS_TOKENS.map((x) => (
            <div key={x.k}>
              <span className={s.pill} data-k={x.k === "live" ? "live" : x.k}>
                {x.label}
              </span>
              <small>{x.use}</small>
              <code>{x.value}</code>
            </div>
          ))}
        </div>
      </div>
      <div className={s.sysBlock}>
        <p className={s.sysLabel}>Type</p>
        <div className={s.sysType}>
          <p className={s.sysDisplay}>WEEK 9</p>
          <p className={s.sysDisplaySub}>
            Barlow Condensed 800 · numbers, weeks, countdowns
          </p>
          <p className={s.sysHeading}>Clemson vs Michigan</p>
          <p className={s.sysBody}>
            Outfit 400 to 800 · everything else. Rounded, friendly and easy to
            read at small sizes in a dark UI.
          </p>
        </div>
      </div>
      <div className={s.sysBlock}>
        <p className={s.sysLabel}>Rules</p>
        <ul className={s.sysRules}>
          <li>Tap targets are at least 44px tall.</li>
          <li>Secondary text stays above 4.5:1 contrast on every surface.</li>
          <li>
            Motion explains a change, like a sheet rising or a toast arriving,
            and turns off with reduced motion.
          </li>
          <li>
            Every destructive or result-changing action can be undone for a few
            seconds.
          </li>
        </ul>
      </div>
    </div>
  );
}

/* ---- Shipped product: numbers, licensing and the data model ------------- */

const NUMBERS = [
  { value: "11", label: "leagues running on Trilo" },
  { value: "133", label: "players assigned to teams" },
  { value: "2,152", label: "commands run since January" },
  { value: "213", label: "schedule screenshots read" },
  { value: "97%", label: "of commands complete without an error" },
  { value: "48", label: "slash commands" },
];

export function TriloNumbers() {
  return (
    <div className={`${s.numbers} ${barlow.variable}`}>
      {NUMBERS.map((n) => (
        <div key={n.label}>
          <b>{n.value}</b>
          <span>{n.label}</span>
        </div>
      ))}
    </div>
  );
}

const LICENSE_STEPS = [
  {
    where: "trilo.gg",
    title: "Connect Discord",
    text: "The pricing page signs in with Discord, so the purchase is tied to a real account.",
  },
  {
    where: "Stripe",
    title: "Check out",
    text: "$4.99 a month or $39 a year. Every feature is included in both.",
  },
  {
    where: "Discord DM",
    title: "Get a license key",
    text: "Trilo sends the key by direct message once payment clears.",
  },
  {
    where: "Your server",
    title: "Activate",
    text: "A commissioner runs /admin activate with the key. One key runs one server.",
  },
];

export function TriloLicensing() {
  return (
    <ol className={`${s.flow} ${barlow.variable}`}>
      {LICENSE_STEPS.map((x, i) => (
        <li key={x.title}>
          <span className={s.flowNum}>{i + 1}</span>
          <span className={s.flowWhere}>{x.where}</span>
          <b>{x.title}</b>
          <span>{x.text}</span>
        </li>
      ))}
    </ol>
  );
}

type Table = {
  name: string;
  cols: string[];
  note: string;
  tone: "old" | "new";
};

const MODEL: Record<"before" | "after", { tables: Table[]; summary: string }> =
  {
    before: {
      summary:
        "Tables grew one feature at a time. Each league had its own copies of the same tables, team names were stored as text in two places, and billing and activation lived in one table.",
      tables: [
        {
          name: "cfb_teams · nfl_teams · nba_teams",
          cols: ["user_id", "server_id", "team_name (text)"],
          note: "The same table, three times",
          tone: "old",
        },
        {
          name: "cfb_valid_teams · nfl_valid_teams · …",
          cols: ["team_name (text)"],
          note: "Renaming a team could orphan assignments",
          tone: "old",
        },
        {
          name: "server_subscriptions",
          cols: ["server_id", "license_key", "stripe ids", "status"],
          note: "Billing and activation mixed together",
          tone: "old",
        },
        {
          name: "attribute_requests",
          cols: [
            "user_id",
            'player ("QB John Smith")',
            "attribute",
            "amount",
            "status",
          ],
          note: "Position buried in a string",
          tone: "old",
        },
      ],
    },
    after: {
      summary:
        "The v2 model gives each idea one home. Teams are reference data with keys, assignments point to them, licensing is split into what was bought, how it’s billed and where it’s active, and the database enforces rules the bot used to check only in code.",
      tables: [
        {
          name: "teams",
          cols: ["id (PK)", "league_type", "name", "abbreviation"],
          note: "One list of teams for every league",
          tone: "new",
        },
        {
          name: "team_assignments",
          cols: [
            "server_id",
            "league_type",
            "team_id (FK → teams)",
            "discord_user_id",
          ],
          note: "One team per player per league",
          tone: "new",
        },
        {
          name: "licenses → subscriptions, license_activations",
          cols: [
            "license_key",
            "billing status",
            "server_id",
            "deactivated_at",
          ],
          note: "One active server per license",
          tone: "new",
        },
        {
          name: "attribute_requests",
          cols: [
            "player_name",
            "position",
            "attribute",
            "amount > 0",
            "status: pending, approved, denied",
          ],
          note: "Structured and validated",
          tone: "new",
        },
      ],
    },
  };

export function TriloDataModel() {
  const [v, setV] = useState<"before" | "after">("before");
  const m = MODEL[v];
  return (
    <div className={`${s.model} ${barlow.variable}`}>
      <Radios
        label="Data model version"
        options={[
          { id: "before", label: "Before" },
          { id: "after", label: "After v2" },
        ]}
        value={v}
        onChange={setV}
        className={s.panelRadios}
      />
      <p className={s.modelSummary}>{m.summary}</p>
      <div className={s.tables}>
        {m.tables.map((tb) => (
          <div key={tb.name} className={s.table} data-tone={tb.tone}>
            <b>{tb.name}</b>
            <ul>
              {tb.cols.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
            <span>{tb.note}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
