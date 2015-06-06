(function(module) {
try { module = angular.module("app-templates"); }
catch(err) { module = angular.module("app-templates", []); }
module.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("activityPanel.html",
    "<div class=\"app-panel\" ng-show=\"filters.active\">\n" +
    "    <div class=\"ap-header\">\n" +
    "        <div class=\"l-split\">\n" +
    "            <div class=\"l-split__right\">\n" +
    "                <button class=\"link\" ng-click=\"toggleFilters()\">(close)</button>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"l-split__left\">\n" +
    "                <div class=\"ap-header__title\">Tweet acvitity</div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"grid grid--full\">\n" +
    "        <div class=\"grid__item two-thirds\">\n" +
    "            <div class=\"l-block-small\">\n" +
    "                <div class=\"ap-section\">\n" +
    "                    <div class=\"l-block-small\">\n" +
    "                        <div class=\"ap-section__header\">\n" +
    "                            <div class=\"ap-section__title\">Personalization</div>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "\n" +
    "                    <div class=\"l-list-inline\">\n" +
    "                        <div class=\"l-list-inline__item\">\n" +
    "                            <label>\n" +
    "                                <input type=\"checkbox\"\n" +
    "                                       ng-model=\"filters.highlightUnfamiliar\"> Show commands I do not know\n" +
    "                            </label>\n" +
    "                        </div>\n" +
    "\n" +
    "                        <div class=\"l-list-inline__item\">\n" +
    "                            <label>\n" +
    "                                <input type=\"checkbox\"\n" +
    "                                       ng-model=\"filters.highlightRelevant\"> Show commands relevant to my work\n" +
    "                            </label>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "            <timeline></timeline>\n" +
    "        </div><!--\n" +
    "        --><div class=\"grid__item one-third\">\n" +
    "            <authors-filter></authors-filter>\n" +
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
    "    <!--<div class=\"popup\"-->\n" +
    "         <!--ng-show=\"item.isHighlighted && !item.children.length\">-->\n" +
    "        <!--<div class=\"p-body\">-->\n" +
    "            <!--<div class=\"p-body__item\">-->\n" +
    "                <!--<tweet tweet=\"notification.tweet\"></tweet>-->\n" +
    "            <!--</div>-->\n" +
    "        <!--</div>-->\n" +
    "    <!--</div>-->\n" +
    "\n" +
    "    <!--<menu-popup context=\"item\"></menu-popup>-->\n" +
    "\n" +
    "    <div class=\"amd-item\"\n" +
    "         ng-class=\"{'amd-item--active': item.isOpen,\n" +
    "                    'amd-item--parent': item.children.length}\"\n" +
    "         ng-mouseover=\"open(item)\">\n" +
    "\n" +
    "        <button class=\"amd-item__name\">{{item.label}}</button>\n" +
    "    </div>\n" +
    "\n" +
    "    <div ng-show=\"item.children.length\">\n" +
    "        <div class=\"am-dropdown am-dropdown--nested\"\n" +
    "             ng-show=\"item.isOpen\">\n" +
    "            <div ng-repeat=\"item in item.children\">\n" +
    "                <div class=\"am-dropdown__slot\"\n" +
    "                     ng-hide=\"item.divider\"\n" +
    "                     ng-include=\"'menuDropdown'\"></div>\n" +
    "\n" +
    "                <div class=\"am-dropdown__divider\"\n" +
    "                     ng-show=\"item.divider\"></div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</script>\n" +
    "\n" +
    "<div class=\"app-menu\">\n" +
    "    <ul class=\"l-list-inline l-list-inline--collapsed\">\n" +
    "        <li class=\"l-list-inline__item\"\n" +
    "            ng-repeat=\"rootItem in menu\">\n" +
    "            <div class=\"app-menu__slot\">\n" +
    "                <!--<menu-popup context=\"rootItem\"></menu-popup>-->\n" +
    "\n" +
    "                <div class=\"am-item\"\n" +
    "                     ng-class=\"{'am-item--active': rootItem.isOpen}\"\n" +
    "                     ng-mouseover=\"open(rootItem)\">\n" +
    "                    <button class=\"am-item__name\">\n" +
    "                        <span class=\"l-list-inline l-list-inline--collapsed\">\n" +
    "                            <span class=\"l-list-inline__item is-middle-aligned\">\n" +
    "                                {{rootItem.label}}\n" +
    "                            </span>\n" +
    "\n" +
    "                            <span class=\"l-list-inline__item is-middle-aligned\"\n" +
    "                                  ng-show=\"filters.active\">\n" +
    "                            </span>\n" +
    "                        </span>\n" +
    "                    </button>\n" +
    "                </div>\n" +
    "\n" +
    "                <div class=\"am-dropdown am-dropdown--root\"\n" +
    "                     ng-show=\"rootItem.isOpen\">\n" +
    "                    <div ng-repeat=\"item in rootItem.children\">\n" +
    "                        <div class=\"am-dropdown__slot\"\n" +
    "                             ng-hide=\"item.divider\"\n" +
    "                             ng-include=\"'menuDropdown'\"></div>\n" +
    "\n" +
    "                        <div class=\"am-dropdown__divider\"\n" +
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
  $templateCache.put("menuPopup.html",
    "<div class=\"menu-popup\"\n" +
    "     ng-show=\"filtered.length\"\n" +
    "     ng-class=\"{'menu-popup--leaf': !context.children,\n" +
    "                'menu-popup--root': context.root }\">\n" +
    "    <div class=\"menu-popup__counter\"\n" +
    "         ng-class=\"{'menu-popup__counter--mixed': (filters.highlightUnknown || filters.highlightRelevant) && context.highlightType == 'mixed',\n" +
    "                    'menu-popup__counter--highlighted': (filters.highlightUnknown || filters.highlightRelevant) && context.highlightType == 'highlighted' }\"\n" +
    "         ng-show=\"filters.active\"\n" +
    "         ng-mouseover=\"show()\"\n" +
    "         ng-mouseleave=\"hide()\">{{filtered.length}}</div>\n" +
    "\n" +
    "    <div ng-hide=\"context.root\">\n" +
    "        <div class=\"menu-popup__indicator\"\n" +
    "             ng-show=\"!filters.active\"\n" +
    "             ng-mouseover=\"show()\"\n" +
    "             ng-mouseleave=\"hide()\">...</div>\n" +
    "\n" +
    "        <div class=\"popup\"\n" +
    "             ng-show=\"popupVisible\"\n" +
    "             ng-mouseover=\"show()\"\n" +
    "             ng-mouseleave=\"hide()\">\n" +
    "            <div class=\"p-header\">\n" +
    "                <div class=\"p-header__title\">Tweets about '{{context.label}}'</div>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"p-body p-body--limited\">\n" +
    "                <div class=\"p-body__item\"\n" +
    "                     ng-class=\"{'p-body__item--last': $last}\"\n" +
    "                     ng-repeat=\"t in filtered\">\n" +
    "                    <tweet tweet=\"t\"></tweet>\n" +
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
  $templateCache.put("panel.html",
    "<div class=\"panelbar-item\">\n" +
    "    <button class=\"pi-panelname\"\n" +
    "            ng-click=\"openPanel()\">\n" +
    "        <div class=\"l-list-inline l-list-inline--collapsed\">\n" +
    "            <div class=\"l-list-inline__item is-middle-aligned\">\n" +
    "                <div class=\"pi-panelname__icon\"\n" +
    "                     style=\"background-image: url('/images/{{panel.id}}.png');\"></div>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"l-list-inline__item is-middle-aligned\">\n" +
    "                <div class=\"pi-panelname__label\">{{panel.label}}</div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </button>\n" +
    "\n" +
    "    <div class=\"panelbar-item__dropdown\"\n" +
    "         ng-show=\"panel.isOpen\">\n" +
    "        <img ng-src=\"/images/{{panel.id}}-panel.png\" alt=\"{{panel.label}}\"/>\n" +
    "    </div>\n" +
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
    "    <div ng-repeat=\"panel in panels\">\n" +
    "        <div class=\"toolbar__slot\"\n" +
    "             ng-if=\"!panel.divider\">\n" +
    "            <panel panel=\"panel\"></panel>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"toolbar__divider\"\n" +
    "             ng-if=\"tool.divider\"></div>\n" +
    "    </div>\n" +
    "</div>");
}]);
})();

