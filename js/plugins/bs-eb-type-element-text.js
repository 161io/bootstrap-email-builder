
/*!
Bootstrap Email Builder v0.0.1
Copyright (c) 161 SARL, http://161.io
License: https://github.com/161io/bootstrap-email-builder/blob/master/license.txt
 */

(function() {
  var BsEbConstant, win,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  win = window;

  BsEbConstant = win.BsEbConstant;

  win.BsEbTypeElementText = (function(superClass) {
    extend(BsEbTypeElementText, superClass);

    function BsEbTypeElementText() {
      this.onMore = bind(this.onMore, this);
      return BsEbTypeElementText.__super__.constructor.apply(this, arguments);
    }

    BsEbTypeElementText.tabButton = function() {
      return "<div class=\"col-xs-6\">\n<a class=\"btn btn-lg btn-block btn-default\" data-draggable-type=\"elt-text\">\n    <span class=\"glyphicon glyphicon-link\"></span><br/>\n    <span>" + (BsEbConstant.translate('Text')) + "</span>\n</a>\n</div>";
    };

    BsEbTypeElementText.prototype.defaultText = "<p>Lorem ipsum dolor sit amet, <a href=\"#\" target=\"_blank\">consectetur adipiscing</a> elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>";

    BsEbTypeElementText.prototype.buildHtml = function($helper, type) {
      var html;
      html = "<div class=\"" + BsEbConstant.CLASS_NAME_ELEMENT_CONTENT + "\" data-type=\"" + type + "\">" + this.defaultText + "</div>";
      return BsEbTypeElementText.__super__.buildHtml.call(this, $helper, type, html);
    };

    BsEbTypeElementText.prototype.events = function() {
      var ignoreClick, newId;
      if (this.$element.attr('id')) {
        newId = this.$element.attr('id');
      } else {
        newId = win.AbstractBsEbTypeElement.getNewId();
      }
      ignoreClick = false;
      this.$element.attr('id', newId).off('click').on('sortable-stop', function() {
        return ignoreClick = true;
      }).on('bseb-elt-ready', function() {
        return tinyMCE.execCommand('mceAddEditor', false, newId);
      }).on('click', (function(_this) {
        return function() {
          if (ignoreClick) {
            return ignoreClick = false;
          }
          _this.disableSortable(true);
          return tinyMCE.execCommand('mceFocus', false, newId);
        };
      })(this)).on('focus', (function(_this) {
        return function() {
          if (_this.$element.text() === $(_this.defaultText).text()) {
            return tinyMCE.get(newId).setContent('');
          }
        };
      })(this)).on('blur', (function(_this) {
        return function() {
          _this.disableSortable(false);
          if (!_this.$element.text()) {
            return _this.$element.html(_this.defaultText);
          }
        };
      })(this)).on('bseb-elt-more', this.onMore);
      return this;
    };

    BsEbTypeElementText.prototype.onMore = function() {
      var modal;
      modal = new win.BsEbModal({
        title: BsEbConstant.translate('Content') + ' : ' + BsEbConstant.translate('Text'),
        body: "<p class=\"lead\">Soon...</p>",
        btnOkClick: function() {
          return modal.hide();
        }
      });
      return this;
    };

    return BsEbTypeElementText;

  })(win.AbstractBsEbTypeElement);

}).call(this);

//# sourceMappingURL=bs-eb-type-element-text.js.map
