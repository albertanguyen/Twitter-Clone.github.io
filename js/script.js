const likeBtn = document.getElementById("like-btn");
const likeNumHtml = document.getElementById("likeNum");
const tweetcard = document.getElementById("tweetcard");
const TweetListhtml = () => document.getElementById("TweetListhtml");

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


// const DeleteTweet = () => tweetcard.innerHTML = ''

const getTechNews = async () => {
  const url =
    "https://newsapi.org/v2/top-headlines?sources=techradar&from=2019-05-20&to=2019-05-22&sortBy=popularity&apiKey=c8b325b75f2a418f902770811641994c";
  const req = new Request(url);
  const res = await fetch(req);
  const { articles } = await res.json();
  renderTechNewsFeed(articles);
};

const renderTechNewsFeed = object => {
    let html = "";
    // console.log(newsArticles.length)
    object.map((element, idx) => {
        const htmlnode = `
            <li class="tweet-card" id="tweetcard">
                <div class="tweet-content">
                    <div class="tweet-header d-flex">
                        <span class="fullname">
                            <strong>${element.author}</strong>
                        </span>
                        <span class="username">@${element.author.replace(
                          /\s/g,
                          ""
                        )}</span>
                        <span class="tweet-time">- ${moment(
                          element.publishedAt
                        ).format("MMM Do")}</span>
                        <div class="dropdown d-inline-flex ml-auto">
                            <button class="btn btn-secondary btn-small dropdown-toggle" type="button"
                                id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true"
                                aria-expanded="false" style="border:none; background-color: white; border-radius: 20px;"></button>
                            <div class="dropdown-menu dropdown-menu-right">
                                <button class="dropdown-item" type="button">Show less often</button>
                                <button class="dropdown-item" type="button">Embed Tweet</button>
                                <button class="dropdown-item" type="button">Unfollow @${element.author.replace(/\s/g,"")}</button>
                                <button class="dropdown-item" type="button">Mute @${element.author.replace(/\s/g,"")}</button>
                                <button class="dropdown-item" type="button">Block @${element.author.replace(/\s/g,"")}</button>
                                <button class="dropdown-item text-danger" type="button" onclick="ReportTweet()">Report Tweet</button>
                            </div>
                        </div>
                    </div>
                    <a>
                        <img class="tweet-card-avatar"
                            src="https://pbs.twimg.com/profile_images/679974972278849537/bzzb-6H4_bigger.jpg"
                            alt="">
                    </a>
                    <div class="tweet-text">
                        <p class="" data-aria-label-part="0">${
                          element.title
                        }<br>${element.description}
                        <a href="${
                          element.url
                        }" class="twitter-timeline-link"
                                target="_blank"><span class=""></span></a>
                            <a href="" class="twitter-hashtag"><s>#</s><b>firefox</b></a> <a href=""
                                class="twitter-hashtag"><s>#</s><b>comunidad</b></a>
                            <a href="" class="twitter-hashtag" dir="ltr"></a>
                        </p>
                    </div>
                    <div class="tweet-footer">
                        <a class="tweet-footer-btn">
                            <i class="octicon octicon-comment" aria-hidden="true" id="cmt-btn"></i><span>18</span>
                        </a>
                        <a class="tweet-footer-btn">
                            <i class="octicon octicon-sync" aria-hidden="true" id="retweet-btn"></i><span>64</span>
                        </a>
                        <a class="tweet-footer-btn">
                            <i class="octicon octicon-heart" aria-hidden="true" id="like-btn"
                                onclick="likefeature()"></i><span id="likeNum"> 202</span>
                        </a>
                        <a class="tweet-footer-btn">
                            <i class="octicon octicon-mail" aria-hidden="true" id="DM-btn"></i><span>
                                155</span>
                        </a>
                    </div>
                </div>
            </li>`;
        const jsnode = (html += htmlnode);
        TweetListhtml().innerHTML = jsnode;
  });
};

getTechNews();