(function(module) {
try { module = angular.module("app-templates"); }
catch(err) { module = angular.module("app-templates", []); }
module.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("timeline.html",
    "<div class=\"ap-section\">\n" +
    "    <div class=\"l-block\">\n" +
    "        <div class=\"l-split\">\n" +
    "            <div class=\"l-split__right\">\n" +
    "                <button class=\"link\"\n" +
    "                        ng-show=\"filters.time\"\n" +
    "                        ng-click=\"resetTimeFilter()\">clear filter</button>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"l-split__left\">\n" +
    "                <div class=\"ap-section__title\">{{nTweets}} tweets in {{lowerTimeBound | amDateFormat:'MMM Do h:mm'}} - {{upperTimeBound | amDateFormat:'MMM Do h:mm'}}</div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"timeline-slot\">\n" +
    "        <div id=\"timeline\"></div>\n" +
    "    </div>\n" +
    "</div>");
}]);
})();

(function(module) {
try { module = angular.module("app-templates"); }
catch(err) { module = angular.module("app-templates", []); }
module.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("toolbar.html",
    "<div class=\"toolbar toolbar--left\">\n" +
    "    <div ng-repeat=\"tool in tools\">\n" +
    "        <div class=\"toolbar__slot\"\n" +
    "             ng-if=\"!tool.divider\">\n" +
    "            <toolbar-item tool=\"tool\"></toolbar-item>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"toolbar__divider\"\n" +
    "             ng-if=\"tool.divider\"></div>\n" +
    "    </div>\n" +
    "</div>");
}]);
})();

