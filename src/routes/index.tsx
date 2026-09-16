import { createFileRoute } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import {
  ArrowLeft, Award, Bell, Check, ChevronRight, CircleHelp, Coins, Crown, Dice5,
  Gift, History, Lock, Medal, Minus, Pause, Plus, Settings, ShieldCheck,
  ShoppingBag, Sparkles, Star, Target, Trophy, UserRound, Volume2, VolumeX, X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import rouletteArt from "@/assets/roulette.jpg";
import blackjackArt from "@/assets/blackjack.jpg";
import slotsArt from "@/assets/slots.jpg";
import pokerArt from "@/assets/poker.jpg";
import diceArt from "@/assets/dice.jpg";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Royal Fortune — Virtual Casino Game" },
    { name: "description", content: "Play Roulette, Blackjack and Slots with virtual coins in Royal Fortune." },
    { property: "og:title", content: "Royal Fortune — Virtual Casino Game" },
    { property: "og:description", content: "A premium fictional casino game powered entirely by virtual coins." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ]}),
  component: RoyalFortune,
});

type Screen = "home" | "games" | "roulette" | "blackjack" | "slots" | "profile" | "shop" | "achievements" | "loading";
type Popup = "daily" | "settings" | "level" | "achievement" | "coins" | "rules" | "pause" | "unlocked" | null;
type GameId = "roulette" | "blackjack" | "slots" | "poker" | "dice";

const games: { id: GameId; name: string; desc: string; min: number; level: number; art: string }[] = [
  { id: "roulette", name: "Roulette", desc: "Trust the wheel. Command the table.", min: 50, level: 1, art: rouletteArt },
  { id: "blackjack", name: "Blackjack", desc: "Read the table. Beat the dealer.", min: 100, level: 1, art: blackjackArt },
  { id: "slots", name: "Royal Slots", desc: "Three reels. One royal prize.", min: 25, level: 1, art: slotsArt },
  { id: "poker", name: "Crown Poker", desc: "Build the hand. Rule the room.", min: 500, level: 4, art: pokerArt },
  { id: "dice", name: "Crystal Dice", desc: "Choose your number. Let fate roll.", min: 250, level: 6, art: diceArt },
];

function IconButton({ label, children, onClick }: { label: string; children: ReactNode; onClick?: () => void }) {
  return <Button variant="glass" size="square" aria-label={label} title={label} onClick={onClick}>{children}</Button>;
}

function CoinAmount({ value, compact = false }: { value: number; compact?: boolean }) {
  return <span className="inline-flex items-center gap-2 font-bold tabular-nums text-foreground"><span className="grid size-6 place-items-center rounded-full border border-primary bg-primary/20 text-xs text-primary">◆</span>{compact ? value.toLocaleString() : `${value.toLocaleString()} COINS`}</span>;
}

function Progress({ value, label }: { value: number; label?: string }) {
  return <div className="w-full"><div className="h-2 overflow-hidden rounded-full border border-border bg-background/70"><div className="h-full rounded-full bg-primary transition-all duration-500" style={{ width: `${Math.min(value, 100)}%` }} /></div>{label && <p className="mt-1 text-[10px] font-bold uppercase text-muted-foreground">{label}</p>}</div>;
}

function TopBar({ coins, xp, onNavigate, onPopup }: { coins: number; xp: number; onNavigate: (s: Screen) => void; onPopup: (p: Popup) => void }) {
  return <header className="relative z-30 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-b border-border bg-background/80 px-3 py-3 backdrop-blur-xl lg:grid-cols-[1fr_auto_1fr] lg:px-7">
    <button className="flex min-w-0 items-center gap-3 text-left" onClick={() => onNavigate("profile")}>
      <span className="grid size-11 shrink-0 place-items-center rounded-full border border-primary/70 bg-burgundy font-display text-lg text-primary">RM</span>
      <span className="min-w-0"><span className="block truncate text-sm font-bold">Lord Aurum</span><span className="block text-[10px] uppercase text-muted-foreground">Silver Court</span></span>
    </button>
    <div className="hidden w-72 items-center gap-3 lg:flex"><span className="font-display text-sm text-primary">LV. 03</span><Progress value={xp} label={`${xp * 24} / 2,400 XP`} /></div>
    <div className="flex items-center justify-end gap-2"><div className="mr-1 hidden rounded-md border border-primary/40 bg-primary/10 px-4 py-2 sm:block"><CoinAmount value={coins} compact /></div><IconButton label="Notifications" onClick={() => onPopup("achievement")}><Bell /></IconButton><IconButton label="Settings" onClick={() => onPopup("settings")}><Settings /></IconButton></div>
  </header>;
}

