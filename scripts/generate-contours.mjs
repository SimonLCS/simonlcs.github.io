import { writeFile } from "node:fs/promises";

const width = 1600;
const height = 1200;
const columns = 220;
const rows = 165;
const levels = 18;
const output = new URL("../assets/perlin-contours.svg", import.meta.url);

const fract = (value) => value - Math.floor(value);

function hash(x, y) {
  return fract(Math.sin(x * 127.1 + y * 311.7) * 43758.5453123);
}

function smoothstep(value) {
  return value * value * (3 - 2 * value);
}

function valueNoise(x, y) {
  const x0 = Math.floor(x);
  const y0 = Math.floor(y);
  const tx = smoothstep(x - x0);
  const ty = smoothstep(y - y0);
  const a = hash(x0, y0);
  const b = hash(x0 + 1, y0);
  const c = hash(x0, y0 + 1);
  const d = hash(x0 + 1, y0 + 1);
  const top = a + (b - a) * tx;
  const bottom = c + (d - c) * tx;

  return top + (bottom - top) * ty;
}

function fbm(x, y) {
  let value = 0;
  let amplitude = 0.5;
  let frequency = 1;

  for (let octave = 0; octave < 5; octave += 1) {
    value += amplitude * (valueNoise(x * frequency, y * frequency) * 2 - 1);
    frequency *= 2;
    amplitude *= 0.5;
  }

  return value;
}

function gaussian(x, y, centerX, centerY, spreadX, spreadY) {
  const dx = (x - centerX) / spreadX;
  const dy = (y - centerY) / spreadY;
  return Math.exp(-(dx * dx + dy * dy));
}

function heightAt(x, y) {
  const warpX = fbm(x * 2.25 + 14.2, y * 2.25 - 6.7) * 0.22;
  const warpY = fbm(x * 2.25 - 4.3, y * 2.25 + 11.8) * 0.22;
  const nx = x + warpX;
  const ny = y + warpY;
  const terrain = fbm(nx * 1.22, ny * 1.22) * 0.76 + fbm(nx * 3.7, ny * 3.7) * 0.2;
  const hillA = gaussian(nx, ny, 0.34, 0.39, 0.17, 0.21) * 0.72;
  const hillB = gaussian(nx, ny, 0.69, 0.72, 0.24, 0.18) * 0.48;
  const valley = gaussian(nx, ny, 0.77, 0.24, 0.18, 0.24) * 0.28;

  return terrain + hillA + hillB - valley;
}

function pointKey(point) {
  return `${point.x.toFixed(3)},${point.y.toFixed(3)}`;
}

function interpolate(first, second, firstValue, secondValue, level) {
  const ratio = (level - firstValue) / (secondValue - firstValue || 1);
  return {
    x: first.x + (second.x - first.x) * ratio,
    y: first.y + (second.y - first.y) * ratio
  };
}

function connectSegments(segments) {
  const neighbours = new Map();
  const addNeighbour = (key, index) => {
    if (!neighbours.has(key)) neighbours.set(key, []);
    neighbours.get(key).push(index);
  };

  segments.forEach((segment, index) => {
    addNeighbour(pointKey(segment[0]), index);
    addNeighbour(pointKey(segment[1]), index);
  });

  const used = new Set();
  const extend = (line, fromStart) => {
    while (true) {
      const edge = fromStart ? line[0] : line[line.length - 1];
      const candidate = neighbours.get(pointKey(edge))?.find((index) => !used.has(index));
      if (candidate === undefined) return;

      used.add(candidate);
      const [first, second] = segments[candidate];
      const next = pointKey(first) === pointKey(edge) ? second : first;
      if (fromStart) line.unshift(next);
      else line.push(next);
    }
  };

  const lines = [];
  segments.forEach((segment, index) => {
    if (used.has(index)) return;
    used.add(index);
    const line = [...segment];
    extend(line, false);
    extend(line, true);
    if (line.length > 5) lines.push(line);
  });

  return lines;
}

function contourLines(field, level) {
  const segments = [];
  const cases = {
    0: [],
    1: [[3, 0]],
    2: [[0, 1]],
    3: [[3, 1]],
    4: [[1, 2]],
    6: [[0, 2]],
    7: [[3, 2]],
    8: [[2, 3]],
    9: [[0, 2]],
    11: [[1, 2]],
    12: [[1, 3]],
    13: [[0, 1]],
    14: [[3, 0]],
    15: []
  };

  for (let y = 0; y < rows; y += 1) {
    for (let x = 0; x < columns; x += 1) {
      const topLeft = field[y][x];
      const topRight = field[y][x + 1];
      const bottomRight = field[y + 1][x + 1];
      const bottomLeft = field[y + 1][x];
      const points = [
        { x: (x / columns) * width, y: (y / rows) * height },
        { x: ((x + 1) / columns) * width, y: (y / rows) * height },
        { x: ((x + 1) / columns) * width, y: ((y + 1) / rows) * height },
        { x: (x / columns) * width, y: ((y + 1) / rows) * height }
      ];
      const values = [topLeft, topRight, bottomRight, bottomLeft];
      const state = values.reduce((mask, value, index) => mask | ((value >= level ? 1 : 0) << index), 0);
      const intersections = [
        interpolate(points[0], points[1], values[0], values[1], level),
        interpolate(points[1], points[2], values[1], values[2], level),
        interpolate(points[2], points[3], values[2], values[3], level),
        interpolate(points[3], points[0], values[3], values[0], level)
      ];
      const average = values.reduce((sum, value) => sum + value, 0) / 4;
      const pairs = state === 5
        ? (average >= level ? [[3, 2], [0, 1]] : [[3, 0], [1, 2]])
        : state === 10
          ? (average >= level ? [[0, 3], [1, 2]] : [[0, 1], [2, 3]])
          : cases[state];

      pairs.forEach(([first, second]) => segments.push([intersections[first], intersections[second]]));
    }
  }

  return connectSegments(segments);
}

function pathData(line) {
  return line
    .map((point, index) => `${index === 0 ? "M" : "L"}${point.x.toFixed(1)} ${point.y.toFixed(1)}`)
    .join(" ");
}

const field = Array.from({ length: rows + 1 }, (_, y) =>
  Array.from({ length: columns + 1 }, (_, x) => heightAt(x / columns, y / rows))
);
const values = field.flat();
const min = Math.min(...values);
const max = Math.max(...values);
const paths = [];

for (let index = 1; index <= levels; index += 1) {
  const level = min + ((max - min) * index) / (levels + 1);
  const emphasis = index % 6 === 0 ? " contour contour-major" : " contour";
  const dash = index % 7 === 0 ? " contour contour-dashed" : emphasis;

  contourLines(field, level).forEach((line) => {
    paths.push(`<path class="${dash.trim()}" d="${pathData(line)}"/>`);
  });
}

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" preserveAspectRatio="xMidYMid slice">
  <style>
    .contour { fill: none; stroke: #1c2523; stroke-width: 1.15; stroke-linecap: round; stroke-linejoin: round; vector-effect: non-scaling-stroke; }
    .contour-major { stroke-width: 2.1; }
    .contour-dashed { stroke-width: 2.25; stroke-dasharray: 1 8; }
  </style>
  ${paths.join("\n  ")}
</svg>
`;

await writeFile(output, svg);
