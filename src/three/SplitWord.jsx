import { InteractiveLetter } from './InteractiveLetter';

// Approximate advance width per glyph for the Michroma font (a few letters are
// noticeably narrower/wider). Anything unlisted falls back to 0.95.
const CHAR_WIDTH_MAP = { 'I': 0.3, 'i': 0.3, 'L': 0.7, 'l': 0.6, 'T': 0.8, 'F': 0.8, ' ': 0.3, 'M': 1.2, 'W': 1.1 };

// Lays a word out as individually interactive letters, horizontally centred on
// `position`. Offsets are derived functionally (no mutable running cursor) so the
// render stays pure for the rules-of-hooks linter.
export const SplitWord = ({ text, position, fontSize, color, isNeon = false, reduced = false }) => {
  const chars = text.split('');
  const widths = chars.map((char) => (CHAR_WIDTH_MAP[char] ?? 0.95) * fontSize);
  const totalWidth = widths.reduce((sum, w) => sum + w, 0);
  const startX = position[0] - totalWidth / 2;

  const letters = chars.map((char, i) => {
    const precedingWidth = widths.slice(0, i).reduce((sum, w) => sum + w, 0);
    return { char, pos: precedingWidth + widths[i] / 2 };
  });

  return (
    <group position={[0, position[1], position[2]]}>
      {letters.map((item, i) => (
        <InteractiveLetter key={i} char={item.char} position={[startX + item.pos, 0, 0]} fontSize={fontSize} baseColor={color} isNeon={isNeon} reduced={reduced} />
      ))}
    </group>
  );
};
