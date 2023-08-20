// api.js

let data = {};

export async function fetchData(page) {
  if (!data[page]) {
    const response = await fetch(`https://api.quran.com/api/v4/quran/verses/uthmani_simple?page_number=${page}`);
    data[page] = await response.json();
  }

  return data[page];
}
