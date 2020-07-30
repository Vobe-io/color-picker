function degreesToRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}

// lol
function drawColorWheel(context: CanvasRenderingContext2D, size: number) {
  const he = (e: number, t: number, a: number) => {
    const s = ((2 - t) * a) / 2;
    return (
      0 !== s &&
        (t = 1 === s ? 0 : s < 0.5 ? (t * a) / (2 * s) : (t * a) / (2 - 2 * s)),
      {
        h: e,
        s: t,
        l: s,
      }
    );
  };
  const le = (e: number, t: number[]) => {
    let a, s, r, i;
    for (let n = 0; n < t.length - 2; n += 2)
      if (
        ((a = t[n]),
        (s = t[n + 1]),
        (r = t[n + 2]),
        (i = t[n + 3]),
        e <= r && e >= a)
      )
        return s + ((i - s) * (e - a)) / (r - a);
  };
  const pe = (e: number, t: number, a: CanvasRenderingContext2D) => {
    const s = t,
      r = t,
      i = he(0, 0, e),
      n = he(0, 1, e),
      o = Math.round(100 * i.s),
      c = Math.round(100 * i.l),
      l = Math.round(100 * n.s),
      h = Math.round(100 * n.l),
      p = [
        0,
        0,
        15,
        8,
        30,
        17,
        45,
        26,
        60,
        34,
        75,
        41,
        90,
        48,
        105,
        54,
        120,
        60,
        135,
        81,
        150,
        103,
        165,
        123,
        180,
        138,
        195,
        155,
        210,
        171,
        225,
        187,
        240,
        204,
        255,
        219,
        270,
        234,
        285,
        251,
        300,
        267,
        315,
        282,
        330,
        298,
        345,
        329,
        360,
        360,
      ];
    let d, u, m, g;
    for (let e = 0; e <= 360; e += 1) {
      g = le(e, p);
      d = ((360 - e + 1) * Math.PI) / 180;
      u = ((360 - e - 1) * Math.PI) / 180;
      a.beginPath();
      a.moveTo(s, r);
      a.arc(s, r, t + 1, u, d, !1);
      a.closePath();
      let m = a.createRadialGradient(s, r, 0, s, r, t);
      m.addColorStop(0, `hsl(${g}, ${o}%,${c}%)`);
      m.addColorStop(1, `hsl(${g}, ${l}%,${h}%)`);
      a.fillStyle = m;
      a.fill();
    }
  };
  pe(100 / 100, size / 2, context);
}

function rgbToHex(r: number, g: number, b: number) {
  if (r > 255 || g > 255 || b > 255) throw 'Invalid color component';
  return ((r << 16) | (g << 8) | b).toString(16);
}

export { degreesToRadians, drawColorWheel, rgbToHex };
