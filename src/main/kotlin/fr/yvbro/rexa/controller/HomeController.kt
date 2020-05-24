package fr.yvbro.rexa.controller

import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.GetMapping

@Controller
class HomeController {

    @GetMapping("/", "/rexa/**", "/oauth2/redirect")
    fun index() = "/index.html"
}
