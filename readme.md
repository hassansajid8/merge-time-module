# merge-time-ranges

A small utility for merging overlapping or near-overlapping time ranges based on a configurable threshold.

---

## 🚀 Installation

```bash
npm install merge-time-ranges
```

or for local usage:

```bash
npm link
```

---

## 📘 Usage

```js
const { mergeTimeRanges } = require('merge-time-ranges');

const ranges = [
  [1000, 2000],
  [2500, 4000],
  [3900, 4100],
  [8000, 9000],
  [9050, 9500]
];

const threshold = 200; // max gap (in ms) to consider continuous

const merged = mergeTimeRanges(ranges, threshold);
console.log(merged);
```

**Output:**

```js
[ [ 1000, 2000 ], [ 2500, 4100 ], [ 8000, 9500 ] ]
```

---

## 🧩 API

### `mergeTimeRanges(ranges, threshold)`

**Parameters:**

* `ranges` — `Array<[number, number]>`
  Array of `[start, end)` pairs representing time intervals in milliseconds.
* `threshold` — `number`
  Maximum allowed gap (in ms) between two ranges to merge them.

**Returns:**

* `Array<[number, number]>`
  Sorted, merged, non-overlapping ranges.

---

## ⚙️ Behavior & Edge Cases

* Automatically handles overlapping or touching intervals.
* Treats small gaps ≤ `threshold` as continuous.
* Ignores invalid or empty ranges (e.g. `[NaN, 0]` or `[1000]`).
* Automatically fixes reversed ranges like `[5000, 1000]`.
* Works perfectly with UNIX timestamps in milliseconds.

---

## 🧠 Example Use Cases

* Aggregating server uptime logs.
* Combining user session ranges.
* Simplifying event timeline data.

---

## 📄 License

MIT © 2025 Hassan Sajid

