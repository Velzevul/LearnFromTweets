function Tweets() {
  this.all = [];
  this.filtered = [];
}

Tweets.prototype.populate = function(tweets) {
  var self = this;

  self.showItems = tweets.length;

  tweets.forEach(function(t) {
    var tweet = new Tweet(t);

    self.all.push(tweet);
  });

  this.filtered = this.all;
};

Tweets.prototype.filter = function(menuName, command) {
  this.filtered = this.all.filter(function(t) {
    var tweet = t.retweeted_status || t;
    return tweet[menuName].indexOf(command) !== -1;
  });
};

Tweets.prototype.resetFilter = function() {
  this.filtered = this.all;
};

Tweets.prototype.revealUntil = function(targetTime) {
  var lastShownTweet = this.all[this.showItems - 1],
      increaseIndex = lastShownTweet.createdAt > targetTime;

  if (increaseIndex) {
    while (this.all[this.showItems - 1].createdAt > targetTime) {
      this.showItems += 1;
    }
  } else {
    while (this.all[this.showItems - 1].createdAt < targetTime) {
      this.showItems -= 1;
    }
  }
};

Tweets.prototype.mockDates = function() {
  function randomizeDate() {
    var minutesInWeek = 10080,
        distance = Math.floor(Math.random()*minutesInWeek);
    return moment().subtract(distance, 'minutes');
  }

  var randomDates = [];
  this.all.forEach(function() {
    randomDates.push(randomizeDate());
  });

  randomDates.sort(function(a,b) { return a < b ? 1 : -1; });

  this.all.forEach(function(t,i) {
    t.createdAt = randomDates[i];
  });
};

Tweets.prototype.mockCommands = function(menus) {
  this.all.forEach(function(tweet) {
    menus.forEach(function(menu) {
      tweet.mockCommands(menu);
    });
  });
};

function Tweet(tweet) {
  this.id = tweet.id;
  this.createdAt = moment(tweet.created_at);
  this.favoriteCount = tweet.favorite_count;
  this.text = tweet.text;
  this.matchesFilters = true;

  this.author = new Author(tweet.author);
  this.retweetedStatus = tweet.retweeted_status ?
                          new Tweet(tweet.retweeted_status) : null;
  this.retweetedBy = tweet.retweeted_by ?
                      tweet.retweeted_by.map(function(a) {
                        return new Author(a);
                      }) : null;
}

Tweet.prototype.mockCommands = function(menu) {
  var randomMenuItems = [],
      n = Math.floor(Math.random()*5);

  while (randomMenuItems.length < n) {
    var randomItem = menu.randomItem();

    while (randomMenuItems.indexOf(randomItem) != -1) {
      randomItem = menu.randomItem();
    }

    randomMenuItems.push(randomItem);
  }

  this[menu.name] = randomMenuItems;
  if (this.retweetedStatus) {
    this.retweetedStatus[menu.name] = randomMenuItems;
  }
};

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
    promise = $http.get('http://0.0.0.0:8000/api/tweets/')
      .then(function(response) {
        console.timeEnd('Tweets load');
        console.time('Tweets population');

        tweets.populate(response.data.slice(0,4));
        tweets.mockDates();

        console.timeEnd('Tweets population');
      });

    return {
      loaded: promise,
      tweets: tweets
    };
  });