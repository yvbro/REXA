package fr.yvbro.rexa.config

import org.springframework.beans.factory.annotation.Value

class AppProperties {
    @Value("\${app.auth.tokenSecret}")
    lateinit var appTokenSecret: String
    @Value("\${app.auth.tokenExpirationMsec}")
    lateinit var appTokenExpirationMsec: String
    @Value("\${app.oauth2.authorizedRedirectUris}")
    lateinit var appAuthorizedRedirectUris: String
}
