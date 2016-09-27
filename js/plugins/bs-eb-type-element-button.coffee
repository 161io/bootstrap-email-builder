###!
Bootstrap Email Builder v@current-version@
Copyright (c) 161 SARL, http://161.io
License: https://github.com/161io/bootstrap-email-builder/blob/master/license.txt
###

win = window
BsEbConstant = win.BsEbConstant



class win.BsEbTypeElementButton extends win.AbstractBsEbTypeElement

    # @return {String}
    # @static
    @tabButton: ->
        """
        <div class="col-xs-6">
        <a class="btn btn-lg btn-block btn-default" data-draggable-type="elt-button">
            <span class="glyphicon glyphicon-link"></span><br/>
            <span>#{ BsEbConstant.translate('Link/button') }</span>
        </a>
        </div>
        """

    defaultHref : '#'
    defaultStyle: 'border-radius:4px;background-color:#337ab7;color:#fff;text-decoration:none;padding:10px 15px;'

    # @param {jQuery} $helper
    # @param {String} type
    # @return {BsEbTypeElementButton}
    buildHtml: ($helper, type) ->
        html = """
            <div class="#{ BsEbConstant.CLASS_NAME_ELEMENT_CONTENT }" data-type="#{ type }" style="text-align:center;">
            <br/><a href="#{ @defaultHref }" style="#{ @defaultStyle }" target="_blank">Button</a><br/><br/>
            </div>
            """
        super $helper, type, html

    # @return {BsEbTypeElementButton}
    events: ->
        @$element
            .on 'bseb-elt-more', @onMore
        @

    # @return {BsEbTypeElementButton}
    onMore: =>
        self = @
        $button = @$element.find('a').first()
        isBold          = 1 == $button.children('strong').length && 1 == $button.contents().length
        href            = BsEbConstant.escape $button.attr 'href'
        value           = BsEbConstant.escape(if isBold then $button.children().html() else $button.html())
        textColor       = $button.css 'color'
        backgroundColor = $button.css 'backgroundColor'
        borderRadius    = @_intFilter $button.css 'borderRadius'

        modal = new win.BsEbModal {
            title: BsEbConstant.translate('Content') + ' : ' + BsEbConstant.translate('Link/button')
            body : """
                <div class="form-group">
                    <label for="bs-eb-value">#{ BsEbConstant.translate('Label') }</label>
                    <input type="text" id="bs-eb-value" value="#{ value }" class="form-control" placeholder="..."/>
                </div>
                <div class="form-group">
                    <code class="pull-right">href=&quot;...&quot;</code>
                    <label for="bs-eb-href">#{ BsEbConstant.translate('Url') }</label>
                    <input type="url" id="bs-eb-href" value="#{ href }" placeholder="https://..." class="form-control"/>
                </div>
                <hr/>
                <div class="checkbox">
                    <label><input type="checkbox" id="bs-eb-strong"#{ if isBold then ' checked="checked"' else '' }/>
                    #{ BsEbConstant.translate('Bold') } <code>&lt;strong&gt;</code></label>
                </div>
                <div class="form-group">
                    <code class="pull-right">CSS: color</code>
                    <label for="bs-eb-color">#{ BsEbConstant.translate('Text color') }</label>
                    <div class="input-group">
                        <input type="text" id="bs-eb-color" value="#{ textColor }" placeholder="#000000" class="form-control"/>
                        <div class="input-group-btn"><button type="button" class="btn btn-default btn-colorpicker"><i></i></button></div>
                    </div>
                </div>
                <div class="form-group">
                    <code class="pull-right">CSS: background-color</code>
                    <label for="bs-eb-background-color">#{ BsEbConstant.translate('Background color') }</label>
                    <div class="input-group">
                        <input type="text" id="bs-eb-background-color" value="#{ backgroundColor }" placeholder="#ffffff" class="form-control"/>
                        <div class="input-group-btn"><button type="button" class="btn btn-default btn-colorpicker"><i></i></button></div>
                    </div>
                </div>
                <div class="form-group">
                    <code class="pull-right">CSS3: border-radius</code>
                    <label for="bs-eb-border-radius">#{ BsEbConstant.translate('Rounded border') }</label>
                    <input type="text" id="bs-eb-border-radius" value="#{ borderRadius }" class="form-control" placeholder="5px"/>
                </div>
                """
            btnOkClick: ->
                modal.hide()

                $button.html $('#bs-eb-value').val()
                if $('#bs-eb-strong').prop('checked') then $button.wrapInner('<strong/>')

                $button.attr 'href', $('#bs-eb-href').val()
                $button.css {
                    color          : $('#bs-eb-color').val()
                    backgroundColor: $('#bs-eb-background-color').val()
                    borderRadius   : self._intFilter $('#bs-eb-border-radius').val()
                }
            modalReady: ->
                BsEbColorSelection.colorpicker '#bs-eb-color,#bs-eb-background-color'
        }
        @


