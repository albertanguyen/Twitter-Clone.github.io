const likeBtn = document.getElementById("like-btn");
const likeNumHtml = document.getElementById("likeNum");



/* First way: usnig addEventListener and onclick on the same element */
// var on = () =>  {
//   if (window.addEventListener) {
//     return function(target, type, listener) {
//       target.addEventListener(type, listener, false);
//     };
//   } else {
//     return function(object, sEvent, fpNotify) {
//       object.attachEvent("on" + sEvent, fpNotify);
//     };
//   }
// };

const Countlike = () => {
    likeBtn.style.color = "red";
    var likeNumJS = 0;
    likeNumJS ++
    likeNumHtml.innerHTML = likeNumJS;
}

const UnCountlike = () => {
    likeBtn.style.color = "white";
    var likeNumJS = 1;
    likeNumJS += 
    likeNumHtml.innerHTML = likeNumJS;
}

// // add first listener
// on(likeBtn, "click", Countlike());
// on(likeBtn, "click", UnCountLike());

/* One function call two other functions: CountLike and UnCountLike */
const likefeature = () => {
    Countlike();
    // UnCountlike();
}


// likeBtn.addEventListener("click", () => Countlike(), false);
// likeBtn.addEventListener("click", () => UnCountlike(), true);

// addEvent(likeBtn, "click", sayHello);
// addEvent(likeBtn, "click", function() {
//   alert("say hello again");
// });
// addEvent(likeBtn, "click", sayGoodMorning);

// addEventListener(like, "click", function(event) {})

// const likefunction = () => {
//     like.style.color = "red";
//     // let str = likeNum.values();
//     // console.log(str);
//     // document.write(str.fontcolor("blue"));
// //    alert(str.fontcolor("blue"));

// }