function Brand() {
  return <div className="text-center"><div className="mx-auto mb-3 flex items-center justify-center gap-4 text-primary"><span className="h-px w-12 bg-primary/60"/><Crown className="size-10"/><span className="h-px w-12 bg-primary/60"/></div><h1 className="font-display text-4xl font-bold text-primary sm:text-6xl">ROYAL FORTUNE</h1><p className="mt-2 text-xs font-bold uppercase text-muted-foreground">The house of virtual legends</p></div>;
}

function MainMenu({ onNavigate, onPopup }: { onNavigate: (s: Screen) => void; onPopup: (p: Popup) => void }) {
  return <main className="relative flex min-h-[calc(100vh-69px)] flex-col overflow-hidden px-4 py-10 sm:px-8">
    <div className="game-grid pointer-events-none absolute inset-0 opacity-25" />
    <div className="relative mx-auto flex w-full max-w-6xl flex-1 flex-col items-center justify-center">
      <Brand />
      <Button variant="royal" size="game" className="royal-pulse mt-10 min-w-64" onClick={() => onNavigate("games")}><Sparkles /> Play</Button>
      <div className="mt-8 grid w-full max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4">
        <MenuTile icon={<Gift />} label="Daily Reward" detail="Ready" onClick={() => onPopup("daily")} />
        <MenuTile icon={<ShoppingBag />} label="Royal Shop" detail="Virtual items" onClick={() => onNavigate("shop")} />
        <MenuTile icon={<Trophy />} label="Achievements" detail="12 / 30" onClick={() => onNavigate("achievements")} />
        <MenuTile icon={<UserRound />} label="Profile" detail="Level 03" onClick={() => onNavigate("profile")} />
      </div>
      <div className="mt-10 w-full max-w-5xl border-t border-border/60 pt-6"><div className="mb-4 flex items-center justify-between"><h2 className="font-display text-xl text-foreground">Featured Tables</h2><button className="flex items-center gap-1 text-xs font-bold uppercase text-primary" onClick={() => onNavigate("games")}>View all <ChevronRight className="size-4" /></button></div><div className="grid grid-cols-3 gap-3">{games.slice(0,3).map(g => <button key={g.id} onClick={() => onNavigate(g.id === "roulette" ? "roulette" : g.id === "blackjack" ? "blackjack" : "slots")} className="group relative h-28 overflow-hidden rounded-md border border-border text-left sm:h-36"><img src={g.art} alt="" className="h-full w-full object-cover transition duration-500 group-hover:scale-105"/><span className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent"/><span className="absolute bottom-3 left-3 font-display text-sm font-bold sm:text-lg">{g.name}</span></button>)}</div></div>
    </div>
  </main>;
}

function MenuTile({ icon, label, detail, onClick }: { icon: ReactNode; label: string; detail: string; onClick: () => void }) {
  return <button onClick={onClick} className="deco-panel group flex min-h-24 items-center gap-3 rounded-md p-4 text-left transition hover:-translate-y-1 hover:border-primary/60"><span className="text-primary transition group-hover:scale-110">{icon}</span><span><span className="block text-sm font-bold">{label}</span><span className="text-[10px] uppercase text-muted-foreground">{detail}</span></span></button>;
}

function ScreenHeading({ title, eyebrow, onBack }: { title: string; eyebrow: string; onBack: () => void }) {
  return <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4"><IconButton label="Back" onClick={onBack}><ArrowLeft /></IconButton><div className="min-w-0 text-center"><p className="text-[10px] font-bold uppercase text-primary">{eyebrow}</p><h1 className="truncate font-display text-2xl font-bold sm:text-4xl">{title}</h1></div><span className="size-11" /></div>;
}

function GameSelection({ level, onNavigate, onPopup }: { level: number; onNavigate: (s: Screen) => void; onPopup: (p: Popup) => void }) {
  return <main className="mx-auto min-h-[calc(100vh-69px)] max-w-7xl px-4 py-7 sm:px-8"><ScreenHeading title="Choose Your Table" eyebrow="The Grand Salon" onBack={() => onNavigate("home")} /><div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">{games.map((game, i) => { const locked = game.level > level; const destination: Screen = game.id === "roulette" ? "roulette" : game.id === "blackjack" ? "blackjack" : game.id === "slots" ? "slots" : "games"; return <article key={game.id} className={`deco-panel group relative overflow-hidden rounded-md ${i < 2 ? "lg:col-span-2" : ""}`}><div className={`relative ${i < 2 ? "aspect-[16/10]" : "aspect-[4/3]"} overflow-hidden`}><img src={game.art} alt={`${game.name} game artwork`} loading="lazy" width={768} height={1024} className={`h-full w-full object-cover transition duration-500 group-hover:scale-105 ${locked ? "grayscale brightness-50" : ""}`} /><div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"/>{locked && <div className="absolute inset-0 grid place-items-center"><div className="text-center"><Lock className="mx-auto size-10 text-primary"/><p className="mt-2 text-xs font-bold uppercase">Unlocks at level {game.level}</p></div></div>}</div><div className="p-5"><div className="flex items-start justify-between gap-2"><div><h2 className="font-display text-xl font-bold">{game.name}</h2><p className="mt-1 text-xs text-muted-foreground">{game.desc}</p></div>{!locked && <span className="rounded-sm border border-emerald bg-emerald/30 px-2 py-1 text-[9px] font-bold uppercase">Open</span>}</div><div className="my-4 flex items-center justify-between text-xs"><span className="text-muted-foreground">Minimum</span><CoinAmount value={game.min} compact /></div><Button variant={locked ? "glass" : "royal"} className="w-full" disabled={locked} onClick={() => locked ? onPopup("unlocked") : onNavigate(destination)}>{locked ? <><Lock /> Locked</> : <>Play <ChevronRight /></>}</Button></div></article>})}</div></main>;
}

