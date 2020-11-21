package fr.yvbro.rexa.exception

class RexaBadRequestException : RexaException {

    constructor(message: String?) : super("REXA_400", "$message")

    constructor(message: String, vararg args: String) : super("REXA_400", "$message", *args)
}
