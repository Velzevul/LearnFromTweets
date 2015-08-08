(function(module) {
try { module = angular.module("app-templates"); }
catch(err) { module = angular.module("app-templates", []); }
module.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("activeTweet.html",
    "<div class=\"active-tweet\"\n" +
    "     ng-if=\"tweets.active\">\n" +
    "    <div class=\"is-floated-right\">\n" +
    "        <button class=\"active-tweet__link\"\n" +
    "                ng-click=\"deactivate()\">close</button>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"l-media\">\n" +
    "        <div class=\"l-media__figure\">\n" +
    "            <div class=\"active-tweet__author-avatar\"\n" +
    "                 style=\"background-image: url('{{tweets.active.author.avatar}}');\"></div>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"l-media__body\">\n" +
    "            <div class=\"l-block-x-small\">\n" +
    "                <div class=\"l-list-inline l-list-inline--x-small\">\n" +
    "                    <div class=\"l-list-inline__item is-middle-aligned\">\n" +
    "                        <div class=\"active-tweet__author-name\">\n" +
    "                            {{tweets.active.author.name}}\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "\n" +
    "                    <div class=\"l-list-inline__item is-middle-aligned\">\n" +
    "                        <div class=\"active-tweet__author-screenname\">\n" +
    "                            @{{tweets.active.author.screenName}}\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"l-block\">\n" +
    "                <div class=\"active-tweet__text\">\n" +
    "                    {{tweets.active.tweet.text}}\n" +
    "                </div>\n" +
    "\n" +
    "                <a href=\"{{tweets.active.tweet.url}}\"\n" +
    "                   class=\"active-tweet__link\"\n" +
    "                   target=\"_blank\">\n" +
    "                    {{tweets.active.tweet.url | characters:35}}\n" +
    "                </a>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"l-block-small\">\n" +
    "                <div class=\"at-commands\">\n" +
    "                    <div class=\"l-block-x-small\">\n" +
    "                        <div class=\"at-commands__title\">Tools:</div>\n" +
    "                    </div>\n" +
    "\n" +
    "                    <div class=\"at-commands__item\"\n" +
    "                         ng-repeat=\"tool in tweets.active.toolRefs\">\n" +
    "                        <div class=\"l-block-x-small\">\n" +
    "                            <div class=\"atc-command\"\n" +
    "                                 ng-mouseenter=\"highlightTool(tool)\"\n" +
    "                                 ng-mouseleave=\"reset()\">\n" +
    "                                <div class=\"l-list-inline l-list-inline--x-small\">\n" +
    "                                    <div class=\"l-list-inline__item is-middle-aligned\">\n" +
    "                                        <div class=\"atc-command__icon\"\n" +
    "                                             style=\"background-image: url('/images/{{tool.id}}.png');\"></div>\n" +
    "                                    </div>\n" +
    "\n" +
    "                                    <div class=\"l-list-inline__item is-middle-aligned\">\n" +
    "                                        <div class=\"atc-command__label\">\n" +
    "                                            {{tool.label}}\n" +
    "                                        </div>\n" +
    "                                    </div>\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"l-block-small\">\n" +
    "                <div class=\"at-commands\">\n" +
    "                    <div class=\"l-block-x-small\">\n" +
    "                        <div class=\"at-commands__title\">Panels:</div>\n" +
    "                    </div>\n" +
    "\n" +
    "                    <div class=\"at-commands__item\"\n" +
    "                         ng-repeat=\"panel in tweets.active.panelRefs\">\n" +
    "                        <div class=\"l-block-x-small\">\n" +
    "                            <div class=\"atc-command\"\n" +
    "                                 ng-mouseenter=\"highlightPanel(panel)\"\n" +
    "                                 ng-mouseleave=\"reset()\">\n" +
    "                                <div class=\"l-list-inline l-list-inline--x-small\">\n" +
    "                                    <div class=\"l-list-inline__item is-middle-aligned\">\n" +
    "                                        <div class=\"atc-command__icon\"\n" +
    "                                             style=\"background-image: url('/images/{{panel.id}}.png');\"></div>\n" +
    "                                    </div>\n" +
    "\n" +
    "                                    <div class=\"l-list-inline__item is-middle-aligned\">\n" +
    "                                        <div class=\"atc-command__label\">\n" +
    "                                            {{panel.label}}\n" +
    "                                        </div>\n" +
    "                                    </div>\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"l-block-small\">\n" +
    "                <div class=\"at-commands\">\n" +
    "                    <div class=\"l-block-x-small\">\n" +
    "                        <div class=\"at-commands__title\">Menu commands:</div>\n" +
    "                    </div>\n" +
    "\n" +
    "                    <div class=\"at-commands__item\"\n" +
    "                         ng-repeat=\"command in tweets.active.commandRefs\">\n" +
    "                        <div class=\"l-block-x-small\">\n" +
    "                            <div class=\"atc-command\"\n" +
    "                                 ng-mouseenter=\"highlightMenuItem(command)\"\n" +
    "                                 ng-mouseleave=\"reset()\">\n" +
    "                                <div class=\"atc-command__label\">\n" +
    "                                    {{command.id}}\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"active-tweet-placeholder\"\n" +
    "     ng-if=\"!tweets.active\">\n" +
    "    Select a tweet to see details\n" +
    "</div>");
}]);
})();

