const tweets = []

const clickToAddTweet = () => {
    const body = document.getElementById('tweet-input').value
    const tweet = {
        body,
        reTweets: 0,
        createdAt: new Date,
    }
    tweets.push(tweet)
    let tweetsHTML = tweets.map((tweet, idx) => {
        return `<li>${tweet.body}</li><button href="#" onclick="reTweet(${idx})">Retweet</button>`
    })
    document.getElementById('tweets').innerHTML = tweetsHTML.join('\n')
    document.getElementById('tweet-input').value = ''
    document.getElementById('tweet-input').focus()
    document.getElementById('promptCount').innerHTML = '140'
}

const addInputEventListener = (e) => {
    document.getElementById('tweet-input').addEventListener('input', function (_) {
        tweetValue = this.value
        const remainingCharacters = 140 - this.value.length
        document.getElementById('promptCount').innerHTML = remainingCharacters
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
