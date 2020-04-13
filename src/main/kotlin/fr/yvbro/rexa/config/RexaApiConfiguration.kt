package fr.yvbro.rexa.config

import fr.yvbro.rexa.exception.common.ApiErrorReporter
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration

@Configuration
class RexaApiConfiguration {

    @Bean
    fun apiErrorReporter(): ApiErrorReporter {
        return ApiErrorReporter()
    }
}
