//Kent@FlashPeak: alias list class

cr.define('options', function() {
  /** @const */ var ArrayDataModel = cr.ui.ArrayDataModel;
  /** @const */ var DeletableItem = options.DeletableItem;
  /** @const */ var DeletableItemList = options.DeletableItemList;
  /** @const */ var List = cr.ui.List;
  /** @const */ var ListItem = cr.ui.ListItem;
//  /** @const */ var ListSingleSelectionModel = cr.ui.ListSingleSelectionModel;

  /**
   * Creates a new Alias list item.
   * @param {Object} aliasInfo The information of the Alias.
   * @constructor
   * @extends {DeletableItem.ListItem}
   */
  function AliasListItem(aliasInfo) {
    var el = cr.doc.createElement('li');
    el.__proto__ = AliasListItem.prototype;
    el.aliasinfo_ = aliasInfo;
    el.decorate();
    return el;
  };

  AliasListItem.prototype = {
    __proto__: DeletableItem.prototype,

    /**
     * The name of this Alias.
     * @type {string}
     * @private
     */
    aliasName_: null,

    /** @override */
    decorate: function() {
      DeletableItem.prototype.decorate.call(this);
      this.deletable = AliasDefinitionList.deletable;
      this.aliasText = this.aliasinfo_.displayText;
      this.aliasUrl = this.aliasinfo_.displayUrl;

      var iconEl = cr.doc.createElement('img');
      iconEl.className = 'alias-img';
      iconEl.src = 'images/alias.png';
      iconEl.draggable = false;
      this.contentElement.appendChild(iconEl);

      this.aliasElem = cr.doc.createElement('div');
      this.aliasElem.className = 'alias-name';
      //this.aliasElem.dir = this.aliasinfo_.textDirection;
      this.aliasElem.textContent = this.aliasinfo_.displayText;
      this.aliasElem.title = this.aliasinfo_.displayText;
      this.contentElement.appendChild(this.aliasElem);

      this.urlElem = cr.doc.createElement('div');
      this.urlElem.className = 'url-path';
      this.urlElem.textContent = this.aliasinfo_.displayUrl;
      this.urlElem.title = this.aliasinfo_.displayUrl;
      this.contentElement.appendChild(this.urlElem);

      // this.draggable = false;
    },
  };


  /**
   * Creates a new alias list.
   * @param {Object=} opt_propertyBag Optional properties.
   * @constructor
   * @extends {cr.ui.List}
   */
  var AliasDefinitionList = cr.ui.define('list');

  AliasDefinitionList.setAliasDefinitionList = function(toolButtonList) {
    this.buttonList_ = toolButtonList;
  }

  AliasDefinitionList.getAliasDefinitionList = function() {
    if(this.buttonList_ != undefined) {
      return this.buttonList_;
    }
    return [];
  }

  AliasDefinitionList.prototype = {
    __proto__: DeletableItemList.prototype,

    /** @override */
    decorate: function() {
      DeletableItemList.prototype.decorate.call(this);
//      this.selectionModel = new ListSingleSelectionModel();
    },

    createItem: function(aliasInfo) {
      var item = new AliasListItem(aliasInfo);
//      item.deletable = false;
      return item;
    },

    /** @override */
    deleteItemAtIndex: function(index) {
      if (index >= 0) {
        this.dataModel.splice(index, 1);
        // Once the selected item is removed, there will be no selected item.
        // Select the item pointed by the lead index.
        index = this.selectionModel.leadIndex;
      }
      return index;
    },

  };

  return {
    AliasDefinitionList: AliasDefinitionList,
    AliasListItem: AliasListItem
  };
});
//END OF Kent@FlashPeak: alias list class
