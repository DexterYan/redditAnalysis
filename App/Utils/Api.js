var Api = {
    getAnalytic(subreddit, threshold) {
        var tz_offset = new Date().getTimezoneOffset()/60;
        var url = `http://www.redditlater.com/analysis/json/?tz_offset=${tz_offset}&sub=%2Fr%2F${subreddit}&threshold=${threshold}`
        console.log(url);
        return fetch(url).then((res) => res.json());
    }
}

module.exports = Api;