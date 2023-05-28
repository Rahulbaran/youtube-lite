export default function formatNum(num) {
  const intl = new Intl.NumberFormat("en-GB", {
    notation: "compact",
    compactDisplay: "short"
  });

  return intl.format(num);
}
