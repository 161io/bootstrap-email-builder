###!
Bootstrap Email Builder v@current-version@
Copyright (c) 161 SARL, http://161.io
License: https://github.com/161io/bootstrap-email-builder/blob/master/license.txt
###

win = window
BsEbConstant = win.BsEbConstant


class win.BsEbTypeElementSourceCode extends win.AbstractBsEbTypeElement

    # @return {String}
    # @static
    @tabButton: ->
        """
        <div class="col-xs-6">
        <a class="btn btn-lg btn-block btn-default" data-draggable-type="elt-source-code">
            <kbd>&lt;/&gt;</kbd><br/>
            <span>#{ BsEbConstant.translate('Source code') }</span>
        </a>
        </div>
        """

    # @param {jQuery} $helper
    # @param {String} type
    # @return {BsEbTypeElementSourceCode}
    buildHtml: ($helper, type) ->
        html = """
            <div class="#{ BsEbConstant.CLASS_NAME_ELEMENT_CONTENT }" data-type="#{ type }">
            <code>HTML source</code>
            </div>
            """
        super $helper, type, html

    # @return {BsEbTypeElementSourceCode}
    events: ->
        @$element
            .on 'bseb-elt-more', @onMore
        @

    # @return {BsEbTypeElementSourceCode}
    onMore: =>
        $element = @$element

        modal = new win.BsEbModal {
            title: BsEbConstant.translate('Content') + ' : ' + BsEbConstant.translate('Source code')
            body : """
                <textarea id="bs-eb-code" class="form-control" cols="10" rows="10" placeholder="<..>..</..>">#{ BsEbConstant.escape($.trim($element.html())) }</textarea>
                """
            btnOkClick: ->
                modal.hide()
                $element.html($('#bs-eb-code').val())
        }
        @


