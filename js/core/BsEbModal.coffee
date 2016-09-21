# Copyright (c) 161 SARL, http://161.io

class win.BsEbModal

    # @param {Object} options
    constructor: (options) ->
        {
            @title          = "Modal"
            @body           = ""
            @btnCancelClick = ->
            @btnCancelValue = BsEbConstant.translate('Cancel')
            @btnOkClick     = ->
            @btnOkValue     = BsEbConstant.translate('OK')
            @modalReady     = ->
        } = options

        $(BsEbConstant.SELECTOR_ID_MODAL).remove()
        @$modal = null
        @buildHtml()

    # @return {BsEbModal}
    buildHtml: ->
        $modal = $ """
            <div class="modal fade" id="#{ BsEbConstant.ID_MODAL }" tabindex="-1" role="dialog"><div class="modal-dialog"><div class="modal-content">
            <div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button><h4 class="modal-title">#{ @title }</h4></div>
            <div class="modal-body">#{ @body }</div>
            <div class="modal-footer"><button type="button" class="btn btn-default btn-cancel" data-dismiss="modal">#{ @btnCancelValue }</button> <button type="button" class="btn btn-primary btn-ok">#{ @btnOkValue }</button></div>
            </div></div></div>
            """
        @$modal = $modal
        $modal.find('.btn-cancel').on 'click', @btnCancelClick
        $modal.find('.btn-ok').on 'click', @btnOkClick
        $modal.appendTo 'body'
        @show()
        @modalReady()
        @

    # @return {BsEbModal}
    show: -> @$modal.modal 'show'; @

    # @return {BsEbModal}
    hide: -> @$modal.modal 'hide'; @
