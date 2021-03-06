
/*!
Bootstrap Email Builder v0.0.3
Copyright (c) 161 SARL, https://161.io
License: https://github.com/161io/bootstrap-email-builder/blob/master/license.txt
 */

(function() {
  var BsEbConstant, detectFontFormats, language, pluginsResponsiveFilemanagerPath, responsiveFilemanagerPath, win;

  win = window;

  responsiveFilemanagerPath = 'node_modules_zip/responsive-filemanager/';

  pluginsResponsiveFilemanagerPath = '../../node_modules_zip/responsive-filemanager/';

  language = 'en';

  BsEbConstant = win.BsEbConstant;

  if (BsEbConstant && BsEbConstant.translate(language) !== language) {
    language = BsEbConstant.translate(language);
  }

  detectFontFormats = function() {
    var fonts;
    fonts = '';
    $('[data-name="font-family"]').parent().find('.dropdown-menu a').each(function() {
      var $a;
      $a = $(this);
      if (!$a.css('fontFamily')) {
        return;
      }
      if (fonts) {
        fonts += ';';
      }
      return fonts += $a.text() + '=' + $a.css('fontFamily').replace(/'"/, '');
    });
    return fonts;
  };

  tinyMCE.init({
    mode: 'none',
    menubar: false,
    inline: true,
    plugins: 'advlist lists link image hr textcolor colorpicker code paste responsivefilemanager',
    toolbar1: 'bold italic underline forecolor | alignleft aligncenter alignright alignjustify hr | undo redo | removeformat code',
    toolbar2: 'fontselect fontsizeselect | link unlink image | bullist numlist',
    font_formats: detectFontFormats(),
    fontsize_formats: '8px 10px 12px 14px 18px 24px 36px 72px',
    image_advtab: true,
    paste_as_text: true,
    relative_urls: false,
    remove_script_host: false,
    default_link_target: '_blank',
    link_title: false,
    browser_spellcheck: true,
    language: language,
    external_filemanager_path: responsiveFilemanagerPath + "filemanager/",
    filemanager_title: 'Responsive Filemanager',
    external_plugins: {
      filemanager: pluginsResponsiveFilemanagerPath + "filemanager/plugin.min.js",
      responsivefilemanager: pluginsResponsiveFilemanagerPath + "tinymce/plugins/responsivefilemanager/plugin.min.js"
    }
  });

}).call(this);

//# sourceMappingURL=bs-eb-tinymce-init.js.map
