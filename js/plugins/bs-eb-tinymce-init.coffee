###!
Bootstrap Email Builder v@current-version@
Copyright (c) 161 SARL, https://161.io
License: https://github.com/161io/bootstrap-email-builder/blob/master/license.txt
###

win = window


# @see: /bower_components/responsive-filemanager/filemanager/config/config.php
responsiveFilemanagerPath        = 'bower_components/responsive-filemanager/'
pluginsResponsiveFilemanagerPath = '../responsive-filemanager/'


language = 'en'
BsEbConstant = win.BsEbConstant
if BsEbConstant and BsEbConstant.translate(language) != language
    language = BsEbConstant.translate(language)


detectFontFormats = ->
    fonts = ''
    $('[data-name="font-family"]').parent().find('.dropdown-menu a').each ->
        $a = $(@)
        if !$a.css('fontFamily') then return
        if fonts then fonts += ';'
        fonts += $a.text() + '=' + $a.css('fontFamily').replace(/'"/, '')
    fonts

tinyMCE.init {
    mode                : 'none'
    menubar             : false
    inline              : true
    plugins             : 'advlist lists link image hr textcolor colorpicker code paste responsivefilemanager'
    toolbar1            : 'bold italic underline forecolor | alignleft aligncenter alignright alignjustify hr | undo redo | removeformat code'
    toolbar2            : 'fontselect fontsizeselect | link unlink image | bullist numlist'
    font_formats        : detectFontFormats()
    fontsize_formats    : '8px 10px 12px 14px 18px 24px 36px 72px'
    #textcolor_map      : [
    #   "000000", "Color 1"
    #   "ff0000", "Color 2"
    #   ...
    #]
    image_advtab        : true
    paste_as_text       : true
    # Link
    relative_urls       : false
    remove_script_host  : false
    default_link_target : '_blank'
    link_title          : false
    browser_spellcheck  : true
    language            : language
    #language_url       : 'js/tinymce-langs/fr_FR.js'

    # ResponsiveFilemanager
    external_filemanager_path : "#{ responsiveFilemanagerPath }filemanager/"
    filemanager_title         : 'Responsive Filemanager'
    external_plugins          : {
        filemanager           : "#{ pluginsResponsiveFilemanagerPath }filemanager/plugin.min.js"
        responsivefilemanager : "#{ pluginsResponsiveFilemanagerPath }tinymce/plugins/responsivefilemanager/plugin.min.js"
    }
}
