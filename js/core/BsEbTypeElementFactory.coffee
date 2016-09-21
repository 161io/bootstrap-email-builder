# Copyright (c) 161 SARL, http://161.io

class BsEbTypeElementFactory

    # @param {String} str
    # @return {String}
    # @static
    @separatorToCamelCase: (str) ->
        str.toLowerCase()
            .replace(/[^a-z0-9]+/gi, ' ')
            # http://locutus.io/php/strings/ucwords/
            .replace(/^([a-z\u00E0-\u00FC])|\s+([a-z\u00E0-\u00FC])/g, ($1) -> $1.toUpperCase())
            .replace(/\s+/g, '')

    # @param {String} type
    # @return {String}
    # @static
    @getClassTypeElement: (type) ->
        'BsEbType' + @separatorToCamelCase type.replace(/^elt-/, 'Element-')

    # @param {jQuery} $helper
    constructor: ($helper) ->
        type = $helper.data 'draggable-type'
        classTypeElement = BsEbTypeElementFactory.getClassTypeElement type

        if !win[classTypeElement]
            alert "#{ classTypeElement } was not found"
            #throw "#{ classTypeElement } was not found"
            return
        element = new win[classTypeElement]()
        element.buildHtml $helper, type

    # @param {jQuery} $elements
    # @return {jQuery}
    # @static
    @constructor2: ($elements) ->
        $elements.each ->
            $element = $(@)
            type = $element.data 'type'
            classTypeElement = BsEbTypeElementFactory.getClassTypeElement type
            if !win[classTypeElement]
                #alert "#{ classTypeElement } was not found"
                throw "#{ classTypeElement } was not found"
                return
            new win[classTypeElement] $element
