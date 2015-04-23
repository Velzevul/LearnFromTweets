angular.module('app-templates', ['templates/menu.html']);

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
    "        <li class=\"l-list-inline__item\" ng-repeat=\"rootItem in menuItems\">\n" +
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
