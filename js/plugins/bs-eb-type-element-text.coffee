###!
Bootstrap Email Builder v@current-version@
Copyright (c) 161 SARL, http://161.io
License: https://github.com/161io/bootstrap-email-builder/blob/master/license.txt
###

win = window
BsEbConstant = win.BsEbConstant


class win.BsEbTypeElementText extends win.AbstractBsEbTypeElement

    # @return {String}
    # @static
    @tabButton: ->
        """
        <div class="col-xs-6">
        <a class="btn btn-lg btn-block btn-default" data-draggable-type="elt-text">
            <span class="glyphicon glyphicon-link"></span><br/>
            <span>#{ BsEbConstant.translate('Text') }</span>
        </a>
        </div>
        """

    defaultText: """<p>Lorem <a href="#" target="_blank">ipsum</a>...</p>"""

    # @param {jQuery} $helper
    # @param {String} type
    # @return {BsEbTypeElementText}
    buildHtml: ($helper, type) ->
        html = """
            <div class="#{ BsEbConstant.CLASS_NAME_ELEMENT_CONTENT }" data-type="#{ type }">#{ @defaultText }</div>
            """
        super $helper, type, html

    # @return {BsEbTypeElementText}
    events: ->
        if @$element.attr 'id'
            newId = @$element.attr 'id'
        else
            newId = win.AbstractBsEbTypeElement.getNewId()

        ignoreClick = false
        @$element
            .attr 'id', newId
            .off 'click'
            #.on 'sortable-start', ->
            .on 'sortable-stop', ->
                ignoreClick = true
            .on 'bseb-elt-ready', ->
                tinyMCE.execCommand('mceAddEditor', false, newId)
            .on 'click', =>
                if ignoreClick then return ignoreClick = false
                @disableSortable true
                if tinyMCE.activeEditor and tinyMCE.activeEditor.id != newId
                    tinyMCE.execCommand('mceRemoveEditor', true, tinyMCE.activeEditor.id)

                tinyMCE.execCommand('mceAddEditor', false, newId)
                tinyMCE.execCommand('mceFocus', false, newId)
            .on 'focus', =>
                if @$element.text() == $(@defaultText).text() then tinyMCE.get(newId).setContent ''
            .on 'blur', =>
                @disableSortable false
                if !@$element.text() then @$element.html @defaultText
            .on 'bseb-elt-more', @onMore
        @

    # @return {BsEbTypeElementText}
    onMore: =>
        modal = new win.BsEbModal {
            title: BsEbConstant.translate('Content') + ' : ' + BsEbConstant.translate('Text')
            body : """
                <p class="lead">Soon...</p>
                """
            btnOkClick: ->
                modal.hide()
        }
        @


