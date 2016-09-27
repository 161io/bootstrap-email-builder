
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

  win.BsEbTypeElementButton = (function(superClass) {
    extend(BsEbTypeElementButton, superClass);

    function BsEbTypeElementButton() {
      this.onMore = bind(this.onMore, this);
      return BsEbTypeElementButton.__super__.constructor.apply(this, arguments);
    }

    BsEbTypeElementButton.tabButton = function() {
      return "<div class=\"col-xs-6\">\n<a class=\"btn btn-lg btn-block btn-default\" data-draggable-type=\"elt-button\">\n    <span class=\"glyphicon glyphicon-link\"></span><br/>\n    <span>" + (BsEbConstant.translate('Link/button')) + "</span>\n</a>\n</div>";
    };

    BsEbTypeElementButton.prototype.defaultHref = '#';

    BsEbTypeElementButton.prototype.defaultStyle = 'border-radius:4px;background-color:#337ab7;color:#fff;text-decoration:none;padding:10px 15px;';

    BsEbTypeElementButton.prototype.buildHtml = function($helper, type) {
      var html;
      html = "<div class=\"" + BsEbConstant.CLASS_NAME_ELEMENT_CONTENT + "\" data-type=\"" + type + "\" style=\"text-align:center;\">\n<br/><a href=\"" + this.defaultHref + "\" style=\"" + this.defaultStyle + "\" target=\"_blank\">Button</a><br/><br/>\n</div>";
      return BsEbTypeElementButton.__super__.buildHtml.call(this, $helper, type, html);
    };

    BsEbTypeElementButton.prototype.events = function() {
      this.$element.on('bseb-elt-more', this.onMore);
      return this;
    };

    BsEbTypeElementButton.prototype.onMore = function() {
      var $button, backgroundColor, borderRadius, href, isBold, modal, self, textColor, value;
      self = this;
      $button = this.$element.find('a').first();
      isBold = 1 === $button.children('strong').length && 1 === $button.contents().length;
      href = BsEbConstant.escape($button.attr('href'));
      value = BsEbConstant.escape(isBold ? $button.children().html() : $button.html());
      textColor = $button.css('color');
      backgroundColor = $button.css('backgroundColor');
      borderRadius = this._intFilter($button.css('borderRadius'));
      modal = new win.BsEbModal({
        title: BsEbConstant.translate('Content') + ' : ' + BsEbConstant.translate('Link/button'),
        body: "<div class=\"form-group\">\n    <label for=\"bs-eb-value\">" + (BsEbConstant.translate('Label')) + "</label>\n    <input type=\"text\" id=\"bs-eb-value\" value=\"" + value + "\" class=\"form-control\" placeholder=\"...\"/>\n</div>\n<div class=\"form-group\">\n    <code class=\"pull-right\">href=&quot;...&quot;</code>\n    <label for=\"bs-eb-href\">" + (BsEbConstant.translate('Url')) + "</label>\n    <input type=\"url\" id=\"bs-eb-href\" value=\"" + href + "\" placeholder=\"https://...\" class=\"form-control\"/>\n</div>\n<hr/>\n<div class=\"checkbox\">\n    <label><input type=\"checkbox\" id=\"bs-eb-strong\"" + (isBold ? ' checked="checked"' : '') + "/>\n    " + (BsEbConstant.translate('Bold')) + " <code>&lt;strong&gt;</code></label>\n</div>\n<div class=\"form-group\">\n    <code class=\"pull-right\">CSS: color</code>\n    <label for=\"bs-eb-color\">" + (BsEbConstant.translate('Text color')) + "</label>\n    <div class=\"input-group\">\n        <input type=\"text\" id=\"bs-eb-color\" value=\"" + textColor + "\" placeholder=\"#000000\" class=\"form-control\"/>\n        <div class=\"input-group-btn\"><button type=\"button\" class=\"btn btn-default btn-colorpicker\"><i></i></button></div>\n    </div>\n</div>\n<div class=\"form-group\">\n    <code class=\"pull-right\">CSS: background-color</code>\n    <label for=\"bs-eb-background-color\">" + (BsEbConstant.translate('Background color')) + "</label>\n    <div class=\"input-group\">\n        <input type=\"text\" id=\"bs-eb-background-color\" value=\"" + backgroundColor + "\" placeholder=\"#ffffff\" class=\"form-control\"/>\n        <div class=\"input-group-btn\"><button type=\"button\" class=\"btn btn-default btn-colorpicker\"><i></i></button></div>\n    </div>\n</div>\n<div class=\"form-group\">\n    <code class=\"pull-right\">CSS3: border-radius</code>\n    <label for=\"bs-eb-border-radius\">" + (BsEbConstant.translate('Rounded border')) + "</label>\n    <input type=\"text\" id=\"bs-eb-border-radius\" value=\"" + borderRadius + "\" class=\"form-control\" placeholder=\"5px\"/>\n</div>",
        btnOkClick: function() {
          modal.hide();
          $button.html($('#bs-eb-value').val());
          if ($('#bs-eb-strong').prop('checked')) {
            $button.wrapInner('<strong/>');
          }
          $button.attr('href', $('#bs-eb-href').val());
          return $button.css({
            color: $('#bs-eb-color').val(),
            backgroundColor: $('#bs-eb-background-color').val(),
            borderRadius: self._intFilter($('#bs-eb-border-radius').val())
          });
        },
        modalReady: function() {
          return BsEbColorSelection.colorpicker('#bs-eb-color,#bs-eb-background-color');
        }
      });
      return this;
    };

    return BsEbTypeElementButton;

  })(win.AbstractBsEbTypeElement);

}).call(this);

//# sourceMappingURL=bs-eb-type-element-button.js.map
