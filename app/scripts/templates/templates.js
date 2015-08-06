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
  $templateCache.put("panel.html",
    "<div class=\"panel\"\n" +
    "     ng-class=\"{'panel--open': panel.isOpen}\">\n" +
    "  <button class=\"p-name\"\n" +
    "          ng-click=\"openPanel()\">\n" +
    "    <div class=\"l-list-inline l-list-inline--collapsed\">\n" +
    "      <div class=\"l-list-inline__item is-middle-aligned\">\n" +
    "        <div class=\"p-name__icon\"\n" +
    "             style=\"background-image: url('/images/{{panel.id}}.png');\"></div>\n" +
    "      </div>\n" +
    "\n" +
    "      <div class=\"l-list-inline__item is-middle-aligned\">\n" +
    "        <div class=\"p-name__label\">{{panel.label}}</div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </button>\n" +
    "\n" +
    "  <div class=\"panel__counter\"\n" +
    "       ng-show=\"panel.tweets.length > 0\">{{panel.tweets.length}}\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"panel__dropdown\"\n" +
    "       ng-show=\"panel.isOpen\">\n" +
    "    <img ng-src=\"/images/{{panel.id}}-panel.png\" alt=\"{{panel.label}}\"/>\n" +
    "\n" +
    "    <div class=\"panel__tweets\"\n" +
    "         ng-if=\"panel.tweetsShown &&\n" +
    "                    panel.tweets.length > 0\">\n" +
    "      <tweets-popup context=\"panel\"></tweets-popup>\n" +
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
  $templateCache.put("panelbar.html",
    "<div class=\"toolbar toolbar--right\">\n" +
    "  <div ng-repeat=\"panel in panels\">\n" +
    "    <div class=\"toolbar__slot\"\n" +
    "         ng-if=\"!panel.divider\">\n" +
    "      <panel panel=\"panel\"></panel>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"toolbar__divider\"\n" +
    "         ng-if=\"tool.divider\"></div>\n" +
    "  </div>\n" +
    "</div>");
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
    "      <div class=\"tool\"\n" +
    "           ng-class=\"{'tool--open': tool.isOpen}\">\n" +
    "        <button class=\"t-primary\"\n" +
    "                ng-click=\"clickOpen(tool)\"\n" +
    "                ng-mouseenter=\"hoverOpen(tool)\">\n" +
    "          <div class=\"t-primary__icon\"\n" +
    "               ng-class=\"{'t-primary__icon--large': tool.largeIcon}\"\n" +
    "               style=\"background-image: url('/images/{{tool.id}}.png');\"></div>\n" +
    "\n" +
    "          <div class=\"t-primary__counter\"\n" +
    "               ng-show=\"tool.tweetsCount > 0\">{{tool.tweetsCount}}\n" +
    "          </div>\n" +
    "        </button>\n" +
    "\n" +
    "        <div class=\"tool__dropdown\"\n" +
    "             ng-show=\"tool.isOpen\"\n" +
    "             ng-if=\"tool.children.length\">\n" +
    "          <div class=\"t-secondary\"\n" +
    "               ng-class=\"{'t-secondary--first': $first}\"\n" +
    "               ng-repeat=\"subtool in tool.children\">\n" +
    "\n" +
    "            <button class=\"ts-button\"\n" +
    "                    ng-mouseover=\"hoverOpen(subtool)\">\n" +
    "              <div class=\"l-list-inline l-list-inline--x-small\">\n" +
    "                <div class=\"l-list-inline__item is-middle-aligned\">\n" +
    "                  <div class=\"ts-button__icon\"\n" +
    "                       style=\"background-image:\n" +
    "                       url('/images/{{subtool.id}}.png');\"></div>\n" +
    "                </div>\n" +
    "\n" +
    "                <div class=\"l-list-inline__item is-middle-aligned\">\n" +
    "                  <div class=\"ts-button__label\">{{subtool.label}}</div>\n" +
    "                </div>\n" +
    "              </div>\n" +
    "            </button>\n" +
    "\n" +
    "            <div class=\"t-secondary__counter\"\n" +
    "                 ng-show=\"subtool.tweetsCount > 0\">\n" +
    "              {{subtool.tweetsCount}}\n" +
    "            </div>\n" +
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
    "<div class=\"tweet\">\n" +
    "    <div class=\"l-media l-media--med\">\n" +
    "        <div class=\"l-media__figure\">\n" +
    "            <div class=\"tweet__author-avatar\"\n" +
    "                 style=\"background-image: url({{tweet.author.avatar}});\">\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"l-media__body\">\n" +
    "            <div class=\"l-block-x-small\">\n" +
    "                <div class=\"l-list-inline l-list-inline--x-small\">\n" +
    "                    <div class=\"l-list-inline__item is-middle-aligned\">\n" +
    "                        <div class=\"tweet__author-name\">\n" +
    "                            {{tweet.author.name}}\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "\n" +
    "                    <div class=\"l-list-inline__item is-middle-aligned\">\n" +
    "                        <div class=\"tweet__author-screen-name\">\n" +
    "                            @{{tweet.author.screenName}}\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"l-block-small\">\n" +
    "                <div class=\"tweet__text\">\n" +
    "                    <div>{{tweet.tweet.text}}</div>\n" +
    "\n" +
    "                    <a href=\"{{tweet.tweet.url}}\" class=\"tweet__link\"\n" +
    "                                                            target=\"_blank\">\n" +
    "                        {{tweet.tweet.url | characters:35}}\n" +
    "                    </a>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"l-split\">\n" +
    "                <div class=\"l-split__right\">\n" +
    "                    <button class=\"tweet__link\"\n" +
    "                            ng-click=\"activateTweet(tweet)\">see details</button>\n" +
    "                </div>\n" +
    "\n" +
    "                <div class=\"l-split__left\">\n" +
    "                    <div class=\"tweet__published\">\n" +
    "                        {{tweet.published | amDateFormat:'MMMM Do, h:mm a'}}\n" +
    "                    </div>\n" +
    "                </div>\n" +
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
  $templateCache.put("tweetList.html",
    "<div class=\"tweet-list\">\n" +
    "  <div class=\"tweet-list__title\">Tweets for the last 3 hours</div>\n" +
    "\n" +
    "  <div class=\"tweet-list__body\">\n" +
    "    <tweet data=\"t\"\n" +
    "           ng-repeat=\"t in tweets\">\n" +
    "    </tweet>\n" +
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