function PlayingCard({ rank, suit, hidden = false }: { rank: string; suit: string; hidden?: boolean }) {
  return <div className={`flex aspect-[5/7] w-20 flex-col justify-between rounded-md border p-2 shadow-xl sm:w-24 ${hidden ? "border-primary bg-burgundy" : "border-primary/50 bg-foreground text-background"}`}>{hidden ? <Crown className="m-auto size-8 text-primary" /> : <><b className="font-display text-xl">{rank}</b><span className="self-center text-3xl">{suit}</span><b className="self-end rotate-180 font-display text-xl">{rank}</b></>}</div>;
}

function RouletteTable({ spinning, result }: { spinning: boolean; result: string }) {
  const nums = [0,32,15,19,4,21,2,25,17,34,6,27];
  return <div className="flex h-full flex-col items-center justify-center"><div className={`relative grid aspect-square w-56 place-items-center rounded-full border-[14px] border-primary/70 bg-background shadow-2xl sm:w-72 ${spinning ? "animate-spin" : ""}`}><div className="absolute inset-3 rounded-full border border-primary/40"/>{nums.map((n,i)=><span key={n} className="absolute font-display text-xs font-bold text-primary" style={{ transform: `rotate(${i*30}deg) translateY(-92px) rotate(-${i*30}deg)` }}>{n}</span>)}<div className="grid size-28 place-items-center rounded-full border-4 border-primary bg-burgundy"><Crown className="size-10 text-primary"/></div></div><p className="mt-5 min-h-6 font-display text-xl text-primary">{result || "Place your virtual coins"}</p></div>;
}

function BlackjackTable({ result }: { result: string }) {
  return <div className="flex h-full flex-col items-center justify-center"><p className="mb-3 text-[10px] font-bold uppercase text-muted-foreground">Dealer · 17</p><div className="flex -space-x-4"><PlayingCard rank="K" suit="♠"/><PlayingCard rank="7" suit="♦"/></div><div className="my-5 flex items-center gap-3"><span className="h-px w-16 bg-primary/40"/><span className="font-display text-primary">{result || "Your Hand · 20"}</span><span className="h-px w-16 bg-primary/40"/></div><div className="flex -space-x-4"><PlayingCard rank="A" suit="♣"/><PlayingCard rank="9" suit="♥"/></div></div>;
}

