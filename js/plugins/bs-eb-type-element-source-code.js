
/*!
Bootstrap Email Builder v0.0.3
Copyright (c) 161 SARL, https://161.io
License: https://github.com/161io/bootstrap-email-builder/blob/master/license.txt
 */

(function() {
  var BsEbConstant, win,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  win = window;

  BsEbConstant = win.BsEbConstant;

  win.BsEbTypeElementSourceCode = (function(superClass) {
    extend(BsEbTypeElementSourceCode, superClass);

    function BsEbTypeElementSourceCode() {
      this.onMore = bind(this.onMore, this);
      return BsEbTypeElementSourceCode.__super__.constructor.apply(this, arguments);
    }

    BsEbTypeElementSourceCode.tabButton = function() {
      return "<div class=\"col-xs-6\">\n<a class=\"btn btn-lg btn-block btn-default\" data-draggable-type=\"elt-source-code\">\n    <kbd>&lt;/&gt;</kbd><br/>\n    <span>" + (BsEbConstant.translate('Source code')) + "</span>\n</a>\n</div>";
    };

    BsEbTypeElementSourceCode.prototype.buildHtml = function($helper, type, html) {
      if (!html) {
        html = "<div class=\"" + BsEbConstant.CLASS_NAME_ELEMENT_CONTENT + "\" data-type=\"" + type + "\">\n<code>HTML source</code>\n</div>";
      }
      return BsEbTypeElementSourceCode.__super__.buildHtml.call(this, $helper, type, html);
    };

    BsEbTypeElementSourceCode.prototype.events = function() {
      this.$element.on('bseb-elt-more', this.onMore);
      return this;
    };

    BsEbTypeElementSourceCode.prototype.onMore = function() {
      var $element, modal;
      $element = this.$element;
      modal = new win.BsEbModal({
        title: BsEbConstant.translate('Content') + ' : ' + BsEbConstant.translate('Source code'),
        body: "<textarea id=\"bs-eb-code\" class=\"form-control\" cols=\"10\" rows=\"10\" placeholder=\"<..>..</..>\">" + (BsEbConstant.escape($.trim($element.html()))) + "</textarea>",
        btnOkClick: function() {
          modal.hide();
          return $element.html($('#bs-eb-code').val());
        }
      });
      return this;
    };

    return BsEbTypeElementSourceCode;

  })(win.AbstractBsEbTypeElement);

}).call(this);

//# sourceMappingURL=bs-eb-type-element-source-code.js.map
