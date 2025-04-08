let a = 10;
let b = 20;

let c = a + b;
{
  let total = a + b;
  //console.log(c);
  return c;
}

function whatIsMyGrade(marks) {
  if (marks > 80) {
    console.log("I got an HD");
  } else if (marks < 40) {
    // console.log("Sorry I failed");
    return "Fail";
  } else {
    return "Pass";
  }
}

let marks = 56;
let grade = whatIsMyGrade(marks);
console.log(grade);

let total = add(2, 4);
console.log(total);
total = add(a, b);
console.log(total);

function subtract(a, b) {
  let res = a - b;
  // console.log(c);
  return res;
}
let resulte = subtract(12, 4);
console.log(result);
result = subtract(a, b);
console.log(result);
