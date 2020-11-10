package fr.yvbro.rexa.xnat.exception

import fr.yvbro.rexa.exception.RexaException

class UnknownXnatHostException : RexaException("XNAT_UNKNOWN_HOST", "Unknown XNAT host. Verify your settings.") {
}
