package fr.yvbro.rexa.config

import org.springframework.context.annotation.Configuration
import org.springframework.web.servlet.config.annotation.*

@Configuration
class WebConfig : WebMvcConfigurer {

    companion object {
        const val API_CONTEXT_PATH = "/api"
        const val AUTH_CONTEXT_PATH = "/auth"
        const val FRONT_CONTEXT_PATH = "/private"
    }

    override fun addResourceHandlers(registry: ResourceHandlerRegistry) {
        registry.addResourceHandler("/static/**").addResourceLocations("classpath:/public/static/")
    }
}
