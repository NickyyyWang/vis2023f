import define1 from "./a33468b95d0b15b0@817.js";

async function _data(FileAttachment)
{
  const data = await FileAttachment("data.csv").csv({typed: true});
  return data.columns.slice(5).flatMap((columns) => data.map((d) => ({
    name: d.姓名,
    columns,
    hw:d[columns]
  })));
}


function _3(Plot,data){return(
Plot.plot({
  x: {axis: "top", transform: (d) => d },
  color: {scheme: "spectral"},
  marks: [Plot.barX(data, {y: "name", x: "hw", fill: "hw", sort: {color: null, y: "-x"}})]
})
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["data.csv", {url: new URL("./files/bb55f6ab5d242f78d2fd07f889f159c847d6ac75d38b8be30d9b0b4d864d238cf5fed33a416970f331dff159efa86516ec69a2e55867389f24ccab34f32f8452.csv", import.meta.url), mimeType: "text/csv", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer("data")).define("data", ["FileAttachment"], _data);
  const child1 = runtime.module(define1);
  main.import("legend", child1);
  main.variable(observer()).define(["Plot","data"], _3);
  return main;
}
