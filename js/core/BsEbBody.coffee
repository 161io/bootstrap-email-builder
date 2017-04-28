# Copyright (c) 161 SARL, https://161.io

class win.BsEbBody

    defaultWidth     : 500
    defaultBgColor   : '#ffffff'
    defaultLinkColor : '#0000ff'
    defaultTextColor : '#000000'
    defaultFontFamily: 'Helvetica, Arial, sans-serif'
    defaultFontSize  : 14

    # @param {jQuery} $render
    # @param {jQuery} $tool
    constructor: (@$render, @$tool) ->
        $tool = @$tool
        @$inputWidth           = $tool.find('[data-name="width"]')
        @$inputBackgroundColor = $tool.find('[data-name="background-color"]')
        @$inputLinkColor       = $tool.find('[data-name="link-color"]')
        @$inputTextColor       = $tool.find('[data-name="text-color"]')
        @$inputFontFamily      = $tool.find('[data-name="font-family"]')
        @$inputFontSize        = $tool.find('[data-name="font-size"]')

        @bodyStyle = null
        @textStyle = null
        @aStyle    = null

        @ready()

    # @return {BsEbBody}
    ready: ->
        @prepareJsStyle()
        @restoreVal()
        @events()
        @

    prepareJsStyle: ->
        aSelector  = "#{ BsEbConstant.SELECTOR_ELEMENT_CONTENT } a,"
        aSelector += "#{ BsEbConstant.SELECTOR_ELEMENT_CONTENT } a:active,"
        aSelector += "#{ BsEbConstant.SELECTOR_ELEMENT_CONTENT } a:focus,"
        aSelector += "#{ BsEbConstant.SELECTOR_ELEMENT_CONTENT } a:hover,"
        aSelector += "#{ BsEbConstant.SELECTOR_ELEMENT_CONTENT } a:visited"

        jsStyle = new JsStyle()
        @bodyStyle = jsStyle.getStyleBySelector "##{ @$render.attr('id') }"
        @textStyle = jsStyle.getStyleBySelector BsEbConstant.SELECTOR_ELEMENT_CONTENT
        @aStyle    = jsStyle.getStyleBySelector aSelector
        @aStyle.textDecoration = 'none'
        @

    # @return {BsEbBody}
    restoreVal: ->
        width = $(BsEbConstant.SELECTOR_CONTAINER).attr 'width'
        if !width then width = @defaultWidth
        @$inputWidth.val width

        bgColor = @$render.data 'body-bgcolor'
        if !bgColor then bgColor = @defaultBgColor
        @$inputBackgroundColor.val bgColor
        @bodyStyle.backgroundColor = bgColor

        linkColor = @$render.data 'body-link'
        if !linkColor then linkColor = @defaultLinkColor
        @$inputLinkColor.val linkColor
        @aStyle.color = linkColor

        textColor = @$render.data 'body-text'
        if !textColor then textColor = @defaultTextColor
        @$inputTextColor.val textColor
        @textStyle.color = textColor

        fontFamily = @$render.css 'fontFamily'
        if !fontFamily then fontFamily = @defaultFontFamily
        @$inputFontFamily.val fontFamily
        @bodyStyle.fontFamily = fontFamily
        @textStyle.fontFamily = fontFamily

        fontSize = parseInt @$render.css 'fontSize'
        if isNaN(fontSize) or !fontSize then fontSize = @defaultFontSize
        @$inputFontSize.val fontSize
        fontSize += 'px'
        @bodyStyle.fontSize = fontSize
        @textStyle.fontSize = fontSize
        @

    # @return {BsEbBody}
    events: ->
        self = @
        @$inputWidth.on 'change click', @widthChange

        @$inputBackgroundColor.on 'change click', @bgColorChange
        BsEbColorSelection.colorpicker @$inputBackgroundColor

        @$inputLinkColor.on 'change click', @linkColorChange
        BsEbColorSelection.colorpicker @$inputLinkColor

        @$inputTextColor.on 'change click', @textColorChange
        BsEbColorSelection.colorpicker @$inputTextColor

        @$inputFontFamily
            .on 'keyup focus blur change', @fontFamilyChange
            .parent().find('.dropdown-menu a')
                .on 'click', ->
                    self.$inputFontFamily
                        .val $(@).css('fontFamily')
                        .trigger 'change'

        @$inputFontSize
            .on 'keyup focus blur change', @fontSizeChange
        @

    # @return {BsEbBody}
    widthChange: =>
        $width = @$inputWidth
        width = parseInt $width.val()
        if isNaN width then width = 0

        min = parseInt $width.attr 'min'
        max = parseInt $width.attr 'max'
        if isNaN min or !min then min = 400
        if isNaN max or !max then max = 800
        if width < min then width = min
        else if width > max then width = max
        $width.val(width)

        $(BsEbConstant.SELECTOR_CONTAINER).attr 'width', width
        @$render.css('minWidth', (40 + width) + 'px')
        @

    # @return {BsEbBody}
    bgColorChange: =>
        bgColor = @$inputBackgroundColor.val()
        @$render
            .attr 'data-body-bgcolor', bgColor
            #.data 'body-bgcolor', textColor
        @bodyStyle.backgroundColor = bgColor
        @

    # @return {BsEbBody}
    linkColorChange: =>
        linkColor = @$inputLinkColor.val()
        @$render
            .attr 'data-body-link', linkColor
            #.data 'body-link', linkColor
        @aStyle.color = linkColor
        @

    # @return {BsEbBody}
    textColorChange: =>
        textColor = @$inputTextColor.val()
        @$render
            .attr 'data-body-text', textColor
            #.data 'body-text', textColor
        @textStyle.color = textColor
        @

    # @return {BsEbBody}
    fontFamilyChange: =>
        fontFamily = @$inputFontFamily.val()
        @$render.css 'fontFamily', fontFamily
        @bodyStyle.fontFamily = fontFamily
        @textStyle.fontFamily = fontFamily
        @

    # @return {BsEbBody}
    fontSizeChange: (event) =>
        fontSize = originalFontSize = parseInt @$inputFontSize.val()
        if isNaN(fontSize) or fontSize < 8 or fontSize > 99 then fontSize = @defaultFontSize
        if 'keyup' != event.type and originalFontSize != fontSize then @$inputFontSize.val fontSize

        fontSize += 'px'
        @$render.css 'fontSize', fontSize
        @bodyStyle.fontSize = fontSize
        @textStyle.fontSize = fontSize
        @

    # @param {Boolean} withoutData
    # @param {jQuery} $html
    # @return {BsEbBody}
    prepareSave: (withoutData, $html) ->
        $render = @$render

        bgColor    = $render.attr 'data-body-bgcolor'
        linkColor  = $render.attr 'data-body-link'
        textColor  = $render.attr 'data-body-text'
        fontFamily = $render.css 'fontFamily'
        fontSize   = $render.css 'fontSize'

        $body = $html.children()
        $body
            .attr {
                'data-body-bgcolor': bgColor
                'data-body-text'   : textColor
                'data-body-link'   : linkColor
            }
            .css {
                fontFamily: fontFamily
                fontSize  : fontSize
            }

        if !withoutData then return @

        $body
            .attr {
                bgcolor: bgColor
                link   : linkColor
                alink  : linkColor
                vlink  : linkColor
                text   : textColor
            }
            .css {
                backgroundColor: bgColor
                color          : textColor
            }
            .removeAttr 'data-body-bgcolor'
            .removeAttr 'data-body-text'
            .removeAttr 'data-body-link'

        $body.find('a').each ->
            $a = $(@)
            if !$a.css 'color'          then $a.css 'color', linkColor
            if !$a.css 'textDecoration' then $a.css 'textDecoration', 'none'

        $body.find(BsEbConstant.SELECTOR_ELEMENT_CONTENT)
            .css {
                fontFamily: fontFamily
                fontSize  : fontSize
            }
        @
