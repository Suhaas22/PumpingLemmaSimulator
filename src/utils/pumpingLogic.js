export function generateString(language, p) {

  p = Number(p);

  if (language === "anbn") {
    return "a".repeat(p) + "b".repeat(p);
  }

  if (language === "anbncn") {
    return "a".repeat(p) + "b".repeat(p) + "c".repeat(p);
  }

  if (language === "abstar") {
    return "ab".repeat(p);
  }

  if (language === "anbm") {
    return "a".repeat(p) + "b".repeat(p + 2);
  }

  if (language === "wcwr") {
    // Generate a random w from {a, b} of length p, then wcw^R
    let w = "";
    for (let j = 0; j < p; j++) {
      w += Math.random() < 0.5 ? "a" : "b";
    }
    return w + "c" + w.split("").reverse().join("");
  }

  // For custom language, return empty — user provides their own string
  if (language === "custom") {
    return "";
  }

  return "";
}

export function splitString(str, p, language) {

  p = Number(p);

  // For regular languages, pick a split where pumping CAN work
  // For non-regular languages, pick a split that exposes the violation
  // x is always non-empty so all three segments are visible

  if (language === "abstar") {
    // x = first "ab", y = second "ab" — pumping preserves (ab)* structure
    return {
      x: str.slice(0, 2),   // "ab"
      y: str.slice(2, 4),   // "ab"
      z: str.slice(4)
    };
  }

  if (language === "anbm") {
    // x = first 'a', y = second 'a' — pumping adds/removes a's, still in a*b*
    return {
      x: str.slice(0, 1),
      y: str.slice(1, 2),
      z: str.slice(2)
    };
  }

  if (language === "anbn") {
    // x = first a, y = next a's — pumping changes #a but not #b
    return {
      x: str.slice(0, 1),
      y: str.slice(1, Math.min(p, Math.floor(str.length / 2))),
      z: str.slice(Math.min(p, Math.floor(str.length / 2)))
    };
  }

  if (language === "anbncn") {
    // x = first a, y = next a's — pumping changes #a but not #b/#c
    return {
      x: str.slice(0, 1),
      y: str.slice(1, Math.min(p, Math.floor(str.length / 3))),
      z: str.slice(Math.min(p, Math.floor(str.length / 3)))
    };
  }

  if (language === "wcwr") {
    // x = first char of w, y = second char — pumping breaks palindrome
    return {
      x: str.slice(0, 1),
      y: str.slice(1, 2),
      z: str.slice(2)
    };
  }

  // Default / custom: split with x getting at least 1 char
  const xyLen = Math.min(p, str.length);
  const yEnd = Math.max(2, xyLen);
  return {
    x: str.slice(0, 1),
    y: str.slice(1, yEnd),
    z: str.slice(yEnd)
  };
}

export function pumpString(split, i) {

  if (!split) return "";

  return split.x + split.y.repeat(i) + split.z;
}

export function checkLanguage(str, language, customRegex) {

  let a = (str.match(/a/g) || []).length;
  let b = (str.match(/b/g) || []).length;
  let c = (str.match(/c/g) || []).length;

  if (language === "anbn") {
    return a === b;
  }

  if (language === "anbncn") {
    return a === b && b === c;
  }

  if (language === "abstar") {
    return /^(ab)*$/.test(str);
  }

  if (language === "anbm") {
    return /^a*b*$/.test(str);
  }

  if (language === "wcwr") {
    // Check if str is of the form wcw^R where w ∈ {a,b}*
    const cIdx = str.indexOf("c");
    if (cIdx === -1) return false;
    // Ensure only one 'c'
    if (str.indexOf("c", cIdx + 1) !== -1) return false;
    const left = str.slice(0, cIdx);
    const right = str.slice(cIdx + 1);
    if (left.length !== right.length) return false;
    // Check left uses only a,b
    if (!/^[ab]*$/.test(left)) return false;
    return left === right.split("").reverse().join("");
  }

  if (language === "custom" && customRegex) {
    try {
      const regex = new RegExp("^" + customRegex + "$");
      return regex.test(str);
    } catch (e) {
      // If regex is invalid, we can't determine membership
      return null;
    }
  }

  return false;
}