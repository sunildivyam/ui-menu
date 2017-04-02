# ui-menu
ui-menu is an angular directive for aside navigation Menu
## Installation
### Installing ui-menu via npm
**`npm install ui-menu`**

## Usage
Include the ui-menu.js or ui-menu.min.js in your application using any of the ways e.g.
include it in your application's index.html:
```
<script type="text/javascript" src="node_modules/ui-menu/dist/ui-menu.js"></script>
```
and, to include the production(minified) version of the js file.
```
<script type="text/javascript" src="node_modules/ui-menu/dist/ui-menu.min.js"></script>
```
And if you want to include it in your app.js or index.js, here you go
```
require('ui-menu');
```

The styles you can find in node_modules/ui-menu/dist/ui-menu.css, so include it in your index.html.

```
<link rel="stylesheet" type="text/css" href="./node_modules/dist/ui-menu.css">
```
if you want to add the LESS in your application code, you can find it in node_modules/ui-menu/styles/ui-menu.less

After including ui-menu js file in your application, next steps is to inject the ```ui.menu``` angular module in your app module.

```javascript
angular.module('myApp', [ui.menu]);
```

That's all. Now just add it on your application page,
```
	<!-- this is the target button, clicking which hides/shows the menu. This can be any element on your page, ideally be a button or anchor -->

	<a href="#" id="main-menu-btn" class="action-bar">
		<span></span>
		<span></span>
		<span></span>
	</a>

<!-- UI menu -->
	<ui-menu
		menu-items="mainMenu"
		back-btn-text="back"
		target-btn="#main-menu-btn"
		menu-width="50%"
		menu-content-target="#page-content"
		push-menu-content-target="true"
		distance-from-top="60px"
		on-menu-item-click="onMenuSelect">
	</ui-menu>

<!-- This should be the content view of the page -->
	<div id="page-content">
		Your Content View
	</div>
```

## Directive Reference
The directive accepts following attributes (scope variables):

- **menuItems:**
	This is an array of menuItems in the format given below and menuItems forms a tree structure up to any level.
``` javascript
[{
		name: 'level1-1',
		title: 'level1 Menu Item 1',
		template: "<span>Item's HTML markup</span> <h3> Using template or templateUrl</h3>",
		menuItems: []
	},{
		name: 'level1-2',
		title: 'level1 Menu Item 2',
		templateUrl: "menuitem-template.html",
		menuItems: []
	},
	{
		name: 'level1-3',
		title: 'Menu Item 3',
		template: "Item's HTML markup"
	}]
```
```
                backBtnText: '@',           //
                targetBtn: '@',             // This is the reference of button (html tag) which show/hide the Menu
                onMenuItemClick: '=',
                menuWidth: '@',             // this can be in % or in px eg. 80%, 200px;
                menuContentTarget:  '@',    // Element selector on Page which needs to be pushed whne menu is visible
                distanceFromTop: '@',       // distance of Menu and Content Area from body top eg. 60px;
                pushMenuContentTarget: '='  // if true, pushes the Content target Area on Menu Visible
```
