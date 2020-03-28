package fr.yvbro.rexa.xnat.exception

import fr.yvbro.rexa.exception.RexaException

class XnatUnauthorizedException : RexaException("XNAT_UNAUTHORIZED", "You are unauthorized to access XNAT. Verify your login.")
