angular.module('app-templates', ['templates/menu.html']);

angular.module("templates/menu.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/menu.html",
    "<script type=\"text/ng-template\" id=\"menuDropdown\">\n" +
    "    <div class=\"amd-item\">\n" +
    "        <div ng-mouseover=\"activate(item.label)\" ng-mouseleave=\"deactivate(rootItem.label)\" class=\"amd-item__name\">{{item.label}}</div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div ng-show=\"item.children.length\">\n" +
    "        <div class=\"am-dropdown am-dropdown--nested\">\n" +
    "            <div class=\"am-dropdown__slot\" ng-repeat=\"item in item.children\" ng-include=\"'menuDropdown'\"></div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</script>\n" +
    "\n" +
    "<div class=\"app-menu\">\n" +
    "    <ul class=\"l-list-inline l-list-inline--collapsed\">\n" +
    "        <li class=\"l-list-inline__item\" ng-repeat=\"rootItem in menuItems\">\n" +
    "            <div class=\"app-menu__slot\">\n" +
    "                <div class=\"am-item\">\n" +
    "                    <div ng-mouseover=\"activate(rootItem.label)\" ng-mouseleave=\"deactivate(rootItem.label)\" class=\"am-item__name\">{{rootItem.label}}</div>\n" +
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
