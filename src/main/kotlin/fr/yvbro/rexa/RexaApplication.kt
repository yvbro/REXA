package fr.yvbro.rexa

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
open class RexaApplication

fun main(args: Array<String>) {
    runApplication<RexaApplication>(*args)
}
