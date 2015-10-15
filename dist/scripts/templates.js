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
  $templateCache.put("admin.html",
    "<top-menu menu=\"menuItems\"\n" +
    "          item-activate-callback=\"activateItem\"\n" +
    "          item-hover-callback=\"itemHoverHandler\"\n" +
    "          item-leave-callback=\"itemLeaveHandler\"\n" +
    "          root-item-click-callback=\"rootItemClickHandler\"\n" +
    "          root-item-hover-callback=\"rootItemHoverHandler\"\n" +
    "          root-item-leave-callback=\"rootItemLeaveHandler\"></top-menu>\n" +
    "\n" +
    "<toolbar menu=\"toolbarItems\"\n" +
    "         item-activate-callback=\"activateItem\"\n" +
    "         item-hover-callback=\"itemHoverHandler\"\n" +
    "         item-leave-callback=\"itemLeaveHandler\"\n" +
    "         root-item-click-callback=\"rootItemClickHandler\"\n" +
    "         root-item-hover-callback=\"rootItemHoverHandler\"\n" +
    "         root-item-leave-callback=\"rootItemLeaveHandler\"></toolbar>\n" +
    "\n" +
    "<panelbar menu=\"panelbarItems\"\n" +
    "          item-activate-callback=\"activateItem\"\n" +
    "          item-hover-callback=\"itemHoverHandler\"\n" +
    "          item-leave-callback=\"itemLeaveHandler\"\n" +
    "          root-item-click-callback=\"rootItemClickHandler\"\n" +
    "          root-item-hover-callback=\"rootItemHoverHandler\"\n" +
    "          root-item-leave-callback=\"rootItemLeaveHandler\"></panelbar>\n" +
    "\n" +
    "<div class=\"admin-panel\">\n" +
    "  <h1 class=\"admin-panel__title\">Add a Tweet</h1>\n" +
    "\n" +
    "  <div class=\"admin-panel__section\">\n" +
    "    <label for=\"tweetId\">Tweet ID: </label>\n" +
    "    <input id=\"tweetId\" type=\"text\" ng-model=\"tweetId\">\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"admin-panel__section\">\n" +
    "    <div class=\"l-list-inline l-list-inline--small\">\n" +
    "      <div class=\"l-list-inline__item\">\n" +
    "        <button class=\"admin-panel__button-simple\"\n" +
    "                ng-click=\"check()\">Check tweet id</button>\n" +
    "      </div>\n" +
    "\n" +
    "      <div class=\"l-list-inline__item\">\n" +
    "        <div class=\"admin-panel__status\"\n" +
    "             ng-show=\"tweetStatus\">\n" +
    "          {{tweetStatus}}\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"admin-panel__section\">\n" +
    "    <label for=\"thumbLink\">Thumbnail: </label>\n" +
    "    <input id=\"thumbLink\" type=\"text\" ng-model=\"previewImageUrl\"/>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"grid grid--full grid--middle admin-panel__section\">\n" +
    "    <div class=\"grid__item one-twelfth admin-panel__command-label\">Menu Items</div>\n" +
    "    <!--\n" +
    "            -->\n" +
    "    <div class=\"grid__item eleven-twelfths\">\n" +
    "      <div class=\"admin-panel__command-items\">\n" +
    "        <div class=\"admin-panel__commands\" ng-repeat=\"selectedMenuItem in selectedMenuItems\">\n" +
    "          <select ng-options=\"menuItem.id as menuItem.id for menuItem in menuItems.terminalItems\"\n" +
    "                  ng-model=\"selectedMenuItem.id\"></select>\n" +
    "          <button class=\"admin-panel__button-simple\" ng-click=\"removeMenuItem(selectedMenuItem)\">X</button>\n" +
    "        </div>\n" +
    "        <button class=\"admin-panel__button-simple\" ng-click=\"addMenuItem()\">+</button>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"grid grid--full grid--middle admin-panel__section\">\n" +
    "    <div class=\"grid__item one-twelfth admin-panel__command-label\">Panels</div>\n" +
    "    <!--\n" +
    "            -->\n" +
    "    <div class=\"grid__item eleven-twelfths\">\n" +
    "      <div class=\"admin-panel__command-items\">\n" +
    "        <div class=\"admin-panel__commands\" ng-repeat=\"selectedPanelbarItem in selectedPanelbarItems\">\n" +
    "          <select ng-options=\"panelbarItem.id as panelbarItem.id for panelbarItem in panelbarItems.terminalItems\"\n" +
    "                  ng-model=\"selectedPanelbarItem.id\"></select>\n" +
    "          <button class=\"admin-panel__button-simple\" ng-click=\"removePanelbarItem(selectedMenuItem)\">X</button>\n" +
    "        </div>\n" +
    "        <button class=\"admin-panel__button-simple\" ng-click=\"addPanelbarItem()\">+</button>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"grid grid--full grid--middle admin-panel__section\">\n" +
    "    <div class=\"grid__item one-twelfth admin-panel__command-label\">Tools</div>\n" +
    "    <!--\n" +
    "            -->\n" +
    "    <div class=\"grid__item eleven-twelfths\">\n" +
    "      <div class=\"admin-panel__command-items\">\n" +
    "        <div class=\"admin-panel__commands\" ng-repeat=\"selectedToolbarItem in selectedToolbarItems\">\n" +
    "          <select ng-options=\"toolbarItem.id as toolbarItem.id for toolbarItem in toolbarItems.terminalItems\"\n" +
    "                  ng-model=\"selectedToolbarItem.id\"></select>\n" +
    "          <button class=\"admin-panel__button-simple\" ng-click=\"removeToolbarItem(selectedMenuItem)\">X</button>\n" +
    "        </div>\n" +
    "        <button class=\"admin-panel__button-simple\" ng-click=\"addToolbarItem()\">+</button>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"admin-panel__section\">\n" +
    "    <button class=\"admin-panel__button-simple\" id=\"submit\" ng-click=\"submit()\">Submit</button>\n" +
    "  </div>\n" +
    "</div>");
}]);
})();

