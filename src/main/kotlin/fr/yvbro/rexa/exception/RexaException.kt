package fr.yvbro.rexa.exception

open class RexaException: RuntimeException {

    var errorCode: String

    constructor(errorCode: String, message: String): super(message){
        this.errorCode = errorCode
    }

    constructor(errorCode: String, message: String, vararg args:String): super(String.format(message, args)) {
        this.errorCode = errorCode
    }

}
