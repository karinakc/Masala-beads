import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import type { CSSProperties, MouseEvent } from "react";
import { Search, Heart, ShoppingBag, ChevronRight, ArrowUpRight, Menu, X, Instagram, MapPin } from "lucide-react";

import hero from "@/assets/hero.jpg";
import masalaLogo from "@/assets/logo.jpg";
import catJewelry from "@/assets/cat-jewelry.jpg";
import catBags from "@/assets/cat-bags.jpg";
import catHome from "@/assets/cat-home.jpg";
import catCosmetics from "@/assets/cat-cosmetics.jpg";
import catStationery from "@/assets/cat-stationery.jpg";
import m1 from "@/assets/m1.jpg";
import m2 from "@/assets/m2.jpg";
import m3 from "@/assets/m3.jpg";
import m4 from "@/assets/m4.jpg";
import m5 from "@/assets/m5.jpg";
import story1 from "@/assets/story1.jpg";
import getlook from "@/assets/getlook.jpg";
import keychain from "@/assets/keychain.jpg";
import necklace from "@/assets/necklace.webp";
import bottle from "@/assets/bottle.jpg";
import preloaderImage from "@/assets/pre.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Masala Beads — Handmade in Nepal since 1997" },
      {
        name: "description",
        content:
          "A boutique of handmade jewelry, bags, home décor, cosmetics and stationery. Crafted with warmth in Kathmandu, Nepal since 1997.",
      },
      { property: "og:title", content: "Masala Beads — Handmade in Nepal since 1997" },
      {
        property: "og:description",
        content:
          "A boutique of handmade jewelry, bags, home décor, cosmetics and stationery from Kathmandu.",
      },
    ],
  }),
  component: Home,
});

/* -------------------------------------------------------------------- */

function Announcement() {
  const items = [
    "Handmade in Nepal since 1997",
    "Free shipping over Rs. 7,500",
    "New drop every Friday",
    "Kathmandu · Pokhara · worldwide",
  ];
  const loop = [...items, ...items, ...items];
  return (
    <div
      className="bg-maroon text-ivory overflow-hidden py-2 border-b border-maroon/60 shadow-[0_1px_0_rgba(255,250,243,0.18)]"
      style={{ background: "var(--color-maroon)", color: "var(--color-ivory)" }}
    >
      <div className="flex animate-marquee whitespace-nowrap">
        {loop.map((t, i) => (
          <span key={i} className="mx-8 text-[11px] tracking-[0.3em] uppercase font-light">
            <span className="text-terracotta mr-8">✦</span>{t}
          </span>
        ))}
      </div>
    </div>
  );
}

const NAV = [
  { label: "New In", href: "#new" },
  { label: "Jewelry", href: "#jewelry" },
  { label: "Bags", href: "#bags" },
  { label: "Home Décor", href: "#home" },
  { label: "Cosmetics", href: "#cosmetics" },
  { label: "Stationery", href: "#stationery" },
  { label: "Gifts", href: "#gifts" },
  { label: "Sale", href: "#sale" },
];

const MEGA_MENUS = {
  "New In": {
    shopLabel: "Shop New In",
    links: ["Friday arrivals", "Phone cases", "Charm stacks", "Fresh colors", "Under Rs. 5,000"],
    collections: ["Autumn Edit", "Pink Room", "Kathmandu Notes", "Soft Launch"],
    tiles: [
      { img: m1, label: "Phone cases ->" },
      { img: m2, label: "Fresh bead stacks ->" },
    ],
  },
  Jewelry: {
    shopLabel: "Shop Jewelry",
    links: ["New arrivals", "Bestsellers", "Necklaces", "Bracelets", "Under Rs. 5,000"],
    collections: ["Kathmandu Nights", "Everest Bloom", "Monsoon Story", "Festival Edit"],
    tiles: [
      { img: catJewelry, label: "Pearl layers ->" },
      { img: m4, label: "Earrings ->" },
    ],
  },
  Bags: {
    shopLabel: "Shop Bags",
    links: ["Everyday bags", "Handwoven totes", "Mini bags", "Bag charms", "Travel pieces"],
    collections: ["Market Morning", "Pokhara Weekend", "Blush Carry", "Festival Edit"],
    tiles: [
      { img: catBags, label: "Handwoven bags ->" },
      { img: keychain, label: "Bag charms ->" },
    ],
  },
  "Home Décor": {
    shopLabel: "Shop Home Décor",
    links: ["Room accents", "Lamps", "Vases", "Trays", "Giftable decor"],
    collections: ["Quiet Corner", "Moonlight Room", "Window Light", "Pink Home"],
    tiles: [
      { img: catHome, label: "Home accents ->" },
      { img: story1, label: "Soft room pieces ->", position: "left bottom" },
    ],
  },
  Cosmetics: {
    shopLabel: "Shop Cosmetics",
    links: ["Rose oils", "Balms", "Evening ritual", "Travel minis", "Gift sets"],
    collections: ["Rose Ritual", "Amber Glow", "Soft Skin", "Daily Edit"],
    tiles: [
      { img: catCosmetics, label: "Rose oils ->" },
      { img: bottle, label: "Beauty bottles ->" },
    ],
  },
  Stationery: {
    shopLabel: "Shop Stationery",
    links: ["Journals", "Lokta paper", "Cards", "Desk notes", "Wrapped sets"],
    collections: ["Paper Garden", "Letter Desk", "Study Bloom", "Little Notes"],
    tiles: [
      { img: catStationery, label: "Lokta journals ->" },
      { img: m5, label: "Desk details ->" },
    ],
  },
  Gifts: {
    shopLabel: "Shop Gifts",
    links: ["Gift sets", "Under Rs. 3,000", "For her", "Tiny treasures", "Ready to wrap"],
    collections: ["Birthday Box", "Friendship Edit", "Pink Ribbon", "Last-minute Love"],
    tiles: [
      { img: keychain, label: "Charm gifts ->" },
      { img: catJewelry, label: "Jewelry gifts ->" },
    ],
  },
  Sale: {
    shopLabel: "Shop Sale",
    links: ["Last pieces", "Under Rs. 2,500", "Jewelry sale", "Bag sale", "Final edit"],
    collections: ["Archive Finds", "Soft Markdowns", "One-off Pieces", "Weekend Sale"],
    tiles: [
      { img: m4, label: "Last-chance jewelry ->" },
      { img: m3, label: "Limited pieces ->" },
    ],
  },
};