(function(module) {
try { module = angular.module("app-templates"); }
catch(err) { module = angular.module("app-templates", []); }
module.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("app.html",
    "<top-menu menu=\"menu\"\n" +
    "          item-activate-callback=\"activateItem\"\n" +
    "          item-hover-callback=\"itemHoverHandler\"\n" +
    "          item-leave-callback=\"itemLeaveHandler\"\n" +
    "          root-item-click-callback=\"rootItemClickHandler\"\n" +
    "          root-item-hover-callback=\"rootItemHoverHandler\"\n" +
    "          root-item-leave-callback=\"rootItemLeaveHandler\"></top-menu>\n" +
    "\n" +
    "<toolbar menu=\"toolbar\"\n" +
    "         item-activate-callback=\"activateItem\"\n" +
    "         item-hover-callback=\"itemHoverHandler\"\n" +
    "         item-leave-callback=\"itemLeaveHandler\"\n" +
    "         root-item-click-callback=\"rootItemClickHandler\"\n" +
    "         root-item-hover-callback=\"rootItemHoverHandler\"\n" +
    "         root-item-leave-callback=\"rootItemLeaveHandler\"></toolbar>\n" +
    "\n" +
    "<panelbar menu=\"panelbar\"\n" +
    "          item-activate-callback=\"activateItem\"\n" +
    "          item-hover-callback=\"itemHoverHandler\"\n" +
    "          item-leave-callback=\"itemLeaveHandler\"\n" +
    "          root-item-click-callback=\"rootItemClickHandler\"\n" +
    "          root-item-hover-callback=\"rootItemHoverHandler\"\n" +
    "          root-item-leave-callback=\"rootItemLeaveHandler\"></panelbar>\n" +
    "\n" +
    "<div class=\"app-body\">\n" +
    "  <div class=\"app-body__wrapper\">\n" +
    "    <div class=\"app-body__timeline\">\n" +
    "      <timeline tweets=\"tweets\"></timeline>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"app-body__tweet-list\">\n" +
    "      <tweet-list tweets=\"tweets\"></tweet-list>\n" +
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
  $templateCache.put("journal.html",
    "<div class=\"admin-panel\">\n" +
    "  <div class=\"l-block-med is-center-aligned\">\n" +
    "    <h1 class=\"admin-panel__title\">Journal Entry</h1>\n" +
    "    <div class=\"admin-panel__subtitle\">participant {{participantId}}</div>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"l-block-med\">\n" +
    "    <div class=\"journal-question\">\n" +
    "      <div class=\"l-block-x-small\">\n" +
    "        <div class=\"journal-question__body\">\n" +
    "          How many tweets did you see today that you found interesting?\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"journal-question__error\"\n" +
    "             ng-show=\"entry.errors.interestingTweetsFound\">\n" +
    "          {{entry.errors.interestingTweetsFound}}\n" +
    "        </div>\n" +
    "      </div>\n" +
    "\n" +
    "      <div class=\"l-block-x-small\">\n" +
    "        <label>\n" +
    "          <input ng-model=\"entry.interestingTweetsFound\"\n" +
    "                 class=\"journal-question__input\"\n" +
    "                 type=\"radio\"\n" +
    "                 name=\"q1\"\n" +
    "                 value=\"less than 3\"/>\n" +
    "          <span class=\"journal-question__option\">Less than 3</span>\n" +
    "        </label>\n" +
    "      </div>\n" +
    "\n" +
    "      <div class=\"l-block-x-small\">\n" +
    "        <label>\n" +
    "          <input ng-model=\"entry.interestingTweetsFound\"\n" +
    "                 class=\"journal-question__input\"\n" +
    "                 type=\"radio\"\n" +
    "                 name=\"q1\"\n" +
    "                 value=\"3 to 5\"/>\n" +
    "          <span class=\"journal-question__option\">3 to 5</span>\n" +
    "        </label>\n" +
    "      </div>\n" +
    "\n" +
    "      <div class=\"l-block-x-small\">\n" +
    "        <label>\n" +
    "          <input ng-model=\"entry.interestingTweetsFound\"\n" +
    "                 class=\"journal-question__input\"\n" +
    "                 type=\"radio\"\n" +
    "                 name=\"q1\"\n" +
    "                 value=\"6 to 10\"/>\n" +
    "          <span class=\"journal-question__option\">6 to 10</span>\n" +
    "        </label>\n" +
    "      </div>\n" +
    "\n" +
    "      <div class=\"l-block-x-small\">\n" +
    "        <label>\n" +
    "          <input ng-model=\"entry.interestingTweetsFound\"\n" +
    "                 class=\"journal-question__input\"\n" +
    "                 type=\"radio\"\n" +
    "                 name=\"q1\"\n" +
    "                 value=\"11 to 20\"/>\n" +
    "          <span class=\"journal-question__option\">11 to 20</span>\n" +
    "        </label>\n" +
    "      </div>\n" +
    "\n" +
    "      <label>\n" +
    "        <input ng-model=\"entry.interestingTweetsFound\"\n" +
    "               class=\"journal-question__input\"\n" +
    "               type=\"radio\"\n" +
    "               name=\"q1\"\n" +
    "               value=\"more than 20\"/>\n" +
    "        <span class=\"journal-question__option\">more than 20</span>\n" +
    "      </label>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"l-block-med\">\n" +
    "    <label class=\"journal-question\">\n" +
    "      <div class=\"l-block-x-small\">\n" +
    "        <div class=\"journal-question__body\">\n" +
    "          For one or several tweets that you found interesting, please describe why you found them interesting.\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"journal-question__error\"\n" +
    "             ng-show=\"entry.errors.interestingTweetsDescription\">\n" +
    "          {{entry.errors.interestingTweetsDescription}}\n" +
    "        </div>\n" +
    "      </div>\n" +
    "\n" +
    "      <textarea class=\"journal-question__textarea\"\n" +
    "                ng-model=\"entry.interestingTweetsDescription\"\n" +
    "                cols=\"40\"\n" +
    "                rows=\"7\"></textarea>\n" +
    "    </label>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"l-block-med\">\n" +
    "    <div class=\"journal-question\">\n" +
    "      <div class=\"l-block-x-small\">\n" +
    "        <div class=\"journal-question__body\">\n" +
    "          How many new things did you learn today? E.g. new tools, new commands, new techniques.\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"journal-question__error\"\n" +
    "             ng-show=\"entry.errors.newThingsLearnt\">\n" +
    "          {{entry.errors.newThingsLearnt}}\n" +
    "        </div>\n" +
    "      </div>\n" +
    "\n" +
    "      <div class=\"l-block-x-small\">\n" +
    "        <label>\n" +
    "          <input ng-model=\"entry.newThingsLearnt\"\n" +
    "                 class=\"journal-question__input\"\n" +
    "                 type=\"radio\"\n" +
    "                 name=\"q2\"\n" +
    "                 value=\"None\"/>\n" +
    "          <span class=\"journal-question__option\">None</span>\n" +
    "        </label>\n" +
    "      </div>\n" +
    "\n" +
    "      <div class=\"l-block-x-small\">\n" +
    "        <label>\n" +
    "          <input ng-model=\"entry.newThingsLearnt\"\n" +
    "                 class=\"journal-question__input\"\n" +
    "                 type=\"radio\"\n" +
    "                 name=\"q2\"\n" +
    "                 value=\"1 to 2\"/>\n" +
    "          <span class=\"journal-question__option\">1 to 2</span>\n" +
    "        </label>\n" +
    "      </div>\n" +
    "\n" +
    "      <div class=\"l-block-x-small\">\n" +
    "        <label>\n" +
    "          <input ng-model=\"entry.newThingsLearnt\"\n" +
    "                 class=\"journal-question__input\"\n" +
    "                 type=\"radio\"\n" +
    "                 name=\"q2\"\n" +
    "                 value=\"3 to 5\"/>\n" +
    "          <span class=\"journal-question__option\">3 to 5</span>\n" +
    "        </label>\n" +
    "      </div>\n" +
    "\n" +
    "      <div class=\"l-block-x-small\">\n" +
    "        <label>\n" +
    "          <input ng-model=\"entry.newThingsLearnt\"\n" +
    "                 class=\"journal-question__input\"\n" +
    "                 type=\"radio\"\n" +
    "                 name=\"q2\"\n" +
    "                 value=\"6 to 10\"/>\n" +
    "          <span class=\"journal-question__option\">6 to 10</span>\n" +
    "        </label>\n" +
    "      </div>\n" +
    "\n" +
    "      <label>\n" +
    "        <input ng-model=\"entry.newThingsLearnt\"\n" +
    "               class=\"journal-question__input\"\n" +
    "               type=\"radio\"\n" +
    "               name=\"q2\"\n" +
    "               value=\"more than 10\"/>\n" +
    "        <span class=\"journal-question__option\">more than 10</span>\n" +
    "      </label>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"l-block-med\">\n" +
    "    <label class=\"journal-question\">\n" +
    "      <div class=\"l-block-x-small\">\n" +
    "        <div class=\"journal-question__body\">\n" +
    "          In a few sentences, describe any new things that you learned today.\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"journal-question__error\"\n" +
    "             ng-show=\"entry.errors.newThingsDescription\">\n" +
    "          {{entry.errors.newThingsDescription}}\n" +
    "        </div>\n" +
    "      </div>\n" +
    "\n" +
    "      <textarea ng-model=\"entry.newThingsDescription\"\n" +
    "                rows=\"7\"\n" +
    "                class=\"journal-question__textarea\"></textarea>\n" +
    "    </label>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"l-block\">\n" +
    "    <label class=\"journal-question\">\n" +
    "      <div class=\"l-block-x-small\">\n" +
    "        <div class=\"journal-question__body\">\n" +
    "          Please, provide us with any addition feedback that you might have on your experiences with the system today (e.g. general impressions, suggestions, difficulties you encountered)\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"journal-question__error\"\n" +
    "             ng-show=\"entry.errors.freeFormFeedback\">\n" +
    "          {{entry.errors.freeFormFeedback}}\n" +
    "        </div>\n" +
    "      </div>\n" +
    "\n" +
    "      <textarea ng-model=\"entry.freeFormFeedback\"\n" +
    "                rows=\"7\"\n" +
    "                class=\"journal-question__textarea\"></textarea>\n" +
    "    </label>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"is-center-aligned\">\n" +
    "    <button class=\"admin-panel__button\"\n" +
    "            ng-click=\"submit()\">Submit</button>\n" +
    "  </div>\n" +
    "</div>");
}]);
})();

