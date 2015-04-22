angular.module('app-templates', ['templates/menu.html']);

angular.module("templates/menu.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/menu.html",
    "<div class=\"app-menu\">\n" +
    "    <div class=\"am-item\">\n" +
    "        <button class=\"am-item__name\">Color</button>\n" +
    "    </div>\n" +
    "</div>");
}]);
