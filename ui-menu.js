(function(angular, $) {
    angular.module('ui.menu', [])
    .run(uiMenuConfig)
    .directive('uiMenu', uiMenuDirective)
    .directive('compileTemplate', compileTemplateDirective);    // Directive used internally by uiMenu Directive

    /*
        ui.menu module config funcion.
        Two templates are pushed to template cache
        tpl.html        : uiMenu Directive template
        menutree.html   : Nested submenus tree Template,
                          this enables to have any number of nested submenus
    */

    function uiMenuConfig($templateCache) {
        $templateCache.put('tpl.html',[
            '<div class="ui-menu-container">',
                '<div class="level-container root-level">',
                    '<ul>',
                        '<li class="menu-item" ng-repeat="menuItem in menuItems"  ng-include="\'menutree.html\'" ng-click="menuItemClick($event, menuItem)">',
                        '</li>',
                    '</ul>',
                '</div>',
                '<div class="ui-menu-backdrop" ng-click="menuBackDropClick($event)"></div>',
            '</div>'].join('')
        );

        $templateCache.put('menutree.html',[
            '<div class="menu-item-content" ng-if="!menuItem.templateUrl && menuItem.template" compile-template="menuItem.template"></div>',
            '<div class="menu-item-content" ng-if="menuItem.templateUrl" ngInclude="menuItem.templateUrl"></div>',
            '<span ng-bind="menuItem.title" ng-if="!menuItem.template && !menuItem.templateUrl"></span>',
            '<span class="expand-arrow" ng-if="!menuItem.template && !menuItem.templateUrl"></span>',
            '<div class="level-container" ng-if="menuItem.menuItems" ng-click="levelContainerClick($event)">',
                '<a href="#" class="back-btn" ng-click="menuBackClick($event)">{{backBtnText || "<<"}}</a>',
                '<ul>',
                    '<li class="menu-item" ng-repeat="menuItem in menuItem.menuItems" ng-include="\'menutree.html\'" ng-click="menuItemClick($event, menuItem)">',
                    '</li>',
                '</ul>',
            '</div>'].join('')
        );
    }

    // Dependency Injection Annotation
    uiMenuConfig.$inject = ['$templateCache'];

    // uiMenu Directive function
    function uiMenuDirective($timeout){

        return {
            scope: {
                menuItems: '=',             // Please see comments at bottom of this file
                backBtnText: '@',           //
                targetBtn: '@',             // This is the reference of button (html tag) which show/hide the Menu
                onMenuItemClick: '=',
                menuWidth: '@',             // this can be in % or in px eg. 80%, 200px;
                menuContentTarget:  '@',    // Element selector on Page which needs to be pushed whne menu is visible
                distanceFromTop: '@',       // distance of Menu and Content Area from body top eg. 60px;
                pushMenuContentTarget: '='  // if true, pushes the Content target Area on Menu Visible
            },
            restrict: 'EA',
            templateUrl: 'tpl.html',
            replace: false,
            link: function($scope) {

                // Adds the event handler to the target Element which shows/hides the main menu
                init();

                /*
                    This shows the 1st Level of menu as well as submenus at all levels
                */
                function showSubMenu(el) {
                    var $levelContainer;

                    if (el && el.length) {
                        $levelContainer = el.find('>.level-container');             // shows Inner Level menu
                        $levelContainer.css('width', '100%');
                    } else {
                        $levelContainer =  $('.level-container.root-level');        // First Level(Root) menu
                        var $backdrop = $('.ui-menu-container>.ui-menu-backdrop');
                        $levelContainer.css('width', $scope.menuWidth);             // shows First Level(Root) menu

                        // Sets distance from Top for menu and Backdrop
                        if ($scope.distanceFromTop) {
                            $levelContainer.css('margin-top', $scope.distanceFromTop);
                            $backdrop.css('margin-top', $scope.distanceFromTop);
                        }

                        //Show Backdrop
                        $backdrop.show();

                        /*
                            target Content Element is pushed to right "pushMenuContentTarget" is set to true, else Menu
                            will overlap Main Content Area of page.
                        */
                        var $menuContentTarget = $($scope.menuContentTarget);
                        if ($menuContentTarget && $menuContentTarget.length) {
                            $menuContentTarget.addClass('ui-menu-contents-target');
                            if ($scope.pushMenuContentTarget === true) {
                                $menuContentTarget.css('marginLeft', $scope.menuWidth); // slides the Content Area to right
                            }
                        }
                    }
                }


                /*
                    This Hides the 1st Level of menu as well as submenus at all levels
                */

                function hideSubMenu(el) {
                    var $levelContainer;
                    if (el && el.length && el.hasClass('level-container')) {
                        $levelContainer = el;       // current Level container, when Back button is clicked
                        $levelContainer.css('width', '0px');    // hides current Level of menu
                    } else {
                        $levelContainer = $('.level-container.root-level'); // root level menu container
                        $levelContainer.css('width', '0px');                // hides root level menu (main menu)

                        var $menuContentTarget = $($scope.menuContentTarget);
                        var $contentBackdrop;

                        if ($menuContentTarget && $menuContentTarget.length) {
                            if ($scope.pushMenuContentTarget === true) {
                                $menuContentTarget.css('marginLeft','0px'); // slides the Content Area to left (original place)
                            }
                        }

                        // Hide Backdrop
                        $('.ui-menu-container>.ui-menu-backdrop').hide();

                        $timeout(function(){
                            /*
                                When hiding root-level (main menu), all opened submenus(all level containers) should
                                be hidden (reset).
                            */
                            var $openedLevelContainers = $('.level-container.root-level .level-container');
                            if ($openedLevelContainers && $openedLevelContainers.length) {
                                $openedLevelContainers.css('width', '0px'); // hides all opened submenus
                            }

                            //removes Content Backdrop
                            if ($contentBackdrop && $contentBackdrop.length) $contentBackdrop.remove();

                            // Removes the ui-menu-contents-target class
                            if ($menuContentTarget && $menuContentTarget.length) $menuContentTarget.removeClass('ui-menu-contents-target');
                        }, 500);
                    }
                }


                /*
                    Adds the event handler to the target Element which shows/hides the main menu.
                    Target Menu Button is the reference to the element on page, clicking which
                    initiates the Main menu Show/hide.
                */
                function init() {
                    var $targetMenuBtn = $($scope.targetBtn);

                    if ($targetMenuBtn && $targetMenuBtn.length) {
                        $targetMenuBtn.click(function(event) {
                            event.preventDefault();
                            if ($targetMenuBtn.hasClass('opened')) {
                                hideSubMenu();
                                $targetMenuBtn.removeClass('opened');
                            } else {
                                showSubMenu();
                                $targetMenuBtn.addClass('opened');
                            }
                        });
                    }
                }

                // Click event handler for Menu Item Click
                $scope.menuItemClick = function(event, menuItem) {
                    event.preventDefault();
                    event.stopPropagation();
                    if (menuItem.menuItems) {
                        var $menuItem = $(event.target);
                        if (!$menuItem.hasClass('menu-item')) {
                            $menuItem = $menuItem.closest('.menu-item');    // if any child element of Menu-item (li) is clicked.
                        }
                        showSubMenu($menuItem);
                    }

                    /*
                        public menu item click event. Listen to this in your Application code.
                        In application code, menuItem (second parameter) can be checked for
                        "menuItems" property, if available, any further processing can be avoided/agnored, as
                        sub menus is expected.
                    */
                    if (typeof $scope.onMenuItemClick === 'function') {
                        // $timeout here ensures that menu animation is not blocked.
                        $timeout(function(){
                            $scope.onMenuItemClick(event, menuItem);
                        });
                    }
                };

                // Back Button Event Handler. Hides the current Submenu
                $scope.menuBackClick = function(event) {
                    event.preventDefault();
                    event.stopPropagation();
                    hideSubMenu($(event.target).closest('.level-container'));
                };

                // Backdrop click handler. Hides all submenus and Main Menu.
                $scope.menuBackDropClick = function(event) {
                    event.preventDefault();
                    event.stopPropagation();
                    var $targetMenuBtn = $($scope.targetBtn);
                    hideSubMenu();
                    if ($targetMenuBtn.hasClass('opened')) $targetMenuBtn.removeClass('opened');
                };

                // Stop Event Propagation to Parent Menu Items from Sub Menu
                $scope.levelContainerClick = function(event) {
                    event.preventDefault();
                    event.stopPropagation();
                };
            }
        };
    }

    // Dependency Injection Annotation
    uiMenuDirective.$inject = ['$timeout'];

    function compileTemplateDirective($compile) {
        return {
            restrict: 'A',
            replace: true,
            link: function ($scope, iElm, iAttrs) {
                $scope.$watch(iAttrs.compileTemplate, function(html) {
                    iElm.html(html);
                    $compile(iElm.contents())($scope);
                });
            }
        };
    }

    // Dependency Injection Annotation
    compileTemplateDirective.$inject = ['$compile'];

    if (typeof module !== "undefined"){
      module.exports = angular.module('ui.menu');
    }
})(window.angular, window.jQuery);
