function Tweets() {
  this.all = [];
  this.showItems = 0;
}

Tweets.prototype.populate = function(tweets) {
  var self = this;

  tweets.forEach(function(t) {
    self.all.push(new Tweet(t));
  });

  self.showItems = tweets.length;
};

Tweets.prototype.filter = function(posted_after) {
  var lastTweet = this.all[this.showItems - 1],
      moveIndexForward = lastTweet.createdAt > posted_after;

  if (moveIndexForward) {
    while (this.all[this.showItems - 1].createdAt > posted_after) {
      this.showItems += 1;
    }
  } else {
    while (this.all[this.showItems - 1].createdAt < posted_after) {
      this.showItems -= 1;
    }
  }
};

function Tweet(tweet) {
  this.id = tweet.id;
  this.createdAt = moment(tweet.created_at).format();
  this.favoriteCount = tweet.favorite_count;
  this.text = tweet.text;

  this.author = new Author(tweet.author);
  this.retweetedStatus = tweet.retweeted_status ?
                          new Tweet(tweet.retweeted_status) : null;
  this.retweetedBy = tweet.retweeted_by ?
                      tweet.retweeted_by.map(function(a) {
                        return new Author(a);
                      }) : null;
}

function Author(author) {
  this.screenName = author.screen_name;
  this.name = author.name;
  this.profileImageUrl = author.profile_image_url;
}

angular.module('tweetsToSoftware')
  .factory('TweetService', function($http) {
    'use strict';

    var tweets = new Tweets(),
        promise;

    console.time('Tweets load');
    promise = $http.get('http://dorado.cs.umanitoba.ca:8000/api/tweets')
      .then(function(response) {
        console.timeEnd('Tweets load');
        console.time('Tweets process');

        tweets.populate(response.data);

        //debugger;
        console.timeEnd('Tweets process');
      });

    return {
      loaded: promise,
      tweets: tweets
    };
  });