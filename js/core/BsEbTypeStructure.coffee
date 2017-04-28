# Copyright (c) 161 SARL, https://161.io

class win.BsEbTypeStructure

    defaultWidthStruct: {
        "struct-12"     : ["100%"]
        "struct-6-6"    : ["50%", "50%"]
        "struct-4-8"    : ["33%", "67%"]
        "struct-8-4"    : ["67%", "33%"]
        "struct-4-4-4"  : ["33%", "34%", "33%"]
        "struct-3-3-3-3": ["25%", "25%", "25%", "25%"]
    }
    defaultCellspacing: 10

    # @param {jQuery} $element
    constructor: (@$element) ->
        @type = null
        if @$element
            @$element.data 'bseb-instance', @
            @type = @$element.data 'type'
            @events()

    # @param {jQuery} $helper
    # @param {String} type
    # @return {BsEbTypeStructure}
    buildHtml: ($helper, type) ->
        if !@defaultWidthStruct[type] then type = 'struct-12'

        html = """<table width="100%" class="#{ BsEbConstant.CLASS_NAME_STRUCT_CONTAINER }" cellspacing="#{ @defaultCellspacing }" border="0" style="border-collapse:separate; border-spacing:#{ @defaultCellspacing }px;"><tbody><tr>"""

        for width in @defaultWidthStruct[type]
            html += """<td width="#{ width }" class="#{ BsEbConstant.CLASS_NAME_STRUCT_CONTENT } empty"></td>"""

        html += """</tr></tbody></table>"""

        @type = type
        @$element = $element = $("<tr><td>#{ html }</td></tr>")
        $element.data 'bseb-instance', @
        @events()
        $helper.after $element
        #$element.trigger 'bseb-struct-ready'
        @

    # @return {BsEbTypeStructure}
    events: ->
        @$element
            .on 'contextmenu', (event) -> $(BsEbConstant.SELECTOR_ID_CONTEXTMENU).data('bseb-instance').show event, $(@)
            .on 'bseb-struct-more', @onMore
            .on 'bseb-struct-remove', @onRemove
            .find(BsEbConstant.SELECTOR_STRUCT_CONTENT)
                .sortable {
                    items      : ">#{ BsEbConstant.SELECTOR_ELEMENT_CONTENT }"
                    cursor     : 'move'
                    placeholder: 'bg-warning'
                    connectWith: BsEbConstant.SELECTOR_STRUCT_CONTENT
                    start      : (event, ui) -> ui.item.trigger 'sortable-start'
                    stop       : (event, ui) -> ui.item.trigger 'sortable-stop'
                    receive    : (event, ui) ->
                        $helper = ui.helper
                        return if !$helper or !$helper.data 'draggable-type'

                        type = $helper.data 'draggable-type'
                        new BsEbTypeElementFactory $helper
                        $helper.remove()
                }
        @

    # @return {BsEbTypeStructure}
    onMore: =>
        selected = (v1, v2) -> if v1 == v2 then 'selected="selected"' else ''

        $element = @$element
        $table = $element.find("#{ BsEbConstant.SELECTOR_STRUCT_CONTAINER }")
        $td    = $element.find("#{ BsEbConstant.SELECTOR_STRUCT_CONTENT }")
        valign = BsEbConstant.escape $td.attr 'valign'
        if !valign then valign = 'middle'
        cellspacing = parseInt $table.attr 'cellspacing'
        if isNaN(cellspacing) or cellspacing < 0 then cellspacing = 0
        bgcolor = BsEbConstant.escape $table.attr 'bgcolor'
        if !bgcolor then bgcolor = ''

        modal = new win.BsEbModal {
            title: BsEbConstant.translate('Structure')
            body : """
                <div class="form-group">
                    <code class="pull-right">valign</code>
                    <label for="bs-eb-valign">#{ BsEbConstant.translate('Vertical alignment') }</label>
                    <select id="bs-eb-valign" class="form-control">
                        <option value="middle" #{ selected('middle', valign) }>#{ BsEbConstant.translate('Middle') }</option>
                        <option value="top" #{ selected('top', valign) }>#{ BsEbConstant.translate('Top') }</option>
                        <option value="bottom" #{ selected('bottom', valign) }>#{ BsEbConstant.translate('Bottom') }</option>
                    </select>
                </div>
                <div class="form-group">
                    <code class="pull-right">cellspacing</code>
                    <label for="bs-eb-cellspacing">#{ BsEbConstant.translate('Space between the cell') }</label>
                    <select id="bs-eb-cellspacing" class="form-control">
                        <option value="0" #{ selected(0, cellspacing) }>0px</option>
                        <option value="5" #{ selected(5, cellspacing) }>5px</option>
                        <option value="10" #{ selected(10, cellspacing) }>10px</option>
                        <option value="15" #{ selected(15, cellspacing) }>15px</option>
                        <option value="20" #{ selected(20, cellspacing) }>20px</option>
                        <option value="25" #{ selected(25, cellspacing) }>25px</option>
                        <option value="30" #{ selected(30, cellspacing) }>30px</option>
                        <option value="40" #{ selected(40, cellspacing) }>40px</option>
                        <option value="50" #{ selected(50, cellspacing) }>50px</option>
                    </select>
                </div>
                <div class="form-group">
                    <code class="pull-right">bgcolor</code>
                    <label for="bs-eb-bgcolor">#{ BsEbConstant.translate('Background color') }</label>
                    <div class="input-group">
                        <input type="text" id="bs-eb-bgcolor" value="#{ bgcolor }" placeholder="#ffffff" class="form-control"/>
                        <div class="input-group-btn"><button type="button" class="btn btn-default btn-colorpicker"><i></i></button></div>
                    </div>
                </div>
                """
            btnOkClick: ->
                modal.hide()
                valign      = $('#bs-eb-valign').val()
                cellspacing = $('#bs-eb-cellspacing').val()
                bgcolor     = $('#bs-eb-bgcolor').val()

                $td.attr 'valign', valign
                $table
                    .attr 'cellspacing', cellspacing
                    .attr 'bgcolor', bgcolor
                    .css {
                        borderCollapse : 'separate'
                        borderSpacing  : "#{ cellspacing }px"
                        backgroundColor: bgcolor
                    }
            modalReady: ->
                BsEbColorSelection.colorpicker '#bs-eb-bgcolor'
        }
        @

    # @return {BsEbTypeStructure}
    onRemove: =>
        if @$element.siblings('tr').length
            @$element.remove()
            return
        @$element.find(BsEbConstant.SELECTOR_ELEMENT_CONTENT).trigger 'bseb-elt-remove'
        @

    # @param {jQuery} $structs
    # @static
    @constructor2: ($structs) ->
        $structs.each ->
            new BsEbTypeStructure($(@).parent().parent()) # td tr
