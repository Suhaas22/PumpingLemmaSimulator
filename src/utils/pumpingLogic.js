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

export function splitString(str, p) {

  return {
    x: str.slice(0, 1),
    y: str.slice(1, 2),
    z: str.slice(2)
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