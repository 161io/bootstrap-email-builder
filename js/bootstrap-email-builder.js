
/*!
Boostrap Email Builder v0.0.1
Copyright (c) 161 SARL, http://161.io
License : github.com/161io/bootstrap-email-builder/license.txt
 */

(function() {
  var BsEbContextMenu, BsEbTypeElementFactory, JsStyle, doc, win,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  win = window;

  doc = document;

  win.AbstractBsEbTypeElement = (function() {
    AbstractBsEbTypeElement.prototype._intFilter = function(val, unit) {
      if (unit == null) {
        unit = 'px';
      }
      val = parseInt(val);
      if (isNaN(val) || val < 0) {
        val = 0;
      }
      if (unit) {
        val += unit;
      }
      return val;
    };

    function AbstractBsEbTypeElement($element1) {
      this.$element = $element1;
      this.type = null;
      if (this.$element) {
        this.$element.data('bseb-instance', this);
        this.type = this.$element.data('type');
        this.defaultEvents();
        this.events();
        this.$element.trigger('bseb-elt-ready');
      }
    }

    AbstractBsEbTypeElement.prototype.buildHtml = function($helper, type, html) {
      var $element;
      if (!html) {
        html = "<div class=\"" + BsEbConstant.CLASS_NAME_ELEMENT_CONTENT + "\" data-type=\"" + type + "\"></div>";
      }
      this.type = type;
      this.$element = $element = $(html);
      $element.data('bseb-instance', this);
      this.defaultEvents();
      this.events();
      $helper.after($element);
      $element.trigger('bseb-elt-ready');
      return this;
    };

    AbstractBsEbTypeElement.prototype.defaultEvents = function() {
      this.$element.on('contextmenu', function(event) {
        return $(BsEbConstant.SELECTOR_ID_CONTEXTMENU).data('bseb-instance').show(event, $(this));
      }).on('bseb-elt-remove', function() {
        return $(this).remove();
      }).on('click', (function(_this) {
        return function() {
          _this.$element.trigger('bseb-elt-more');
          return false;
        };
      })(this));
      return this;
    };

    AbstractBsEbTypeElement.prototype.events = function() {};

    AbstractBsEbTypeElement.prototype.disableSortable = function(mode) {
      if (mode) {
        mode = 'disable';
      } else {
        mode = 'enable';
      }
      $(BsEbConstant.SELECTOR_CONTAINER + ">tbody").sortable(mode);
      $("" + BsEbConstant.SELECTOR_STRUCT_CONTENT).sortable(mode);
      return this;
    };

    AbstractBsEbTypeElement.idInc = 0;

    AbstractBsEbTypeElement.getNewId = function() {
      return "bseb-id-" + ($.now()) + "-" + (++this.idInc);
    };

    return AbstractBsEbTypeElement;

  })();

  win.BootstrapEmailBuilder = (function() {
    function BootstrapEmailBuilder(options) {
      var ref, ref1;
      if (options == null) {
        options = {};
      }
      this.$render = (ref = options.$render) != null ? ref : $('#bs-eb-render'), this.$tool = (ref1 = options.$tool) != null ? ref1 : $('.bs-eb-tool');
      this.body = null;
      this.contextMenu = null;
      this.ready();
    }

    BootstrapEmailBuilder.prototype.ready = function() {
      this.translate();
      this.toolButtons();
      this.toolEvents();
      this.body = new BsEbBody(this.$render, this.$tool);
      this.contextMenu = new BsEbContextMenu();
      return this;
    };

    BootstrapEmailBuilder.prototype.translate = function() {
      if (!win.bootstrapEmailBuilder) {
        return this;
      }
      $('[data-locale]').each(function() {
        var $elt;
        $elt = $(this);
        return $elt.html(BsEbConstant.translate($elt.text()));
      });
      return this;
    };

    BootstrapEmailBuilder.prototype.toolButtons = function() {
      var $row;
      $row = $('#bs-eb-content>.row');
      $.each(win, function(key, val) {
        if (!val || !(val.prototype instanceof win.AbstractBsEbTypeElement)) {
          return;
        }
        return $row.append(val.tabButton());
      });
      return this;
    };

    BootstrapEmailBuilder.prototype.toolEvents = function() {
      var applyWidth;
      applyWidth = function($helper, $ref) {
        return $helper.width($ref.width());
      };
      this.$tool.find('[data-draggable-type^="elt"]').draggable({
        appendTo: 'body',
        helper: 'clone',
        start: function(event, ui) {
          return applyWidth(ui.helper, $(this));
        },
        cursor: 'move',
        zIndex: 10,
        connectToSortable: BsEbConstant.SELECTOR_STRUCT_CONTENT
      });
      BsEbTypeStructure.constructor2($(BsEbConstant.SELECTOR_STRUCT_CONTAINER));
      this.$tool.find('[data-draggable-type^="struct"]').draggable({
        appendTo: 'body',
        helper: 'clone',
        start: function(event, ui) {
          return applyWidth(ui.helper, $(this));
        },
        cursor: 'move',
        zIndex: 10,
        revert: 'invalid',
        revertDuration: 300,
        connectToSortable: BsEbConstant.SELECTOR_CONTAINER + ">tbody"
      });
      $(BsEbConstant.SELECTOR_CONTAINER + ">tbody").sortable({
        start: function(event, ui) {
          return applyWidth(ui.helper.find('table').first(), $(this));
        },
        cursor: 'move',
        placeholder: 'bg-warning',
        receive: function(event, ui) {
          var $helper, struct, type;
          $helper = ui.helper;
          type = $helper.data('draggable-type');
          struct = new BsEbTypeStructure();
          struct.buildHtml($helper, type);
          return $helper.remove();
        }
      });
      BsEbTypeElementFactory.constructor2($(BsEbConstant.SELECTOR_ELEMENT_CONTENT));
      return this;
    };

    BootstrapEmailBuilder.prototype.save = function(withoutData) {
      var $body, $html, $render, hex, html;
      if (withoutData == null) {
        withoutData = false;
      }
      hex = function(x) {
        return ('0' + parseInt(x).toString(16)).slice(-2);
      };
      $render = this.$render;
      $html = $('<tag-html><tag-body/></tag-html>');
      $body = $html.children();
      $body.html($render.html());
      $body.find('*').removeAttr('data-mce-href').removeAttr('data-mce-style').css({
        position: ''
      });
      this.body.prepareSave(withoutData, $html);
      if (withoutData) {
        $body.find('*').removeAttr('class').removeAttr('id').removeAttr('data-type').removeAttr('contenteditable');
      }
      html = $html.html().replace(/tag-body/g, 'body').replace(/^\s+/gm, '').replace(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/g, function(match, r, g, b) {
        return '#' + hex(r) + hex(g) + hex(b);
      });
      return html;
    };

    return BootstrapEmailBuilder;

  })();

  win.BsEbBody = (function() {
    BsEbBody.prototype.defaultWidth = 500;

    BsEbBody.prototype.defaultBgColor = '#ffffff';

    BsEbBody.prototype.defaultLinkColor = '#0000ff';

    BsEbBody.prototype.defaultTextColor = '#000000';

    BsEbBody.prototype.defaultFontFamily = 'Helvetica, Arial, sans-serif';

    BsEbBody.prototype.defaultFontSize = 14;

    function BsEbBody($render1, $tool1) {
      var $tool;
      this.$render = $render1;
      this.$tool = $tool1;
      this.fontSizeChange = bind(this.fontSizeChange, this);
      this.fontFamilyChange = bind(this.fontFamilyChange, this);
      this.textColorChange = bind(this.textColorChange, this);
      this.linkColorChange = bind(this.linkColorChange, this);
      this.bgColorChange = bind(this.bgColorChange, this);
      this.widthChange = bind(this.widthChange, this);
      $tool = this.$tool;
      this.$inputWidth = $tool.find('[data-name="width"]');
      this.$inputBackgroundColor = $tool.find('[data-name="background-color"]');
      this.$inputLinkColor = $tool.find('[data-name="link-color"]');
      this.$inputTextColor = $tool.find('[data-name="text-color"]');
      this.$inputFontFamily = $tool.find('[data-name="font-family"]');
      this.$inputFontSize = $tool.find('[data-name="font-size"]');
      this.bodyStyle = null;
      this.textStyle = null;
      this.aStyle = null;
      this.ready();
    }

    BsEbBody.prototype.ready = function() {
      this.prepareJsStyle();
      this.restoreVal();
      this.events();
      return this;
    };

    BsEbBody.prototype.prepareJsStyle = function() {
      var aSelector, jsStyle;
      aSelector = BsEbConstant.SELECTOR_ELEMENT_CONTENT + " a,";
      aSelector += BsEbConstant.SELECTOR_ELEMENT_CONTENT + " a:active,";
      aSelector += BsEbConstant.SELECTOR_ELEMENT_CONTENT + " a:focus,";
      aSelector += BsEbConstant.SELECTOR_ELEMENT_CONTENT + " a:hover,";
      aSelector += BsEbConstant.SELECTOR_ELEMENT_CONTENT + " a:visited";
      jsStyle = new JsStyle();
      this.bodyStyle = jsStyle.getStyleBySelector("#" + (this.$render.attr('id')));
      this.textStyle = jsStyle.getStyleBySelector(BsEbConstant.SELECTOR_ELEMENT_CONTENT);
      this.aStyle = jsStyle.getStyleBySelector(aSelector);
      this.aStyle.textDecoration = 'none';
      return this;
    };

    BsEbBody.prototype.restoreVal = function() {
      var bgColor, fontFamily, fontSize, linkColor, textColor, width;
      width = $(BsEbConstant.SELECTOR_CONTAINER).attr('width');
      if (!width) {
        width = this.defaultWidth;
      }
      this.$inputWidth.val(width);
      bgColor = this.$render.data('bgcolor');
      if (!bgColor) {
        bgColor = this.defaultBgColor;
      }
      this.$inputBackgroundColor.val(bgColor);
      this.bodyStyle.backgroundColor = bgColor;
      linkColor = this.$render.data('body-link');
      if (!linkColor) {
        linkColor = this.defaultLinkColor;
      }
      this.$inputLinkColor.val(linkColor);
      this.aStyle.color = linkColor;
      textColor = this.$render.data('body-text');
      if (!textColor) {
        textColor = this.defaultTextColor;
      }
      this.$inputTextColor.val(textColor);
      this.textStyle.color = textColor;
      fontFamily = this.$render.css('fontFamily');
      if (!fontFamily) {
        fontFamily = this.defaultFontFamily;
      }
      this.$inputFontFamily.val(fontFamily);
      this.bodyStyle.fontFamily = fontFamily;
      this.textStyle.fontFamily = fontFamily;
      fontSize = parseInt(this.$render.css('fontSize'));
      if (isNaN(fontSize) || !fontSize) {
        fontSize = this.defaultFontSize;
      }
      this.$inputFontSize.val(fontSize);
      fontSize += 'px';
      this.bodyStyle.fontSize = fontSize;
      this.textStyle.fontSize = fontSize;
      return this;
    };

    BsEbBody.prototype.events = function() {
      var self;
      self = this;
      this.$inputWidth.on('change click', this.widthChange);
      this.$inputBackgroundColor.on('change click', this.bgColorChange);
      BsEbColorSelection.colorpicker(this.$inputBackgroundColor);
      this.$inputLinkColor.on('change click', this.linkColorChange);
      BsEbColorSelection.colorpicker(this.$inputLinkColor);
      this.$inputTextColor.on('change click', this.textColorChange);
      BsEbColorSelection.colorpicker(this.$inputTextColor);
      this.$inputFontFamily.on('keyup focus blur change', this.fontFamilyChange).parent().find('.dropdown-menu a').on('click', function() {
        return self.$inputFontFamily.val($(this).css('fontFamily')).trigger('change');
      });
      this.$inputFontSize.on('keyup focus blur change', this.fontSizeChange);
      return this;
    };

    BsEbBody.prototype.widthChange = function() {
      var $width, max, min, width;
      $width = this.$inputWidth;
      width = parseInt($width.val());
      if (isNaN(width)) {
        width = 0;
      }
      min = parseInt($width.attr('min'));
      max = parseInt($width.attr('max'));
      if (isNaN(min || !min)) {
        min = 400;
      }
      if (isNaN(max || !max)) {
        max = 800;
      }
      if (width < min) {
        width = min;
      } else if (width > max) {
        width = max;
      }
      $width.val(width);
      $(BsEbConstant.SELECTOR_CONTAINER).attr('width', width);
      this.$render.css('minWidth', (40 + width) + 'px');
      return this;
    };

    BsEbBody.prototype.bgColorChange = function() {
      var bgColor;
      bgColor = this.$inputBackgroundColor.val();
      this.$render.attr('data-body-bgcolor', bgColor);
      this.bodyStyle.backgroundColor = bgColor;
      return this;
    };

    BsEbBody.prototype.linkColorChange = function() {
      var linkColor;
      linkColor = this.$inputLinkColor.val();
      this.$render.attr('data-body-link', linkColor);
      this.aStyle.color = linkColor;
      return this;
    };

    BsEbBody.prototype.textColorChange = function() {
      var textColor;
      textColor = this.$inputTextColor.val();
      this.$render.attr('data-body-text', textColor);
      this.textStyle.color = textColor;
      return this;
    };

    BsEbBody.prototype.fontFamilyChange = function() {
      var fontFamily;
      fontFamily = this.$inputFontFamily.val();
      this.$render.css('fontFamily', fontFamily);
      this.bodyStyle.fontFamily = fontFamily;
      this.textStyle.fontFamily = fontFamily;
      return this;
    };

    BsEbBody.prototype.fontSizeChange = function(event) {
      var fontSize, originalFontSize;
      fontSize = originalFontSize = parseInt(this.$inputFontSize.val());
      if (isNaN(fontSize) || fontSize < 8 || fontSize > 99) {
        fontSize = this.defaultFontSize;
      }
      if ('keyup' !== event.type && originalFontSize !== fontSize) {
        this.$inputFontSize.val(fontSize);
      }
      fontSize += 'px';
      this.$render.css('fontSize', fontSize);
      this.bodyStyle.fontSize = fontSize;
      this.textStyle.fontSize = fontSize;
      return this;
    };

    BsEbBody.prototype.prepareSave = function(withoutData, $html) {
      var $body, $render, bgColor, fontFamily, fontSize, linkColor, textColor;
      $render = this.$render;
      bgColor = $render.attr('data-body-bgcolor');
      linkColor = $render.attr('data-body-link');
      textColor = $render.attr('data-body-text');
      fontFamily = $render.css('fontFamily');
      fontSize = $render.css('fontSize');
      $body = $html.children();
      $body.attr({
        'data-body-bgcolor': bgColor,
        'data-body-text': textColor,
        'data-body-link': linkColor
      }).css({
        fontFamily: fontFamily,
        fontSize: fontSize
      });
      if (!withoutData) {
        return this;
      }
      $body.attr({
        bgcolor: bgColor,
        link: linkColor,
        alink: linkColor,
        vlink: linkColor,
        text: textColor
      }).css({
        backgroundColor: bgColor,
        color: textColor
      }).removeAttr('data-body-bgcolor').removeAttr('data-body-text').removeAttr('data-body-link');
      $body.find('a').each(function() {
        var $a;
        $a = $(this);
        if (!$a.css('color')) {
          $a.css('color', linkColor);
        }
        if (!$a.css('textDecoration')) {
          return $a.css('textDecoration', 'none');
        }
      });
      $body.find(BsEbConstant.SELECTOR_ELEMENT_CONTENT).css({
        fontFamily: fontFamily,
        fontSize: fontSize
      });
      return this;
    };

    return BsEbBody;

  })();

  win.BsEbColorSelection = (function() {
    function BsEbColorSelection() {}

    BsEbColorSelection.colors = {};

    BsEbColorSelection.textBOW = function(hex) {
      var hexArr;
      hex = hex.replace('#', '');
      if (3 === hex.length) {
        hexArr = hex.split('');
        hex = hexArr[0] + hexArr[0] + hexArr[1] + hexArr[1] + hexArr[2] + hexArr[2];
      }
      if (parseInt(hex, 16) > 0xffffff / 2) {
        return '#000';
      }
      return '#fff';
    };

    BsEbColorSelection.isEmpty = function() {
      var hex, name, ref;
      ref = this.colors;
      for (name in ref) {
        hex = ref[name];
        return false;
      }
      return true;
    };

    BsEbColorSelection.dropdown = function($inputColorpicker) {
      var $dropdown, eltsLi, hex, name, ref;
      if (this.isEmpty()) {
        return;
      }
      eltsLi = "";
      ref = this.colors;
      for (name in ref) {
        hex = ref[name];
        eltsLi += "<li><a style=\"background-color:" + hex + " !important;color:" + (this.textBOW(hex)) + ";\" data-color=\"" + hex + "\">" + name + "</a></li>";
      }
      $dropdown = $("<button type=\"button\" class=\"btn btn-default dropdown-toggle\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\"><span class=\"caret\"></span></button>\n<ul class=\"dropdown-menu dropdown-menu-right\">" + eltsLi + "</ul>");
      if ($inputColorpicker) {
        $dropdown.appendTo($inputColorpicker.parent().find('.input-group-btn'));
        $dropdown.find('li a').on('click', function() {
          return $inputColorpicker.colorpicker('setValue', $(this).data('color'));
        });
      }
      return $dropdown;
    };

    BsEbColorSelection.tinymceSettings = function() {
      var hex, map, name, ref;
      if (!win.tinyMCE || this.isEmpty()) {
        return;
      }
      map = [];
      ref = this.colors;
      for (name in ref) {
        hex = ref[name];
        map.push(hex.replace('#', ''));
        map.push(name);
      }
      return tinyMCE.settings.textcolor_map = map;
    };

    BsEbColorSelection.colorpicker = function(selector) {
      return $(selector).each(function() {
        var $picker;
        $picker = $(this);
        $picker.colorpicker({
          format: 'hex'
        }).on('changeColor', function() {
          return $picker.trigger('click');
        }).on('changeColor.up', function() {
          return $picker.parent().find('.btn-colorpicker').css({
            backgroundColor: $picker.colorpicker('getValue', '#fff')
          });
        }).parent().find('.btn-colorpicker').on('click', function() {
          return $picker.focus();
        });
        if ($picker.val()) {
          $picker.trigger('changeColor.up');
        }
        return BsEbColorSelection.dropdown($picker);
      });
    };

    return BsEbColorSelection;

  })();

  win.BsEbConstant = (function() {
    function BsEbConstant() {}

    BsEbConstant.CLASS_NAME_CONTAINER = 'eb-container';

    BsEbConstant.CLASS_NAME_STRUCT_CONTAINER = 'eb-struct-container';

    BsEbConstant.CLASS_NAME_STRUCT_CONTENT = 'eb-struct-content';

    BsEbConstant.CLASS_NAME_ELEMENT_CONTENT = 'eb-elt-content';

    BsEbConstant.ID_CONTEXTMENU = 'bs-eb-contextmenu';

    BsEbConstant.ID_MODAL = 'bs-eb-modal';

    BsEbConstant.SELECTOR_CONTAINER = '.eb-container';

    BsEbConstant.SELECTOR_STRUCT_CONTAINER = '.eb-struct-container';

    BsEbConstant.SELECTOR_STRUCT_CONTENT = '.eb-struct-content';

    BsEbConstant.SELECTOR_ELEMENT_CONTENT = '.eb-elt-content';

    BsEbConstant.SELECTOR_ID_CONTEXTMENU = '#bs-eb-contextmenu';

    BsEbConstant.SELECTOR_ID_MODAL = '#bs-eb-modal';

    BsEbConstant.translate = function(key) {
      if (!win.bootstrapEmailBuilder || !bootstrapEmailBuilder.locale[key]) {
        return key;
      }
      return bootstrapEmailBuilder.locale[key];
    };

    BsEbConstant.escape = function(value) {
      return $('<p></p>').text(value).html();
    };

    return BsEbConstant;

  })();

  BsEbContextMenu = (function() {
    function BsEbContextMenu() {
      this.$element = null;
      this.$targetElement = null;
      this.buildHtml();
      this.events();
    }

    BsEbContextMenu.prototype.buildHtml = function() {
      var $element;
      $element = $("<ul id=\"" + BsEbConstant.ID_CONTEXTMENU + "\" class=\"dropdown-menu\">\n    <li data-with-elt=\"\" class=\"dropdown-header\">" + (BsEbConstant.translate('Content')) + "</li>\n    <li data-with-elt=\"\"><a href=\"#\" data-action=\"elt-more\"><span class=\"glyphicon glyphicon-wrench\"></span> " + (BsEbConstant.translate('Options')) + "</a></li>\n    <li data-with-elt=\"\"><a href=\"#\" data-action=\"elt-remove\"><span class=\"text-danger\"><span class=\"glyphicon glyphicon-trash\"></span> " + (BsEbConstant.translate('Delete')) + "</span></a></li>\n    <li data-with-elt=\"\" class=\"divider\"></li>\n    <li class=\"dropdown-header\">" + (BsEbConstant.translate('Structure')) + "</li>\n    <li><a href=\"#\" data-action=\"struct-more\"><span class=\"glyphicon glyphicon-wrench\"></span> " + (BsEbConstant.translate('Options')) + "</a></li>\n    <li><a href=\"#\" data-action=\"struct-remove\"><span class=\"text-danger\"><span class=\"glyphicon glyphicon-trash\"></span> " + (BsEbConstant.translate('Delete')) + "</span></a></li>\n</ul>");
      this.$element = $element;
      $element.appendTo('body');
      $element.data('bseb-instance', this);
      return this;
    };

    BsEbContextMenu.prototype.events = function() {
      var self;
      self = this;
      this.$element.on('mouseleave', function() {
        return $(this).css('display', 'none');
      }).on('contextmenu', function(event) {
        event.preventDefault();
        return $(this).trigger('mouseleave');
      }).find('[data-action]').on('click', function(event) {
        return self.actionClick(event, $(this).data('action'));
      });
      return this;
    };

    BsEbContextMenu.prototype.actionClick = function(event, action) {
      var $targetElement, getStructElement;
      $targetElement = this.$targetElement;
      getStructElement = function() {
        var $parentsFound, $structElement;
        $parentsFound = $targetElement.parents(BsEbConstant.SELECTOR_STRUCT_CONTAINER);
        if (!$parentsFound.length) {
          return $structElement = $targetElement;
        } else {
          return $structElement = $parentsFound.parent('td').parent('tr');
        }
      };
      switch (action) {
        case 'elt-more':
          $targetElement.trigger('bseb-elt-more');
          break;
        case 'elt-remove':
          $targetElement.trigger('bseb-elt-remove');
          break;
        case 'struct-more':
          getStructElement().trigger('bseb-struct-more');
          break;
        case 'struct-remove':
          getStructElement().trigger('bseb-struct-remove');
      }
      this.$element.trigger('mouseleave');
      return false;
    };

    BsEbContextMenu.prototype.show = function(event, $targetElement) {
      var liDisplay;
      if (event && 'contextmenu' === event.type) {
        event.preventDefault();
        event.stopPropagation();
      }
      this.$targetElement = $targetElement;
      if ($targetElement.hasClass(BsEbConstant.CLASS_NAME_ELEMENT_CONTENT)) {
        liDisplay = '';
      } else {
        liDisplay = 'none';
      }
      this.$element.find('[data-with-elt]').css('display', liDisplay).end().css({
        display: 'block',
        left: event.pageX,
        top: event.pageY
      });
      return this;
    };

    return BsEbContextMenu;

  })();

  win.BsEbModal = (function() {
    function BsEbModal(options) {
      var ref, ref1, ref2, ref3, ref4, ref5, ref6;
      this.title = (ref = options.title) != null ? ref : "Modal", this.body = (ref1 = options.body) != null ? ref1 : "", this.btnCancelClick = (ref2 = options.btnCancelClick) != null ? ref2 : function() {}, this.btnCancelValue = (ref3 = options.btnCancelValue) != null ? ref3 : BsEbConstant.translate('Cancel'), this.btnOkClick = (ref4 = options.btnOkClick) != null ? ref4 : function() {}, this.btnOkValue = (ref5 = options.btnOkValue) != null ? ref5 : BsEbConstant.translate('OK'), this.modalReady = (ref6 = options.modalReady) != null ? ref6 : function() {};
      $(BsEbConstant.SELECTOR_ID_MODAL).remove();
      this.$modal = null;
      this.buildHtml();
    }

    BsEbModal.prototype.buildHtml = function() {
      var $modal;
      $modal = $("<div class=\"modal fade\" id=\"" + BsEbConstant.ID_MODAL + "\" tabindex=\"-1\" role=\"dialog\"><div class=\"modal-dialog\"><div class=\"modal-content\">\n<div class=\"modal-header\"><button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button><h4 class=\"modal-title\">" + this.title + "</h4></div>\n<div class=\"modal-body\">" + this.body + "</div>\n<div class=\"modal-footer\"><button type=\"button\" class=\"btn btn-default btn-cancel\" data-dismiss=\"modal\">" + this.btnCancelValue + "</button> <button type=\"button\" class=\"btn btn-primary btn-ok\">" + this.btnOkValue + "</button></div>\n</div></div></div>");
      this.$modal = $modal;
      $modal.find('.btn-cancel').on('click', this.btnCancelClick);
      $modal.find('.btn-ok').on('click', this.btnOkClick);
      $modal.appendTo('body');
      this.show();
      this.modalReady();
      return this;
    };

    BsEbModal.prototype.show = function() {
      this.$modal.modal('show');
      return this;
    };

    BsEbModal.prototype.hide = function() {
      this.$modal.modal('hide');
      return this;
    };

    return BsEbModal;

  })();

  BsEbTypeElementFactory = (function() {
    BsEbTypeElementFactory.separatorToCamelCase = function(str) {
      return str.toLowerCase().replace(/[^a-z0-9]+/gi, ' ').replace(/^([a-z\u00E0-\u00FC])|\s+([a-z\u00E0-\u00FC])/g, function($1) {
        return $1.toUpperCase();
      }).replace(/\s+/g, '');
    };

    BsEbTypeElementFactory.getClassTypeElement = function(type) {
      return 'BsEbType' + this.separatorToCamelCase(type.replace(/^elt-/, 'Element-'));
    };

    function BsEbTypeElementFactory($helper) {
      var classTypeElement, element, type;
      type = $helper.data('draggable-type');
      classTypeElement = BsEbTypeElementFactory.getClassTypeElement(type);
      if (!win[classTypeElement]) {
        alert(classTypeElement + " was not found");
        return;
      }
      element = new win[classTypeElement]();
      element.buildHtml($helper, type);
    }

    BsEbTypeElementFactory.constructor2 = function($elements) {
      return $elements.each(function() {
        var $element, classTypeElement, type;
        $element = $(this);
        type = $element.data('type');
        classTypeElement = BsEbTypeElementFactory.getClassTypeElement(type);
        if (!win[classTypeElement]) {
          throw classTypeElement + " was not found";
          return;
        }
        return new win[classTypeElement]($element);
      });
    };

    return BsEbTypeElementFactory;

  })();

  win.BsEbTypeStructure = (function() {
    BsEbTypeStructure.prototype.defaultWidthStruct = {
      "struct-12": ["100%"],
      "struct-6-6": ["50%", "50%"],
      "struct-4-8": ["33%", "67%"],
      "struct-8-4": ["67%", "33%"],
      "struct-4-4-4": ["33%", "34%", "33%"],
      "struct-3-3-3-3": ["25%", "25%", "25%", "25%"]
    };

    BsEbTypeStructure.prototype.defaultCellspacing = 10;

    function BsEbTypeStructure($element1) {
      this.$element = $element1;
      this.onRemove = bind(this.onRemove, this);
      this.onMore = bind(this.onMore, this);
      this.type = null;
      if (this.$element) {
        this.$element.data('bseb-instance', this);
        this.type = this.$element.data('type');
        this.events();
      }
    }

    BsEbTypeStructure.prototype.buildHtml = function($helper, type) {
      var $element, html, i, len, ref, width;
      if (!this.defaultWidthStruct[type]) {
        type = 'struct-12';
      }
      html = "<table width=\"100%\" class=\"" + BsEbConstant.CLASS_NAME_STRUCT_CONTAINER + "\" cellspacing=\"" + this.defaultCellspacing + "\" border=\"0\" style=\"border-collapse:separate; border-spacing:" + this.defaultCellspacing + "px;\"><tbody><tr>";
      ref = this.defaultWidthStruct[type];
      for (i = 0, len = ref.length; i < len; i++) {
        width = ref[i];
        html += "<td width=\"" + width + "\" class=\"" + BsEbConstant.CLASS_NAME_STRUCT_CONTENT + " empty\"></td>";
      }
      html += "</tr></tbody></table>";
      this.type = type;
      this.$element = $element = $("<tr><td>" + html + "</td></tr>");
      $element.data('bseb-instance', this);
      this.events();
      $helper.after($element);
      return this;
    };

    BsEbTypeStructure.prototype.events = function() {
      this.$element.on('contextmenu', function(event) {
        return $(BsEbConstant.SELECTOR_ID_CONTEXTMENU).data('bseb-instance').show(event, $(this));
      }).on('bseb-struct-more', this.onMore).on('bseb-struct-remove', this.onRemove).find(BsEbConstant.SELECTOR_STRUCT_CONTENT).sortable({
        items: ">" + BsEbConstant.SELECTOR_ELEMENT_CONTENT,
        cursor: 'move',
        placeholder: 'bg-warning',
        connectWith: BsEbConstant.SELECTOR_STRUCT_CONTENT,
        start: function(event, ui) {
          return ui.item.trigger('sortable-start');
        },
        stop: function(event, ui) {
          return ui.item.trigger('sortable-stop');
        },
        receive: function(event, ui) {
          var $helper, type;
          $helper = ui.helper;
          if (!$helper || !$helper.data('draggable-type')) {
            return;
          }
          type = $helper.data('draggable-type');
          new BsEbTypeElementFactory($helper);
          return $helper.remove();
        }
      });
      return this;
    };

    BsEbTypeStructure.prototype.onMore = function() {
      var $element, $table, $td, bgcolor, cellspacing, modal, selected, valign;
      selected = function(v1, v2) {
        if (v1 === v2) {
          return 'selected="selected"';
        } else {
          return '';
        }
      };
      $element = this.$element;
      $table = $element.find("" + BsEbConstant.SELECTOR_STRUCT_CONTAINER);
      $td = $element.find("" + BsEbConstant.SELECTOR_STRUCT_CONTENT);
      valign = BsEbConstant.escape($td.attr('valign'));
      if (!valign) {
        valign = 'middle';
      }
      cellspacing = parseInt($table.attr('cellspacing'));
      if (isNaN(cellspacing) || cellspacing < 0) {
        cellspacing = 0;
      }
      bgcolor = BsEbConstant.escape($table.attr('bgcolor'));
      if (!bgcolor) {
        bgcolor = '';
      }
      modal = new win.BsEbModal({
        title: BsEbConstant.translate('Structure'),
        body: "<div class=\"form-group\">\n    <code class=\"pull-right\">valign</code>\n    <label for=\"bs-eb-valign\">" + (BsEbConstant.translate('Vertical alignment')) + "</label>\n    <select id=\"bs-eb-valign\" class=\"form-control\">\n        <option value=\"middle\" " + (selected('middle', valign)) + ">" + (BsEbConstant.translate('Middle')) + "</option>\n        <option value=\"top\" " + (selected('top', valign)) + ">" + (BsEbConstant.translate('Top')) + "</option>\n        <option value=\"bottom\" " + (selected('bottom', valign)) + ">" + (BsEbConstant.translate('Bottom')) + "</option>\n    </select>\n</div>\n<div class=\"form-group\">\n    <code class=\"pull-right\">cellspacing</code>\n    <label for=\"bs-eb-cellspacing\">" + (BsEbConstant.translate('Space between the cell')) + "</label>\n    <select id=\"bs-eb-cellspacing\" class=\"form-control\">\n        <option value=\"0\" " + (selected(0, cellspacing)) + ">0px</option>\n        <option value=\"5\" " + (selected(5, cellspacing)) + ">5px</option>\n        <option value=\"10\" " + (selected(10, cellspacing)) + ">10px</option>\n        <option value=\"15\" " + (selected(15, cellspacing)) + ">15px</option>\n        <option value=\"20\" " + (selected(20, cellspacing)) + ">20px</option>\n        <option value=\"25\" " + (selected(25, cellspacing)) + ">25px</option>\n        <option value=\"30\" " + (selected(30, cellspacing)) + ">30px</option>\n        <option value=\"40\" " + (selected(40, cellspacing)) + ">40px</option>\n        <option value=\"50\" " + (selected(50, cellspacing)) + ">50px</option>\n    </select>\n</div>\n<div class=\"form-group\">\n    <code class=\"pull-right\">bgcolor</code>\n    <label for=\"bs-eb-bgcolor\">" + (BsEbConstant.translate('Background color')) + "</label>\n    <div class=\"input-group\">\n        <input type=\"text\" id=\"bs-eb-bgcolor\" value=\"" + bgcolor + "\" placeholder=\"#ffffff\" class=\"form-control\"/>\n        <span class=\"input-group-addon\" style=\"background-color:" + bgcolor + ";\">&nbsp;&nbsp;</span>\n    </div>\n</div>",
        btnOkClick: function() {
          modal.hide();
          valign = $('#bs-eb-valign').val();
          cellspacing = $('#bs-eb-cellspacing').val();
          bgcolor = $('#bs-eb-bgcolor').val();
          $td.attr('valign', valign);
          return $table.attr('cellspacing', cellspacing).attr('bgcolor', bgcolor).css({
            borderCollapse: 'separate',
            borderSpacing: cellspacing + "px",
            backgroundColor: bgcolor
          });
        },
        modalReady: function() {
          return $('#bs-eb-bgcolor').colorpicker({
            format: 'hex'
          }).on('changeColor', function() {
            var $picker;
            $picker = $(this);
            return $picker.next().css({
              backgroundColor: $picker.colorpicker('getValue', '#fff')
            });
          }).siblings('.input-group-addon').on('click', function() {
            return $(this).siblings('input').focus();
          });
        }
      });
      return this;
    };

    BsEbTypeStructure.prototype.onRemove = function() {
      if (this.$element.siblings('tr').length) {
        this.$element.remove();
        return;
      }
      this.$element.find(BsEbConstant.SELECTOR_ELEMENT_CONTENT).trigger('bseb-elt-remove');
      return this;
    };

    BsEbTypeStructure.constructor2 = function($structs) {
      return $structs.each(function() {
        return new BsEbTypeStructure($(this).parent().parent());
      });
    };

    return BsEbTypeStructure;

  })();

  JsStyle = (function() {
    function JsStyle(elementStyle) {
      if (elementStyle == null) {
        elementStyle = 'create';
      }
      if ('create' === elementStyle) {
        elementStyle = doc.createElement('style');
        elementStyle.type = 'text/css';
        doc.getElementsByTagName('head')[0].appendChild(elementStyle);
      }
      this.sheet = elementStyle.sheet;
      this.cssRules = this.sheet.cssRules || this.sheet.rules || [];
    }

    JsStyle.prototype.getIndexBySelector = function(selector, autoGenerate) {
      var i, index, len, ref, rule;
      if (autoGenerate == null) {
        autoGenerate = true;
      }
      ref = this.cssRules;
      for (index = i = 0, len = ref.length; i < len; index = ++i) {
        rule = ref[index];
        if (selector === rule.selectorText) {
          return index;
        }
      }
      if (!autoGenerate) {
        return -1;
      }
      index = this.cssRules.length;
      this._insert(selector, index);
      return index;
    };

    JsStyle.prototype.getStyleBySelector = function(selector) {
      return this.cssRules[this.getIndexBySelector(selector)].style;
    };

    JsStyle.prototype.deleteStyleBySelector = function(selector) {
      var index;
      index = this.getIndexBySelector(selector, false);
      if (index < 0) {
        return this;
      }
      return this._delete(index);
    };

    JsStyle.prototype._insert = function(selector, index) {
      if (this.sheet.insertRule) {
        this.sheet.insertRule(selector + " { }", index);
      } else if (this.sheet.addRule) {
        this.sheet.addRule(selector, null, index);
      }
      return this;
    };

    JsStyle.prototype._delete = function(index) {
      if (this.sheet.deleteRule) {
        this.sheet.deleteRule(index);
      } else if (this.sheet.removeRule) {
        this.sheet.removeRule(index);
      }
      return this;
    };

    return JsStyle;

  })();

}).call(this);

//# sourceMappingURL=bootstrap-email-builder.js.map
