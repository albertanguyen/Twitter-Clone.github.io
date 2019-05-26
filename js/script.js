const tweets = []
let isLike = false;

const clickToAddTweet = () => {
    const body = document.getElementById('tweet-input').value;
    const tweet = {
        body,
        isReTweet: false,
        reTweets: 0,
        createdAt: new Date,
        isLike: false,
        likeCount: 0
    }

    if (/^\s*$/.test(body)) {
        return alert("You need to input something")
    }
    tweets.push(tweet)
    tweetModified()
    document.getElementById('tweets').innerHTML = tweetsHTML.join('\n')
    document.getElementById('tweet-input').value = ''
    document.getElementById('promptCount').innerHTML = 140;
}

const addInputEventListener = (e) => {
    document.getElementById('tweet-input').addEventListener('input', function (_) {
        tweetValue = this.value
        const remainingCharacters = 140 - this.value.length;
        document.getElementById('promptCount').innerHTML = remainingCharacters;
    })
}
addInputEventListener()

const reTweet = (idx) => {
    const tweet = tweets[idx]
    let userInput = prompt("Input here");
    tweet.isReTweet = !tweet.isReTweet;
    if (!tweet.isReTweet) {
        tweet.reTweets--
    } else {
        tweet.reTweets++
    }
    tweetsHTML = tweets.map((tweet, idx) => {
        return `
        <li>${userInput}</li>
        <li>@ ${tweet.body}</li>
        <button href="#" onclick="reTweet(${idx})">Retweet ${tweet.reTweets}</button>
        <a onclick="like(${idx})">${tweet.isLike === false ? "❤" : "💓"}</a> ${tweet.likeCount}
        <button href="#" onclick="del(${idx})">Del</button>`
    })
    document.getElementById('tweets').innerHTML = tweetsHTML.join('\n')
}

const like = (idx) => {
    const tweet = tweets[idx]
    tweet.isLike = !tweet.isLike;
    if (!tweet.isLike) {
        tweet.likeCount--
    } else {
        tweet.likeCount++
    }
    tweetModified()
    document.getElementById('tweets').innerHTML = tweetsHTML.join('\n')
}

const del = (idx) => {
    tweets.splice(idx, 1)
    tweetModified()
    document.getElementById('tweets').innerHTML = tweetsHTML.join('\n')
}

const tweetModified = () => {
    tweetsHTML = tweets.map((tweet, idx) => {
        return `<li>${tweet.body}</li>
        <button href="#" onclick="reTweet(${idx})">Retweet ${tweet.reTweets}</button>
        <a onclick="like(${idx})">${tweet.isLike === false ? "❤" : "💓"}</a> ${tweet.likeCount}
        <button href="#" onclick="del(${idx})">Del</button>`
    })
}
