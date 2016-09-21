###!
Boostrap Email Builder v@current-version@
Copyright (c) 161 SARL, http://161.io
License : github.com/161io/bootstrap-email-builder/license.txt
###

win = window
BsEbConstant = win.BsEbConstant


class win.BsEbTypeElementOther1 extends win.AbstractBsEbTypeElement

    # @return {String}
    # @static
    @tabButton: ->
        """
        <div class="col-xs-6">
        <a class="btn btn-lg btn-block btn-default" data-draggable-type="elt-other1">
            <span class="glyphicon glyphicon-plus"></span><br/>
            <span>#{ BsEbConstant.translate('Other...') }</span>
        </a>
        </div>
        """

    defaultParam: ''

    # @param {jQuery} $helper
    # @param {String} type
    # @return {BsEbTypeElementOther1}
    buildHtml: ($helper, type) ->
        html = """
            <div class="#{ BsEbConstant.CLASS_NAME_ELEMENT_CONTENT }" data-type="#{ type }">
            <p>#{ BsEbConstant.translate('Other...') }</p>
            </div>
            """
        super $helper, type, html

    # @return {BsEbTypeElementOther1}
    events: ->
        @$element
            .on 'bseb-elt-more', @onMore
        @

    # @return {BsEbTypeElementOther1}
    onMore: =>
        modal = new win.BsEbModal {
            title: BsEbConstant.translate('Content') + ' : ' + BsEbConstant.translate('Other...')
            body : """
                <p class="lead">#{ BsEbConstant.translate('Other...') }</p>
                """
            btnOkClick: ->
                modal.hide()
        }
        @


