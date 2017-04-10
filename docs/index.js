angular.module('uiMenuExamples', ['ui.menu'])
.controller('appController', ['$scope', function($scope){
	$scope.mainMenu  = [{
		name: 'level1-1',
		title: 'level1 Menu Item 1',
		template: "<span>Item's HTML markup</span> <h3> Using template or templateUrl</h3>",
		menuItems: [{
			name: 'level2-1',
			title: 'level2 Menu Item 1',
			template: "Item's HTML markup"
		}, {
			name: 'level2-2',
			title: 'level2 Menu Item 2',
			template: "Item's HTML markup"
		}]
	},{
		name: 'level1-2',
		title: 'level1 Menu Item 2',
		menuItems: [{
			name: 'level2-1',
			title: 'Menu Item 1',
			template: "Item's HTML markup"
		}, {
			name: 'level2-2',
			title: 'Menu Item 2',
			menuItems: [{
				name: 'level3-1',
				title: 'Level 3 Menu Item 1'
			},
			{
				name: 'level3-2',
				title: 'Level 3 Menu Item 2'
			}]
		}]
	},
	{
		name: 'level1-3',
		title: 'Menu Item 3',
		template: "Item's HTML markup"
	}];

	$scope.onMenuSelect = function(event, menuItem) {
		console.log("Selected: " + menuItem.title);
	};

}]);