package fr.yvbro.rexa.exception

class RexaBadRequestException : RexaException {

    constructor(message: String?) : super("REXA_400", "You request could not be understood by the server: $message")

    constructor(message: String, vararg args: String) : super("REXA_400", "Bad Request: $message", *args)
}
