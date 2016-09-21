# Copyright (c) 161 SARL, http://161.io

class win.BootstrapEmailBuilder

    # @param {Object} options
    constructor: (options = {}) ->
        {
            @$render = $('#bs-eb-render')
            @$tool   = $('.bs-eb-tool')
        } = options
        @body = null
        @contextMenu = null
        @ready()

    # @return {BootstrapEmailBuilder}
    ready: ->
        @translate()
        @toolButtons()
        @toolEvents()
        @body = new BsEbBody @$render, @$tool
        @contextMenu = new BsEbContextMenu()
        @

    # @return {BootstrapEmailBuilder}
    translate: ->
        return @ if !win.bootstrapEmailBuilder
        $('[data-locale]').each ->
            $elt = $(@)
            $elt.html(BsEbConstant.translate($elt.text()))
        @

    # @return {BootstrapEmailBuilder}
    toolButtons: ->
        $row = $('#bs-eb-content>.row')
        $.each win, (key, val) ->
            if !val or !(val.prototype instanceof win.AbstractBsEbTypeElement) then return
            $row.append val.tabButton()
        @

    # @return {BootstrapEmailBuilder}
    toolEvents: ->
        applyWidth = ($helper, $ref) -> $helper.width($ref.width())
        #applySize = ($helper, $ref) -> $helper.width($ref.width()).height($ref.height())

        @$tool.find('[data-draggable-type^="elt"]').draggable {
            appendTo         : 'body'
            helper           : 'clone'
            start            : (event, ui) -> applyWidth ui.helper, $(@)
            cursor           : 'move'
            zIndex           : 10
            #revert          : 'invalid'
            #revertDuration  : 300
            connectToSortable: BsEbConstant.SELECTOR_STRUCT_CONTENT
        }
        BsEbTypeStructure.constructor2 $(BsEbConstant.SELECTOR_STRUCT_CONTAINER)

        @$tool.find('[data-draggable-type^="struct"]').draggable {
            appendTo         : 'body'
            helper           : 'clone'
            start            : (event, ui) -> applyWidth ui.helper, $(@)
            cursor           : 'move'
            zIndex           : 10
            revert           : 'invalid'
            revertDuration   : 300
            connectToSortable: "#{ BsEbConstant.SELECTOR_CONTAINER }>tbody"
        }
        $("#{ BsEbConstant.SELECTOR_CONTAINER }>tbody").sortable {
            start            : (event, ui) -> applyWidth ui.helper.find('table').first(), $(@)
            cursor           : 'move'
            placeholder      : 'bg-warning'
            #revert          : 'invalid'
            #revertDuration  : 300
            receive          : (event, ui) ->
                $helper = ui.helper
                type   = $helper.data 'draggable-type'
                struct = new BsEbTypeStructure()
                struct.buildHtml $helper, type
                $helper.remove()
        }
        BsEbTypeElementFactory.constructor2 $(BsEbConstant.SELECTOR_ELEMENT_CONTENT)
        @

    # @return {String} <body/>
    save: (withoutData = false) ->
        hex = (x) -> ('0' + parseInt(x).toString(16)).slice(-2)

        $render = @$render
        $html = $('<tag-html><tag-body/></tag-html>')
        $body = $html.children()
        $body.html $render.html()

        # Clean
        $body.find('*')
            .removeAttr('data-mce-href')
            .removeAttr('data-mce-style')
            .css {
                position: ''
            }

        # Prepare
        @body.prepareSave withoutData, $html

        if withoutData
            $body.find('*')
                .removeAttr('class').removeAttr('id')
                .removeAttr('data-type').removeAttr('contenteditable')

        html = $html.html()
            .replace(/tag-body/g, 'body')
            .replace(/^\s+/gm, '')
            .replace(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/g, (match, r, g, b) -> '#' + hex(r) + hex(g) + hex(b) ) # fix.jQuery.rgb

        return html
