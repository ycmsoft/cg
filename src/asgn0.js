// asgn0.js
// Alexander Bateman
// arbatema@ucsc.edu
// Notes to Grader: 
// ChatGPT helped with zero checks, the cos(a) range in angleBetween, and debugging handleDrawEvent() and handleDrawOperationEvent() for which it fixed with parseFloat and isFinite. 

let canvas = null;
let ctx = null;

function main() {
  canvas = document.getElementById('cnv1');
  if (!canvas) {
    console.log('Failed to retrieve the <canvas> element');
    return;
  }

  ctx = canvas.getContext('2d');

  handleDrawEvent();
}

function clearCanvas(){
  //Background
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}



function handleDrawEvent(){
  if (!ctx) return;

  clearCanvas();

  //v1 (red)
  let x1 = parseFloat(document.getElementById('xInput').value);
  let y1 = parseFloat(document.getElementById('yInput').value);
  let v1 = new Vector3([Number.isFinite(x1) ? x1 : 0, Number.isFinite(y1) ? y1 : 0, 0]);
  drawVector(v1, "red");

  //v2 (blue)
  let x2 = parseFloat(document.getElementById('x2Input').value);
  let y2 = parseFloat(document.getElementById('y2Input').value);
  let v2 = new Vector3([Number.isFinite(x2) ? x2 : 0, Number.isFinite(y2) ? y2 : 0, 0]);
  drawVector(v2, "blue");
}


function drawVector(v, color){
  let cx = canvas.width / 2;
  let cy = canvas.height / 2;
  let scale = 20;

  let xEnd = cx + v.elements[0] * scale;
  let yEnd = cy - v.elements[1] * scale; 

  ctx.strokeStyle = color;
  ctx.lineWidth = 2;

  ctx.beginPath();
  ctx.moveTo(cx, cy);
  ctx.lineTo(xEnd, yEnd);
  ctx.stroke();
}


function angleBetween(v1, v2){
  let m1 = v1.magnitude();
  let m2 = v2.magnitude();
  if(m1 === 0 || m2 === 0){
    console.log("Angle undefined because one vector has magnitude of 0");
    return NaN;
  }

  let d = Vector3.dot(v1, v2);
  let cosA = d / (m1 * m2);

  //Keep CosA within a valid range for .acos
  cosA = Math.max(-1, Math.min(1, cosA));

  let angleRad = Math.acos(cosA);
  let angleDeg = angleRad * 180 / Math.PI;
  return angleDeg;
}

function areaTriangle(v1, v2){
  let cross = Vector3.cross(v1, v2);
  let areaParallelogram = cross.magnitude();
  let areaTriangle = areaParallelogram / 2;
  return areaTriangle;
}

function handleDrawOperationEvent(){
  if (!ctx) return;

  clearCanvas();

  //Read v1
  let x1 = parseFloat(document.getElementById('xInput').value);
  let y1 = parseFloat(document.getElementById('yInput').value);
  let v1 = new Vector3([
    Number.isFinite(x1) ? x1 : 0,
    Number.isFinite(y1) ? y1 : 0,
    0
  ]);
  drawVector(v1, "red");

  //Read v2
  let x2 = parseFloat(document.getElementById('x2Input').value);
  let y2 = parseFloat(document.getElementById('y2Input').value);
  let v2 = new Vector3([
    Number.isFinite(x2) ? x2 : 0,
    Number.isFinite(y2) ? y2 : 0,
    0
  ]);
  drawVector(v2, "blue");

  //Read operation + scalar
  let op = document.getElementById('opSelect').value;
  let sRaw = parseFloat(document.getElementById('scalarInput').value);
  let s = Number.isFinite(sRaw) ? sRaw : 1;

  if(op === "add"){
    //v3 = v1 + v2 (green vector)
    let v3 = new Vector3([v1.elements[0], v1.elements[1], v1.elements[2]]);
    v3.add(v2);
    drawVector(v3, "green");

  }else if(op === "sub"){
    //v3 = v1 - v2 (green vector)
    let v3 = new Vector3([v1.elements[0], v1.elements[1], v1.elements[2]]);
    v3.sub(v2);
    drawVector(v3, "green");

  }else if(op === "mul"){
    //v3 = v1 * s and v4 = v2 * s (both vectors green)
    let v3 = new Vector3([v1.elements[0], v1.elements[1], v1.elements[2]]);
    let v4 = new Vector3([v2.elements[0], v2.elements[1], v2.elements[2]]);
    v3.mul(s);
    v4.mul(s);
    drawVector(v3, "green");
    drawVector(v4, "green");

  }else if(op === "div"){
    //v3 = v1 / s and v4 = v2 / s (both vectors green)
    let v3 = new Vector3([v1.elements[0], v1.elements[1], v1.elements[2]]);
    let v4 = new Vector3([v2.elements[0], v2.elements[1], v2.elements[2]]);

    if(s === 0){
      console.log("Cannot divide by 0");
      return;
    }

    v3.div(s);
    v4.div(s);
    drawVector(v3, "green");
    drawVector(v4, "green");
  }else if(op === "magnitude"){
  console.log("Magnitude v1:", v1.magnitude());
  console.log("Magnitude v2:", v2.magnitude());
  }else if(op === "normalize"){
  let v1n = new Vector3([v1.elements[0], v1.elements[1], v1.elements[2]]);
  let v2n = new Vector3([v2.elements[0], v2.elements[1], v2.elements[2]]);
  v1n.normalize();
  v2n.normalize();

  drawVector(v1n, "green");
  drawVector(v2n, "green");

}else if(op === "angle"){
  let ang = angleBetween(v1, v2);
  console.log("Angle: ", ang);

}else if(op === "area"){
  let area = areaTriangle(v1, v2);
  console.log("Area of the triangle: ", area);
}
}