/**

* Merges discontinuous time ranges within a given threshold.
*
* @param {Array<[number, number]>} ranges - Array of [start, end) ranges (unsorted, may overlap)
* @param {number} threshold - Max gap (in ms) allowed between ranges to still be merged
* @returns {Array<[number, number]>} - Sorted, non-overlapping merged ranges
  */

const mergeTimeRanges = (ranges, threshold) => {
// --- Input Validation ---
if (!Array.isArray(ranges)) {
throw new TypeError('Expected "ranges" to be an array of [start, end] pairs.');
}

if (typeof threshold !== 'number' || Number.isNaN(threshold) || threshold < 0) {
throw new TypeError('Expected "threshold" to be a non-negative number.');
}

if (ranges.length === 0) return [];

// Filter out invalid or empty ranges and normalize start < end
const validRanges = ranges
.filter(
(r) =>
Array.isArray(r) &&
r.length === 2 &&
typeof r[0] === 'number' &&
typeof r[1] === 'number' &&
!Number.isNaN(r[0]) &&
!Number.isNaN(r[1]) &&
r[0] !== r[1]
)
.map(([start, end]) => (start <= end ? [start, end] : [end, start]));

if (validRanges.length === 0) return [];

// --- Sort by start time ---
const sorted = validRanges.sort((a, b) => a[0] - b[0]);
const merged = [];

let [currentStart, currentEnd] = sorted[0];

for (let i = 1; i < sorted.length; i++) {
const [nextStart, nextEnd] = sorted[i];

// Merge if overlapping or within threshold
if (nextStart <= currentEnd + threshold) {
  currentEnd = Math.max(currentEnd, nextEnd);
} else {
  merged.push([currentStart, currentEnd]);
  [currentStart, currentEnd] = [nextStart, nextEnd];
}


}

merged.push([currentStart, currentEnd]);

return merged;
};

module.exports = { mergeTimeRanges };

