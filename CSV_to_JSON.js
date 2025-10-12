#!/usr/bin/env node
// csv2json.js - tiny CSV to JSON converter (no deps)
const fs = require('fs');

function parseCSV(text, sep=',') {
  const lines = text.replace(/\r\n/g,'\n').split(/\n/).filter(Boolean);
  if(lines.length===0) return [];
  const headers = splitLine(lines[0], sep);
  return lines.slice(1).map(line=>{
    const cols = splitLine(line, sep);
    const obj = {};
    for(let i=0;i<headers.length;i++) obj[headers[i]] = cols[i]===undefined ? '' : cols[i];
    return obj;
  });
}

// simple CSV splitter that handles quoted fields
function splitLine(line, sep=',') {
  const res = [];
  let cur = '', inQuotes = false;
  for(let i=0;i<line.length;i++){
    const ch = line[i];
    if(ch === '"' ){
      if(inQuotes && line[i+1] === '"'){ cur += '"'; i++; } // escaped quote
      else inQuotes = !inQuotes;
    } else if(ch === sep && !inQuotes){
      res.push(cur);
      cur = '';
    } else {
      cur += ch;
    }
  }
  res.push(cur);
  return res;
}

// CLI bootstrap
(async function(){
  const fname = process.argv[2];
  let text;
  if(fname && fname !== '-') {
    text = fs.readFileSync(fname, 'utf8');
  } else {
    // read stdin
    text = fs.readFileSync(0, 'utf8');
  }
  const arr = parseCSV(text);
  console.log(JSON.stringify(arr, null, 2));
})();