(function(module) {
try { module = angular.module("app-templates"); }
catch(err) { module = angular.module("app-templates", []); }
module.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("activity.html",
    "<div class=\"app-body\">\n" +
    "  <div class=\"activity-panel\">\n" +
    "    <div class=\"ap-header\">\n" +
    "      <div class=\"l-block-small\">\n" +
    "        <div class=\"ap-header__title\">\n" +
    "          Tweets about Photoshop\n" +
    "        </div>\n" +
    "      </div>\n" +
    "\n" +
    "      <div class=\"l-block-small\">\n" +
    "        <label>\n" +
    "          <input type=\"checkbox\"\n" +
    "                 ng-model=\"filters.highlightUnfamiliar\"> Only tweets for\n" +
    "          unfamiliar commands\n" +
    "        </label>\n" +
    "      </div>\n" +
    "\n" +
    "      <label>\n" +
    "        <input type=\"checkbox\"\n" +
    "               ng-model=\"filters.highlightRelevant\"> Only tweets for relevant\n" +
    "        commands\n" +
    "      </label>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"ap-section\">\n" +
    "      <timeline></timeline>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"ap-section\">\n" +
    "      <active-tweet></active-tweet>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>");
}]);
})();

(function(module) {
try { module = angular.module("app-templates"); }
catch(err) { module = angular.module("app-templates", []); }
module.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("author.html",
    "<div class=\"author\"\n" +
    "     ng-show=\"author.tweetsCount > 0\"\n" +
    "     ng-class=\"{'author--selected': author.name == filters.author.name}\"\n" +
    "     ng-click=\"setAuthorFilter()\">\n" +
    "    <div class=\"l-justified\">\n" +
    "        <div class=\"l-justified__item is-middle-aligned\">\n" +
    "            <div class=\"l-list-inline l-list-inline--collapsed\">\n" +
    "                <div class=\"l-list-inline__item is-middle-aligned\">\n" +
    "                    <div class=\"author__avatar\"\n" +
    "                         style=\"background-image: url({{author.avatar}});\"></div>\n" +
    "                </div>\n" +
    "\n" +
    "                <div class=\"l-list-inline__item is-middle-aligned\">\n" +
    "                    <div class=\"author__name\">@{{author.name}}</div>\n" +
    "                    <div class=\"author__tweets\">{{author.tweetsCount}} tweets</div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"l-justified__item is-middle-aligned\">\n" +
    "            <div class=\"l-hoverchange\"\n" +
    "                 ng-show=\"author.isFollowing\">\n" +
    "                <div class=\"l-hoverchange__content-hover\">\n" +
    "                    <button class=\"button-empty button-empty--danger\"\n" +
    "                            ng-show=\"author.isFollowing\"\n" +
    "                            ng-click=\"toggleFollow($event)\">unfollow</button>\n" +
    "                </div>\n" +
    "\n" +
    "                <div class=\"l-hoverchange__content-normal\">\n" +
    "                    <div class=\"author__follow-status\"\n" +
    "                         ng-show=\"author.isFollowing\">following</div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"author__follow-action\"\n" +
    "                 ng-hide=\"author.isFollowing\">\n" +
    "                <button class=\"button-empty button-empty--success\"\n" +
    "                        ng-hide=\"author.isFollowing\"\n" +
    "                        ng-click=\"toggleFollow($event)\">follow</button>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>");
}]);
})();

(function(module) {
try { module = angular.module("app-templates"); }
catch(err) { module = angular.module("app-templates", []); }
module.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("authorsFilter.html",
    "<div class=\"ap-section\">\n" +
    "    <div class=\"l-block-x-small\">\n" +
    "        <div class=\"-split\">\n" +
    "            <div class=\"l-split__right\">\n" +
    "                <button class=\"link\"\n" +
    "                        ng-show=\"filters.author.name\"\n" +
    "                        ng-click=\"unsetAuthorFilter()\">clear filter</button>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"ap-section__title\">Authors</div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"ap-section__body ap-section__body--limited\">\n" +
    "        <div ng-repeat=\"author in authors | orderBy : '-tweetsCount'\">\n" +
    "            <author author=\"author\"></author>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>");
}]);
})();