function getMegaMenu(label: string) {
  if (label.startsWith("Home")) return MEGA_MENUS["Home Décor"];
  return MEGA_MENUS[label as keyof typeof MEGA_MENUS];
}

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const mega = openMenu ? getMegaMenu(openMenu) : null;
  const closeNav = () => {
    setOpenMenu(null);
    setMobileOpen(false);
  };
  const handleLogoClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    closeNav();
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (window.location.hash) {
      window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);
    }
  };

  return (
    <header
      className={`relative transition-all duration-500 border-b ${
        scrolled
          ? "border-border bg-ivory/96 backdrop-blur-md shadow-[0_12px_34px_rgba(67,37,31,0.10)]"
          : "border-[color-mix(in_oklab,var(--color-maroon)_12%,transparent)] bg-ivory/88 backdrop-blur-xl shadow-[0_10px_30px_rgba(67,37,31,0.08)]"
      }`}
      style={{
        background: scrolled
          ? "color-mix(in oklab, var(--ivory) 96%, transparent)"
          : "color-mix(in oklab, var(--ivory) 88%, transparent)",
      }}
    >
      <div className="mx-auto max-w-[1500px] px-4 md:px-6 lg:px-10">
        <div className="grid grid-cols-[auto_1fr_auto] items-center gap-2 md:gap-4 lg:gap-6 h-16 md:h-20 text-espresso">
          {/* Left: logo */}
          <a href="/" onClick={handleLogoClick} className="flex items-center gap-3">
            <img
              src={masalaLogo}
              alt="Masala Beads"
              className="h-11 w-11 md:h-14 md:w-14 object-contain mix-blend-multiply"
            />
          </a>

          {/* Right-weighted nav */}
          <nav
            className="hidden lg:flex justify-self-end items-center justify-end gap-8 xl:gap-10 rounded-full px-8 py-3 bg-cream/70 ring-1 ring-maroon/10"
            onMouseLeave={() => setOpenMenu(null)}
          >
            {NAV.map((n) => (
              <a
                key={n.label}
                href={n.href}
                onClick={closeNav}
                onMouseEnter={() => setOpenMenu(n.label)}
                className="link-underline text-[11px] font-medium tracking-[0.24em] uppercase hover:text-maroon transition-colors"
                style={{ color: "color-mix(in oklab, var(--color-espresso) 88%, var(--color-maroon))" }}
              >
                {n.label}
              </a>
            ))}
          </nav>

          {/* Right: actions */}
          <div className="flex items-center justify-end gap-1.5 sm:gap-4 text-espresso" style={{ color: "var(--color-espresso)" }}>
            <button aria-label="Search" className="p-1.5 md:p-2 hover:text-terracotta transition-colors">
              <Search className="h-[18px] w-[18px]" strokeWidth={1.4} />
            </button>
            <button aria-label="Wishlist" className="p-1.5 md:p-2 hover:text-terracotta transition-colors hidden sm:inline-flex">
              <Heart className="h-[18px] w-[18px]" strokeWidth={1.4} />
            </button>
            <button aria-label="Cart" className="p-1.5 md:p-2 hover:text-terracotta transition-colors relative">
              <ShoppingBag className="h-[18px] w-[18px]" strokeWidth={1.4} />
              <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full text-[10px] grid place-items-center"
                    style={{ background: "var(--color-terracotta)", color: "var(--color-ivory)" }}>
                2
              </span>
            </button>
            <button
              aria-label="Menu"
              className="lg:hidden p-1.5 md:p-2"
              onClick={() => setMobileOpen((v) => !v)}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mega menu */}
        {openMenu && mega && (
          <div
            onMouseEnter={() => setOpenMenu(openMenu)}
            onMouseLeave={() => setOpenMenu(null)}
            className="hidden lg:block absolute left-0 right-0 top-full bg-ivory/98 backdrop-blur-md border-t border-border animate-fade-up"
            style={{ background: "var(--color-ivory)" }}
          >
            <div className="mx-auto max-w-[1500px] px-10 py-10 grid grid-cols-4 gap-10">
              <div>
                <p className="eyebrow mb-3">{mega.shopLabel}</p>
                <ul className="space-y-2 text-sm">
                  {mega.links.map((x) => (
                    <li key={x}><a className="link-underline hover:text-terracotta" href={NAV.find((n) => n.label === openMenu)?.href ?? "#new"} onClick={closeNav}>{x}</a></li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="eyebrow mb-3">By collection</p>
                <ul className="space-y-2 text-sm">
                  {mega.collections.map((x) => (
                    <li key={x}><a className="link-underline hover:text-terracotta" href={NAV.find((n) => n.label === openMenu)?.href ?? "#new"} onClick={closeNav}>{x}</a></li>
                  ))}
                </ul>
              </div>
              {mega.tiles.map((tile) => (
                <a key={tile.label} href={NAV.find((n) => n.label === openMenu)?.href ?? "#new"} onClick={closeNav} className="group relative overflow-hidden aspect-[4/5]">
                  <img
                    src={tile.img}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    style={{ objectPosition: tile.position ?? "center" }}
                  />
                  <div
                    className="absolute inset-0"
                    style={{ background: "linear-gradient(180deg, transparent 42%, rgba(62,37,45,0.58))" }}
                  />
                  <span className="absolute bottom-4 left-4 text-ivory serif text-lg" style={{ color: "var(--color-ivory)" }}>
                    {tile.label}
                  </span>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Mobile drawer */}
        {mobileOpen && (
          <div className="lg:hidden pb-6 border-t border-border animate-fade-up">
            <nav className="flex flex-col divide-y divide-border">
              {NAV.map((n) => (
                <a key={n.label} href={n.href} onClick={closeNav} className="py-4 flex items-center justify-between text-sm tracking-widest uppercase">
                  {n.label}
                  <ChevronRight className="h-4 w-4 text-terracotta" />
                </a>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

/* --------------------------- Hero --------------------------- */

function Hero() {
  const title = "Your everyday, but cuter.";
  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={hero}
          alt="Handmade beaded jewelry in warm natural light"
          className="h-full w-full object-cover animate-kenburns"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, color-mix(in oklab, var(--ivory) 88%, transparent) 0%, color-mix(in oklab, var(--ivory) 56%, transparent) 36%, transparent 68%), linear-gradient(180deg, color-mix(in oklab, var(--ivory) 28%, transparent) 0%, transparent 48%, color-mix(in oklab, var(--espresso) 36%, transparent) 100%)",
          }}
        />
      </div>

      <div className="relative z-10 min-h-[100svh] flex flex-col justify-end pb-0 md:pb-28">
        <div className="mx-auto max-w-[1500px] w-full px-0 md:px-6 lg:px-10">
          <div className="w-full max-w-3xl px-6 py-5 bg-ivory/82 shadow-[0_18px_50px_rgba(67,37,31,0.12)] backdrop-blur-[2px] md:bg-transparent md:p-0 md:shadow-none md:backdrop-blur-none">
            <p className="script text-2xl md:text-3xl mb-4"
               style={{ color: "var(--color-terracotta)" }}>
              <span className="letter-in" style={{ animationDelay: "0.1s" }}>Autumn Edit · 2026</span>
            </p>
            <h1 className="serif text-[clamp(2.5rem,6.5vw,5.5rem)] leading-[1.02] tracking-[-0.02em]"
                style={{ color: "var(--color-maroon)" }}>
              {title.split(" ").map((w, i) => (
                <span
                  key={i}
                  className="letter-in inline-block mr-[0.25em]"
                  style={{ animationDelay: `${0.25 + i * 0.08}s` }}
                >
                  {w}
                </span>
              ))}
            </h1>
            <p className="mt-5 md:mt-6 max-w-xl text-sm md:text-[15px] font-medium leading-relaxed animate-fade-up"
               style={{ color: "color-mix(in oklab, var(--espresso) 88%, var(--maroon))", animationDelay: "1.1s" }}>
            Pinterest-worthy accessories, gifts and little finds that add colour, charm and personality to every day.
            </p>
            <div className="mt-7 md:mt-10 flex flex-wrap items-center gap-3 md:gap-4 animate-fade-up" style={{ animationDelay: "1.3s" }}>
              <a href="#new" className="btn-primary group">
                Shop new arrivals
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <a href="#story" className="link-underline px-2 py-2 text-[11px] font-semibold tracking-[0.28em] uppercase self-center"
                 style={{ color: "var(--color-maroon)" }}>
                Our story
              </a>
            </div>
          </div>
        </div>

        {/* scroll cue */}
        <div className="absolute bottom-6 right-8 hidden md:flex items-center gap-3 text-ivory"
             style={{ color: "var(--color-ivory)" }}>
          <span className="text-[10px] tracking-[0.3em] uppercase">Scroll</span>
          <span className="block h-14 w-px bg-current opacity-70 origin-top animate-[scroll-cue_2s_ease-in-out_infinite]"></span>
        </div>

        {/* Floating serif callout, off-grid */}
        <div className="absolute top-32 right-8 lg:right-16 hidden md:block max-w-[220px] rotate-[3deg]">
          <p
            className="script text-3xl"
            style={{
              color: "var(--color-maroon)",
              textShadow: "0 1px 18px color-mix(in oklab, var(--ivory) 88%, transparent)",
            }}
          >
            "each bead <br/>a small story"
          </p>
        </div>
      </div>

      <style>{`
        @keyframes scroll-cue {
          0% { transform: scaleY(0); transform-origin: top; }
          50% { transform: scaleY(1); transform-origin: top; }
          51% { transform-origin: bottom; }
          100% { transform: scaleY(0); transform-origin: bottom; }
        }
      `}</style>
    </section>
  );
}

/* --------------------------- Reveal helper --------------------------- */

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && setVisible(true),
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 900ms ${delay}ms cubic-bezier(.2,.7,.2,1), transform 900ms ${delay}ms cubic-bezier(.2,.7,.2,1)`,
      }}
    >
      {children}
    </div>
  );
}

/* --------------------------- Shop by Mood (masonry) --------------------------- */

const moodTiles = [
  { img: m1, title: "Phone Case", price: "Rs. 2,800", tall: true, cat: "New" },
  { img: m2, title: "Rosewood Stack", price: "Rs. 6,200", cat: "Jewelry" },
  { img: m3, title: "Woven Everyday Tote", price: "Rs. 8,900", tall: true, cat: "Bags" },
  { img: m4, title: "Bloom Drop Earrings", price: "Rs. 3,400", cat: "Jewelry" },
  { img: m5, title: "Kathmandu Table Set", price: "Rs. 5,400", tall: true, cat: "Home" },
  { img: catStationery, title: "Lokta Paper Journal", price: "Rs. 2,200", cat: "Stationery" },
  { img: catCosmetics, title: "Rose Facial Oil", price: "Rs. 3,600", cat: "Beauty" },
  { img: catJewelry, title: "Blush Pearl Layers", price: "Rs. 7,800", tall: true, cat: "Jewelry" },
];

function ShopByMood() {
  return (
    <section id="new" className="relative py-24 lg:py-36">
      <div className="mx-auto max-w-[1500px] px-6 lg:px-10">
        <div className="grid lg:grid-cols-[1fr_2fr] gap-10 lg:gap-16 items-end mb-14">
          <Reveal>
            <p className="eyebrow">shop by mood</p>
            <h2 className="serif text-[clamp(2rem,4vw,3.5rem)] leading-[1.05] mt-3">
              Not just <em className="italic" style={{ color: "var(--color-terracotta)" }}>jewelry.</em><br/>
              A whole small world.
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="text-[15px] leading-relaxed text-muted-foreground max-w-lg lg:ml-auto">
              From beaded phone charms and bracelets to soft bags, home accents,
              beauty rituals, and paper goods, every piece is chosen to make
              everyday moments feel a little prettier.
            </p>
          </Reveal>
        </div>

        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 lg:gap-6 [column-fill:_balance]">
          {moodTiles.map((t, i) => (
            <Reveal key={i} delay={i * 60}>
              <a href="#" className="group block mb-4 lg:mb-6 relative overflow-hidden break-inside-avoid">
                <div className={`relative overflow-hidden ${t.tall ? "aspect-[3/4]" : "aspect-square"}`}>
                  <img
                    src={t.img}
                    alt={t.title}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-[1.08]"
                  />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                       style={{ background: "linear-gradient(180deg, transparent 40%, color-mix(in oklab, var(--espresso) 75%, transparent))" }} />
                  <div className="absolute top-3 left-3 text-[10px] tracking-[0.2em] uppercase px-2.5 py-1"
                       style={{ background: "color-mix(in oklab, var(--ivory) 92%, transparent)", color: "var(--color-maroon)" }}>
                    {t.cat}
                  </div>
                  <div className="absolute inset-x-4 bottom-4 flex items-end justify-between translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500"
                       style={{ color: "var(--color-ivory)" }}>
                    <div>
                      <p className="serif text-lg leading-tight">{t.title}</p>
                      <p className="text-[13px] mt-1 opacity-90">{t.price}</p>
                    </div>
                    <button className="h-9 w-9 grid place-items-center rounded-full"
                            style={{ background: "var(--color-ivory)", color: "var(--color-maroon)" }}
                            aria-label="Add to bag">
                      <ShoppingBag className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------- Category rail --------------------------- */

const categories = [
  { name: "Jewelry", img: catJewelry, count: "312 pieces", slug: "jewelry" },
  { name: "Bags", img: catBags, count: "84 pieces", slug: "bags" },
  { name: "Home Décor", img: catHome, count: "128 pieces", slug: "home" },
  { name: "Cosmetics", img: catCosmetics, count: "56 pieces", slug: "cosmetics" },
  { name: "Stationery", img: catStationery, count: "40 pieces", slug: "stationery" },
];

function CategoryRail() {
  return (
    <section className="relative py-24 lg:py-32" style={{ background: "var(--color-cream)" }}>
      <div className="mx-auto max-w-[1500px] px-6 lg:px-10">
        <div className="flex items-end justify-between mb-10">
          <Reveal>
            <p className="eyebrow">the collections</p>
            <h2 className="serif text-[clamp(1.75rem,3.5vw,2.75rem)] mt-3">Wander the categories</h2>
          </Reveal>
          <a href="#" className="hidden md:inline-flex link-underline text-[11px] tracking-[0.28em] uppercase">
            View all →
          </a>
        </div>

        <div className="flex gap-5 lg:gap-7 overflow-x-auto pb-6 snap-x snap-mandatory -mx-6 px-6 lg:-mx-10 lg:px-10 [scrollbar-width:thin]">
          {categories.map((c, i) => (
            <Reveal key={c.slug} delay={i * 80} className="snap-start shrink-0">
              <a href="#" className="group block w-[280px] sm:w-[320px] lg:w-[360px]">
                <div className="relative overflow-hidden aspect-[3/4]"
                     style={{ background: "var(--color-blush)" }}>
                  <img
                    src={c.img}
                    alt={c.name}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-all duration-[900ms] group-hover:scale-[1.06] group-hover:rotate-[0.5deg]"
                  />
                  <div className="absolute inset-x-0 bottom-0 p-5 flex items-end justify-between"
                       style={{ background: "linear-gradient(180deg, transparent, color-mix(in oklab, var(--espresso) 70%, transparent))", color: "var(--color-ivory)" }}>
                    <div>
                      <p className="serif text-2xl">{c.name}</p>
                      <p className="text-[11px] tracking-[0.2em] uppercase opacity-80 mt-1">{c.count}</p>
                    </div>
                    <ArrowUpRight className="h-5 w-5 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                  </div>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function CategoryAtlas() {
  const [activeCategory, setActiveCategory] = useState(0);
  const active = categories[activeCategory];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveCategory((current) => (current + 1) % categories.length);
    }, 3200);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <section
      className="relative overflow-hidden py-24 lg:py-36"
      style={{ background: "linear-gradient(180deg, var(--color-cream), var(--color-ivory))" }}
    >
      {["jewelry", "bags", "home", "cosmetics", "stationery", "gifts", "sale"].map((id) => (
        <span key={id} id={id} className="absolute -top-24" aria-hidden="true" />
      ))}
      <div className="mx-auto max-w-[1500px] px-6 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
          <Reveal className="lg:sticky lg:top-36 lg:self-start">
            <p className="eyebrow">the collections</p>
            <h2 className="serif text-[clamp(2.2rem,5vw,4.8rem)] leading-[0.98] mt-3">
              Choose a room in the moodboard.
            </h2>
            <p className="mt-6 max-w-sm text-[15px] leading-relaxed text-muted-foreground">
              Hover a category to change the scene. Each world feels like its own
              page torn from the Masala Beads scrapbook.
            </p>
            <a href="#" className="mt-8 inline-flex link-underline text-[11px] tracking-[0.28em] uppercase">
              View all collections
              <ArrowUpRight className="ml-2 h-3.5 w-3.5" />
            </a>
          </Reveal>

          <Reveal delay={120}>
            <div className="relative min-h-[760px] lg:min-h-[760px]">
              <a
                href="#"
                className="group relative block h-[520px] overflow-hidden shadow-[0_28px_80px_-42px_rgba(62,37,45,0.55)] lg:absolute lg:left-0 lg:top-8 lg:h-[650px] lg:w-[66%]"
              >
                {categories.map((c, i) => (
                  <img
                    key={c.slug}
                    src={c.img}
                    alt={i === activeCategory ? c.name : ""}
                    loading={i === 0 ? "eager" : "lazy"}
                    className={`absolute inset-0 h-full w-full object-cover transition-all duration-[1100ms] ${
                      i === activeCategory
                        ? "opacity-100 scale-100 blur-0"
                        : "opacity-0 scale-[1.045] blur-sm"
                    }`}
                  />
                ))}
                <div
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(180deg, transparent 34%, color-mix(in oklab, var(--espresso) 68%, transparent))" }}
                />
                <div className="absolute inset-x-6 bottom-6 flex items-end justify-between"
                     style={{ color: "var(--color-ivory)" }}>
                  <div key={active.slug} className="animate-fade-up">
                    <p className="script text-2xl opacity-90">currently wandering</p>
                    <p className="serif text-4xl leading-none md:text-6xl">{active.name}</p>
                    <p className="mt-3 text-[11px] tracking-[0.24em] uppercase opacity-80">{active.count}</p>
                  </div>
                  <ArrowUpRight className="h-7 w-7 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                </div>
              </a>

              <div
                className="relative z-10 mt-5 p-5 shadow-[0_24px_70px_-44px_rgba(62,37,45,0.55)] backdrop-blur-md lg:absolute lg:right-0 lg:top-0 lg:mt-0 lg:w-[45%] lg:p-7"
                style={{ background: "color-mix(in oklab, var(--ivory) 86%, transparent)" }}
              >
                <p className="label-small">category index</p>
                <div className="mt-5 divide-y" style={{ borderColor: "var(--color-border)" }}>
                  {categories.map((c, i) => (
                    <button
                      key={c.slug}
                      type="button"
                      onMouseEnter={() => setActiveCategory(i)}
                      onFocus={() => setActiveCategory(i)}
                      onClick={() => setActiveCategory(i)}
                      className="group flex w-full items-center justify-between gap-5 py-4 text-left transition-colors"
                      style={{ color: i === activeCategory ? "var(--color-maroon)" : "var(--color-espresso)" }}
                    >
                      <span className="min-w-0">
                        <span className="block serif text-2xl leading-none md:text-3xl">{c.name}</span>
                        <span className="mt-1 block text-[10px] tracking-[0.22em] uppercase text-muted-foreground">{c.count}</span>
                      </span>
                      <span
                        className={`relative h-14 shrink-0 overflow-hidden transition-all duration-500 ${
                          i === activeCategory ? "w-28" : "w-16 group-hover:w-24"
                        }`}
                      >
                        <img
                          src={c.img}
                          alt=""
                          loading="lazy"
                          className={`absolute inset-0 h-full w-full object-cover transition-all duration-700 ${
                            i === activeCategory ? "scale-100 opacity-100" : "scale-110 opacity-55 grayscale-[20%]"
                          }`}
                        />
                        <span
                          className="absolute inset-0"
                          style={{
                            background:
                              i === activeCategory
                                ? "linear-gradient(90deg, transparent 20%, rgba(118,40,63,0.42))"
                                : "rgba(255,247,251,0.18)",
                          }}
                        />
                        <ArrowUpRight
                          className={`absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 transition-all duration-500 ${
                            i === activeCategory
                              ? "translate-x-0 opacity-100"
                              : "translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-80"
                          }`}
                          style={{ color: "var(--color-ivory)" }}
                          strokeWidth={1.5}
                        />
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="absolute bottom-7 left-7 z-10 hidden gap-2 lg:flex">
                {categories.map((c, i) => (
                  <button
                    key={c.slug}
                    type="button"
                    onClick={() => setActiveCategory(i)}
                    className="h-1.5 rounded-full transition-all duration-500"
                    style={{
                      width: i === activeCategory ? "42px" : "14px",
                      background: i === activeCategory ? "var(--color-maroon)" : "color-mix(in oklab, var(--maroon) 28%, transparent)",
                    }}
                    aria-label={`Show ${c.name}`}
                  />
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* --------------------------- Bestsellers --------------------------- */

const bestsellers = [
  { name: "Ember Bead Bracelet", price: "Rs. 4,200", secondary: "Hand-strung glass", img: m2, alt: m4 },
  { name: "Sundara Drop Earrings", price: "Rs. 3,600", secondary: "Brass + rose glass", img: m4, alt: catJewelry },
  { name: "Everyday Woven Tote", price: "Rs. 8,900", secondary: "Handloom cotton", img: m3, alt: catBags },
  { name: "Rose & Amber Oil", price: "Rs. 3,600", secondary: "5ml, hand-blended", img: catCosmetics, alt: m1 },
  { name: "Lokta Journal, Ivory", price: "Rs. 2,200", secondary: "Handmade paper", img: catStationery, alt: catStationery },
];

function ProductCard({ p }: { p: (typeof bestsellers)[number] }) {
  const [liked, setLiked] = useState(false);
  const [pop, setPop] = useState(false);
  return (
    <div className="group w-[260px] sm:w-[300px] shrink-0 snap-start">
      <div className="relative overflow-hidden aspect-[4/5]" style={{ background: "var(--color-cream)" }}>
        <img src={p.img} alt={p.name} loading="lazy"
             className="absolute inset-0 h-full w-full object-cover transition-opacity duration-500 group-hover:opacity-0" />
        <img src={p.alt} alt="" loading="lazy"
             className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100 scale-[1.02]" />

        <button
          aria-label="Wishlist"
          onClick={() => { setLiked((v) => !v); setPop(true); setTimeout(() => setPop(false), 500); }}
          className={`absolute top-3 right-3 h-9 w-9 grid place-items-center rounded-full transition-colors ${pop ? "animate-pop" : ""}`}
          style={{ background: "color-mix(in oklab, var(--ivory) 92%, transparent)", color: liked ? "var(--color-terracotta)" : "var(--color-maroon)" }}
        >
          <Heart className="h-4 w-4" fill={liked ? "currentColor" : "none"} strokeWidth={1.6} />
        </button>

        <button
          className="absolute inset-x-3 bottom-3 py-2.5 text-[11px] tracking-[0.24em] uppercase translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500"
          style={{ background: "var(--color-maroon)", color: "var(--color-ivory)" }}
        >
          Quick add
        </button>
      </div>
      <div className="pt-4 flex items-start justify-between gap-3">
        <div>
          <p className="serif text-[17px] leading-tight">{p.name}</p>
          <p className="text-xs text-muted-foreground mt-1">{p.secondary}</p>
        </div>
        <p className="text-sm tracking-wide mt-1" style={{ color: "var(--color-maroon)" }}>{p.price}</p>
      </div>
    </div>
  );
}

function Bestsellers() {
  return (
    <section className="py-24 lg:py-32">
      <div className="mx-auto max-w-[1500px] px-6 lg:px-10">
        <div className="grid lg:grid-cols-[2fr_1fr] items-end gap-8 mb-12">
          <Reveal>
            <p className="eyebrow">quietly loved</p>
            <h2 className="serif text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] mt-3">
              The pieces our regulars <em className="italic" style={{ color: "var(--color-terracotta)" }}>keep coming back for.</em>
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <a href="#" className="lg:ml-auto btn-primary">Shop bestsellers</a>
          </Reveal>
        </div>

        <div className="flex gap-6 overflow-x-auto pb-6 snap-x -mx-6 px-6 lg:-mx-10 lg:px-10">
          {bestsellers.map((p, i) => (
            <Reveal key={i} delay={i * 60}><ProductCard p={p} /></Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------- Story --------------------------- */

function Counter({ value, suffix = "", label }: { value: number; suffix?: string; label: string }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      const start = performance.now();
      const dur = 1600;
      const step = (t: number) => {
        const p = Math.min(1, (t - start) / dur);
        const eased = 1 - Math.pow(1 - p, 3);
        setN(Math.round(eased * value));
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
      io.disconnect();
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, [value]);
  return (
    <div ref={ref} className="min-w-0">
      <p className="serif whitespace-nowrap text-[clamp(2rem,7.8vw,3rem)] leading-none" style={{ color: "var(--color-maroon)" }}>
        {n.toLocaleString()}{suffix}
      </p>
      <p className="mt-2 text-[11px] tracking-[0.24em] uppercase text-muted-foreground">{label}</p>
    </div>
  );
}

function Story() {
  return (
    <section
      id="story"
      className="relative min-h-[120svh] overflow-hidden bg-cover bg-left bg-no-repeat bg-scroll py-28 md:bg-fixed lg:py-40"
      style={{
        backgroundImage: `linear-gradient(90deg, rgba(62, 37, 45, 0.16) 0%, rgba(255, 247, 251, 0.28) 40%, rgba(255, 247, 251, 0.84) 100%), linear-gradient(180deg, rgba(62, 37, 45, 0.14) 0%, rgba(62, 37, 45, 0.34) 100%), url(${story1})`,
        backgroundPosition: "left center",
      }}
    >
      <div className="relative z-10 mx-auto flex min-h-[78svh] max-w-[1500px] items-center px-6 lg:px-10">
        <div className="ml-auto w-full max-w-2xl bg-ivory/82 p-7 shadow-[0_30px_90px_-42px_rgba(62,37,45,0.55)] backdrop-blur-[3px] md:p-10 lg:bg-ivory/74">
          <Reveal>
            <p className="eyebrow">our story</p>
            <h2 className="serif text-[clamp(2rem,4vw,3.5rem)] leading-[1.05] mt-3">
              A small workshop in Kathmandu.<br/>
              <em className="italic" style={{ color: "var(--color-terracotta)" }}>Twenty-nine years of quiet work.</em>
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-6 text-[15px] leading-[1.8] text-muted-foreground max-w-lg">
              Masala Beads began in 1997 on a narrow lane in Thamel, with one table,
              two pairs of hands, and a bowl of glass beads catching the afternoon
              light. Today we design across five stores and ship worldwide but every
              piece still passes through those same careful hands.
            </p>
          </Reveal>
          <Reveal delay={240}>
            <p className="mt-4 text-[15px] leading-[1.8] text-muted-foreground max-w-lg">
              Jewelry, yes. But also the bag you'll carry everywhere, the vase on your
              nightstand, the rose oil for your evening ritual, the journal you'll
              actually fill. Small, warm, made to last.
            </p>
          </Reveal>

          <div className="mt-12 grid max-w-md grid-cols-2 gap-x-5 gap-y-10 sm:gap-8">
            <Counter value={29} suffix="+" label="years crafting" />
            <Counter value={150000} suffix="+" label="hands served" />
            <Counter value={5} label="stores in nepal" />
            <Counter value={2805} label="handmade drops" />
          </div>

          <Reveal delay={400}>
            <a href="#" className="mt-10 inline-flex link-underline text-[11px] tracking-[0.28em] uppercase"
               style={{ color: "var(--color-maroon)" }}>
              Read the full story →
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* --------------------------- Get the Look --------------------------- */

function GetTheLook() {
  const hotspots = [
    { x: 28, y: 62, name: "Woven Everyday Tote", price: "Rs. 8,900" },
    { x: 52, y: 42, name: "Sundara Layered Necklace", price: "Rs. 7,800" },
    { x: 60, y: 22, name: "Blush Silk Scarf", price: "Rs. 4,600" },
    { x: 78, y: 70, name: "Terracotta Sandals", price: "Rs. 9,200" },
  ];
  const [active, setActive] = useState<number | null>(null);
  const activeHotspot = active === null ? null : hotspots[active];

  const getHotspotCardStyle = (hotspot: (typeof hotspots)[number]): CSSProperties => {
    const base: CSSProperties = {
      background: "var(--color-ivory)",
      top: `${hotspot.y}%`,
      width: "min(13rem, calc(100% - 1.5rem))",
    };

    if (hotspot.x > 68) {
      return {
        ...base,
        right: `${100 - hotspot.x + 5}%`,
        transform: "translateY(-50%)",
      };
    }

    if (hotspot.x < 32) {
      return {
        ...base,
        left: `${hotspot.x + 5}%`,
        transform: "translateY(-50%)",
      };
    }

    return {
      ...base,
      left: "50%",
      transform: "translate(-50%, -50%)",
    };
  };

  return (
    <section className="py-24 lg:py-32">
      <div className="mx-auto max-w-[1500px] px-6 lg:px-10">
        <div className="grid lg:grid-cols-[1fr_1.6fr] gap-10 lg:gap-16 items-start">
          <div className="lg:sticky lg:top-32">
            <Reveal>
              <p className="eyebrow">get the look</p>
              <h2 className="serif text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] mt-3">
                Style it,<br/><em className="italic" style={{ color: "var(--color-terracotta)" }}>softly.</em>
              </h2>
              <p className="mt-6 text-[15px] leading-relaxed text-muted-foreground max-w-md">
                Hover a dot on the photograph to shop each piece. This is how
                we'd wear it on a Saturday in Pokhara.
              </p>
              <a href="#" className="mt-8 inline-block btn-primary">Shop this look</a>
            </Reveal>
          </div>

          <Reveal delay={150}>
            <div className="relative overflow-hidden">
              <img src={getlook} alt="Editorial flatlay" loading="lazy" className="w-full h-auto" />
              {hotspots.map((h, i) => (
                <button
                  key={i}
                  onPointerEnter={(event) => {
                    if (event.pointerType === "mouse") setActive(i);
                  }}
                  onPointerLeave={(event) => {
                    if (event.pointerType === "mouse") setActive(null);
                  }}
                  onClick={() => setActive(active === i ? null : i)}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${h.x}%`, top: `${h.y}%` }}
                  aria-label={`View ${h.name}`}
                >
                  <span className="relative flex h-6 w-6">
                    <span className="absolute inset-0 rounded-full animate-ping opacity-60"
                          style={{ background: "var(--color-ivory)" }} />
                    <span className="relative m-auto h-6 w-6 rounded-full grid place-items-center text-[11px] font-medium"
                          style={{ background: "var(--color-ivory)", color: "var(--color-maroon)" }}>
                      {i + 1}
                    </span>
                  </span>
                </button>
              ))}
              {activeHotspot && (
                <div
                  className="pointer-events-none absolute z-20 p-3 text-left shadow-xl animate-fade-up"
                  style={getHotspotCardStyle(activeHotspot)}
                >
                  <p className="serif text-sm leading-tight break-words">{activeHotspot.name}</p>
                  <p className="text-xs mt-1" style={{ color: "var(--color-maroon)" }}>{activeHotspot.price}</p>
                  <p className="text-[10px] mt-2 tracking-[0.2em] uppercase link-underline"
                     style={{ color: "var(--color-terracotta)" }}>Add to bag →</p>
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* --------------------------- Press Marquee --------------------------- */

const press = [
  "Vogue India", "Kathmandu Post", "ELLE Decor", "Nepali Times",
  "Cosmopolitan", "Condé Nast Traveller", "House & Garden", "The Himalayan",
];

function Press() {
  const loop = [...press, ...press];
  return (
    <section className="py-16 border-y border-border" style={{ background: "var(--color-ivory)" }}>
      <div className="mx-auto max-w-[1500px] px-6 lg:px-10">
        <p className="text-center label-small mb-8">as featured in</p>
        <div className="overflow-hidden">
          <div className="flex animate-marquee whitespace-nowrap">
            {loop.map((p, i) => (
              <span key={i} className="mx-10 serif text-2xl md:text-3xl italic opacity-50 hover:opacity-100 transition-opacity"
                    style={{ color: "var(--color-maroon)" }}>
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* --------------------------- Instagram --------------------------- */

function InstaGrid() {
  const shots = [m1, m2, m4, catJewelry, m5, catBags];
  const curve = [
    "md:translate-y-10 md:rotate-[-6deg]",
    "md:translate-y-2 md:rotate-[-3deg]",
    "md:-translate-y-8 md:rotate-[-1deg]",
    "md:-translate-y-8 md:rotate-[1deg]",
    "md:translate-y-2 md:rotate-[3deg]",
    "md:translate-y-10 md:rotate-[6deg]",
  ];

  return (
    <section className="relative overflow-hidden py-24">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,247,251,0.96) 0%, rgba(253,233,242,0.9) 54%, rgba(255,247,251,0.98) 100%)",
        }}
      />
      <img
        src={keychain}
        alt=""
        loading="lazy"
        className="animate-product-float product-fade-mask pointer-events-none absolute -left-20 top-36 h-56 w-44 object-cover opacity-18 md:-left-10 md:top-28 md:h-[27rem] md:w-[21rem] md:opacity-32 lg:left-3 lg:h-[32rem] lg:w-[25rem]"
        style={
          {
            "--float-delay": "0s",
            "--float-rotate": "-13deg",
            "--float-y": "22px",
          } as CSSProperties
        }
      />
      <img
        src={necklace}
        alt=""
        loading="lazy"
        className="animate-product-float product-fade-mask pointer-events-none absolute -right-24 bottom-16 h-60 w-48 object-cover opacity-16 md:-right-12 md:bottom-8 md:h-[29rem] md:w-[23rem] md:opacity-28 lg:right-4 lg:h-[34rem] lg:w-[27rem]"
        style={
          {
            "--float-delay": "-2.2s",
            "--float-rotate": "12deg",
            "--float-y": "-18px",
          } as CSSProperties
        }
      />
      <img
        src={bottle}
        alt=""
        loading="lazy"
        className="animate-product-float product-fade-mask pointer-events-none absolute left-[46%] top-14 h-44 w-36 object-cover opacity-14 md:top-16 md:h-72 md:w-56 md:opacity-24 lg:top-10 lg:h-80 lg:w-64"
        style={
          {
            "--float-delay": "-4.4s",
            "--float-rotate": "5deg",
            "--float-y": "16px",
          } as CSSProperties
        }
      />
      <div className="relative mx-auto max-w-[1500px] px-6 lg:px-10">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-10">
          <Reveal>
            <p className="eyebrow">follow along</p>
            <h2 className="serif text-[clamp(1.75rem,3.5vw,2.75rem)] mt-3">
              @masalabeads_official
            </h2>
          </Reveal>
          <a href="https://instagram.com" className="inline-flex items-center gap-2 link-underline text-[11px] tracking-[0.28em] uppercase">
            <Instagram className="h-4 w-4" /> Follow on Instagram
          </a>
        </div>
        <div className="relative mt-12 grid grid-cols-2 gap-4 pb-14 pt-6 [perspective:1200px] md:grid-cols-3 md:gap-5 lg:grid-cols-6 lg:gap-4 lg:pb-20">
          {shots.map((s, i) => (
            <div key={i} className={`relative ${curve[i]}`}>
              <a
                href="#"
                className="animate-card-tilt group relative block aspect-square overflow-hidden rounded-[34%_66%_42%_58%/58%_38%_62%_42%] bg-ivory shadow-[0_28px_80px_-38px_rgba(62,37,45,0.72)] ring-1 ring-white/60 transition-all duration-700 [transform-style:preserve-3d] hover:z-10 hover:-translate-y-3 hover:scale-[1.035]"
                style={{ animationDelay: `${i * -0.35}s` }}
              >
                <img src={s} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 grid place-items-center opacity-0 group-hover:opacity-100 transition-opacity"
                     style={{ background: "color-mix(in oklab, var(--maroon) 50%, transparent)", color: "var(--color-ivory)" }}>
                  <Instagram className="h-6 w-6" strokeWidth={1.4} />
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------- Newsletter --------------------------- */

function Newsletter() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  return (
    <section className="py-24 lg:py-32 relative overflow-hidden"
             style={{
               background:
                 "linear-gradient(135deg, #fff7f3 0%, #f8e7e2 48%, #f2d4dd 100%)",
             }}>
      <div className="absolute inset-0 opacity-55 pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 30%, rgba(201, 109, 141, 0.24) 0%, transparent 40%), radial-gradient(circle at 80% 70%, rgba(232, 164, 191, 0.22) 0%, transparent 40%)",
            }} />
      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <Reveal>
          <p className="script text-3xl" style={{ color: "var(--color-terracotta)" }}>a little love letter</p>
          <h2 className="serif text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.05] mt-3">
            First dibs on Friday drops.
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground max-w-md mx-auto">
            One thoughtful email a week with new pieces, styling notes from
            Kathmandu, and a little discount on your first order.
          </p>
        </Reveal>
        <Reveal delay={150}>
          <form
            onSubmit={(e) => { e.preventDefault(); setDone(true); }}
            className="mt-10 flex flex-col sm:flex-row gap-3 sm:gap-0 max-w-lg mx-auto"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="flex-1 bg-transparent border-b border-maroon/40 py-4 px-1 text-[15px] outline-none focus:border-maroon transition-colors placeholder:text-maroon/50"
              style={{ borderColor: "color-mix(in oklab, var(--maroon) 35%, transparent)", color: "var(--color-maroon)" }}
            />
            <button className="btn-primary sm:ml-4">
              {done ? "✓ You're in" : "Subscribe"}
            </button>
          </form>
          {done && <p className="mt-4 script text-2xl" style={{ color: "var(--color-terracotta)" }}>welcome to the family ✨</p>}
        </Reveal>
      </div>
    </section>
  );
}

/* --------------------------- Footer --------------------------- */

function Footer() {
  const stores = [
    "Labim Mall, Lalitpur",
    "Thamel Shop 1 & 2, Kathmandu",
    "PKR Lakeside, Pokhara",
    "Nadipur, Pokhara",
    "Kapan, Kathmandu",
    "Eyeplex Mall, Kathmandu",
  ];
  return (
    <footer className="pt-24 pb-10" style={{ background: "var(--color-espresso)", color: "var(--color-ivory)" }}>
      <div className="mx-auto max-w-[1500px] px-6 lg:px-10">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5 lg:gap-12">
          <div className="min-w-0 lg:col-span-2">
            <div className="flex flex-wrap items-center gap-3">
              <img
                src={masalaLogo}
                alt="Masala Beads"
                className="h-14 w-14 object-contain mix-blend-screen sm:h-16 sm:w-16"
              />
              <div className="min-w-0">
                <p className="serif text-[clamp(1.55rem,7vw,1.8rem)] leading-none" style={{ color: "var(--color-ivory)" }}>Masala Beads</p>
                <p className="script text-[clamp(1.05rem,5.5vw,1.25rem)] leading-snug" style={{ color: "var(--color-blush)" }}>since 1997, Kathmandu</p>
              </div>
            </div>
            <p className="mt-6 max-w-sm break-words text-sm leading-relaxed opacity-75">
              A boutique of handmade jewelry, bags, home decor, cosmetics and stationery.
              Made in Nepal, shipped with care around the world.
            </p>
            <div className="mt-6 flex max-w-full flex-wrap gap-2 sm:gap-3">
              {["eSewa", "Fonepay", "Visa", "Mastercard", "COD"].map((p) => (
                <span key={p} className="border border-ivory/25 px-2.5 py-1 text-[9px] uppercase tracking-[0.18em] sm:text-[10px] sm:tracking-[0.2em]"
                      style={{ borderColor: "color-mix(in oklab, var(--ivory) 25%, transparent)" }}>
                  {p}
                </span>
              ))}
            </div>
          </div>

          <div>
            <p className="label-small mb-4" style={{ color: "var(--color-blush)" }}>Shop</p>
            <ul className="space-y-2 text-sm opacity-90">
              {["Jewelry", "Bags", "Home Decor", "Cosmetics", "Stationery", "Gifts", "Sale"].map((x) => (
                <li key={x}><a href="#" className="link-underline">{x}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <p className="label-small mb-4" style={{ color: "var(--color-blush)" }}>About</p>
            <ul className="space-y-2 text-sm opacity-90">
              {["Our story", "Journal", "Artisans", "Sustainability", "Press", "Contact"].map((x) => (
                <li key={x}><a href="#" className="link-underline">{x}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <p className="label-small mb-4" style={{ color: "var(--color-blush)" }}>Visit us</p>
            <ul className="space-y-2 text-sm opacity-90">
              {stores.map((s) => (
                <li key={s} className="flex items-start gap-2">
                  <MapPin className="h-3.5 w-3.5 mt-1 shrink-0" style={{ color: "var(--color-terracotta)" }} />
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-4"
             style={{ borderColor: "color-mix(in oklab, var(--ivory) 15%, transparent)" }}>
          <p className="text-center text-xs opacity-60 sm:text-left">© 2026 Masala Beads · Handmade in Nepal</p>
          <p className="script text-2xl" style={{ color: "var(--color-blush)" }}>with love, from Kathmandu</p>
          <div className="flex gap-4 text-xs opacity-60">
            <a href="#" className="link-underline">Privacy</a>
            <a href="#" className="link-underline">Terms</a>
            <a href="#" className="link-underline">Shipping</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* --------------------------- Page --------------------------- */

function Preloader() {
  const [leaving, setLeaving] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const leaveTimer = window.setTimeout(() => setLeaving(true), 1500);
    const hideTimer = window.setTimeout(() => {
      setHidden(true);
      document.body.style.overflow = previousOverflow;
    }, 2250);

    return () => {
      window.clearTimeout(leaveTimer);
      window.clearTimeout(hideTimer);
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  if (hidden) return null;

  return (
    <div
      className={`preloader fixed inset-0 z-[80] grid place-items-center overflow-hidden ${
        leaving ? "preloader--leave" : ""
      }`}
      aria-label="Loading Masala Beads"
      aria-live="polite"
    >
      <img src={preloaderImage} alt="" className="preloader__image" />
      <div className="preloader__wash" />
      <div className="preloader__content">
        <img src={masalaLogo} alt="Masala Beads" className="preloader__logo" />
        <p className="preloader__script">handmade in Nepal</p>
        <div className="preloader__title">
          <span>Masala</span>
          <span>Beads</span>
        </div>
        <div className="preloader__thread" aria-hidden="true">
          <span />
        </div>
      </div>
    </div>
  );
}

function Home() {
  return (
    <div className="min-h-screen">
      <Preloader />
      <div className="fixed top-0 left-0 right-0 z-50">
        <Announcement />
        <Header />
      </div>
      <main>
        <Hero />
        <ShopByMood />
        <CategoryAtlas />
        <Bestsellers />
        <Story />
        <GetTheLook />
        <Press />
        <InstaGrid />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
}
