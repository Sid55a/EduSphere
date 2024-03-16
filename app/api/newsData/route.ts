import { NextResponse } from "next/server";
// import { JSDOM } from "jsdom";

import { JSDOM } from "jsdom";

export async function GET(req: Request) {
  try {
    const res = await fetch(
      "https://www.bing.com/news/search?q=Ten&qpvt=top+ten+news&FORM=EWRE"  );
    const html = await res.text();

    const dom = new JSDOM(html);
    const doc = dom.window.document;
const news=doc.querySelectorAll(".title")

let batData = <any>[];
news.forEach((p) => {
  batData.push( p.textContent );
});
console.log(batData);

    return NextResponse.json(batData);
  } catch (error) {
    return new NextResponse("Error ho gaya hai");
  }
}

// let batData = <any>[];
// playername.forEach((p) => {
//   batData.push({ "name": p.textContent });
// });
// console.log(batData);
