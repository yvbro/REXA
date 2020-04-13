package fr.yvbro.rexa.exception

class RexaNotFoundException(message: String) : RexaException("REXA_404", "$message could not be found")
