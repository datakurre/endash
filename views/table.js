// ==========================================================================
// Project:   SproutCore - JavaScript Application Framework
// Copyright: ©2009 Christopher Swasey
// License:   Licened under MIT license (see license.js)
// ==========================================================================

sc_require('views/table_row')
/** @class



  
  @extends SC.View

*/
Endash.TableView = SC.ListView.extend({

	columns: null,
	columnsBindingDefault: SC.Binding.multiple(),
	
	
	content: null,
	contentBindingDefault: SC.Binding.multiple(),
	
	displayHeader: YES,
	
	containerView: null,
	
	exampleView: Endash.TableRowView.extend({
		columnsBinding: '.parentView.parentView.parentView.parentView*columns',
		childCount: 3
	}),
	
	horizontalScrollOffset: 0,
	
	createChildViews: function() {
		var childViews = []
		var view;
		var dataLayout = {top: 0, left: 0, bottom: 0, right: 0}
		
		if(this.get('displayHeader')) {
			view = this.createChildView(SC.ScrollView.design({
				layout: {top: 0, left: 0, right: 0, height: 17},
				borderStyle: SC.BORDER_NONE,
				contentView: SC.View.extend({
					width: null,
					createChildViews: function() {
						var childViews = []
						childViews.push(this.createChildView(Endash.TableHeaderView.design({
							columnsBinding: '.parentView.parentView.parentView.parentView*columns',
							childCount: 3
						})))
						this.set('childViews', childViews)
						this.set('header', childViews[0])
					},
					widthBinding: '.header.thickness',
					updateWidth: function() {
						this.adjust('width', this.get('width'))
					}.observes('width')
				}),
				hasHorizontalScroller: NO,
				horizontalScrollOffsetBinding: '.parentView.list.horizontalScrollOffset',
				canScrollHorizontal: function() {
					return YES
				}.property().cacheable()
			}))
			
			this.set('header', view)
			childViews.push(view)
			
			dataLayout['top'] = 18
		}
		
		view = this.createChildView(SC.ScrollView.design({
			borderStyle: SC.BORDER_NONE,
			layout: dataLayout,
			contentView: SC.View.extend({
				width: null,
				widthBinding: '.parentView.parentView.parentView.header.contentView.width',
				updateWidth: function() {
					this.adjust('width', this.get('width'))
				}.observes('width')
			}),
			// horizontalScrollOffsetBinding: '.parentView.header.horizontalScrollOffset'
		}))
		this.set('containerView', view.get('contentView'))
		this.set('list', view)
		childViews.push(view)
		
		this.set('childViews', childViews)
	}
})
	