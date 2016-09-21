
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

  win.BsEbTypeElementDivider = (function(superClass) {
    extend(BsEbTypeElementDivider, superClass);

    function BsEbTypeElementDivider() {
      this.onMore = bind(this.onMore, this);
      return BsEbTypeElementDivider.__super__.constructor.apply(this, arguments);
    }

    BsEbTypeElementDivider.tabButton = function() {
      return "<div class=\"col-xs-6\">\n<a class=\"btn btn-lg btn-block btn-default\" data-draggable-type=\"elt-divider\">\n    <span class=\"glyphicon glyphicon-option-horizontal\"></span><br/>\n    <span>" + (BsEbConstant.translate('Divider')) + "</span>\n</a>\n</div>";
    };

    BsEbTypeElementDivider.prototype.defaultSize = '1px';

    BsEbTypeElementDivider.prototype.defaultColor = '#eeeeee';

    BsEbTypeElementDivider.prototype.defaultStyle = 'height:1px;border:0 none;';

    BsEbTypeElementDivider.prototype.buildHtml = function($helper, type) {
      var html;
      html = "<div class=\"" + BsEbConstant.CLASS_NAME_ELEMENT_CONTENT + "\" data-type=\"" + type + "\">\n<hr noshade=\"noshade\" size=\"" + this.defaultSize + "\" color=\"" + this.defaultColor + "\" style=\"" + this.defaultStyle + "\"/>\n</div>";
      return BsEbTypeElementDivider.__super__.buildHtml.call(this, $helper, type, html);
    };

    BsEbTypeElementDivider.prototype.events = function() {
      this.$element.on('bseb-elt-more', this.onMore);
      return this;
    };

    BsEbTypeElementDivider.prototype.onMore = function() {
      var $hr, color, isNoshade, modal, self, size;
      self = this;
      $hr = this.$element.find('hr').first();
      isNoshade = $hr.is('[noshade]');
      size = this._intFilter($hr.attr('size'));
      color = $hr.attr('color');
      modal = new win.BsEbModal({
        title: BsEbConstant.translate('Content') + ' : ' + BsEbConstant.translate('Divider'),
        body: "<div class=\"checkbox\">\n    <label><input type=\"checkbox\" id=\"bs-eb-noshade\"" + (isNoshade ? ' checked="checked"' : '') + "/>\n    " + (BsEbConstant.translate('Noshaded')) + " <code>noshade=&quot;noshade&quot;</code></label>\n</div>\n<div class=\"form-group\">\n    <code class=\"pull-right\">size=&quot;...&quot;</code>\n    <label for=\"bs-eb-size\">" + (BsEbConstant.translate('Size')) + "</label>\n    <input type=\"text\" id=\"bs-eb-size\" value=\"" + size + "\" class=\"form-control\" placeholder=\"1px\" maxlength=\"10\"/>\n</div>\n<div class=\"form-group\">\n    <code class=\"pull-right\">color=&quot;...&quot;</code>\n    <label for=\"bs-eb-color\">" + (BsEbConstant.translate('Color')) + "</label>\n    <div class=\"input-group\">\n        <input type=\"text\" id=\"bs-eb-color\" value=\"" + color + "\" placeholder=\"#eeeeee\" class=\"form-control\"/>\n        <div class=\"input-group-btn\"><button type=\"button\" class=\"btn btn-default btn-colorpicker\"><i></i></button></div>\n    </div>\n</div>",
        btnOkClick: function() {
          modal.hide();
          if ($('#bs-eb-noshade').prop('checked')) {
            $hr.attr('noshade', 'noshade');
          } else {
            $hr.removeAttr('noshade');
          }
          size = self._intFilter($('#bs-eb-size').val());
          return $hr.attr('size', size).css('height', size).attr('color', $('#bs-eb-color').val());
        },
        modalReady: function() {
          return BsEbColorSelection.colorpicker('#bs-eb-color');
        }
      });
      return this;
    };

    return BsEbTypeElementDivider;

  })(win.AbstractBsEbTypeElement);

}).call(this);

//# sourceMappingURL=bs-eb-type-element-divider.js.map
