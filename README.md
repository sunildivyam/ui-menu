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
	This is an array of menuItems in the format given below and menuItems forms a tree structure up to any level. There is a support for three types of Menu Item content.
	- **title**: Only ```title``` is displayed as a content of Menu Items
	- **template**: inline HTML template can be displayed as a content of Menu Items. The scope is avaialable to this template.
	- **templateUrl**: a template url or template name from template cache can be given and can be rendered as Menu Item content. Here also the scope is available.

**Note**: above three properties of the menuItem allows you to have flexibilty to have any custom HTML (with scope) as content of Menu Item.

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
- **backBtnText:**

default is "back", set the back button's label text.

- **targetBtn:**

This is the element selector of the button (html tag) which shows/hides the Main Menu.

- **onMenuItemClick:**

This is Click event fired when a menu Item is clicked. This could be a scope method (event handler) of your controller.

- **menuWidth:**

This is the width of the Menu container and can be given in %, px eg. ```80%, 200px```, means in any CSS units.

- **menuContentTarget:**

This is element selector on Page which needs to be pushed to right when menu is visible.

- **distanceFromTop:**

In case if you want to show your menu from a certain distance from the top, then set distanceFromTop to certain height eg. ```60px```

- **pushMenuContentTarget**

If true, pushes the Content target Area (menuContentTarget) to right when menu is visible, else Menu will float/overlap over the content area.


# Build ui-menu
If you want to do more of your customisation to the existing code, here are the steps to build the ui-menu project:

- **Step 1:**

Do your code changes to ```ui-menu.js``` and ```styles/ui-menu.less```

- **Step 2:**

Run the gulp build ```gulp build``` from the ui-menu root folder.


I am sure you would have installed all the dev dependencies before running the build, if not run ```npm install``` from ui-menu root folder and ```gulp-cli``` is installed as a global node module.

# Demo
You can find the ui-menu demo in ```docs/index.html```



I hope you find it useful. Thanks.