(function(module) {
try { module = angular.module("app-templates"); }
catch(err) { module = angular.module("app-templates", []); }
module.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("menu.html",
    "<script type=\"text/ng-template\" id=\"menuDropdown\">\n" +
    "    <div class=\"md-item\"\n" +
    "         ng-class=\"{'md-item--open': item.isOpen,\n" +
    "                    'md-item--parent': item.children.length}\"\n" +
    "         ng-mouseenter=\"hoverOpen(item)\"\n" +
    "         ng-click=\"clickOpen(item)\">\n" +
    "\n" +
    "        <div class=\"md-item__counter\"\n" +
    "             ng-show=\"item.tweetsCount > 0\">{{item.tweetsCount}}</div>\n" +
    "\n" +
    "        <button class=\"md-item__name\">{{item.label}}</button>\n" +
    "    </div>\n" +
    "\n" +
    "    <div ng-show=\"item.children.length\">\n" +
    "        <div class=\"m-dropdown m-dropdown--nested\"\n" +
    "             ng-show=\"item.isOpen\">\n" +
    "            <div ng-repeat=\"item in item.children\">\n" +
    "                <div class=\"m-dropdown__slot\"\n" +
    "                     ng-hide=\"item.divider\"\n" +
    "                     ng-include=\"'menuDropdown'\"></div>\n" +
    "\n" +
    "                <div class=\"m-dropdown__divider\"\n" +
    "                     ng-show=\"item.divider\"></div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</script>\n" +
    "\n" +
    "<div class=\"menu\">\n" +
    "    <ul class=\"l-list-inline l-list-inline--collapsed\">\n" +
    "        <li class=\"l-list-inline__item\"\n" +
    "            ng-repeat=\"rootItem in menuItems\">\n" +
    "            <div class=\"menu__slot\">\n" +
    "                <div class=\"m-item\"\n" +
    "                     ng-class=\"{'m-item--open': rootItem.isOpen}\"\n" +
    "                     ng-mouseenter=\"hoverOpen(rootItem)\"\n" +
    "                     ng-click=\"clickOpen(rootItem)\">\n" +
    "                    <button class=\"m-item__name\">{{rootItem.label}}</button>\n" +
    "\n" +
    "                    <div class=\"m-item__counter\"\n" +
    "                         ng-show=\"rootItem.tweetsCount > 0\">\n" +
    "                        {{rootItem.tweetsCount}}\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "\n" +
    "                <div class=\"m-dropdown m-dropdown--root\"\n" +
    "                     ng-show=\"rootItem.isOpen\">\n" +
    "                    <div ng-repeat=\"item in rootItem.children\">\n" +
    "                        <div class=\"m-dropdown__slot\"\n" +
    "                             ng-hide=\"item.divider\"\n" +
    "                             ng-include=\"'menuDropdown'\"></div>\n" +
    "\n" +
    "                        <div class=\"m-dropdown__divider\"\n" +
    "                             ng-show=\"item.divider\"></div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </li>\n" +
    "    </ul>\n" +
    "</div>");
}]);
})();

(function(module) {
try { module = angular.module("app-templates"); }
catch(err) { module = angular.module("app-templates", []); }
module.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("panelbar.html",
    "<div class=\"toolbar toolbar--right\">\n" +
    "  <div ng-repeat=\"panel in panels\">\n" +
    "    <div class=\"toolbar__slot\"\n" +
    "         ng-mouseenter=\"open(panel)\"\n" +
    "         ng-mouseleave=\"hide()\"\n" +
    "         ng-if=\"!panel.divider\">\n" +
    "      <div class=\"t-item\"\n" +
    "           ng-class=\"{'t-item--open': panel.isOpen}\">\n" +
    "        <button>\n" +
    "          <div class=\"l-list-inline l-list-inline--x-small\">\n" +
    "            <div class=\"l-list-inline__item is-middle-aligned\">\n" +
    "              <div class=\"t-item__icon\"\n" +
    "                   style=\"background-image: url('/images/{{panel.id}}.png');\">\n" +
    "              </div>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"l-list-inline__item is-middle-aligned\">\n" +
    "              <div class=\"t-item__label\">{{panel.label}}</div>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "        </button>\n" +
    "\n" +
    "        <div class=\"t-item__counter t-item__counter--rev\"\n" +
    "             ng-show=\"panel.tweetsCount > 0\">{{panel.tweetsCount}}</div>\n" +
    "      </div>\n" +
    "\n" +
    "      <div class=\"t-dropdown t-dropdown--rev\"\n" +
    "           ng-show=\"panel.isOpen\">\n" +
    "        <img ng-src=\"/images/{{panel.id}}-panel.png\" alt=\"{{panel.label}}\"/>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"toolbar__divider\"\n" +
    "         ng-if=\"tool.divider\"></div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "");
}]);
})();

