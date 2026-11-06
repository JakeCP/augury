#!/usr/bin/env python3
"""Build self-hosted subset WOFF2 fonts for Augury (PLAN §8).

On yijing's pattern: sources cached under scripts/.cache/fonts/, subsets
written to fonts/, OFL files shipped per font, --check proves coverage.
The pre-downloaded (URL-encoded) cache filenames are used when present;
otherwise sources are fetched from the pinned google/fonts URLs.

Usage:
  scripts/.cache/pyenv/bin/python scripts/build-fonts.py
  scripts/.cache/pyenv/bin/python scripts/build-fonts.py --check
Requires fontTools + brotli (dev only).
"""
import subprocess, sys, urllib.request
from pathlib import Path
ROOT = Path(__file__).resolve().parent.parent
CACHE = ROOT / "scripts" / ".cache" / "fonts"
FONTS_DIR = ROOT / "fonts"
SOURCES = {
    "Cinzel%5Bwght%5D.ttf": "https://github.com/google/fonts/raw/main/ofl/cinzel/Cinzel%5Bwght%5D.ttf",
    "Cinzel-OFL.txt": "https://github.com/google/fonts/raw/main/ofl/cinzel/OFL.txt",
    "EBGaramond%5Bwght%5D.ttf": "https://github.com/google/fonts/raw/main/ofl/ebgaramond/EBGaramond%5Bwght%5D.ttf",
    "EBGaramond-Italic%5Bwght%5D.ttf": "https://github.com/google/fonts/raw/main/ofl/ebgaramond/EBGaramond-Italic%5Bwght%5D.ttf",
    "EBGaramond-OFL.txt": "https://github.com/google/fonts/raw/main/ofl/ebgaramond/OFL.txt",
}
SOURCE_GLOBS = ("index.html", "404.html", "css/base.css", "css/views.css")

def rng(a, b): return {chr(cp) for cp in range(a, b + 1)}
def source_chars():
    out = set()
    for rel in SOURCE_GLOBS:
        p = ROOT / rel
        if p.exists(): out |= {c for c in p.read_text(encoding="utf-8") if not c.isspace()}
    for p in sorted((ROOT / "js").rglob("*.js")):
        out |= {c for c in p.read_text(encoding="utf-8") if not c.isspace()}
    data = ROOT / "data"
    if data.exists():
        for p in sorted(data.rglob("*.js")):
            out |= {c for c in p.read_text(encoding="utf-8") if not c.isspace()}
    return out
def eb_unicodes():
    w = set()
    w |= rng(0x20, 0x7E); w |= rng(0xA0, 0x24F)          # Latin + extensions (macrons etc.)
    w |= rng(0x370, 0x3FF)                                # Greek
    w |= rng(0x1F00, 0x1FFF)                              # Polytonic Greek (breathings, iota subscript)
    w |= rng(0x2000, 0x206F)                              # punctuation, dashes, quotes
    w |= set("†‡·×→←↑↓°′″")
    w |= source_chars()
    return sorted(w)
def cinzel_unicodes():
    w = set(); w |= rng(0x20, 0x7E); w |= rng(0xA0, 0x17F); w |= set("‘’“”–—·")
    return sorted(w)
def ensure_sources():
    CACHE.mkdir(parents=True, exist_ok=True)
    for name, url in SOURCES.items():
        dest = CACHE / name
        if dest.exists() and dest.stat().st_size > 0:
            print(f"  cached  {name} ({dest.stat().st_size} bytes)"); continue
        print(f"  fetch   {name}")
        req = urllib.request.Request(url, headers={"User-Agent": "augury-font-build"})
        with urllib.request.urlopen(req) as r, open(dest, "wb") as f: f.write(r.read())
def subset(src, dest, chars):
    unicodes = ",".join(f"U+{ord(c):04X}" for c in chars)
    cmd = [sys.executable, "-m", "fontTools.subset", str(src), f"--output-file={dest}",
           f"--unicodes={unicodes}", "--flavor=woff2", "--layout-features=*",
           "--name-IDs=*", "--notdef-glyph", "--desubroutinize"]
    r = subprocess.run(cmd, capture_output=True, text=True)
    if r.returncode != 0:
        print(r.stdout); print(r.stderr); raise SystemExit(f"subset failed for {src}")
    print(f"  wrote   {dest.relative_to(ROOT)} ({dest.stat().st_size} bytes)")
def check_coverage():
    from fontTools.ttLib import TTFont
    ok = True
    # Required polytonic probes: breathings, iota subscript, final sigma, dialytika combos.
    probes = "ἀἁἂᾀᾁῳϊϋςσᾷῇῷἦἧὦᾂ"
    for fname in ("eb-garamond.woff2", "eb-garamond-italic.woff2"):
        f = FONTS_DIR / fname
        if not f.exists(): print(f"  FAIL    {fname} missing"); ok = False; continue
        cmap = TTFont(str(f)).getBestCmap()
        missing = [c for c in sorted(source_chars()) if ord(c) not in cmap and ord(c) > 0x2F]
        # ASCII/JS syntax chars are covered by cp range; only flag non-ASCII gaps + probes
        gap = [c for c in probes if ord(c) not in cmap]
        if gap: ok = False; print(f"  FAIL    {fname} missing polytonic: {''.join(gap)}")
        else: print(f"  ok      {fname} covers polytonic Greek probes")
        nonascii_missing = [c for c in missing if ord(c) > 0x7F]
        if nonascii_missing: ok = False; print(f"  FAIL    {fname} missing source chars: {''.join(nonascii_missing[:40])}")
    cz = FONTS_DIR / "cinzel.woff2"
    if not cz.exists(): print("  FAIL    cinzel.woff2 missing"); ok = False
    else:
        cmap = TTFont(str(cz)).getBestCmap()
        need = "AVGVRYADMITTVNOLIESCH"
        missing = [c for c in need if ord(c) not in cmap]
        if missing: ok = False; print(f"  FAIL    cinzel.woff2 missing: {''.join(missing)}")
        else: print("  ok      cinzel.woff2 covers inscriptional capitals")
    for lic in ("Cinzel-OFL.txt", "EBGaramond-OFL.txt"):
        if not (FONTS_DIR / lic).exists(): ok = False; print(f"  FAIL    fonts/{lic} missing")
    return ok
def main():
    if "--check" in sys.argv: raise SystemExit(0 if check_coverage() else 1)
    print("sources:"); ensure_sources()
    FONTS_DIR.mkdir(exist_ok=True)
    print("subsets:")
    subset(CACHE / "Cinzel%5Bwght%5D.ttf", FONTS_DIR / "cinzel.woff2", cinzel_unicodes())
    subset(CACHE / "EBGaramond%5Bwght%5D.ttf", FONTS_DIR / "eb-garamond.woff2", eb_unicodes())
    subset(CACHE / "EBGaramond-Italic%5Bwght%5D.ttf", FONTS_DIR / "eb-garamond-italic.woff2", eb_unicodes())
    (FONTS_DIR / "Cinzel-OFL.txt").write_bytes((CACHE / "Cinzel-OFL.txt").read_bytes())
    (FONTS_DIR / "EBGaramond-OFL.txt").write_bytes((CACHE / "EBGaramond-OFL.txt").read_bytes())
    print("coverage:"); raise SystemExit(0 if check_coverage() else 1)
if __name__ == "__main__": main()
