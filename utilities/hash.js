

const hash = string => {
  let hashString = '';
  for (let i = 0; i < string.length; i++) {
    const c = string[i];
    hashString += c.charCodeAt(0);
  }
  return hashString;
}

module.exports = hash
