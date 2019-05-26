const tweets = []
let isLike = false;

const clickToAddTweet = () => {
    const body = document.getElementById('tweet-input').value
    const tweet = {
        body,
        reTweets: 0,
        createdAt: new Date,
        isLike: false,
        likeCount: 0
    }

    if (/^\s*$/.test(body)) {
        return alert("You need to input something")
    }
    tweets.push(tweet)
    let tweetsHTML = tweets.map((tweet, idx) => {
        return `<li>${tweet.body} ${tweet.reTweets > 0 ? `----- has been retweeted by ${tweet.reTweets} times` : ''} ${tweet.likeCount}</li>
        <button href="#" onclick="reTweet(${idx})">Retweet</button>
        <button href="#" onclick="like(${idx})">${tweet.isLike === false ? "Like" : "Unlike"}</button>
        <button href="#" onclick="del(${idx})">Del</button>`
    })
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
    tweet.reTweets = tweet.reTweets + 1
    tweets[idx] = tweet
    let tweetsHTML = tweets.map((tweet, idx) => {
        return `<li>${tweet.body} ${tweet.reTweets > 0 ? `----- has been retweeted by ${tweet.reTweets} times` : ''}</li><button href="#" onclick="reTweet(${idx})">Retweet</button>`
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
    let tweetsHTML = tweets.map((tweet, idx) => {
        return `<li>${tweet.body} ${tweet.reTweets > 0 ? `----- has been retweeted by ${tweet.reTweets} times` : ''} ${tweet.likeCount}</li>
        <button href="#" onclick="reTweet(${idx})">Retweet</button>
        <button href="#" onclick="like(${idx})">${tweet.isLike === false ? "Like" : "Unlike"}</button>
        <button href="#" onclick="del(${idx})">Del</button>`
    })
    document.getElementById('tweets').innerHTML = tweetsHTML.join('\n')
}

const del = (idx) => {
    tweets.splice(idx, 1)
    let tweetsHTML = tweets.map((tweet, idx) => {
        return `<li>${tweet.body} ${tweet.reTweets > 0 ? `----- has been retweeted by ${tweet.reTweets} times` : ''} ${tweet.likeCount}</li>
        <button href="#" onclick="reTweet(${idx})">Retweet</button>
        <button href="#" onclick="like(${idx})">${tweet.isLike === false ? "Like" : "Unlike"}</button>
        <button href="#" onclick="del(${idx})">Del</button>`
    })
    document.getElementById('tweets').innerHTML = tweetsHTML.join('\n')
}
