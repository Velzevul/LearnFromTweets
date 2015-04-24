angular.module('app-templates', ['templates/menu.html', 'templates/twitterWidget.html']);

angular.module("templates/menu.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/menu.html",
    "<script type=\"text/ng-template\" id=\"menuDropdown\">\n" +
    "    <div class=\"amd-item\" ng-class=\"{'amd-item--active': item.isActive,\n" +
    "                                     'amd-item--parent': item.children.length,\n" +
    "                                     'amd-item--highlighted': item.isHighlighted}\">\n" +
    "        <button ng-mouseover=\"activate(item.label)\" ng-mouseleave=\"deactivate(item.label)\" class=\"amd-item__name\">{{item.label}}</button>\n" +
    "    </div>\n" +
    "\n" +
    "    <div ng-show=\"item.children.length\">\n" +
    "        <div class=\"am-dropdown am-dropdown--nested\" ng-show=\"item.isActive\">\n" +
    "            <div class=\"am-dropdown__slot\" ng-repeat=\"item in item.children\" ng-include=\"'menuDropdown'\"></div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</script>\n" +
    "\n" +
    "<div class=\"app-menu\">\n" +
    "    <ul class=\"l-list-inline l-list-inline--collapsed\">\n" +
    "        <li class=\"l-list-inline__item\" ng-repeat=\"rootItem in data.menu\">\n" +
    "            <div class=\"app-menu__slot\">\n" +
    "                <div class=\"am-item\" ng-class=\"{'am-item--active': rootItem.isActive}\">\n" +
    "                    <button ng-mouseover=\"activate(rootItem.label)\" ng-mouseleave=\"deactivate(rootItem.label)\" class=\"am-item__name\">{{rootItem.label}}</button>\n" +
    "                </div>\n" +
    "\n" +
    "                <div class=\"am-dropdown am-dropdown--root\" ng-show=\"rootItem.isActive\">\n" +
    "                    <div class=\"am-dropdown__slot\" ng-repeat=\"item in rootItem.children\" ng-include=\"'menuDropdown'\"></div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </li>\n" +
    "    </ul>\n" +
    "</div>\n" +
    "");
}]);

angular.module("templates/twitterWidget.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/twitterWidget.html",
    "<div class=\"twitter-widget\">\n" +
    "    <div class=\"tw-header\">\n" +
    "        <div class=\"tw-header__title\">Relevant tweets</div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"twitter-widget__body\">\n" +
    "        <div class=\"tweet\" ng-repeat=\"tweet in data.tweets\">\n" +
    "            <div class=\"l-block-x-small\">\n" +
    "                <div class=\"l-split\">\n" +
    "                    <div class=\"l-split__right\">\n" +
    "                        <div class=\"tweet__published\">{{tweet.published}}</div>\n" +
    "                    </div>\n" +
    "\n" +
    "                    <div class=\"l-split__left\">\n" +
    "                        <div class=\"l-list-inline l-list-inline--x-small\">\n" +
    "                            <div class=\"l-list-inline__item\">\n" +
    "                                <div class=\"tweet__author-avatar\" style=\"background-image: url({{tweet.author.avatar}});\"></div>\n" +
    "                            </div>\n" +
    "\n" +
    "                            <div class=\"l-list-inline__item\">\n" +
    "                                <div class=\"tweet__author-name\">@{{tweet.author.name}}</div>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"l-block-x-small\">\n" +
    "                <div class=\"tweet__command\"><button ng-click=\"highlight(tweet.command)\" class=\"tweet__link\">{{tweet.command}}</button></div>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"tweet__text\">{{tweet.text}}</div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>");
}]);
