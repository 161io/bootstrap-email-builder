# Copyright (c) 161 SARL, http://161.io

# CSS tools ( without jQuery )
# @link https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleSheet
class JsStyle

    # @param {HTMLStyleElement|HTMLLinkElement}
    constructor: (elementStyle = 'create') ->
        if 'create' == elementStyle
            elementStyle = doc.createElement 'style'
            elementStyle.type = 'text/css'
            doc.getElementsByTagName('head')[0].appendChild elementStyle

        @sheet    = elementStyle.sheet
        @cssRules = @sheet.cssRules || @sheet.rules || []

    # @param {String} selector
    # @param {Boolean} autoGenerate
    # @return {Number}
    getIndexBySelector: (selector, autoGenerate = true) ->
        for rule, index in @cssRules
            if selector == rule.selectorText
                return index

        if !autoGenerate then return -1
        index = @cssRules.length
        @_insert selector, index
        index

    # @param {String} selector
    # @return {CSSStyleDeclaration}
    getStyleBySelector: (selector) ->
        @cssRules[ @getIndexBySelector(selector) ].style

    # @param {String} selector
    # @return {JsStyle}
    deleteStyleBySelector: (selector) ->
        index = @getIndexBySelector selector, false
        if index < 0 then return @
        @_delete index

    # @param {String} selector
    # @param {Number} index
    # @return {JsStyle}
    _insert: (selector, index) ->
        if @sheet.insertRule
            @sheet.insertRule "#{ selector } { }", index
        else if @sheet.addRule # Non-standard
            @sheet.addRule selector, null, index
        @

    # @param {Number} index
    # @return {JsStyle}
    _delete: (index) ->
        if @sheet.deleteRule
            @sheet.deleteRule index
        else if @sheet.removeRule # Non-standard
            @sheet.removeRule index
        @
