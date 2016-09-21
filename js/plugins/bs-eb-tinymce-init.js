
/*!
Bootstrap Email Builder v0.0.1
Copyright (c) 161 SARL, http://161.io
License : github.com/161io/bootstrap-email-builder/license.txt
 */

(function() {
  var BsEbConstant, detectFontFormats, language, pluginsResponsiveFilemanagerPath, responsiveFilemanagerPath, win;

  win = window;

  responsiveFilemanagerPath = 'bower_components/responsive-filemanager/';

  pluginsResponsiveFilemanagerPath = '../responsive-filemanager/';

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
