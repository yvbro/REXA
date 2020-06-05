package fr.yvbro.rexa.controller

import fr.yvbro.rexa.config.WebConfig
import fr.yvbro.rexa.controller.output.UserSettingsDto
import fr.yvbro.rexa.security.UserPrincipal
import fr.yvbro.rexa.service.UserSettingsService
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping(WebConfig.FRONT_CONTEXT_PATH)
class UserSettingsFrontController(private val userSettingsService: UserSettingsService) {

    @GetMapping("/settings")
    fun getXnatSettings(): UserSettingsDto {
        var userId = (SecurityContextHolder.getContext().authentication.principal as UserPrincipal).id
        val userSettings = userSettingsService.getXnatSettings(userId)
        return UserSettingsDto(
                userSettings.xnatUsername,
                userSettings.xnatHost
        )
    }
}
