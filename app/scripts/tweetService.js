function Tweets() {
  this.all = [];
  this.filtered = [];
}

Tweets.prototype.populate = function(tweets) {
  var self = this;

  tweets.forEach(function(t) {
    self.all.push(new Tweet(t));
  });
};

Tweets.prototype.filter = function(time, menu, command) {
  this.filtered = this.all.filter(function(t) {
    var tweet = t.retweetedStatus || t,
        match = t.createdAt.isAfter(time);

    if (command) {
      match = match && (tweet[menu.name].indexOf(command) !== -1);
    }

    return match;
  });
};

Tweets.prototype.haveCommand = function(menu, command) {
  return this.all.filter(function(t) {
    if (command) {
      var tweet = t.retweetedStatus || t;

      return tweet[menu.name].indexOf(command) !== -1;
    } else {
      return true;
    }
  });
};

Tweets.prototype.mockDates = function() {
  function randomizeDate(minutesBack) {
    var distance = Math.floor(Math.random()*minutesBack);
    return moment().subtract(distance, 'minutes');
  }

  var randomDates = [];
  this.all.forEach(function(t,i) {
    if (i<3) {
      randomDates.push(randomizeDate(300));
    } else if (i<8) {
      randomDates.push(randomizeDate(1000));
    } else if (i<15) {
      randomDates.push(randomizeDate(6000));
    } else {
      randomDates.push(randomizeDate(10000));
    }
  });

  randomDates.sort(function(a,b) { return a < b ? 1 : -1; });

  this.all.forEach(function(t,i) {
    t.createdAt = randomDates[i];
  });

  this.filtered = this.all;
};

Tweets.prototype.populateCommands = function(menus) {
  this.all.forEach(function(tweet) {
    menus.forEach(function(menu) {
      tweet.populateCommands(menu);
    });
  });
};

function Tweet(tweet) {
  this.id = tweet.id;
  this.createdAt = moment(tweet.created_at);
  this.favoriteCount = tweet.favorite_count;
  this.text = tweet.text;

  this.author = new Author(tweet.author);
  this.retweetedStatus = tweet.retweeted_status ?
                          new Tweet(tweet.retweeted_status) : null;
  this.retweetedBy = tweet.retweeted_by ?
                      tweet.retweeted_by.map(function(a) {
                        return new Author(a);
                      }) : null;

  this.menuItemIds = {};
  this.menuItemIds['menu'] = tweet.menu_items ? tweet.menu_items.split(',') : [];
  this.menuItemIds['panelbar'] = tweet.panelbar_items ? tweet.panelbar_items.split(',') : [];
  this.menuItemIds['toolbar'] = tweet.toolbar_items ? tweet.toolbar_items.split(',') : [];
}

Tweet.prototype.populateCommands = function(menu) {
  if (typeof(DEVELOPMENT) === 'undefined') {
    var self = this;

    this[menu.name] = [];

    // we do not deal with retweets for simplicity...
    this.menuItemIds[menu.name].forEach(function(id) {
      self[menu.name].push(menu.byId[id]);
    });
  } else {
    var randomMenuItems = [],
        n = Math.floor(Math.random()*5);

    while (randomMenuItems.length < n) {
      var randomItem = menu.randomItem();

      while (randomMenuItems.indexOf(randomItem) != -1) {
        randomItem = menu.randomItem();
      }

      randomMenuItems.push(randomItem);
    }

    if (this.retweetedStatus) {
      this.retweetedStatus[menu.name] = randomMenuItems;
    } else {
      this[menu.name] = randomMenuItems;
    }
  }
};

function Author(author) {
  this.screenName = author.screen_name;
  this.name = author.name;
  this.profileImageUrl = author.profile_image_url;
}

angular.module('tweetsToSoftware')
  .factory('TweetService', function(switterServer, $http) {
    'use strict';

    var tweets = new Tweets(),
        promise;

    console.time('Tweets load');
    promise = $http.get(switterServer + '/api/tweets')
      .then(function(response) {
        console.timeEnd('Tweets load');
        console.time('Tweets population');

        tweets.populate(response.data);

        if (typeof(DEVELOPMENT) !== 'undefined') {
          tweets.mockDates();
        }

        console.timeEnd('Tweets population');
      });

    return {
      loaded: promise,
      tweets: tweets
    };
  });