(function(module) {
try { module = angular.module("app-templates"); }
catch(err) { module = angular.module("app-templates", []); }
module.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("timeline.html",
    "<div id=\"timeline\"></div>");
}]);
})();

(function(module) {
try { module = angular.module("app-templates"); }
catch(err) { module = angular.module("app-templates", []); }
module.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("toolbar.html",
    "<div class=\"toolbar toolbar--left\">\n" +
    "  <div ng-repeat=\"tool in tools\">\n" +
    "    <div class=\"toolbar__slot\"\n" +
    "         ng-if=\"!tool.divider\">\n" +
    "      <div class=\"t-item\"\n" +
    "           ng-click=\"clickOpen(tool)\"\n" +
    "           ng-mouseenter=\"hoverOpen(tool)\"\n" +
    "           ng-class=\"{'t-item--open': tool.isOpen}\">\n" +
    "        <button class=\"t-item__icon\"\n" +
    "                ng-class=\"{'t-item__icon--large': tool.largeIcon}\"\n" +
    "                style=\"background-image: url('/images/{{tool.id}}.png');\">\n" +
    "        </button>\n" +
    "\n" +
    "        <div class=\"t-item__counter\"\n" +
    "             ng-show=\"tool.tweetsCount > 0\">{{tool.tweetsCount}}</div>\n" +
    "      </div>\n" +
    "\n" +
    "      <div class=\"t-dropdown\"\n" +
    "           ng-show=\"tool.isOpen\"\n" +
    "           ng-if=\"tool.children.length\">\n" +
    "        <div class=\"t-dropdown__slot\"\n" +
    "             ng-repeat=\"subtool in tool.children\">\n" +
    "          <div class=\"td-item\"\n" +
    "               ng-mouseenter=\"hoverOpen(subtool)\"\n" +
    "               ng-class=\"{'td-item--first': $index == 0}\">\n" +
    "            <button>\n" +
    "              <div class=\"l-list-inline l-list-inline--x-small\">\n" +
    "                <div class=\"l-list-inline__item is-middle-aligned\">\n" +
    "                  <div class=\"td-item__icon\"\n" +
    "                       ng-class=\"{'td-item__icon--large': subtool.largeIcon}\"\n" +
    "                       style=\"background-image:\n" +
    "                       url('/images/{{subtool.id}}.png');\"></div>\n" +
    "                </div>\n" +
    "\n" +
    "                <div class=\"l-list-inline__item is-middle-aligned\">\n" +
    "                  <div class=\"td-item__label\">{{subtool.label}}</div>\n" +
    "                </div>\n" +
    "              </div>\n" +
    "            </button>\n" +
    "\n" +
    "            <div class=\"td-item__counter\"\n" +
    "                 ng-show=\"tool.tweetsCount > 0\">{{tool.tweetsCount}}</div>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"toolbar__divider\"\n" +
    "         ng-if=\"tool.divider\"></div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "");
}]);
})();