(function(module) {
try { module = angular.module("app-templates"); }
catch(err) { module = angular.module("app-templates", []); }
module.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("menu.html",
    "<script type=\"text/ng-template\"\n" +
    "        id=\"menuDropdown\">\n" +
    "  <div class=\"md-item\"\n" +
    "       ng-class=\"{'md-item--highlighted': item.isHighlighted,\n" +
    "                  'md-item--parent': item.children.length}\"\n" +
    "       ng-mouseenter=\"itemHoverCallback(menu, item)\"\n" +
    "       ng-mouseleave=\"itemLeaveCallback(item)\">\n" +
    "\n" +
    "    <div class=\"md-item__counter\"\n" +
    "         ng-show=\"item.tweetsCount > 0\">{{item.tweetsCount}}\n" +
    "    </div>\n" +
    "\n" +
    "    <button class=\"md-item__name\"\n" +
    "            ng-click=\"itemActivateCallback(menu, item, $event)\">{{item.label}}\n" +
    "    </button>\n" +
    "  </div>\n" +
    "\n" +
    "  <div ng-show=\"item.children.length\">\n" +
    "    <div class=\"m-dropdown m-dropdown--nested\"\n" +
    "         ng-show=\"item.isOpen\">\n" +
    "      <div ng-repeat=\"item in item.children\">\n" +
    "        <div class=\"m-dropdown__slot\"\n" +
    "             ng-hide=\"item.divider\"\n" +
    "             ng-include=\"'menuDropdown'\"></div>\n" +
    "\n" +
    "        <div class=\"m-dropdown__divider\"\n" +
    "             ng-show=\"item.divider\"></div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</script>\n" +
    "\n" +
    "<div class=\"menu js-menu js-top-menu\">\n" +
    "  <ul class=\"l-list-inline l-list-inline--collapsed\">\n" +
    "    <li class=\"l-list-inline__item\"\n" +
    "        ng-repeat=\"rootItem in menu.all\">\n" +
    "      <div class=\"menu__slot\">\n" +
    "        <div class=\"m-item\"\n" +
    "             ng-class=\"{'m-item--highlighted': rootItem.isHighlighted}\"\n" +
    "             ng-mouseenter=\"rootItemHoverCallback(menu, rootItem)\"\n" +
    "             ng-mouseleave=\"rootItemLeaveCallback(menu, rootItem)\"\n" +
    "             ng-click=\"rootItemClickCallback(menu, rootItem)\">\n" +
    "          <button class=\"m-item__name\">{{rootItem.label}}</button>\n" +
    "\n" +
    "          <div class=\"m-item__counter\"\n" +
    "               ng-show=\"rootItem.tweetsCount > 0\">\n" +
    "            {{rootItem.tweetsCount}}\n" +
    "          </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"m-dropdown m-dropdown--root\"\n" +
    "             ng-show=\"rootItem.isOpen\">\n" +
    "          <div ng-repeat=\"item in rootItem.children\">\n" +
    "            <div class=\"m-dropdown__slot\"\n" +
    "                 ng-hide=\"item.divider\"\n" +
    "                 ng-include=\"'menuDropdown'\"></div>\n" +
    "\n" +
    "            <div class=\"m-dropdown__divider\"\n" +
    "                 ng-show=\"item.divider\"></div>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </li>\n" +
    "  </ul>\n" +
    "</div>");
}]);
})();

