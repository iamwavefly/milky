export default function CapitalizeLetter(string) {
  return string?.charAt(0)?.toUpperCase() + string?.slice(1)?.toLowerCase();
}
