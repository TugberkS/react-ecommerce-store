export const replaceAll = (str, find, replace = "") => {
  if (!str) return "";

  const index = str.indexOf(find);
  if (index < 0) return str;

  while (str.indexOf(find) >= 0) {
    const index = str.indexOf(find);
    str = (index > 0 ? str.substring(0, index) : "") + replace + str.substring(index + find.length);
  }

  return str;
};

export const turkishToLower = (str) => {
  if (!str || typeof str !== "string") return str;
  let string = str;
  const letters = {"İ": "i", "I": "ı", "Ş": "ş", "Ğ": "ğ", "Ü": "ü", "Ö": "ö", "Ç": "ç"};
  string = string.replace(/(([İIŞĞÜÇÖ]))/g, function(letter) {
    return letters[letter];
  });
  return string.toLowerCase();
};
