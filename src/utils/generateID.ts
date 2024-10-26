export default function generateID(length = 10): number {
  let result = "";
  for (let i = 0; i < length; i++) {
    const randomDigit = Math.floor(Math.random() * 10); // Generates a digit between 0 and 9
    result += randomDigit.toString();
  }

  return parseInt(result);
}
