package fr.yvernault.rexa.xnat

import org.springframework.boot.context.properties.ConfigurationProperties
import org.springframework.context.annotation.Configuration

@Configuration
@ConfigurationProperties(prefix = "xnat")
class XnatProperties {
    lateinit var url: String
    lateinit var user: String
    lateinit var password: String
}
