package fr.yvbro.rexa.exception.common

import fr.yvbro.rexa.exception.RexaAuthentificationFailedException
import fr.yvbro.rexa.exception.RexaBadRequestException
import fr.yvbro.rexa.exception.RexaNotFoundException
import fr.yvbro.rexa.exception.RexaUnknownException
import fr.yvbro.rexa.xnat.exception.XnatUnauthorizedException
import org.springframework.http.HttpStatus
import org.springframework.http.converter.HttpMessageNotReadableException
import org.springframework.web.HttpMediaTypeNotAcceptableException
import org.springframework.web.HttpMediaTypeNotSupportedException
import org.springframework.web.HttpRequestMethodNotSupportedException
import org.springframework.web.bind.MethodArgumentNotValidException
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.ResponseStatus
import org.springframework.web.bind.annotation.RestControllerAdvice
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException
import org.springframework.web.multipart.MultipartException
import org.springframework.web.multipart.support.MissingServletRequestPartException

@RestControllerAdvice
class ApiAdviceHandler(private var apiErrorReporter: ApiErrorReporter) {

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(
            HttpMessageNotReadableException::class,
            MissingServletRequestPartException::class,
            IllegalArgumentException::class,
            MultipartException::class,
            MethodArgumentNotValidException::class,
            MethodArgumentTypeMismatchException::class,
            RexaBadRequestException::class)
    protected fun handleBadRequest(ex: Exception?): ApiErrorBean? {
        return apiErrorReporter.buildErrorBean(ex)
    }

    @ResponseStatus(HttpStatus.METHOD_NOT_ALLOWED)
    @ExceptionHandler(HttpRequestMethodNotSupportedException::class)
    protected fun handleMethodNotAllowed() {
    }

    @ResponseStatus(HttpStatus.UNSUPPORTED_MEDIA_TYPE)
    @ExceptionHandler(HttpMediaTypeNotSupportedException::class)
    protected fun handleUnsupportedMediaType() {
    }

    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    @ExceptionHandler(XnatUnauthorizedException::class, RexaAuthentificationFailedException::class)
    protected fun handleUnauthorizedException(ex: Exception?): ApiErrorBean? {
        return apiErrorReporter.buildErrorBean(ex)
    }

    @ResponseStatus(HttpStatus.NOT_ACCEPTABLE)
    @ExceptionHandler(HttpMediaTypeNotAcceptableException::class)
    protected fun handleNotAcceptableMediaType() {
    }

    @ResponseStatus(HttpStatus.FORBIDDEN)
    @ExceptionHandler(AccessDeniedException::class)
    protected fun handleForbidden() {
    }

    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ExceptionHandler(RexaNotFoundException::class)
    protected fun handleNotFoundException(ex: Exception?): ApiErrorBean? {
        return apiErrorReporter.buildErrorBean(ex)
    }

    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    @ExceptionHandler(RexaUnknownException::class, Exception::class)
    protected fun handleUnknownError(ex: Exception?): ApiErrorBean? {
        return apiErrorReporter.buildUnknownErrorBean(ex)
    }
}
