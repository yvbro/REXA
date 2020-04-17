package fr.yvbro.rexa.controller

import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.GetMapping

@Controller
class HomeController {

    @GetMapping("/", "/rexa/**")
    fun index() = "/index.html"
}
