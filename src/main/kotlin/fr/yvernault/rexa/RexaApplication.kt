package fr.yvernault.rexa

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class RexaApplication

fun main(args: Array<String>) {
	runApplication<RexaApplication>(*args)
}
