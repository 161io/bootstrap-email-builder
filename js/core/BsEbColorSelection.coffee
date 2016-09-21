# Copyright (c) 161 SARL, http://161.io

class win.BsEbColorSelection

    # @type {Object}
    # @static
    @colors: {
        #"Color 1": "#000000"
        #...
    }

    # @param {String} hex
    # @return {String} black or white
    # @static
    @textBOW: (hex) ->
        hex = hex.replace '#', ''
        if 3 == hex.length
            hexArr = hex.split ''
            hex = hexArr[0] + hexArr[0] + hexArr[1] + hexArr[1] + hexArr[2] + hexArr[2]

        return '#000' if parseInt(hex, 16) > 0xffffff / 2
        '#fff'

    # @return {Boolean}
    # @static
    @isEmpty: ->
        for name, hex of @colors
            return false
        true

    # @param {jQuery} $inputColorpicker
    # @return {jQuery}
    # @static
    @dropdown: ($inputColorpicker) ->
        return if @isEmpty()

        eltsLi = ""
        for name, hex of @colors
            eltsLi += """<li><a style="background-color:#{ hex } !important;color:#{ @textBOW(hex) };" data-color="#{ hex }">#{ name }</a></li>"""
        $dropdown = $ """
            <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><span class="caret"></span></button>
            <ul class="dropdown-menu dropdown-menu-right">#{ eltsLi }</ul>
            """
        if $inputColorpicker
            $dropdown.appendTo $inputColorpicker.parent().find('.input-group-btn')
            $dropdown.find('li a').on 'click', -> $inputColorpicker.colorpicker 'setValue', $(@).data('color')
        return $dropdown

    # @return {Array}
    # @static
    @tinymceSettings: ->
        return if !win.tinyMCE or @isEmpty()

        map = []
        for name, hex of @colors
            map.push hex.replace('#', '')
            map.push name
        tinyMCE.settings.textcolor_map = map

    # @param {jQuery|String} selector
    # @return {jQuery}
    # @static
    @colorpicker: (selector) ->
        $(selector).each ->
            $picker = $(@)
            $picker
                .colorpicker { format: 'hex' }
                .on 'changeColor', -> $picker.trigger 'click'
                .on 'changeColor.up', ->
                    $picker.parent().find('.btn-colorpicker').css {
                        backgroundColor: $picker.colorpicker 'getValue', '#fff'
                    }
                .parent().find('.btn-colorpicker').on 'click', -> $picker.focus()

            if $picker.val() then $picker.trigger 'changeColor.up'

            BsEbColorSelection.dropdown $picker