(function(module) {
try { module = angular.module("app-templates"); }
catch(err) { module = angular.module("app-templates", []); }
module.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("tweet.html",
    "<div>\n" +
    "  <div class=\"l-tweet-content\"\n" +
    "       ng-show=\"data.retweetedStatus\">\n" +
    "    <div class=\"l-tweet-content__icon is-right-aligned\">\n" +
    "      <i class=\"icon t-icon-retweet-indicator\"></i>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"tweet__extra\">\n" +
    "      {{data.author.name}} retweeted\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"l-tweet-content\">\n" +
    "    <div class=\"l-list-inline l-list-inline--collapsed\">\n" +
    "      <div class=\"l-list-inline__item\">\n" +
    "        <div class=\"t-author\">\n" +
    "          <div class=\"l-tweet-content__icon\">\n" +
    "            <img src=\"{{tweet.author.profileImageUrl}}\"\n" +
    "                 alt=\"{{tweet.author.name}}\"\n" +
    "                 class=\"t-author__avatar\"/>\n" +
    "          </div>\n" +
    "\n" +
    "          <div class=\"l-list-inline l-list-inline--collapsed\">\n" +
    "            <div class=\"l-list-inline__item\">\n" +
    "              <div class=\"t-author__name\">{{tweet.author.name}}</div>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"l-list-inline__item\">\n" +
    "              <div class=\"t-author__screen-name tweet__extra\">@{{tweet.author.screenName}}</div>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "\n" +
    "      <div class=\"l-list-inline__item\">\n" +
    "        <div class=\"tweet__extra tweet__extra--pre-dot\">1h</div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"l-block-small\">\n" +
    "      {{tweet.text}}\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"l-block-small\">\n" +
    "      <div class=\"tweet__preview-image\"\n" +
    "           style=\"background: url('//placehold.it/600x400');\"></div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"l-block-small\">\n" +
    "      <div class=\"t-share-table\">\n" +
    "        <div class=\"l-list-inline l-list-inline--collapsed\">\n" +
    "          <div class=\"l-list-inline__item\">\n" +
    "            <div class=\"t-share-table__cell\">\n" +
    "              <div class=\"t-stat\">\n" +
    "                <div class=\"t-stat__title tweet__extra\">retweets</div>\n" +
    "                <div class=\"t-stat__value\">{{tweet.retweetedBy.length}}</div>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "\n" +
    "          <div class=\"l-list-inline__item\">\n" +
    "            <div class=\"t-share-table__cell\">\n" +
    "              <div class=\"t-stat\">\n" +
    "                <div class=\"t-stat__title tweet__extra\">favorites</div>\n" +
    "                <div class=\"t-stat__value\">{{tweet.favoriteCount}}</div>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "\n" +
    "          <div class=\"l-list-inline__item\">\n" +
    "            <div class=\"t-share-table__cell t-share-table__cell--pre-border\">\n" +
    "              <div class=\"l-list-inline l-list-inline--x-small\">\n" +
    "                <div class=\"l-list-inline__item\"\n" +
    "                     ng-repeat=\"author in tweet.retweetedBy\">\n" +
    "                  <div class=\"t-retweet\">\n" +
    "                    <img src=\"{{author.profileImageUrl}}\"\n" +
    "                         alt=\"author.name\"\n" +
    "                         class=\"t-retweet__user-avatar\"/>\n" +
    "                  </div>\n" +
    "                </div>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"l-block-small\">\n" +
    "      <div class=\"tweet__extra\">\n" +
    "        {{tweet.createdAt | amDateFormat:'MMMM Do, h:mm a'}}\n" +
    "      </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"tweet__extra\">\n" +
    "      <div class=\"l-list-inline\">\n" +
    "        <div class=\"l-list-inline__item\">\n" +
    "          <div class=\"tweet__action\">\n" +
    "            <i class=\"icon t-icon-retweet\"></i>\n" +
    "            {{tweet.retweetedBy.length}}\n" +
    "          </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"l-list-inline__item\">\n" +
    "          <div class=\"tweet__action\">\n" +
    "            <i class=\"icon t-icon-favorite\"></i>\n" +
    "            {{tweet.favoriteCount}}\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>");
}]);
})();

(function(module) {
try { module = angular.module("app-templates"); }
catch(err) { module = angular.module("app-templates", []); }
module.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("tweetList.html",
    "<div class=\"tweet-list\">\n" +
    "  <div class=\"l-block\">\n" +
    "    <div class=\"tweet-list__title\">Tweets since {{postedAfter}}</div>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"tweet-list__body\">\n" +
    "    <tweet ng-repeat=\"t in tweets.all | limitTo: tweets.showItems\"\n" +
    "           class=\"tweet\"\n" +
    "           ng-class=\"{'tweet--is-first': $first,\n" +
    "                      'tweet--is-last':  $last}\"\n" +
    "           data=\"t\"></tweet>\n" +
    "  </div>\n" +
    "</div>");
}]);
})();

(function(module) {
try { module = angular.module("app-templates"); }
catch(err) { module = angular.module("app-templates", []); }
module.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("tweetsPopup.html",
    "<div class=\"tweets-popup\">\n" +
    "    <div class=\"tweets-popup__header\">Tweets for {{context.label}}</div>\n" +
    "\n" +
    "    <div class=\"tp-body\">\n" +
    "        <div class=\"tp-body__item\"\n" +
    "             ng-class=\"{'tp-body__item--last': $last}\"\n" +
    "             ng-repeat=\"t in context.tweets\">\n" +
    "            <tweet tweet=\"t\"></tweet>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>");
}]);
})();
