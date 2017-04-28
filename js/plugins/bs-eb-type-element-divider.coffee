###!
Bootstrap Email Builder v@current-version@
Copyright (c) 161 SARL, https://161.io
License: https://github.com/161io/bootstrap-email-builder/blob/master/license.txt
###

win = window
BsEbConstant = win.BsEbConstant


class win.BsEbTypeElementDivider extends win.AbstractBsEbTypeElement

    # @return {String}
    # @static
    @tabButton: ->
        """
        <div class="col-xs-6">
        <a class="btn btn-lg btn-block btn-default" data-draggable-type="elt-divider">
            <span class="glyphicon glyphicon-option-horizontal"></span><br/>
            <span>#{ BsEbConstant.translate('Divider') }</span>
        </a>
        </div>
        """

    defaultSize : '1px'
    defaultColor: '#eeeeee'
    defaultStyle: 'height:1px;border:0 none;'

    # @param {jQuery} $helper
    # @param {String} type
    # @param {String} html
    # @return {BsEbTypeElementDivider}
    buildHtml: ($helper, type, html) ->
        if !html
            html = """
                <div class="#{ BsEbConstant.CLASS_NAME_ELEMENT_CONTENT }" data-type="#{ type }">
                <hr noshade="noshade" size="#{ @defaultSize }" color="#{ @defaultColor }" style="background-color:#{ @defaultColor };#{ @defaultStyle }"/>
                </div>
                """
        super $helper, type, html

    # @return {BsEbTypeElementDivider}
    events: ->
        @$element
            .on 'bseb-elt-more', @onMore
        @

    # @return {BsEbTypeElementDivider}
    onMore: =>
        self = @
        $hr = @$element.find('hr').first()
        isNoshade = $hr.is('[noshade]')
        size      = @_intFilter $hr.attr 'size'
        color     = $hr.attr 'color'

        modal = new win.BsEbModal {
            title: BsEbConstant.translate('Content') + ' : ' + BsEbConstant.translate('Divider')
            body : """
                <div class="checkbox">
                    <label><input type="checkbox" id="bs-eb-noshade"#{ if isNoshade then ' checked="checked"' else '' }/>
                    #{ BsEbConstant.translate('Noshaded') } <code>noshade=&quot;noshade&quot;</code></label>
                </div>
                <div class="form-group">
                    <code class="pull-right">size=&quot;...&quot;</code>
                    <label for="bs-eb-size">#{ BsEbConstant.translate('Size') }</label>
                    <input type="text" id="bs-eb-size" value="#{ size }" class="form-control" placeholder="1px" maxlength="10"/>
                </div>
                <div class="form-group">
                    <code class="pull-right">color=&quot;...&quot;</code>
                    <label for="bs-eb-color">#{ BsEbConstant.translate('Color') }</label>
                    <div class="input-group">
                        <input type="text" id="bs-eb-color" value="#{ color }" placeholder="#eeeeee" class="form-control"/>
                        <div class="input-group-btn"><button type="button" class="btn btn-default btn-colorpicker"><i></i></button></div>
                    </div>
                </div>
                """
            btnOkClick: ->
                modal.hide()

                if $('#bs-eb-noshade').prop 'checked'
                    $hr.attr 'noshade', 'noshade'
                else
                    $hr.removeAttr 'noshade'

                size = self._intFilter $('#bs-eb-size').val()
                color = $('#bs-eb-color').val();
                $hr
                    .attr 'size', size
                    .css 'height', size
                    .attr 'color', color
                    .css 'backgroundColor', color

            modalReady: ->
                BsEbColorSelection.colorpicker '#bs-eb-color'
        }
        @


