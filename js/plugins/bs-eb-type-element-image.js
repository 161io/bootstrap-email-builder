
/*!
Boostrap Email Builder v0.0.1
Copyright (c) 161 SARL, http://161.io
License : github.com/161io/bootstrap-email-builder/license.txt
 */

(function() {
  var BsEbConstant, win,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  win = window;

  BsEbConstant = win.BsEbConstant;

  win.BsEbTypeElementImage = (function(superClass) {
    extend(BsEbTypeElementImage, superClass);

    function BsEbTypeElementImage() {
      this.onMore = bind(this.onMore, this);
      return BsEbTypeElementImage.__super__.constructor.apply(this, arguments);
    }

    BsEbTypeElementImage.tabButton = function() {
      return "<div class=\"col-xs-6\">\n<a class=\"btn btn-lg btn-block btn-default\" data-draggable-type=\"elt-image\">\n    <span class=\"glyphicon glyphicon-picture\"></span><br/>\n    <span>" + (BsEbConstant.translate('Image')) + "</span>\n</a>\n</div>";
    };

    BsEbTypeElementImage.prototype.defaultSrc = '';

    BsEbTypeElementImage.prototype.defaultAlt = 'image';

    BsEbTypeElementImage.prototype.defaultStyle = 'display:block;border:0 none;width:100%;height:auto;';

    BsEbTypeElementImage.prototype.responsiveFilemanagerIframe = '';

    BsEbTypeElementImage.prototype.buildHtml = function($helper, type) {
      var html;
      html = "<div class=\"" + BsEbConstant.CLASS_NAME_ELEMENT_CONTENT + "\" data-type=\"" + type + "\">\n<img src=\"" + this.defaultSrc + "\" alt=\"" + this.defaultAlt + "\" border=\"0\" style=\"" + this.defaultStyle + "\"/>\n</div>";
      return BsEbTypeElementImage.__super__.buildHtml.call(this, $helper, type, html);
    };

    BsEbTypeElementImage.prototype.events = function() {
      this.$element.on('bseb-elt-more', this.onMore);
      return this;
    };

    BsEbTypeElementImage.prototype.onMore = function() {
      var $a, $img, alt, href, modal, responsiveFilemanagerIframe, src;
      responsiveFilemanagerIframe = this.responsiveFilemanagerIframe;
      if (!responsiveFilemanagerIframe && win.tinyMCE && tinyMCE.settings.external_filemanager_path) {
        responsiveFilemanagerIframe = tinyMCE.settings.external_filemanager_path + 'dialog.php?type=1&field_id=bs-eb-src';
      }
      $a = this.$element.find('a').first();
      $img = this.$element.find('img').first();
      href = BsEbConstant.escape($a.attr('href'));
      src = BsEbConstant.escape($img.attr('src'));
      alt = BsEbConstant.escape($img.attr('alt'));
      modal = new win.BsEbModal({
        title: BsEbConstant.translate('Content') + ' : ' + BsEbConstant.translate('Image'),
        body: "<div class=\"form-group\">\n    <code class=\"pull-right\">src=&quot;...&quot;</code>\n    <label for=\"bs-eb-src\">" + (BsEbConstant.translate('Source')) + "</label>\n    <div class=\"input-group\">\n        <input type=\"text\" id=\"bs-eb-src\" value=\"" + src + "\" placeholder=\"https:// ... image.jpg\" class=\"form-control\"/>\n        <span class=\"input-group-btn\"><button class=\"btn btn-default\" type=\"button\" id=\"bs-eb-src-browse\">" + (BsEbConstant.translate('Browse')) + "</button></span>\n    </div>\n</div>\n<div class=\"form-group\">\n    <code class=\"pull-right\">alt=&quot;...&quot;</code>\n    <label for=\"bs-eb-alt\">" + (BsEbConstant.translate('Image description')) + "</label>\n    <input type=\"text\" id=\"bs-eb-alt\" value=\"" + alt + "\" class=\"form-control\" maxlength=\"50\"/>\n</div>\n<hr/>\n<div class=\"form-group\">\n    <code class=\"pull-right\">href=&quot;...&quot;</code>\n    <label for=\"bs-eb-href\">" + (BsEbConstant.translate('Url')) + "</label>\n    <input type=\"url\" id=\"bs-eb-href\" value=\"" + href + "\" placeholder=\"https://...\" class=\"form-control\"/>\n</div>",
        btnOkClick: function() {
          var hrefVal;
          modal.hide();
          hrefVal = $('#bs-eb-href').val();
          if (hrefVal) {
            if ($a.length) {
              $a.attr('href', hrefVal);
            } else {
              $img.wrap("<a href=\"" + hrefVal + "\" target=\"_blank\"></a>");
            }
          } else if ($a.length) {
            $img.appendTo($a.parent());
            $a.remove();
          }
          return $img.attr('src', $('#bs-eb-src').val()).attr('alt', $('#bs-eb-alt').val());
        },
        modalReady: function() {
          return $('#bs-eb-src-browse').on('click', function() {
            var lightbox;
            if (!responsiveFilemanagerIframe) {
              $.featherlight("<div class=\"lead\" style=\"padding:40px 30px 20px;\">RESPONSIVE filemanager was not found.</div>");
              return;
            }
            lightbox = $.featherlight("<iframe src=\"" + responsiveFilemanagerIframe + "\" width=\"900\" height=\"600\" frameborder=\"0\" style=\"border:none;\"></iframe>", {});
            return win.responsive_filemanager_callback = function(fieldId) {
              lightbox.close();
              return setTimeout((function() {
                return modal.show();
              }), 500);
            };
          });
        }
      });
      return this;
    };

    return BsEbTypeElementImage;

  })(win.AbstractBsEbTypeElement);

}).call(this);

//# sourceMappingURL=bs-eb-type-element-image.js.map
