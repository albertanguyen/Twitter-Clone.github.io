const likeBtn = document.getElementById("like-btn");
const likeNumHtml = document.getElementById("likeNum");
const TweetListhtml = () => document.getElementById("TweetListhtml");
const TweetUserList = () => document.getElementById("tweets");
const tweethtml = document.getElementById("tweets");
let tweets = [];

const getTechNews = async () => {
    const url =
        "https://newsapi.org/v2/top-headlines?sources=techradar&from=2019-05-20&to=2019-05-22&sortBy=popularity&apiKey=c8b325b75f2a418f902770811641994c";
    const req = new Request(url);
    const res = await fetch(req);
    const { articles } = await res.json();
    renderTechNewsFeed(articles);
};

const renderTechNewsFeed = (object) => {
    let html = "";
    object.map((element, idx) => {
        htmlnode = `
            <li class="tweet-card">
                <div class="tweet-content">
                    <div class="tweet-header d-flex">
                        <span class="fullname">
                            <strong>${element.author}</strong>
                        </span>
                        <span class="username">&nbsp;@${element.author.replace(/\s/g, "")}</span>
                        <span class="tweet-time">- ${moment(element.publishedAt).calendar()}</span>
                        <div class="dropdown d-inline-flex ml-auto">
                            <button class="btn btn-secondary btn-small dropdown-toggle" type="button"
                                id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true"
                                aria-expanded="false" style="border:none; background-color: white; border-radius: 20px;"></button>
                            <div class="dropdown-menu dropdown-menu-right">
                                <button class="dropdown-item" type="button">Show less often</button>
                                <button class="dropdown-item" type="button">Embed Tweet</button>
                                <button class="dropdown-item" type="button">Unfollow @${element.author.replace(/\s/g, "")}</button>
                                <button class="dropdown-item" type="button">Mute @${element.author.replace(/\s/g, "")}</button>
                                <button class="dropdown-item" type="button">Block @${element.author.replace(/\s/g, "")}</button>
                                <button class="dropdown-item text-danger" type="button" onclick="ReportTweet()">Report Tweet</button>
                            </div>
                        </div>
                    </div>
                    <a>
                        <img class="tweet-card-avatar" src="${element.urlToImage}" alt="">
                    </a>
                    <div class="tweet-text">
                        <p class="" data-aria-label-part="0">${element.title}<br>${element.description}
                        <a href="${element.url}" class="twitter-timeline-link"
                                target="_blank"><span class=""></span></a>
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
                                onclick="like()"></i><span id="likeNum"> 202</span>
                        </a>
                        <a class="tweet-footer-btn">
                            <i class="octicon octicon-mail" aria-hidden="true" id="DM-btn"></i><span>
                                155</span>
                        </a>
                    </div>
                </div>
            </li>`;
        const jsnode = html += htmlnode;
        TweetListhtml().innerHTML = jsnode;
    });
}

let tweetCount = 0

const clickToAddTweet = () => {
    const body = document.getElementById("tweet-input").value;
    const tweet = {
        body,
        reTweets: 0,
        createdAt: new Date(),
        isLike: false,
        likeCount: 0,
    };
    if (/^\s*$/.test(body)) {
        return alert("It seems like you have not tweeted. Let's tweet!");
    }
    tweetCount++
    tweets.unshift(tweet);
    TweetRender(tweets);
    document.getElementById("tweet-input").value = "";
    document.getElementById("tweet-count").innerHTML = tweetCount

    document.getElementById("promptCount").innerHTML = 140;
};


const addInputEventListener = (e) => {
    document.getElementById("tweet-input").addEventListener("input", function (_) {
        tweetValue = this.value;
        const remainingCharacters = 140 - this.value.length;
        if (remainingCharacters === 0) {
            alert("You cannot input more than 140 characters!");
            document.getElementById("tweet-input").value = "";
        }
        document.getElementById("promptCount").innerHTML = remainingCharacters;
    });
};


const TweetRender = (object) => {
    let html = "";
    object.map((element, idx) => {
        const htmlnode = `<li class="tweet-card">
                    <div class="tweet-content">
                        <div class="tweet-header d-flex">
                            <span class="fullname"><strong>Royal Road</strong></span>
                            <span class="username">&nbsp;@RoyalRoad</span>
                            <span class="tweet-time">- ${moment(element.createdAt).calendar()}</span>
                            <div class="dropdown d-inline-flex ml-auto">
                                <button class="btn btn-secondary btn-small dropdown-toggle" type="button"
                                id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true"
                                aria-expanded="false" style="border:none; background-color: white; border-radius: 20px;"></button>
                                <div class="dropdown-menu dropdown-menu-right">
                                    <button class="dropdown-item" type="button">View Tweet activity</button>
                                    <button class="dropdown-item" type="button">Embed Tweet</button>
                                    <button class="dropdown-item" type="button">Pin to profile</button>
                                    <button class="dropdown-item text-danger" type="button" onclick="del(${idx})">Delete</button>
                                </div>
                            </div>
                        </div>
                        <img class="tweet-card-avatar" src="img/avatar.png" alt="logo">
                        <div class="tweet-text">
                            <p class="${element.body.includes("@") || element.body.includes("#") ? "text-primary" : "text-dark"}">${element.body}</p>
                        </div>
                    </div>
                    <div class="tweet-footer" style="padding-left: 60px;">
                        <a class="tweet-footer-btn">
                            <i class="octicon octicon-comment" aria-hidden="true" id="cmt-btn"></i><span>0</span>
                        </a>
                        <a class="tweet-footer-btn">
                            <i class="octicon octicon-sync" aria-hidden="true" onclick="reTweet(${idx})" id="retweet-btn"></i><span>${element.reTweets}</span>
                        </a>
                        <a class="tweet-footer-btn">
                            <span id="like-btn" onclick="like(${idx})">${element.isLike === true ? "💙" : "❤"}</span><span id="likeNum">${element.likeCount}</span>
                        </a>
                        <a class="tweet-footer-btn">
                            <i class="octicon octicon-mail" aria-hidden="true" id="DM-btn"></i><span>
                                0</span>
                        </a>
                    </div>
                </div>
            </li>`;
        const jsnode = html += htmlnode;
        TweetUserList().innerHTML = jsnode;
    });
}

const reTweet = (idx) => {
    const tweet = tweets[idx]
    tweet.reTweets++
    TweetRender(tweets);
}


const like = (idx) => {
    const tweet = tweets[idx]
    tweet.isLike = !tweet.isLike;
    if (!tweet.isLike) {
        tweet.likeCount--
    } else {
        tweet.likeCount++
    }
    TweetRender(tweets);
}

const del = (idx) => {
    tweets.splice(idx, 1)
    tweethtml.innerHTML = ""
    TweetRender(tweets);
    tweetCount--;
    document.getElementById("tweet-count").innerHTML = tweetCount;
}

document.getElementById("tweet-input")
    .addEventListener("keyup", function (event) {
        event.preventDefault();
        if (event.keyCode === 13) {
            document.getElementById("tweet-btn").click();
        }
    });

getTechNews();
addInputEventListener();