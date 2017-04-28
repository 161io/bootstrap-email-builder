# Copyright (c) 161 SARL, https://161.io

class win.BsEbConstant
    @CLASS_NAME_CONTAINER       : 'eb-container'
    @CLASS_NAME_STRUCT_CONTAINER: 'eb-struct-container'
    @CLASS_NAME_STRUCT_CONTENT  : 'eb-struct-content'
    @CLASS_NAME_ELEMENT_CONTENT : 'eb-elt-content'
    @ID_CONTEXTMENU             : 'bs-eb-contextmenu'
    @ID_MODAL                   : 'bs-eb-modal'

    @SELECTOR_CONTAINER         : '.eb-container'
    @SELECTOR_STRUCT_CONTAINER  : '.eb-struct-container'
    @SELECTOR_STRUCT_CONTENT    : '.eb-struct-content'
    @SELECTOR_ELEMENT_CONTENT   : '.eb-elt-content'
    @SELECTOR_ID_CONTEXTMENU    : '#bs-eb-contextmenu'
    @SELECTOR_ID_MODAL          : '#bs-eb-modal'


    # @param {String} key
    # @return {String}
    # @static
    @translate: (key) ->
        if !win.bootstrapEmailBuilder or !bootstrapEmailBuilder.locale[key] then return key
        bootstrapEmailBuilder.locale[key]

    # @param {String} value
    # @return {String}
    # @static
    @escape: (value) -> $('<p></p>').text(value).html()
