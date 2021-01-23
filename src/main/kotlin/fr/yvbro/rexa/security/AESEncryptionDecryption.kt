package fr.yvbro.rexa.security

import java.security.NoSuchAlgorithmException
import java.security.spec.InvalidKeySpecException
import java.util.*
import javax.crypto.SecretKeyFactory
import javax.crypto.spec.PBEKeySpec

private val ITERATIONS = 65536
private val KEY_LENGTH = 512
private val ALGORITHM = "PBKDF2WithHmacSHA512"

fun hashPassword(password: String, salt: String): Optional<String> {
    val chars = password.toCharArray()
    val bytes = salt.toByteArray()
    val spec = PBEKeySpec(chars, bytes, ITERATIONS, KEY_LENGTH)
    Arrays.fill(chars, Character.MIN_VALUE)
    return try {
        val fac = SecretKeyFactory.getInstance(ALGORITHM)
        val securePassword = fac.generateSecret(spec).encoded
        Optional.of(Base64.getEncoder().encodeToString(securePassword))
    } catch (ex: NoSuchAlgorithmException) {
        System.err.println("Exception encountered in hashPassword()")
        Optional.empty()
    } catch (ex: InvalidKeySpecException) {
        System.err.println("Exception encountered in hashPassword()")
        Optional.empty()
    } finally {
        spec.clearPassword()
    }
}
