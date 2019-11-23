package fr.yvernault.rexa.model

import org.springframework.boot.context.properties.ConfigurationProperties
import org.springframework.boot.context.properties.ConstructorBinding

@ConstructorBinding
@ConfigurationProperties("xnat")
data class XnatProperties(var url: String, val user: String,  val password: String) {
}