(function(module) {
try { module = angular.module("app-templates"); }
catch(err) { module = angular.module("app-templates", []); }
module.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("toolbarItem.html",
    "<div class=\"toolbar-item\">\n" +
    "    <button class=\"ti-tool\"\n" +
    "            ng-click=\"openSubtools()\">\n" +
    "        <div class=\"ti-tool__icon\"\n" +
    "             ng-class=\"{'ti-tool__icon--large': tool.largeIcon}\"\n" +
    "             style=\"background-image: url('/images/{{tool.id}}.png');\"></div>\n" +
    "    </button>\n" +
    "\n" +
    "    <div class=\"toolbar-item__dropdown\"\n" +
    "         ng-show=\"tool.isOpen\"\n" +
    "         ng-if=\"tool.children\">\n" +
    "        <button class=\"ti-subtool\"\n" +
    "                ng-class=\"{'ti-subtool--first': $first}\"\n" +
    "                ng-repeat=\"subtool in tool.children\">\n" +
    "            <div class=\"l-list-inline l-list-inline--x-small\">\n" +
    "                <div class=\"l-list-inline__item is-middle-aligned\">\n" +
    "                    <div class=\"ti-subtool__icon\"\n" +
    "                         style=\"background-image: url('/images/{{subtool.id}}.png');\"></div>\n" +
    "                </div>\n" +
    "\n" +
    "                <div class=\"l-list-inline__item is-middle-aligned\">\n" +
    "                    <div class=\"ti-subtool__label\">{{subtool.label}}</div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </button>\n" +
    "    </div>\n" +
    "</div>");
}]);
})();

(function(module) {
try { module = angular.module("app-templates"); }
catch(err) { module = angular.module("app-templates", []); }
module.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("tweet.html",
    "<div class=\"tweet\">\n" +
    "    <div class=\"l-block-x-small\">\n" +
    "        <div class=\"l-split\">\n" +
    "            <div class=\"l-split__right\">\n" +
    "                <div class=\"tweet__published\" am-time-ago=\"tweet.published\"></div>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"l-split__left\">\n" +
    "                <div class=\"l-list-inline l-list-inline--x-small\">\n" +
    "                    <div class=\"l-list-inline__item\">\n" +
    "                        <div class=\"tweet__author-avatar\"\n" +
    "                             style=\"background-image: url({{tweet.author.avatar}});\"></div>\n" +
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
    "        <div class=\"tweet__text\">{{tweet.text}}</div>\n" +
    "    </div>\n" +
    "\n" +
    "    here be actions...\n" +
    "</div>");
}]);
})();
