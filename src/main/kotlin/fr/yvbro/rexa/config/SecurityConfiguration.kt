package fr.yvbro.rexa.config

import org.springframework.context.annotation.Bean
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter
import org.springframework.security.web.authentication.LoginUrlAuthenticationEntryPoint
import org.springframework.security.web.csrf.CookieCsrfTokenRepository
import org.springframework.security.web.savedrequest.HttpSessionRequestCache
import org.springframework.security.web.savedrequest.RequestCache
import org.springframework.security.web.savedrequest.SimpleSavedRequest
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse

@EnableWebSecurity
class SecurityConfiguration : WebSecurityConfigurerAdapter() {
    @Throws(Exception::class)
    override fun configure(http: HttpSecurity) {
        http
                .oauth2Login().and()
                .csrf()
                .csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse())
                .and()
                .authorizeRequests()
                .antMatchers("/**/*.{js,html,css}").permitAll()
                .antMatchers("/", "/auth/**").permitAll()
                .anyRequest().authenticated()
                .and().exceptionHandling()
                .authenticationEntryPoint( LoginUrlAuthenticationEntryPoint("/"))
                .and().logout { l -> l.logoutSuccessUrl("/").permitAll() }
    }

    @Bean
    fun refererRequestCache(): RequestCache {
        return object : HttpSessionRequestCache() {
            override fun saveRequest(request: HttpServletRequest, response: HttpServletResponse) {
                val referrer = request.getHeader("referer")
                if (referrer != null) {
                    request.session.setAttribute("SPRING_SECURITY_SAVED_REQUEST", SimpleSavedRequest(referrer))
                }
            }
        }
    }
}
