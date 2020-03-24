package fr.yvbro.rexa.exception

import com.fasterxml.jackson.databind.JsonMappingException
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.beans.TypeMismatchException
import org.springframework.http.HttpStatus
import org.springframework.http.converter.HttpMessageNotReadableException
import org.springframework.validation.BindException
import org.springframework.validation.FieldError
import org.springframework.web.bind.MethodArgumentNotValidException
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException
import org.springframework.web.multipart.support.MissingServletRequestPartException
import java.util.stream.Collectors
import javax.validation.ConstraintViolation
import javax.validation.ConstraintViolationException
import javax.validation.Path

class ApiErrorReporter {

    private val LOGGER: Logger = LoggerFactory.getLogger(ApiErrorReporter::class.java)

    private val UNKNOWN_ERROR = "UNKNOWN_ERROR"
    private val UNKNOWN_ERROR_MESSAGE = "Unknown error, please provide byvernault on github."
    private val VALIDATION_ERROR = "VALIDATION_ERROR"
    private val VALIDATION_ERROR_MESSAGE = "The request could not be understood by the server due to client error."
    private val INVALID_FIELD_TYPE = "INVALID_FIELD_TYPE"
    private val INVALID_FIELD_TYPE_MESSAGE = "The field type is invalid."
    private val INVALID_VALUE = "INVALID_VALUE"
    private val INVALID_VALUE_MESSAGE = "Please check the field value and datatype"
    private val IO_ERROR = "IO_ERROR"
    private val IO_ERROR_MESSAGE = "Required request body is missing or malformed"

    private interface ExceptionReportStrategy<T : Exception?> {
        fun reportError(e: T): ApiErrorBean?
    }

    fun buildUnknownErrorBean(ex: Exception?): ApiErrorBean? {
        LOGGER.error("Internal Server Error: ", ex)
        return ApiErrorBean(UNKNOWN_ERROR_MESSAGE, UNKNOWN_ERROR)
    }

    fun buildErrorBean(e: Exception?): ApiErrorBean? {
        when (e) {
            is BindException -> {
                return bindExceptionReportStrategy.reportError(e)
            }
            is MethodArgumentNotValidException -> {
                return methodArgumentNotValidExceptionReportStrategy.reportError(e)
            }
            is TypeMismatchException -> {
                return methodArgumentTypeMismatchExceptionStrategy.reportError(e as MethodArgumentTypeMismatchException)
            }
            is HttpMessageNotReadableException -> {
                return messageNotReadableStrategy.reportError(e)
            }
            is ConstraintViolationException -> {
                return constraintViolationExceptionStrategy.reportError(e)
            }
            is MissingServletRequestPartException -> {
                return missingServletRequestPartExceptionStrategy.reportError(e)
            }
            else -> return e?.let { genericExceptionReportStrategy.reportError(it) }
        }
    }

    private val genericExceptionReportStrategy: ExceptionReportStrategy<Exception> = object : ExceptionReportStrategy<Exception> {
        override fun reportError(e: Exception): ApiErrorBean? {
            return e.message?.let { ApiErrorBean(it, HttpStatus.BAD_REQUEST.name) }
        }
    }

    private val bindExceptionReportStrategy: ExceptionReportStrategy<BindException> = object : ExceptionReportStrategy<BindException> {
        override fun reportError(e: BindException): ApiErrorBean? {
            return ApiErrorBean(INVALID_FIELD_TYPE_MESSAGE, INVALID_FIELD_TYPE, if (e.fieldError != null) e.fieldError!!.field else null)
        }
    }

    private val methodArgumentNotValidExceptionReportStrategy: ExceptionReportStrategy<MethodArgumentNotValidException> = object : ExceptionReportStrategy<MethodArgumentNotValidException> {
        override fun reportError(e: MethodArgumentNotValidException): ApiErrorBean? {
            val errors = e.bindingResult.fieldErrors.stream()
                    .map<Any> { error: FieldError -> error.defaultMessage?.let { ValidationError(error.field, it) } }
                    .collect(Collectors.toList())
            return ApiValidationErrorBean(VALIDATION_ERROR_MESSAGE, VALIDATION_ERROR, errors as List<ValidationError>)
        }
    }

    private val methodArgumentTypeMismatchExceptionStrategy: ExceptionReportStrategy<MethodArgumentTypeMismatchException> = object : ExceptionReportStrategy<MethodArgumentTypeMismatchException> {
        override fun reportError(e: MethodArgumentTypeMismatchException): ApiErrorBean? {
            return ApiErrorBean(INVALID_FIELD_TYPE_MESSAGE, INVALID_FIELD_TYPE, e.name)
        }
    }

    private val messageNotReadableStrategy: ExceptionReportStrategy<HttpMessageNotReadableException> = object : ExceptionReportStrategy<HttpMessageNotReadableException> {
        override fun reportError(e: HttpMessageNotReadableException): ApiErrorBean? {
            val causeException = e.cause
            var message = IO_ERROR_MESSAGE
            var errorCode = IO_ERROR
            var field: String? = null

            if (causeException is JsonMappingException && causeException.path.isNotEmpty()) {
                // Typical random deserialization issue
                field = getFieldPathInError(causeException)
                message = INVALID_VALUE_MESSAGE
                errorCode = INVALID_VALUE
            }

            return ApiErrorBean(message, errorCode, field)
        }
    }

    private val constraintViolationExceptionStrategy: ExceptionReportStrategy<ConstraintViolationException> = object : ExceptionReportStrategy<ConstraintViolationException> {
        override fun reportError(e: ConstraintViolationException): ApiErrorBean? {
            val errors = e.constraintViolations.stream()
                    .map<Any> { constraintViolation: ConstraintViolation<*> -> removeMethodNameFromPropertyPath(constraintViolation.propertyPath)?.let { ValidationError(it, constraintViolation.message) } }
                    .collect(Collectors.toList())
            return ApiValidationErrorBean(VALIDATION_ERROR_MESSAGE, VALIDATION_ERROR, errors as List<ValidationError>)
        }
    }

    private val missingServletRequestPartExceptionStrategy: ExceptionReportStrategy<MissingServletRequestPartException> = object : ExceptionReportStrategy<MissingServletRequestPartException> {
        override fun reportError(e: MissingServletRequestPartException): ApiErrorBean? {
            return e.message?.let { ApiErrorBean(it, e.requestPartName) }
        }
    }

    private fun removeMethodNameFromPropertyPath(propertyPath: Path): String? {
        //ConstraintViolationException are thrown by validation on RequestParam. For those, the propertyPath is built by concatenating the method name and the field name
        // but in the API error output, we just want the field name
        val propertyPathAsString = propertyPath.toString()
        return propertyPathAsString.substring(propertyPathAsString.indexOf('.') + 1)
    }

    private fun getFieldPathInError(ex: JsonMappingException): String? {
        val fieldName = StringBuilder()
        for (reference in ex.path) {
            if (reference.fieldName != null) {
                if (fieldName.isEmpty()) {
                    fieldName.append(reference.fieldName)
                } else {
                    fieldName.append(".").append(reference.fieldName)
                }
            } else if (reference.index > -1) {
                fieldName.append(String.format("[%d]", reference.index))
            } else {
                throw RuntimeException("Reference should either be a concrete field or an collection index")
            }
        }
        return fieldName.toString()
    }
}
