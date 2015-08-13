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

Tweets.prototype.filterByTime = function(postedAfter) {
  var lastTweet = this.all[this.showItems - 1],
      moveIndexForward = lastTweet.createdAt > postedAfter;

  if (moveIndexForward) {
    while (this.all[this.showItems - 1].createdAt > postedAfter) {
      this.showItems += 1;
    }
  } else {
    while (this.all[this.showItems - 1].createdAt < postedAfter) {
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
  var randomMenuItemIds = [],
      n = Math.floor(Math.random()*7);

  while (randomMenuItemIds.length < n) {
    var randomItem = menu.randomItem();

    while (randomMenuItemIds.indexOf(randomItem.id) != -1) {
      randomItem = menu.randomItem();
    }

    randomMenuItemIds.push({
      id: randomItem.id,
      label: randomItem.label
    });
  }

  this[menu.name] = randomMenuItemIds;
};

function Author(author) {
  this.screenName = author.screen_name;
  this.name = author.name;
  this.profileImageUrl = author.profile_image_url;
}

angular.module('tweetsToSoftware')
  .factory('TweetService', function($http, $q, MenuService) {
    'use strict';

    var tweets = new Tweets(),
        promise;

    console.time('Tweets load');
    promise = $q.all([
      $http.get('http://0.0.0.0:8000/api/tweets/'),
      MenuService.loaded
    ])
      .then(function(response) {
        console.timeEnd('Tweets load');
        console.time('Tweets process');

        tweets.populate(response[0].data);

        //TODO: delete once server is ready
        //START: mocking
        tweets.mockDates();
        tweets.mockCommands([
          MenuService.menu,
          MenuService.toolbar,
          MenuService.panelbar
        ]);
        //END: mocking

        console.timeEnd('Tweets process');
      });

    return {
      loaded: promise,
      tweets: tweets
    };
  });