(function(module) {
try { module = angular.module("app-templates"); }
catch(err) { module = angular.module("app-templates", []); }
module.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("panelbar.html",
    "<div class=\"toolbar toolbar--right js-menu js-panelbar\">\n" +
    "  <div ng-repeat=\"item in menu.all\">\n" +
    "    <div class=\"toolbar__slot\">\n" +
    "      <button class=\"t-item\"\n" +
    "              ng-class=\"{'t-item--highlighted': item.isHighlighted}\"\n" +
    "              ng-click=\"rootItemClickCallback(menu, item)\"\n" +
    "              ng-mouseenter=\"rootItemHoverCallback(menu, item)\"\n" +
    "              ng-mouseleave=\"rootItemLeaveCallback(menu, item)\">\n" +
    "        <div class=\"l-list-inline l-list-inline--x-small\">\n" +
    "          <div class=\"l-list-inline__item is-middle-aligned\">\n" +
    "            <div class=\"t-item__icon\"\n" +
    "                 style=\"background-image: url('{{rootPrefix + '/images/' + item.id}}.png');\">\n" +
    "            </div>\n" +
    "          </div>\n" +
    "\n" +
    "          <div class=\"l-list-inline__item is-middle-aligned\">\n" +
    "            <div class=\"t-item__label\">{{item.label}}</div>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"t-item__counter t-item__counter--rev\"\n" +
    "             ng-show=\"item.tweetsCount > 0\">{{item.tweetsCount}}</div>\n" +
    "      </button>\n" +
    "\n" +
    "      <div class=\"t-dropdown t-dropdown--rev\"\n" +
    "           ng-show=\"item.isOpen\">\n" +
    "        <button ng-click=\"itemActivateCallback(menu, item, $event)\">\n" +
    "          <img ng-src=\"{{rootPrefix + '/images/' + item.id}}-panel.png\" alt=\"{{item.label}}\"/>\n" +
    "        </button>\n" +
    "      </div>\n" +
    "    </div>\n" +
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
    "<div id=\"js-timeline\"\n" +
    "     class=\"timeline\">\n" +
    "</div>");
}]);
})();

