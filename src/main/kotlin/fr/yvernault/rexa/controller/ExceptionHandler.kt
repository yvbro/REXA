package fr.yvernault.rexa.controller

import fr.yvernault.rexa.exception.ApiError
import fr.yvernault.rexa.exception.RexaException
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity

import org.springframework.http.ResponseEntity.badRequest
import org.springframework.web.bind.annotation.ControllerAdvice
import org.springframework.web.bind.annotation.ExceptionHandler
import java.util.*

@ControllerAdvice
public class ExceptionHandler {

    @ExceptionHandler(RexaException::class)
    fun rexaException(exception: RexaException, locale: Locale) =
            ResponseEntity<Any>(ApiError(HttpStatus.BAD_REQUEST.value(), exception.message), HttpStatus.BAD_REQUEST)
}
