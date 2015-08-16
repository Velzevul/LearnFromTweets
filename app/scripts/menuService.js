function Menu(name) {
  this.name = name;
  this.all = [];
  this.byId = {};
  this.terminalItems = [];

  this.isOpen = false;
}

Menu.prototype.randomItem = function() {
  var randomIndex = Math.floor(Math.random()*this.terminalItems.length);

  return this.terminalItems[randomIndex];
};

Menu.prototype.populate = function(items) {
  var self = this;

  items.forEach(function(item) {
    self.all.push(new MenuItem(item, []));
  });
  populateIdMap(this.all, this.byId);

  for (itemId in this.byId) {
    if (this.byId.hasOwnProperty(itemId) &&
        this.byId[itemId].children.length == 0) {
      this.terminalItems.push(this.byId[itemId]);
    }
  }

  function populateIdMap(all, target) {
    all.forEach(function(one) {
      if (!one.divider) {
        if (target[one.id]) {
          console.error('entry already exists:', target[one.id], one);
        } else {
          target[one.id] = one;
        }

        if (one.children) {
          populateIdMap(one.children, target);
        }
      }
    });
  }

  return this;
};

Menu.prototype.close = function() {
  this.all.forEach(function(item) {
    item.close().dim();
  });

  this.isOpen = false;

  return this;
};

Menu.prototype.resetCounters = function() {
  this.all.forEach(function(item) {
    item._propagate(function(i) {
      i.tweetsCount = 0;
    }, 'children');
  });

  return this;
};

function MenuItem(item, parents) {
  if (!item.divider) {
    var self = this;
    this.id = item.id;
    this.label = item.label;
    this.tweetsCount = 0;

    // TODO: add promoted and banned commands

    if (item.largeIcon) {
      this.largeIcon = item.largeIcon;
    }

    this.isOpen = false;
    this.isHighlighted = false;

    this.children = [];
    this.parents = parents;

    if (item.children) {
      var childParents = [];
      parents.forEach(function(p) {
        childParents.push(p);
      });
      childParents.push(this);

      item.children.forEach(function(child) {
        self.children.push(new MenuItem(child, childParents));
      });
    }
  } else {
    this.divider = true;
  }
}

MenuItem.prototype._propagate = function(callback, prop) {
  callback(this);

  if (this[prop]) {
    this[prop].forEach(function(obj) {
      if (!obj.divider) {
        obj._propagate(callback, prop);
      }
    });
  }
};

MenuItem.prototype.highlight = function() {
  this._propagate(function(i) {
    i.isHighlighted = true;
  }, 'parents');

  return this;
};

MenuItem.prototype.dim = function() {
  this._propagate(function(i) {
    i.isHighlighted = false;
  }, 'parents');

  return this;
};

MenuItem.prototype.open = function() {
  this._propagate(function(i) {
    i.isOpen = true;
  }, 'parents');

  return this;
};

MenuItem.prototype.close = function() {
  this._propagate(function(i) {
    i.isOpen = false;
  }, 'parents');

  return this;
};

MenuItem.prototype.increaseCounter = function() {
  this._propagate(function(i) {
    i.tweetsCount++;
  }, 'parents');

  return this;
};

angular.module('tweetsToSoftware')
  .factory('MenuService', function($timeout, $http, $q) {
    'use strict';

    var menu = new Menu('menu'),
        toolbar = new Menu('toolbar'),
        panelbar = new Menu('panelbar'),
        promise;

    console.time('Menu load');
    promise = $q.all([
      $http.get('/data/commandsExtra.json'),
      $http.get('/data/tools.json'),
      $http.get('/data/panels.json')
    ])
      .then(function(response) {
        console.timeEnd('Menu load');
        console.time('Menu processing');

        menu.populate(response[0].data);
        toolbar.populate(response[1].data);
        panelbar.populate(response[2].data);

        console.timeEnd('Menu processing');
      });

    return {
      loaded: promise,
      menu: menu,
      toolbar: toolbar,
      panelbar: panelbar
    };
  });