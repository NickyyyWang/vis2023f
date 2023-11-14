function _1(md){return(
md`# HW2 Strong baseline (2pt)`
)}

function _data(FileAttachment){return(
FileAttachment("data.json").json()
)}

function _yCounts(){return(
[]
)}

function _years(data){return(
data.map(item => item.Constellation)
)}

function _5(yCounts,years,data)
{
  yCounts.length = 0; //將yCounts清空
  var minYear = Math.min(...years); //最早出生年
  var maxYear = Math.max(...years); //最晚出生年
  var star = ["牡羊座","金牛座","雙子座","巨蟹座","獅子座","處女座","天秤座","天蠍座","射手座","摩羯座","水瓶座","雙魚座"];
  for (var y=minYear; y<=maxYear; y++) { 
    //所有年份都建立兩個Object，一個存放男性資料，一個存放女性資料
    yCounts.push({星座:star[y], gender:"male", count:0}); 
    //Object包含：1. 出生年，2.男性，3.人數(設為0)
    yCounts.push({星座:star[y], gender:"female", count:0}); 
    //Object包含：1. 出生年，2.女性，3.人數(設為0)
  }
  data.forEach (x=> {
    var i = (x.Constellation-minYear)*2 + (x.Gender== "男" ? 0 : 1); 
      yCounts[i].count++;
  })
  return yCounts
}


function _plot3(Inputs){return(
Inputs.form({
  mt:  Inputs.range([0, 100], {label: "marginTop", step: 1}),
  mr:  Inputs.range([0, 100], {label: "marginRight", step: 1}),
  mb:  Inputs.range([0, 100], {label: "marginBottom", step: 1}),
  ml:  Inputs.range([0, 100], {label: "marginLeft", step: 1}),
})
)}

function _7(Plot,yCounts){return(
Plot.plot({
  
  grid: true,
  y: {label: "count"},

  marks: [
    Plot.ruleY([0]),
    Plot.barY (yCounts, {x: "星座", y: "count"}),
  ]
})
)}

function _8(Plot,plot3,yCounts){return(
Plot.plot({
  marginTop: plot3.mt,
  marginRight: plot3.mr,
  marginBottom: plot3.mb,
  marginLeft: plot3.ml,
  
  grid: true,
  y: {label: "count"},
  marks: [
    Plot.ruleY([0]),
    Plot.barY(yCounts, {x: "星座", y: "count", tip: true , fill:"gender"}),
  ]
})
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["data.json", {url: new URL("./files/01d24d9aeda19b7590d996fac1553c965097547ebd857a93a21c0f86efc088993c6168f092b2353e6ec91202e5a6dead5ad66b688c1038a20deb6ec8d35e570d.json", import.meta.url), mimeType: "application/json", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("data")).define("data", ["FileAttachment"], _data);
  main.variable(observer("yCounts")).define("yCounts", _yCounts);
  main.variable(observer("years")).define("years", ["data"], _years);
  main.variable(observer()).define(["yCounts","years","data"], _5);
  main.variable(observer("viewof plot3")).define("viewof plot3", ["Inputs"], _plot3);
  main.variable(observer("plot3")).define("plot3", ["Generators", "viewof plot3"], (G, _) => G.input(_));
  main.variable(observer()).define(["Plot","yCounts"], _7);
  main.variable(observer()).define(["Plot","plot3","yCounts"], _8);
  return main;
}
