###!
Bootstrap Email Builder v@current-version@
Copyright (c) 161 SARL, https://161.io
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

    defaultSrc   : ''
    defaultAlt   : 'image'
    defaultWidth : ''
    defaultHeight: ''
    defaultStyle : 'border:0 none;'

    responsiveFilemanagerIframe: ''

    # @param {jQuery} $helper
    # @param {String} type
    # @param {String} html
    # @return {BsEbTypeElementImage}
    buildHtml: ($helper, type, html) ->
        if !html
            html = """
                <div class="#{ BsEbConstant.CLASS_NAME_ELEMENT_CONTENT }" data-type="#{ type }">
                <img src="#{ @defaultSrc }" alt="#{ @defaultAlt }" border="0" style="#{ @defaultStyle }" width="#{ @defaultWidth }" height="#{ @defaultHeight }"/>
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

        filterIntOrNull = (int) ->
            int = parseInt int
            return if isNaN(int) or int < 1 then '' else int

        self = @
        $a   = @$element.find('a').first()
        $img = @$element.find('img').first()
        src     = BsEbConstant.escape $img.attr 'src'
        width   = filterIntOrNull $img.attr('width')
        height  = filterIntOrNull $img.attr('height')
        alt     = BsEbConstant.escape $img.attr 'alt'
        isBlock = $img.css('display') == 'block'
        href    = BsEbConstant.escape $a.attr 'href'

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
                <div class="form-group">
                    <code class="pull-right">width=&quot;...&quot; height=&quot;...&quot;</code>
                    <label for="bs-eb-width">#{ BsEbConstant.translate('Width') } &times; #{ BsEbConstant.translate('Height') }</label>
                    <div class="row">
                        <div class="col-xs-5"><input type="text" id="bs-eb-width" value="#{ width }" class="form-control" maxlength="5"/></div>
                        <div class="col-xs-2 text-center"><button type="button" class="btn btn-default btn-block active" id="bs-eb-btn-ratio"><span class="glyphicon glyphicon-transfer"></span></button></div>
                        <div class="col-xs-5"><input type="text" id="bs-eb-height" value="#{ height }" class="form-control" maxlength="5"/></div>
                    </div>
                </div>
                <div class="checkbox">
                    <label><input type="checkbox" id="bs-eb-block"#{ if isBlock then ' checked="checked"' else '' }/>
                    #{ BsEbConstant.translate('Image as a block') } <code>&quot;display:block&quot;</code></label>
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

                inputWidth   = filterIntOrNull $('#bs-eb-width').val()
                inputHeight  = filterIntOrNull $('#bs-eb-height').val()
                inputIsBlock = $('#bs-eb-block').prop 'checked'

                $img
                    .attr {
                        'src'   : $('#bs-eb-src').val()
                        'alt'   : $('#bs-eb-alt').val()
                        'width' : inputWidth
                        'height': inputHeight
                    }
                    .css {
                        'display': if inputIsBlock then 'block' else ''
                        'border' : '0 none'
                        'width'  : inputWidth
                        'height' : inputHeight
                    }
            modalReady: ->
                $('#bs-eb-src-browse').on 'click', ->
                    if !responsiveFilemanagerIframe
                        $.featherlight """<div class="lead" style="padding:40px 30px 20px;">RESPONSIVE filemanager was not found.</div>"""
                        return

                    # https://github.com/noelboss/featherlight/#installation
                    lightbox = $.featherlight("""<iframe src="#{ responsiveFilemanagerIframe }" width="900" height="600" frameborder="0" style="border:none;"></iframe>""", {})
                    win.responsive_filemanager_callback = (fieldId) ->
                        self.detectSize()
                        lightbox.close()
                        setTimeout (-> modal.show() ), 500
        }

        ratio = if width > 0 and height > 0 then (width / height) else 1

        $src = $('#bs-eb-src')
        $src.on 'change blur', @detectSize
            .data 'ratio', ratio
            .data 'prevVal', $src.val()
        @ratioTool()
        @

    # Ratio lock/unlock
    ratioTool: ->
        $src      = $('#bs-eb-src')
        $width    = $('#bs-eb-width')
        $height   = $('#bs-eb-height')
        $btnRatio = $('#bs-eb-btn-ratio')

        calcSize = (widthOrHeight = 'width') ->
            return if !$btnRatio.hasClass 'active'
            width  = parseInt $width.val()
            height = parseInt $height.val()
            ratio  = $src.data 'ratio'
            if isNaN(width) or width < 1 then width = 0
            if isNaN(height) or height < 1 then height = 0
            if 'width' == widthOrHeight
                height = Math.round(width / ratio)
                if height > 0 then $height.val height
            else
                width = Math.round(height * ratio)
                if width > 0 then $width.val width
            return

        # evens
        $btnRatio.on 'click', -> $btnRatio.toggleClass('active'); calcSize()
        $width.on 'keyup', -> calcSize()
        $height.on 'keyup', -> calcSize('height')

    # Load image
    detectSize: ->
        $src    = $('#bs-eb-src')
        $width  = $('#bs-eb-width')
        $height = $('#bs-eb-height')
        $src.parents('.form-group').removeClass('has-error')

        return false if !$src.val() or $src.val() == $src.data('prevVal')

        $src.data 'ratio', 1
            .data 'prevVal', $src.val()
        imgClassName = 'bs-eb-img-detect-size'
        cleanImgs = -> $('.' + imgClassName).remove()

        $img = $("""<img alt="" class="#{ imgClassName }"/>""")
        $img
            .css {
                position: 'absolute'
                left    : '-100%'
                top     : '-100%'
            }
            .on 'load', ->
                setTimeout(->
                    width  = $img.width()
                    height = $img.height()
                    ratio  = if width > 0 and height > 0 then (width / height) else 1

                    $width.val width
                    $height.val height
                    $src.data 'ratio', ratio
                    cleanImgs()
                , 200)
            .on 'error', ->
                $src.parents('.form-group').addClass('has-error')
                cleanImgs()
        $img
            .attr 'src', $src.val()
            .appendTo 'body'