(function(module) {
try { module = angular.module("app-templates"); }
catch(err) { module = angular.module("app-templates", []); }
module.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("toolbar.html",
    "<div class=\"toolbar toolbar--left js-menu js-toolbar\">\n" +
    "  <div ng-repeat=\"item in menu.all\">\n" +
    "    <div class=\"toolbar__slot\"\n" +
    "         ng-if=\"!item.divider\">\n" +
    "      <div class=\"t-item\"\n" +
    "           ng-click=\"rootItemClickCallback(menu, item)\"\n" +
    "           ng-mouseenter=\"rootItemHoverCallback(menu, item)\"\n" +
    "           ng-mouseleave=\"rootItemLeaveCallback(menu, item)\"\n" +
    "           ng-class=\"{'t-item--highlighted': item.isHighlighted}\">\n" +
    "\n" +
    "        <button class=\"t-item__icon\"\n" +
    "                ng-class=\"{'t-item__icon--large': item.largeIcon}\"\n" +
    "                style=\"background-image: url('{{rootPrefix + '/images/' + item.id}}.png');\"\n" +
    "                ng-click=\"itemActivateCallback(menu, item, $event)\">\n" +
    "        </button>\n" +
    "\n" +
    "        <div class=\"t-item__counter\"\n" +
    "             ng-show=\"item.tweetsCount > 0\">{{item.tweetsCount}}</div>\n" +
    "      </div>\n" +
    "\n" +
    "      <div class=\"t-dropdown\"\n" +
    "           ng-show=\"item.isOpen\"\n" +
    "           ng-if=\"item.children.length\">\n" +
    "        <div class=\"t-dropdown__slot\"\n" +
    "             ng-repeat=\"subitem in item.children\">\n" +
    "          <button class=\"td-item\"\n" +
    "                  ng-mouseenter=\"itemHoverCallback(menu, subitem)\"\n" +
    "                  ng-mouseleave=\"itemLeaveCallback(subitem)\"\n" +
    "                  ng-class=\"{'td-item--first': $first,\n" +
    "                        'td-item--highlighted': subitem.isHighlighted}\"\n" +
    "                  ng-click=\"itemActivateCallback(menu, subitem, $event)\">\n" +
    "            <div class=\"l-list-inline l-list-inline--x-small\">\n" +
    "              <div class=\"l-list-inline__item is-middle-aligned\">\n" +
    "                <div class=\"td-item__icon\"\n" +
    "                     ng-class=\"{'td-item__icon--large': subitem.largeIcon}\"\n" +
    "                     style=\"background-image:\n" +
    "                     url('{{rootPrefix + '/images/' + subitem.id}}.png');\"></div>\n" +
    "              </div>\n" +
    "\n" +
    "              <div class=\"l-list-inline__item is-middle-aligned\">\n" +
    "                <div class=\"td-item__label\">{{subitem.label}}</div>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"td-item__counter\"\n" +
    "                 ng-show=\"subitem.tweetsCount > 0\">{{subitem.tweetsCount}}</div>\n" +
    "          </button>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"toolbar__divider\"\n" +
    "         ng-if=\"item.divider\"></div>\n" +
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
    "      {{data.author.name}} retweeted <span am-time-ago=\"data.createdAt\"></span>\n" +
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
    "        <div class=\"tweet__extra tweet__extra--pre-dot\"\n" +
    "             am-time-ago=\"tweet.createdAt\"></div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"l-block-small\">\n" +
    "      <div class=\"tweet__text\" ng-bind-html=\"tweet.text\"></div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"l-block-small tweet__preview-image-wrapper\"\n" +
    "         ng-show=\"tweet.previewImageUrl\">\n" +
    "      <img src=\"{{tweet.previewImageUrl}}\"\n" +
    "           class=\"tweet__preview-image\"/>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"l-block-small\">\n" +
    "      <div class=\"commands-table\">\n" +
    "        <div class=\"commands-table__cell\">\n" +
    "          <div class=\"commands-header\">Menu items:</div>\n" +
    "\n" +
    "          <div class=\"command\"\n" +
    "               ng-repeat=\"item in tweet.menu | limitTo: data.id === filters.activeTweetId ? tweet.menu.length : 2\"\n" +
    "               ng-mouseenter=\"commandHover('menu', item.id)\"\n" +
    "               ng-mouseleave=\"commandHoverEnd('menu', item.id)\"\n" +
    "               ng-click=\"commandClick('menu', item.id, $event)\">{{item.label | characters:25}}</div>\n" +
    "\n" +
    "          <div class=\"command\"\n" +
    "               ng-show=\"data.id !== filters.activeTweetId && tweet.menu.length > 2\">...</div>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"commands-table__cell commands-table__cell--pre-border\">\n" +
    "          <div class=\"commands-header\">Panels:</div>\n" +
    "\n" +
    "          <div class=\"command\"\n" +
    "               ng-repeat=\"item in tweet.panelbar | limitTo: data.id === filters.activeTweetId ? tweet.panelbar.length : 2\"\n" +
    "               ng-mouseenter=\"commandHover('panelbar', item.id)\"\n" +
    "               ng-mouseleave=\"commandHoverEnd('panelbar', item.id)\"\n" +
    "               ng-click=\"commandClick('panelbar', item.id, $event)\">{{item.label | characters:25}}</div>\n" +
    "\n" +
    "          <div class=\"command\"\n" +
    "               ng-show=\"data.id !== filters.activeTweetId && tweet.panelbar.length > 2\">...</div>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"commands-table__cell commands-table__cell--pre-border\">\n" +
    "          <div class=\"commands-header\">Tools:</div>\n" +
    "\n" +
    "          <div class=\"command\"\n" +
    "               ng-repeat=\"item in tweet.toolbar | limitTo: data.id === filters.activeTweetId ? tweet.toolbar.length : 2\"\n" +
    "               ng-mouseenter=\"commandHover('toolbar', item.id)\"\n" +
    "               ng-mouseleave=\"commandHoverEnd('toolbar', item.id)\"\n" +
    "               ng-click=\"commandClick('toolbar', item.id, $event)\">{{item.label | characters:25}}</div>\n" +
    "\n" +
    "          <div class=\"command\"\n" +
    "               ng-show=\"data.id !== filters.activeTweetId && tweet.toolbar.length > 2\">...</div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"l-block-small\"\n" +
    "         ng-show=\"data.id == filters.activeTweetId\">\n" +
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
    "                     ng-repeat=\"author in tweet.retweetedBy | limitTo:8\">\n" +
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
    "    <div ng-class=\"{'l-block-small': data.id !== filters.activeTweetId}\"\n" +
    "         ng-show=\"data.id == filters.activeTweetId\">\n" +
    "      <div class=\"tweet__extra\">\n" +
    "        {{tweet.createdAt | amDateFormat:'h:mm A - D MMM YYYY'}}\n" +
    "      </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"tweet__extra\"\n" +
    "         ng-hide=\"data.id === filters.activeTweetId\">\n" +
    "      <div class=\"l-list-inline\">\n" +
    "        <div class=\"l-list-inline__item\">\n" +
    "          <div class=\"tweet__action\">\n" +
    "            <i class=\"icon t-icon-retweet\"></i>\n" +
    "            <span ng-show=\"data.id != filters.activeTweetId\">{{tweet.retweetedBy.length}}</span>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"l-list-inline__item\">\n" +
    "          <div class=\"tweet__action\">\n" +
    "            <i class=\"icon t-icon-favorite\"></i>\n" +
    "            <span ng-show=\"data.id != filters.activeTweetId\">{{tweet.favoriteCount}}</span>\n" +
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
    "  <div class=\"l-block\"\n" +
    "       ng-show=\"filters.selectedCommand\">\n" +
    "    <div class=\"tweet-list__header\">\n" +
    "      <div class=\"l-split\">\n" +
    "        <div class=\"l-split__right\">\n" +
    "          <button class=\"tweet-list__back\"\n" +
    "                  ng-click=\"resetCommandFilter()\">back to all tweets</button>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"l-split__left\">\n" +
    "          <div class=\"tweet-list__subtitle\">Tweets that mention</div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "\n" +
    "      <div class=\"tweet-list__title\">{{filters.selectedCommand.label}}</div>\n" +
    "\n" +
    "      <button ng-mouseenter=\"highlightCommand(filters.selectedMenu.name, filters.selectedCommand.id)\"\n" +
    "              ng-mouseleave=\"dimCommand(filters.selectedMenu.name, filters.selectedCommand.id)\"\n" +
    "              ng-click=\"revealCommandLocation(filters.selectedMenu.name, filters.selectedCommand.id, $event)\">\n" +
    "        <div class=\"l-list-inline l-list-inline--collapsed\">\n" +
    "          <div class=\"l-list-inline__item\">\n" +
    "            <div class=\"tweet-list__path\">\n" +
    "              {{filters.selectedMenu.name}} /&nbsp;\n" +
    "            </div>\n" +
    "          </div><!--\n" +
    "          --><div class=\"l-list-inline__item\"\n" +
    "               ng-repeat=\"parent in filters.selectedCommand.parents\"\n" +
    "               ng-show=\"parent.label && parent.label != ''\">\n" +
    "            <div class=\"tweet-list__path\">\n" +
    "              {{parent.label}} /&nbsp;\n" +
    "            </div>\n" +
    "          </div><!--\n" +
    "          --><div class=\"l-list-inline__item\">\n" +
    "            <div class=\"tweet-list__path\">\n" +
    "              {{filters.selectedCommand.label}}\n" +
    "            </div>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </button>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "  <tweet ng-repeat=\"t in tweets.filtered\"\n" +
    "         ng-click=\"activateTweet(t)\"\n" +
    "         class=\"tweet js-tweet\"\n" +
    "         ng-class=\"{'tweet--is-first': $first,\n" +
    "                    'tweet--is-last':  $last,\n" +
    "                    'tweet--is-open': t.id == filters.activeTweetId}\"\n" +
    "         data=\"t\"\n" +
    "         command-hover-callback=\"highlightCommand\"\n" +
    "         command-leave-callback=\"dimCommand\"\n" +
    "         command-click-callback=\"revealCommandLocation\"></tweet>\n" +
    "</div>\n" +
    "");
}]);
})();
