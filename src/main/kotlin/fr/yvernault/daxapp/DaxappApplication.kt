package fr.yvernault.daxapp

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class DaxappApplication

fun main(args: Array<String>) {
	runApplication<DaxappApplication>(*args)
}
