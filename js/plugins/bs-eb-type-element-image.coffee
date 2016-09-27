###!
Bootstrap Email Builder v@current-version@
Copyright (c) 161 SARL, http://161.io
License: https://github.com/161io/bootstrap-email-builder/blob/master/license.txt
###

win = window
BsEbConstant = win.BsEbConstant


class win.BsEbTypeElementImage extends win.AbstractBsEbTypeElement

    # @return {String}
    # @static
    @tabButton: ->
        """
        <div class="col-xs-6">
        <a class="btn btn-lg btn-block btn-default" data-draggable-type="elt-image">
            <span class="glyphicon glyphicon-picture"></span><br/>
            <span>#{ BsEbConstant.translate('Image') }</span>
        </a>
        </div>
        """

    defaultSrc  : ''
    defaultAlt  : 'image'
    defaultStyle: 'display:block;border:0 none;width:100%;height:auto;'

    responsiveFilemanagerIframe: ''

    # @param {jQuery} $helper
    # @param {String} type
    # @return {BsEbTypeElementImage}
    buildHtml: ($helper, type) ->
        html = """
            <div class="#{ BsEbConstant.CLASS_NAME_ELEMENT_CONTENT }" data-type="#{ type }">
            <img src="#{ @defaultSrc }" alt="#{ @defaultAlt }" border="0" style="#{ @defaultStyle }"/>
            </div>
            """
        super $helper, type, html

    # @return {BsEbTypeElementImage}
    events: ->
        @$element
            .on 'bseb-elt-more', @onMore
        @

    # @return {BsEbTypeElementImage}
    onMore: =>
        responsiveFilemanagerIframe = @responsiveFilemanagerIframe
        if !responsiveFilemanagerIframe and win.tinyMCE and tinyMCE.settings.external_filemanager_path
            responsiveFilemanagerIframe = tinyMCE.settings.external_filemanager_path + 'dialog.php?type=1&field_id=bs-eb-src'
            #responsiveFilemanagerIframe += '&lang=' + BsEbConstant.translate('en')
            if tinyMCE.settings.filemanager_access_key
                responsiveFilemanagerIframe += '&akey=' + tinyMCE.settings.filemanager_access_key

        $a   = @$element.find('a').first()
        $img = @$element.find('img').first()
        href = BsEbConstant.escape $a.attr 'href'
        src  = BsEbConstant.escape $img.attr 'src'
        alt  = BsEbConstant.escape $img.attr 'alt'

        modal = new win.BsEbModal {
            title: BsEbConstant.translate('Content') + ' : ' + BsEbConstant.translate('Image')
            body : """
                <div class="form-group">
                    <code class="pull-right">src=&quot;...&quot;</code>
                    <label for="bs-eb-src">#{ BsEbConstant.translate('Source') }</label>
                    <div class="input-group">
                        <input type="text" id="bs-eb-src" value="#{ src }" placeholder="https:// ... image.jpg" class="form-control"/>
                        <span class="input-group-btn"><button class="btn btn-default" type="button" id="bs-eb-src-browse">#{ BsEbConstant.translate('Browse') }</button></span>
                    </div>
                </div>
                <div class="form-group">
                    <code class="pull-right">alt=&quot;...&quot;</code>
                    <label for="bs-eb-alt">#{ BsEbConstant.translate('Image description') }</label>
                    <input type="text" id="bs-eb-alt" value="#{ alt }" class="form-control" maxlength="50"/>
                </div>
                <hr/>
                <div class="form-group">
                    <code class="pull-right">href=&quot;...&quot;</code>
                    <label for="bs-eb-href">#{ BsEbConstant.translate('Url') }</label>
                    <input type="url" id="bs-eb-href" value="#{ href }" placeholder="https://..." class="form-control"/>
                </div>
                """
            btnOkClick: ->
                modal.hide()
                hrefVal = $('#bs-eb-href').val()
                if hrefVal
                    if $a.length
                        $a.attr 'href', hrefVal
                    else
                        $img.wrap """<a href="#{ hrefVal }" target="_blank"></a>"""
                else if $a.length
                    $img.appendTo $a.parent()
                    $a.remove()

                $img.attr 'src', $('#bs-eb-src').val()
                    .attr 'alt', $('#bs-eb-alt').val()
            modalReady: ->
                $('#bs-eb-src-browse').on 'click', ->
                    if !responsiveFilemanagerIframe
                        $.featherlight """<div class="lead" style="padding:40px 30px 20px;">RESPONSIVE filemanager was not found.</div>"""
                        return

                    # https://github.com/noelboss/featherlight/#installation
                    lightbox = $.featherlight("""<iframe src="#{ responsiveFilemanagerIframe }" width="900" height="600" frameborder="0" style="border:none;"></iframe>""", {})
                    win.responsive_filemanager_callback = (fieldId) ->
                        lightbox.close()
                        setTimeout (-> modal.show() ), 500
        }
        @


