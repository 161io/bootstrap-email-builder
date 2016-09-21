
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

  win.BsEbTypeElementOther1 = (function(superClass) {
    extend(BsEbTypeElementOther1, superClass);

    function BsEbTypeElementOther1() {
      this.onMore = bind(this.onMore, this);
      return BsEbTypeElementOther1.__super__.constructor.apply(this, arguments);
    }

    BsEbTypeElementOther1.tabButton = function() {
      return "<div class=\"col-xs-6\">\n<a class=\"btn btn-lg btn-block btn-default\" data-draggable-type=\"elt-other1\">\n    <span class=\"glyphicon glyphicon-plus\"></span><br/>\n    <span>" + (BsEbConstant.translate('Other...')) + "</span>\n</a>\n</div>";
    };

    BsEbTypeElementOther1.prototype.defaultParam = '';

    BsEbTypeElementOther1.prototype.buildHtml = function($helper, type) {
      var html;
      html = "<div class=\"" + BsEbConstant.CLASS_NAME_ELEMENT_CONTENT + "\" data-type=\"" + type + "\">\n<p>" + (BsEbConstant.translate('Other...')) + "</p>\n</div>";
      return BsEbTypeElementOther1.__super__.buildHtml.call(this, $helper, type, html);
    };

    BsEbTypeElementOther1.prototype.events = function() {
      this.$element.on('bseb-elt-more', this.onMore);
      return this;
    };

    BsEbTypeElementOther1.prototype.onMore = function() {
      var modal;
      modal = new win.BsEbModal({
        title: BsEbConstant.translate('Content') + ' : ' + BsEbConstant.translate('Other...'),
        body: "<p class=\"lead\">" + (BsEbConstant.translate('Other...')) + "</p>",
        btnOkClick: function() {
          return modal.hide();
        }
      });
      return this;
    };

    return BsEbTypeElementOther1;

  })(win.AbstractBsEbTypeElement);

}).call(this);

//# sourceMappingURL=bs-eb-type-element-other1.js.map
