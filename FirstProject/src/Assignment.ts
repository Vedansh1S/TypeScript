const quotes: string[] = [
  "Believe you can and you're halfway there.",
  "Everything you can imagine is real.",
  "What we think, we become.",
  "Dream big and dare to fail.",
];

function getRandomQuote(list: string[]): string {
  const index = Math.floor(Math.random() * list.length);
  return list[index] ?? "No quote found";
}

console.log("✨ Random Quote:");
console.log(getRandomQuote(quotes));