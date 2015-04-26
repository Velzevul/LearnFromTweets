angular.module('app-templates', ['templates/historyPopup.html', 'templates/menu.html', 'templates/tweet.html', 'templates/tweetsWidget.html']);

angular.module("templates/historyPopup.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/historyPopup.html",
    "<div class=\"tweets-popup-history\">\n" +
    "    <div class=\"tweets-popup-history__thumb\"\n" +
    "         ng-mouseover=\"showPopup()\"\n" +
    "         ng-mouseleave=\"hidePopup()\">...</div>\n" +
    "\n" +
    "    <div class=\"tweets-popup__popup\"\n" +
    "         ng-show=\"visible\"\n" +
    "         ng-mouseover=\"showPopup()\"\n" +
    "         ng-mouseleave=\"hidePopup()\">\n" +
    "        tweets go here...\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("templates/menu.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/menu.html",
    "<script type=\"text/ng-template\" id=\"menuDropdown\">\n" +
    "    <tweets-widget context=\"item.label\" ng-if=\"!item.children.length\"></tweets-widget>\n" +
    "\n" +
    "    <div class=\"amd-item\"\n" +
    "         ng-class=\"{'amd-item--active': item.isActive,\n" +
    "                    'amd-item--parent': item.children.length,\n" +
    "                    'amd-item--highlighted': item.isHighlighted}\">\n" +
    "\n" +
    "\n" +
    "         <button class=\"amd-item__name\"\n" +
    "                 ng-mouseover=\"activate(item.label)\">{{item.label}}</button>\n" +
    "    </div>\n" +
    "\n" +
    "    <div ng-show=\"item.children.length\">\n" +
    "        <div class=\"am-dropdown am-dropdown--nested\"\n" +
    "             ng-show=\"item.isActive\">\n" +
    "            <div class=\"am-dropdown__slot\"\n" +
    "                 ng-repeat=\"item in item.children\"\n" +
    "                 ng-include=\"'menuDropdown'\"></div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</script>\n" +
    "\n" +
    "<div class=\"app-menu\">\n" +
    "    <ul class=\"l-list-inline l-list-inline--collapsed\">\n" +
    "        <li class=\"l-list-inline__item\"\n" +
    "            ng-repeat=\"rootItem in data.menu\">\n" +
    "            <div class=\"app-menu__slot\">\n" +
    "                <div class=\"am-item\"\n" +
    "                     ng-class=\"{'am-item--active': rootItem.isActive}\">\n" +
    "                    <button class=\"am-item__name\"\n" +
    "                            ng-mouseover=\"activate(rootItem.label)\">{{rootItem.label}}</button>\n" +
    "                </div>\n" +
    "\n" +
    "                <div class=\"am-dropdown am-dropdown--root\"\n" +
    "                     ng-show=\"rootItem.isActive\">\n" +
    "                    <div class=\"am-dropdown__slot\"\n" +
    "                         ng-repeat=\"item in rootItem.children\"\n" +
    "                         ng-include=\"'menuDropdown'\"></div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </li>\n" +
    "    </ul>\n" +
    "</div>\n" +
    "");
}]);

angular.module("templates/tweet.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/tweet.html",
    "<div class=\"tweet\" ng-repeat=\"tweet in data.tweets\">\n" +
    "    <div class=\"l-block-x-small\">\n" +
    "        <div class=\"l-split\">\n" +
    "            <div class=\"l-split__right\">\n" +
    "                <div class=\"tweet__published\">{{tweet.published}}</div>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"l-split__left\">\n" +
    "                <div class=\"l-list-inline l-list-inline--x-small\">\n" +
    "                    <div class=\"l-list-inline__item\">\n" +
    "                        <div class=\"tweet__author-avatar\" style=\"background-image: url({{tweet.author.avatar}});\"></div>\n" +
    "                    </div>\n" +
    "\n" +
    "                    <div class=\"l-list-inline__item\">\n" +
    "                        <div class=\"tweet__author-name\">@{{tweet.author.name}}</div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"l-block-x-small\">\n" +
    "        <div class=\"tweet__command\"><button ng-click=\"highlight(tweet.command)\" class=\"tweet__link\">{{tweet.command}}</button></div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"tweet__text\">{{tweet.text}}</div>\n" +
    "</div>");
}]);

angular.module("templates/tweetsWidget.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/tweetsWidget.html",
    "<div class=\"tweets-widget\">\n" +
    "    <div class=\"tweets-widget__slot\" ng-show=\"tweets.length\">\n" +
    "        <history-popup tweets=\"tweets\"></history-popup>\n" +
    "    </div>\n" +
    "</div>");
}]);
