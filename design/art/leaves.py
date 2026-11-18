"""Generate botanical line-art SVG (a hanging branch and a strip of ferns) for
the mock. Deterministic: fixed seed, so re-running gives the same drawing.
Writes two Astro components into src/pages/mock/."""
import math, random, sys, os

OUT = sys.argv[1]
random.seed(7)

FILLS = [("#8DB255", .24), ("#6E9A55", .20), ("#A9C27A", .28), ("#5C8A4E", .16)]
f = lambda v: f"{v:.1f}"


def bez(p0, p1, p2, p3, t):
    u = 1 - t
    x = u**3*p0[0] + 3*u*u*t*p1[0] + 3*u*t*t*p2[0] + t**3*p3[0]
    y = u**3*p0[1] + 3*u*u*t*p1[1] + 3*u*t*t*p2[1] + t**3*p3[1]
    dx = 3*u*u*(p1[0]-p0[0]) + 6*u*t*(p2[0]-p1[0]) + 3*t*t*(p3[0]-p2[0])
    dy = 3*u*u*(p1[1]-p0[1]) + 6*u*t*(p2[1]-p1[1]) + 3*t*t*(p3[1]-p2[1])
    return (x, y), math.atan2(dy, dx)


def leaf(base, ang, L, W, bend=0.0):
    """Almond leaf from base along ang. bend curls the tip slightly."""
    d = (math.cos(ang), math.sin(ang)); n = (-d[1], d[0])
    P = lambda a, b: (base[0] + a*d[0] + b*n[0], base[1] + a*d[1] + b*n[1])
    tip = P(L, bend*L)
    c1, c2 = P(.18*L, .95*W), P(.68*L, .8*W + bend*L*.5)
    c3, c4 = P(.68*L, -.8*W + bend*L*.5), P(.18*L, -.95*W)
    outline = (f"M{f(base[0])} {f(base[1])}C{f(c1[0])} {f(c1[1])} {f(c2[0])} {f(c2[1])} {f(tip[0])} {f(tip[1])}"
               f"C{f(c3[0])} {f(c3[1])} {f(c4[0])} {f(c4[1])} {f(base[0])} {f(base[1])}Z")
    m = P(.84*L, bend*L*.7)
    mid = P(.45*L, bend*L*.2)
    rib = f"M{f(base[0])} {f(base[1])}Q{f(mid[0])} {f(mid[1])} {f(m[0])} {f(m[1])}"
    return outline, rib


def stem_path(p0, p1, p2, p3):
    return f"M{f(p0[0])} {f(p0[1])}C{f(p1[0])} {f(p1[1])} {f(p2[0])} {f(p2[1])} {f(p3[0])} {f(p3[1])}"


def branch_leaves(curve, n, t0, t1, size, side0=1, spread=0.95):
    out = []
    side = side0
    for i in range(n):
        t = t0 + (t1 - t0) * (i + random.uniform(-.15, .15)) / max(1, n - 1)
        t = min(max(t, 0), 1)
        (x, y), a = bez(*curve, t)
        # leaves biggest a third of the way in, small toward the tip
        k = math.sin(math.pi * (0.25 + 0.75 * (1 - abs(t - .4) / .8)))
        L = size * (0.55 + 0.45 * k) * random.uniform(.85, 1.1)
        la = a + side * (spread + random.uniform(-.2, .2))
        pet = 5 + L * .06
        b = (x + pet*math.cos(la), y + pet*math.sin(la))
        o, r = leaf(b, la, L, L*random.uniform(.24, .3), bend=side*random.uniform(.02, .09))
        fill, op = random.choice(FILLS)
        out.append(dict(px=x, py=y, b=b, o=o, r=r, fill=fill, op=op,
                        pet=f"M{f(x)} {f(y)}L{f(b[0])} {f(b[1])}", delay=-random.uniform(0, 7)))
        side = -side
    return out