function SlotsTable({ spinning }: { spinning: boolean }) {
  return <div className="flex h-full flex-col items-center justify-center"><div className="flex gap-2 rounded-lg border-4 border-primary/60 bg-background p-3 shadow-2xl">{["♛","7","★"].map((s,i)=><div key={i} className={`grid h-32 w-20 place-items-center rounded border border-border bg-surface-raised font-display text-5xl text-primary sm:h-40 sm:w-28 ${spinning ? "reel-spin" : ""}`}>{s}</div>)}</div><p className="mt-5 font-display text-xl text-primary">{spinning ? "THE REELS ARE TURNING" : "CROWN JACKPOT · 5,000"}</p></div>;
}

function Gameplay({ game, coins, setCoins, xp, setXp, onNavigate, onPopup }: { game: GameId; coins: number; setCoins: (v: number) => void; xp: number; setXp: (v: number) => void; onNavigate: (s: Screen) => void; onPopup: (p: Popup) => void }) {
  const [bet, setBet] = useState(game === "slots" ? 25 : game === "roulette" ? 50 : 100);
  const [result, setResult] = useState(""); const [spinning, setSpinning] = useState(false); const [history, setHistory] = useState<string[]>(["+250", "−100", "+75"]);
  const action = game === "roulette" ? "SPIN" : game === "blackjack" ? "DEAL" : "PLAY";
  const run = () => { if (coins < bet) { onPopup("coins"); return; } setSpinning(true); setResult(""); setTimeout(() => { const won = Math.random() > .45; const delta = won ? bet * 2 : -bet; setCoins(coins + delta); setXp(Math.min(100, xp + 7)); setResult(won ? (game === "roulette" ? "BLACK 17 · YOU WIN" : game === "blackjack" ? "BLACKJACK · YOU WIN" : "ROYAL PAIR · YOU WIN") : "HOUSE WINS · TRY AGAIN"); setHistory([`${won ? "+" : "−"}${Math.abs(delta)}`, ...history].slice(0,5)); setSpinning(false); }, 850); };
  return <main className="min-h-[calc(100vh-69px)] p-3 sm:p-5"><div className="mx-auto flex max-w-7xl items-center justify-between"><IconButton label="Back to games" onClick={() => onNavigate("games")}><ArrowLeft /></IconButton><div className="text-center"><p className="text-[9px] font-bold uppercase text-primary">Royal Fortune Table</p><h1 className="font-display text-xl font-bold capitalize sm:text-2xl">{game}</h1></div><div className="flex gap-2"><IconButton label="Rules" onClick={() => onPopup("rules")}><CircleHelp /></IconButton><IconButton label="Pause" onClick={() => onPopup("pause")}><Pause /></IconButton></div></div>
    <div className="mx-auto mt-4 grid max-w-7xl gap-4 lg:grid-cols-[180px_minmax(0,1fr)_180px]"><aside className="deco-panel order-2 rounded-md p-4 lg:order-1"><p className="text-[10px] font-bold uppercase text-muted-foreground">Player</p><div className="mt-3 flex items-center gap-3"><span className="grid size-10 place-items-center rounded-full border border-primary bg-burgundy font-display">RM</span><div><b className="text-sm">Lord Aurum</b><p className="text-[10px] text-muted-foreground">Level 03</p></div></div><div className="mt-4"><Progress value={xp}/></div></aside>
    <section className="order-1 overflow-hidden rounded-md border border-primary/30 bg-emerald/35 shadow-2xl lg:order-2"><div className="h-[390px] sm:h-[500px]">{game === "roulette" ? <RouletteTable spinning={spinning} result={result}/> : game === "blackjack" ? <BlackjackTable result={result}/> : <SlotsTable spinning={spinning}/>}</div></section>
    <aside className="deco-panel order-3 rounded-md p-4"><div className="flex items-center gap-2"><History className="size-4 text-primary"/><p className="text-[10px] font-bold uppercase">Table History</p></div><div className="mt-4 flex gap-2 lg:flex-col">{history.map((h,i)=><div key={i} className="flex flex-1 justify-between border-b border-border/40 pb-2 text-xs"><span className="text-muted-foreground">#{18-i}</span><b className={h.startsWith("+") ? "text-primary" : "text-muted-foreground"}>{h}</b></div>)}</div></aside></div>
    <div className="deco-panel mx-auto mt-4 grid max-w-5xl items-center gap-4 rounded-md p-4 sm:grid-cols-[1fr_auto_1fr]"><div><p className="mb-2 text-[10px] font-bold uppercase text-muted-foreground">Coin value</p><div className="flex gap-2">{[25,50,100,500].map(v=><button key={v} onClick={()=>setBet(v)} className={`grid size-11 place-items-center rounded-full border text-xs font-bold transition ${bet === v ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background/60 text-muted-foreground hover:border-primary"}`}>{v}</button>)}</div></div><Button variant="royal" size="game" className="royal-pulse min-w-48" onClick={run} disabled={spinning}>{spinning ? "IN PLAY" : action}</Button><div className="sm:text-right"><p className="text-[10px] font-bold uppercase text-muted-foreground">Current bet</p><div className="mt-2 flex items-center gap-3 sm:justify-end"><IconButton label="Decrease bet" onClick={()=>setBet(Math.max(25,bet-25))}><Minus/></IconButton><CoinAmount value={bet} compact/><IconButton label="Increase bet" onClick={()=>setBet(Math.min(500,bet+25))}><Plus/></IconButton></div></div></div>
  </main>;
}

const shopItems = [{name:"Midnight Chips", price:1200, icon:<Coins/>},{name:"Emerald Table",price:2400,icon:<Star/>},{name:"Royal Avatar Frame",price:800,icon:<Crown/>},{name:"Golden Card Back",price:1750,icon:<Sparkles/>}];
function CollectionScreen({ type, coins, setCoins, onBack, onPopup }: { type: "profile"|"shop"|"achievements"; coins: number; setCoins: (v:number)=>void; onBack:()=>void; onPopup:(p:Popup)=>void }) {
  const title = type === "profile" ? "Player Profile" : type === "shop" ? "Royal Shop" : "Achievements";
  return <main className="mx-auto min-h-[calc(100vh-69px)] max-w-6xl px-4 py-7 sm:px-8"><ScreenHeading title={title} eyebrow="Royal Fortune" onBack={onBack}/>{type === "profile" ? <div className="mt-8 grid gap-5 md:grid-cols-[280px_1fr]"><section className="deco-panel rounded-md p-6 text-center"><span className="mx-auto grid size-28 place-items-center rounded-full border-2 border-primary bg-burgundy font-display text-4xl text-primary">RM</span><h2 className="mt-5 font-display text-2xl">Lord Aurum</h2><p className="text-xs uppercase text-muted-foreground">Member since Season I</p><Button variant="glass" className="mt-5 w-full">Edit Profile</Button></section><section className="space-y-5"><div className="deco-panel rounded-md p-6"><div className="flex items-center justify-between"><div><p className="text-xs uppercase text-primary">Level 03</p><h3 className="font-display text-2xl">The Contender</h3></div><Crown className="size-10 text-primary"/></div><div className="mt-5"><Progress value={64} label="1,536 / 2,400 XP"/></div></div><div className="grid grid-cols-3 gap-3">{[["Games","148"],["Wins","72"],["Best win","4,850"]].map(([a,b])=><div className="deco-panel rounded-md p-5 text-center" key={a}><b className="font-display text-2xl text-primary">{b}</b><p className="mt-1 text-[10px] uppercase text-muted-foreground">{a}</p></div>)}</div><div className="deco-panel rounded-md p-6"><p className="text-xs font-bold uppercase text-muted-foreground">Next objective</p><h3 className="mt-2 font-display text-xl">Reach 8,000 virtual coins</h3><p className="mt-2 text-sm text-muted-foreground">Reward: 500 virtual coins + New Table</p></div></section></div> : type === "shop" ? <><div className="mt-7 flex justify-end"><div className="rounded-md border border-primary/50 bg-primary/10 px-4 py-2"><CoinAmount value={coins}/></div></div><div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{shopItems.map(item=><article className="deco-panel rounded-md p-5" key={item.name}><div className="grid aspect-square place-items-center rounded-md border border-border bg-gradient-to-br from-burgundy/70 to-emerald/50 text-primary [&_svg]:size-16">{item.icon}</div><h2 className="mt-4 font-display text-lg">{item.name}</h2><p className="mt-1 text-xs text-muted-foreground">A premium cosmetic for your collection.</p><Button variant="royal" className="mt-5 w-full" onClick={()=>{if(coins<item.price)onPopup("coins");else setCoins(coins-item.price)}}><CoinAmount value={item.price} compact/></Button></article>)}</div></> : <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{[["First Crown","Win your first table",true],["Wheel Master","Win 10 roulette rounds",true],["High Roller","Bet 500 coins in one round",true],["Perfect Twenty-One","Win with Blackjack",false],["Triple Royal","Land three crown symbols",false],["Court Legend","Reach Level 10",false]].map(([name,desc,done])=><article className={`deco-panel flex items-center gap-4 rounded-md p-5 ${done ? "" : "opacity-65"}`} key={String(name)}><span className={`grid size-14 shrink-0 place-items-center rounded-full border ${done ? "border-primary bg-primary/15 text-primary" : "border-border bg-muted text-muted-foreground"}`}><Medal/></span><div className="min-w-0"><h2 className="font-display text-lg">{name}</h2><p className="text-xs text-muted-foreground">{desc}</p><p className="mt-2 text-[10px] font-bold uppercase text-primary">{done ? "Completed · +100 XP" : "In progress"}</p></div></article>)}</div>}</main>;
}

function PopupView({ popup, close, onNavigate, setCoins }: { popup: Exclude<Popup,null>; close:()=>void; onNavigate:(s:Screen)=>void; setCoins:(fn:(v:number)=>number)=>void }) {
  const content: Record<Exclude<Popup,null>, { icon: ReactNode; eyebrow:string; title:string; body:string }> = {
    daily:{icon:<Gift/>,eyebrow:"Day 4 of 7",title:"Daily Reward",body:"Return each day to grow your royal collection."},
    settings:{icon:<Settings/>,eyebrow:"Preferences",title:"Settings",body:"Tune the Royal Fortune experience."},
    level:{icon:<Crown/>,eyebrow:"Level 01 · Rookie",title:"Level Complete",body:"Objective complete: Reach 2,000 virtual coins."},
    achievement:{icon:<Award/>,eyebrow:"Achievement Unlocked",title:"Wheel Master",body:"You claimed ten victories at the roulette table."},
    coins:{icon:<Coins/>,eyebrow:"Balance Notice",title:"More Coins Needed",body:"Play lower-stake tables or claim your daily virtual reward."},
    rules:{icon:<CircleHelp/>,eyebrow:"Table Guide",title:"Game Rules",body:"Choose a virtual coin value, set your bet, then play. Outcomes are simulated for entertainment only."},
    pause:{icon:<Pause/>,eyebrow:"Game Paused",title:"The Table Awaits",body:"Your current round is safely held."},
    unlocked:{icon:<Lock/>,eyebrow:"Level Reward",title:"New Game Locked",body:"Continue playing open tables to raise your level and unlock this game."},
  }; const c=content[popup];
  return <div className="fixed inset-0 z-50 grid place-items-center bg-background/80 p-4 backdrop-blur-md" role="dialog" aria-modal="true" aria-label={c.title}><section className="deco-panel relative w-full max-w-lg rounded-md p-7 text-center sm:p-10"><Button variant="ghost" size="icon" className="absolute right-3 top-3" onClick={close} aria-label="Close"><X/></Button><span className="mx-auto grid size-16 place-items-center rounded-full border border-primary bg-primary/10 text-primary [&_svg]:size-8">{c.icon}</span><p className="mt-5 text-[10px] font-bold uppercase text-primary">{c.eyebrow}</p><h2 className="mt-2 font-display text-3xl font-bold">{c.title}</h2><p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-muted-foreground">{c.body}</p>
    {popup === "daily" && <div className="my-6 grid grid-cols-7 gap-1">{[1,2,3,4,5,6,7].map(d=><div key={d} className={`rounded border p-2 ${d===4 ? "border-primary bg-primary/15" : "border-border bg-background/50"}`}><span className="text-[9px] text-muted-foreground">D{d}</span><p className="mt-1 text-xs text-primary">◆</p></div>)}</div>}
    {popup === "settings" && <div className="my-6 space-y-3 text-left">{[["Music",true],["Sound Effects",true],["Haptics",false]].map(([n,on])=><div className="flex items-center justify-between border-b border-border/50 pb-3" key={String(n)}><span className="flex items-center gap-2 text-sm">{on?<Volume2 className="size-4 text-primary"/>:<VolumeX className="size-4"/>}{n}</span><button className={`h-6 w-11 rounded-full border p-1 ${on?"border-primary bg-primary/30":"border-border bg-muted"}`}><span className={`block size-3.5 rounded-full bg-foreground transition ${on?"ml-5":""}`}/></button></div>)}</div>}
    {popup === "level" && <div className="my-6 rounded-md border border-primary/40 bg-primary/10 p-4"><p className="text-xs uppercase text-muted-foreground">Reward</p><p className="mt-1 font-display text-xl text-primary">500 Coins + New Table</p></div>}
    {popup === "achievement" && <div className="my-6"><Progress value={100} label="100 / 100 · +150 XP"/></div>}
    <div className="mt-6 flex flex-col justify-center gap-2 sm:flex-row"><Button variant="royal" size="lg" onClick={()=>{if(popup==="daily")setCoins(v=>v+500); if(popup==="pause")onNavigate("games"); close();}}>{popup==="daily"?"Claim 500 Coins":popup==="level"?"Next Level":popup==="pause"?"Resume Game":"Continue"}<ChevronRight/></Button>{popup === "pause" && <Button variant="glass" size="lg" onClick={()=>{onNavigate("home");close();}}>Main Menu</Button>}</div></section></div>;
}

function LoadingScreen({ onDone }: { onDone:()=>void }) { return <main className="relative grid min-h-screen place-items-center overflow-hidden p-5"><div className="game-grid absolute inset-0 opacity-30"/><div className="relative text-center"><Brand/><div className="mx-auto mt-12 w-64"><Progress value={82}/><p className="mt-3 text-[10px] font-bold uppercase text-muted-foreground">Preparing the grand salon · 82%</p></div><Button variant="ghost" className="mt-8 text-muted-foreground" onClick={onDone}>Skip loading</Button></div></main>; }

function RoyalFortune() {
  const [screen,setScreen] = useState<Screen>("home"); const [popup,setPopup]=useState<Popup>(null); const [coins,setCoins]=useState(7820); const [xp,setXp]=useState(64);
  const navigate = (s: Screen) => { if (["roulette","blackjack","slots"].includes(s)) { setScreen("loading"); setTimeout(()=>setScreen(s),700); } else setScreen(s); };
  return <div className="min-h-screen"><TopBar coins={coins} xp={xp} onNavigate={navigate} onPopup={setPopup}/>{screen==="home"&&<MainMenu onNavigate={navigate} onPopup={setPopup}/>} {screen==="games"&&<GameSelection level={3} onNavigate={navigate} onPopup={setPopup}/>} {(["roulette","blackjack","slots"] as Screen[]).includes(screen)&&<Gameplay game={screen as GameId} coins={coins} setCoins={setCoins} xp={xp} setXp={setXp} onNavigate={navigate} onPopup={setPopup}/>} {(["profile","shop","achievements"] as Screen[]).includes(screen)&&<CollectionScreen type={screen as "profile"|"shop"|"achievements"} coins={coins} setCoins={setCoins} onBack={()=>navigate("home")} onPopup={setPopup}/>} {screen==="loading"&&<LoadingScreen onDone={()=>setScreen("games")}/>} {popup&&<PopupView popup={popup} close={()=>setPopup(null)} onNavigate={navigate} setCoins={setCoins}/>}<footer className="border-t border-border/40 px-4 py-3 text-center text-[9px] uppercase text-muted-foreground">Fictional game · Virtual coins only · No real-money wagering</footer></div>;
}
