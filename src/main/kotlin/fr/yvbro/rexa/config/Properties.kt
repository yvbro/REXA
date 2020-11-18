package fr.yvbro.rexa.config


import org.springframework.boot.context.properties.ConfigurationProperties
import org.springframework.context.annotation.Configuration

@Configuration
@ConfigurationProperties(prefix = "xnat")
class Properties {
    lateinit var secret: String
}