def render_leaf(l):
    return (f'<g class="lf" style="transform-origin:{f(l["px"])}px {f(l["py"])}px;animation-delay:{l["delay"]:.2f}s">'
            f'<path d="{l["pet"]}"/><path d="{l["o"]}" fill="{l["fill"]}" fill-opacity="{l["op"]}"/>'
            f'<path d="{l["r"]}" stroke-opacity=".55"/></g>')


# ---------------- Hanging branch ----------------
W, H = 460, 640
main = ((478, -14), (400, 120), (300, 260), (190, 560))
twig1 = (bez(*main, .32)[0], (300, 150), (230, 190), (150, 230))
twig2 = (bez(*main, .58)[0], (330, 380), (370, 450), (380, 560))
leaves = (branch_leaves(main, 15, .08, .98, 58)
          + branch_leaves(twig1, 7, .15, 1, 42, side0=-1)
          + branch_leaves(twig2, 6, .2, 1, 40))
tipm = bez(*main, 1)[0]
branch = (f'<svg viewBox="0 0 {W} {H}" fill="none" stroke="var(--forest)" stroke-width="1.3" stroke-linecap="round" '
          f'stroke-linejoin="round" aria-hidden="true" focusable="false">'
          f'<g class="sway" style="transform-origin:470px 0px">'
          f'<path d="{stem_path(*main)}" stroke-width="1.8"/>'
          f'<path d="{stem_path(*twig1)}" stroke-width="1.3"/>'
          f'<path d="{stem_path(*twig2)}" stroke-width="1.3"/>'
          + "".join(render_leaf(l) for l in leaves) +
          f'<circle cx="{f(tipm[0])}" cy="{f(tipm[1])}" r="2.6" fill="var(--forest)" stroke="none"/>'
          '</g></svg>')

# ---------------- Fern strip ----------------
FW, FH = 1200, 170


def frond(x0, h, lean, pairs):
    p0 = (x0, FH + 4)
    p3 = (x0 + lean, FH - h)
    p1 = (x0 + lean * .05, FH - h * .45)
    p2 = (x0 + lean * .7, FH - h * .85)
    parts = [f'<path d="{stem_path(p0, p1, p2, p3)}" stroke-width="1.3"/>']
    for i in range(pairs):
        t = .12 + .86 * i / pairs
        (x, y), a = bez(p0, p1, p2, p3, t)
        L = (h * .26) * (1 - t) ** .8 + 4
        for s in (1, -1):
            la = a + s * 1.05
            o, r = leaf((x, y), la, L, L * .3, bend=-s * .08)
            fill, op = random.choice(FILLS)
            parts.append(f'<path d="{o}" fill="{fill}" fill-opacity="{op}"/>')
    return (f'<g class="frond" style="transform-origin:{f(x0)}px {FH}px;animation-delay:{-random.uniform(0, 9):.2f}s">'
            + "".join(parts) + '</g>')


fronds = []
x = -10
while x < FW + 20:
    h = random.uniform(70, 160)
    fronds.append((x, h, random.uniform(-40, 40) + (25 if x < FW/2 else -25), random.randint(9, 14)))
    x += random.uniform(38, 95)
fronds.sort(key=lambda fr: -fr[1])  # tall ones behind
ferns = (f'<svg viewBox="0 0 {FW} {FH}" preserveAspectRatio="xMidYMax slice" fill="none" stroke="var(--forest)" '
         f'stroke-width="1" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">'
         + "".join(frond(*fr) for fr in fronds) + '</svg>')

# ---------------- Small leaf mark for headings ----------------
o, r = leaf((2, 13), -math.pi/4, 15, 4.6, bend=.05)
mark = (f'<svg class="mark" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.2" '
        f'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="{o}" fill="currentColor" fill-opacity=".18"/><path d="{r}"/></svg>')

header = "---\n// Generated by leaves.py (seeded, deterministic). Botanical line art for the mock.\n---\n"
for name, svg in (("_Branch.astro", branch), ("_Ferns.astro", ferns), ("_LeafMark.astro", mark)):
    with open(os.path.join(OUT, name), "w") as fh:
        fh.write(header + svg + "\n")
print(len(leaves), "branch leaves,", len(fronds), "fronds")
