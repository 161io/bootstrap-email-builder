# Copyright (c) 161 SARL, http://161.io

class BsEbContextMenu

    constructor: ->
        @$element = null
        @$targetElement = null
        @buildHtml()
        @events()

    # @return {BsEbContextMenu}
    buildHtml: ->
        $element = $ """
            <ul id="#{ BsEbConstant.ID_CONTEXTMENU }" class="dropdown-menu">
                <li data-with-elt="" class="dropdown-header">#{ BsEbConstant.translate('Content') }</li>
                <li data-with-elt=""><a href="#" data-action="elt-more"><span class="glyphicon glyphicon-wrench"></span> #{ BsEbConstant.translate('Options') }</a></li>
                <li data-with-elt=""><a href="#" data-action="elt-remove"><span class="text-danger"><span class="glyphicon glyphicon-trash"></span> #{ BsEbConstant.translate('Delete') }</span></a></li>
                <li data-with-elt="" class="divider"></li>
                <li class="dropdown-header">#{ BsEbConstant.translate('Structure') }</li>
                <li><a href="#" data-action="struct-more"><span class="glyphicon glyphicon-wrench"></span> #{ BsEbConstant.translate('Options') }</a></li>
                <li><a href="#" data-action="struct-remove"><span class="text-danger"><span class="glyphicon glyphicon-trash"></span> #{ BsEbConstant.translate('Delete') }</span></a></li>
            </ul>
            """
        @$element = $element
        $element.appendTo 'body'
        $element.data 'bseb-instance', @
        @

    # @return {BsEbContextMenu}
    events: ->
        self = @
        @$element
            .on 'mouseleave', ->
                $(@).css 'display', 'none'
            .on 'contextmenu', (event) ->
                event.preventDefault()
                $(@).trigger 'mouseleave'
            .find('[data-action]').on 'click', (event) -> self.actionClick(event, $(@).data('action'))
        @

    # @param {EventObject} event
    # @param {String} $eltClick
    # @return {Boolean}
    actionClick: (event, action) ->
        $targetElement = @$targetElement

        getStructElement = ->
            $parentsFound = $targetElement.parents BsEbConstant.SELECTOR_STRUCT_CONTAINER
            if !$parentsFound.length
                $structElement = $targetElement
            else
                $structElement = $parentsFound.parent('td').parent('tr')

        switch action
            when 'elt-more'      then $targetElement.trigger 'bseb-elt-more'
            when 'elt-remove'    then $targetElement.trigger 'bseb-elt-remove'
            when 'struct-more'   then getStructElement().trigger 'bseb-struct-more'
            when 'struct-remove' then getStructElement().trigger 'bseb-struct-remove'

        @$element.trigger 'mouseleave'
        return false

    # @param {EventObject} event
    # @param {jQuery} $targetElement
    # @return {BsEbContextMenu}
    show: (event, $targetElement) ->
        if event and 'contextmenu' == event.type
            event.preventDefault()
            event.stopPropagation()

        @$targetElement = $targetElement

        if $targetElement.hasClass(BsEbConstant.CLASS_NAME_ELEMENT_CONTENT) then liDisplay = '' else liDisplay = 'none'
        @$element
            .find('[data-with-elt]')
                .css 'display', liDisplay
                .end()
            .css {
                display:'block'
                left   : event.pageX
                top    : event.pageY
            }
        @
