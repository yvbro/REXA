package fr.yvbro.rexa.exception

class RexaUnauthorizedException(message: String = "Unauthorized actions") : RexaException("REXA_403", message)
