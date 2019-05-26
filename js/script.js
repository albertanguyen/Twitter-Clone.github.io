const likeBtn = document.getElementById("like-btn");
const likeNumHtml = document.getElementById("likeNum");
const TweetListhtml = () => document.getElementById("TweetListhtml");
const TweetUserList = () => document.getElementById("tweets");
const tweethtml = document.getElementById("tweets");
const tweets = [];


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
    object.map((element, idx) => {
        const htmlnode = `
            <li class="tweet-card">
                <div class="tweet-content">
                    <div class="tweet-header d-flex">
                        <span class="fullname">
                            <strong>${element.author}</strong>
                        </span>
                        <span class="username">@${element.author.replace(/\s/g,"")}</span>
                        <span class="tweet-time">- ${moment(element.publishedAt).format("MMM Do")}</span>
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
                                onclick="likefeature()"></i><span id="likeNum"> 202</span>
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
  tweets.push(tweet);
  TweetRender(tweets);
  document.getElementById("tweet-input").value = "";
  document.getElementById("promptCount").innerHTML = 140;
};


const addInputEventListener = e => {
  document.getElementById("tweet-input").addEventListener("input", function(_) {
    tweetValue = this.value;
    const remainingCharacters = 140 - this.value.length;
    document.getElementById("promptCount").innerHTML = remainingCharacters;
  });
};

const TweetRender = object => {
    let html = "";
    object.map((element, idx) => {
        const htmlnode = `<li class="tweet-card">
                    <div class="tweet-content">
                        <div class="tweet-header d-flex">
                            <span class="fullname"><strong>Royal Road</strong></span>
                            <span class="username">@RoyalRoad</span>
                            <span class="tweet-time">- ${moment(element.createdAt).format("MMM Do")}</span>
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
                        <a><img class="tweet-card-avatar" src="img/avatar.png" alt=""></a>
                        <div class="tweet-text">
                            <p class="" data-aria-label-part="0">${element.body} 
                            ${element.reTweets > 0 ? `----- has been retweeted by ${element.reTweets} times` : ''}
                                <a href="" class="twitter-hashtag" dir="ltr"></a>
                            </p>
                    </div>
                    <div class="tweet-footer">
                        <a class="tweet-footer-btn">
                            <i class="octicon octicon-comment" aria-hidden="true" id="cmt-btn"></i><span>18</span>
                        </a>
                        <a class="tweet-footer-btn">
                            <i class="octicon octicon-sync" aria-hidden="true" onclick="reTweet(${idx}) id="retweet-btn"></i><span>64</span>
                        </a>
                        <a class="tweet-footer-btn">
                            <i class="octicon octicon-heart" aria-hidden="true" id="like-btn"
                                onclick="like(${idx})"></i><span id="likeNum">${element.likeCount}</span>
                        </a>
                        <a class="tweet-footer-btn">
                            <i class="octicon octicon-mail" aria-hidden="true" id="DM-btn"></i><span>
                                155</span>
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
    tweet.reTweets = tweet.reTweets + 1
    tweets[idx] = tweet
    TweetRender(tweets);
    // let tweetsHTML = tweets.map((tweet, idx) => {
    //     return `<li>${tweet.body} ${tweet.reTweets > 0 ? `----- has been retweeted by ${tweet.reTweets} times` : ''}</li><button href="#" onclick="reTweet(${idx})">Retweet</button>`
    // })
    // document.getElementById('tweets').innerHTML = tweetsHTML.join('\n')
}


const like = (idx) => {
    const tweet = tweets[idx]
    tweet.isLike = !tweet.isLike;
    if (!tweet.isLike) {
        likeBtn.style.color = "red";
        tweet.likeCount--
    } else {
        tweet.likeCount++
    }
    TweetRender(tweets);
    // let tweetsHTML = tweets.map((tweet, idx) => {
    //     return `<li>${tweet.body} ${tweet.reTweets > 0 ? `----- has been retweeted by ${tweet.reTweets} times` : ''} ${tweet.likeCount}</li>
    //     <button href="#" onclick="reTweet(${idx})">Retweet</button>
    //     <button href="#" onclick="like(${idx})">${tweet.isLike === false ? "Like" : "Unlike"}</button>
    //     <button href="#" onclick="del(${idx})">Del</button>`
    // })
    // document.getElementById('tweets').innerHTML = tweetsHTML.join('\n')
}

const del = (idx) => {
    tweets.splice(idx, 1)
    TweetRender(tweets);

    // let tweetsHTML = tweets.map((tweet, idx) => {
    //     return `<li>${tweet.body} ${tweet.reTweets > 0 ? `----- has been retweeted by ${tweet.reTweets} times` : ''} ${tweet.likeCount}</li>
    //     <button href="#" onclick="reTweet(${idx})">Retweet</button>
    //     <button href="#" onclick="like(${idx})">${tweet.isLike === false ? "Like" : "Unlike"}</button>
    //     <button href="#" onclick="del(${idx})">Del</button>`
    // })
    // document.getElementById('tweets').innerHTML = tweetsHTML.join('\n')
}


getTechNews();
addInputEventListener();

