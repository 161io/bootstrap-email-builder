# Copyright (c) 161 SARL, http://161.io

class win.AbstractBsEbTypeElement

    # @param {String} val
    # @param {String} unit
    # @return {String}
    _intFilter: (val, unit = 'px') ->
        val = parseInt val
        if isNaN(val) || val < 0 then val = 0
        if unit then val += unit
        val

    # @param {jQuery} $element
    constructor: (@$element) ->
        @type = null
        if @$element
            @$element.data 'bseb-instance', @
            @type = @$element.data 'type'
            @defaultEvents()
            @events()
            @$element.trigger 'bseb-elt-ready'

    # @return {String}
    # @static
    #@tabButton: ->
        #"""<div class="col-xs-6">Your button...</div>"""

    # @param {jQuery} $helper
    # @param {String} type
    # @param {String} html
    # @return {AbstractBsEbTypeElement}
    buildHtml: ($helper, type, html) ->
        if !html
            html = """
                <div class="#{ BsEbConstant.CLASS_NAME_ELEMENT_CONTENT }" data-type="#{ type }"></div>
                """
        @type = type
        @$element = $element = $(html)
        $element.data 'bseb-instance', @
        @defaultEvents()
        @events()
        $helper.after $element
        $element.trigger 'bseb-elt-ready'
        @

    # @return {AbstractBsEbTypeElement}
    defaultEvents: ->
        @$element
            .on 'contextmenu', (event) -> $(BsEbConstant.SELECTOR_ID_CONTEXTMENU).data('bseb-instance').show event, $(@)
            .on 'bseb-elt-remove', -> $(@).remove()
            .on 'click', => @$element.trigger 'bseb-elt-more'; false
        @

    # @return {AbstractBsEbTypeElement}
    events: ->
        #@$element.on 'sortable-start', -> console.log 'sortable-start'
        #@$element.on 'sortable-stop',  -> console.log 'sortable-stop'
        #@$element.on 'bseb-elt-ready',  -> console.log 'bseb-elt-ready'
        #@$element.on 'bseb-elt-more',   -> console.log 'bseb-elt-more'
        #@$element.on 'bseb-elt-remove', -> console.log 'bseb-elt-remove'
        #@

    # @param {Boolean} mode
    # @return {AbstractBsEbTypeElement}
    disableSortable: (mode) ->
        if mode then mode = 'disable' else mode = 'enable'
        $("#{ BsEbConstant.SELECTOR_CONTAINER }>tbody").sortable mode
        $("#{ BsEbConstant.SELECTOR_STRUCT_CONTENT }").sortable mode
        @

    # @return {Number}
    # @static
    @idInc: 0

    # @return {String}
    # @static
    @getNewId: ->
        "bseb-id-#{ $.now() }-#{ ++@idInc }"
