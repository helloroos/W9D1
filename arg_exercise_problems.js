function sum1() {
    let total = 0;
    for (let i = 0; i < arguments.length; i++) {
        total += arguments[i];
    };
    return total;
};

function sum2(...args) {
    let total = 0;
    args.forEach(function(ele) {
        total += ele;
    })
    return total;
};

// console.log(sum1(1, 2, 3, 4) === 10);
// console.log(sum2(1, 2, 3, 4, 5) === 15);

Function.prototype.myBind1 = function (ctx) {
    const func = this; 
    const bindTimeArgs = Array.from(arguments).slice(1);
    return function() {
        const callTimeArgs = Array.from(arguments);
        return func.apply(ctx, bindTimeArgs.concat(callTimeArgs));
    };
};

Function.prototype.myBind2 = function (ctx, ...bindTimeArgs) {
    const func = this; // always call bind on a function
    return function(...callTimArgs) {
        func.call(ctx, ...bindTimeArgs, ...callTimArgs); // Order matters
    };
};

class Cat {
    constructor(name) {
        this.name = name;
    };

    says(sound, person) {
        console.log(`${this.name} says ${sound} to ${person}!`);
        return true;
    };
};

class Dog {
    constructor(name) {
        this.name = name;
    };
};

const markov = new Cat("Markov");
console.log(typeof markov);
const pavlov = new Dog("Pavlov");


markov.says("meow", "Ned"); // normal args (no bind)
// Markov says meow to Ned!
// true

// bind time args are "meow" and "Kush", no call time args
markov.says.myBind1(pavlov, "meow", "Kush")();
// Pavlov says meow to Kush!
// true

// CALL TIME
markov.says.myBind1(pavlov)("meow", "a tree");

// no bind time args (other than context), call time args are "meow" and "a tree"
let bounded = markov.says.myBind1(pavlov);
bounded("meow", "a tree"); // This is call time args -- args passed when we call the bounded func
// Pavlov says meow to a tree!
// true

// bind time arg is "meow", call time arg is "Markov"
markov.says.myBind1(pavlov, "meow")("Markov");
// Pavlov says meow to Markov!
// true

// no bind time args (other than context), call time args are "meow" and "me"
const notMarkovSays = markov.says.myBind1(pavlov);
notMarkovSays("meow", "me");
// Pavlov says meow to me!
// true