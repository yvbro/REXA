package fr.yvbro.rexa.config

import fr.yvbro.rexa.security.CustomUserDetailsService
import fr.yvbro.rexa.security.TokenAuthenticationFilter
import fr.yvbro.rexa.security.TokenProvider
import fr.yvbro.rexa.security.oauth2.CustomOAuth2UserService
import fr.yvbro.rexa.security.oauth2.HttpCookieOAuth2AuthorizationRequestRepository
import fr.yvbro.rexa.security.oauth2.OAuth2AuthenticationFailureHandler
import fr.yvbro.rexa.security.oauth2.OAuth2AuthenticationSuccessHandler
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.config.BeanIds
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter
import org.springframework.security.config.http.SessionCreationPolicy
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter
import org.springframework.security.web.csrf.CookieCsrfTokenRepository
import org.springframework.security.web.savedrequest.HttpSessionRequestCache
import org.springframework.security.web.savedrequest.RequestCache
import org.springframework.security.web.savedrequest.SimpleSavedRequest
import org.springframework.web.cors.CorsConfiguration
import org.springframework.web.cors.CorsConfigurationSource
import org.springframework.web.cors.UrlBasedCorsConfigurationSource
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse


@Configuration
@EnableWebSecurity
class SecurityConfiguration(private val customUserDetailsService: CustomUserDetailsService,
                            private val customOAuth2UserService: CustomOAuth2UserService) : WebSecurityConfigurerAdapter() {

    @Throws(Exception::class)
    override fun configure(http: HttpSecurity) {
        http
                .cors()
                .and()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .csrf()
                .csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse())
                .and()
                .authorizeRequests()
                .antMatchers("/**/*.{js,html,css}").permitAll()
                .antMatchers("/", "/error", "/auth/login", "/auth/userinfo", "/oauth2/**", "/rexa/**").permitAll()
                .anyRequest().authenticated()
                .and()
                .logout().logoutUrl("/auth/logout")
                .logoutSuccessUrl("/").permitAll()
                .and()
                .oauth2Login()
                .authorizationEndpoint()
                .baseUri("/oauth2/authorize-client")
                .authorizationRequestRepository(httpCookieOAuth2AuthorizationRequestRepository())
                .and()
                .userInfoEndpoint()
                .userService(customOAuth2UserService)
                .and()
                .successHandler(oAuth2AuthenticationSuccessHandler())
                .failureHandler(oAuth2AuthenticationFailureHandler())
                .and()
                .exceptionHandling()

        // Add our custom Token based authentication filter
        http.addFilterBefore(tokenAuthenticationFilter(), UsernamePasswordAuthenticationFilter::class.java)

    }

    @Throws(java.lang.Exception::class)
    override fun configure(authenticationManagerBuilder: AuthenticationManagerBuilder) {
        authenticationManagerBuilder
                .userDetailsService<UserDetailsService>(customUserDetailsService)
                .passwordEncoder(passwordEncoder())
    }

    @Bean
    fun tokenAuthenticationFilter(): TokenAuthenticationFilter? {
        return TokenAuthenticationFilter()
    }

    @Bean
    fun passwordEncoder(): PasswordEncoder? {
        return BCryptPasswordEncoder()
    }

    @Bean(BeanIds.AUTHENTICATION_MANAGER)
    @Throws(java.lang.Exception::class)
    override fun authenticationManagerBean(): AuthenticationManager? {
        return super.authenticationManagerBean()
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

    @Bean
    fun appProperties(): AppProperties {
        return AppProperties()
    }

    @Bean
    fun corsConfigurationSource(): CorsConfigurationSource? {
        val configuration = CorsConfiguration()
        configuration.allowedOrigins = listOf("*")
        configuration.allowedMethods = listOf("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS")
        configuration.allowCredentials = true
        configuration.allowedHeaders = listOf("authorization", "Cache-Control", "content-type", "X-XSRF-TOKEN")
        configuration.exposedHeaders = listOf("X-XSRF-TOKEN")
        val source = UrlBasedCorsConfigurationSource()
        source.registerCorsConfiguration("/**", configuration)
        return source
    }

    @Bean
    fun oAuth2AuthenticationSuccessHandler(): OAuth2AuthenticationSuccessHandler {
        return OAuth2AuthenticationSuccessHandler(tokenProvider(), appProperties(), httpCookieOAuth2AuthorizationRequestRepository())
    }

    @Bean
    fun oAuth2AuthenticationFailureHandler(): OAuth2AuthenticationFailureHandler {
        return OAuth2AuthenticationFailureHandler(httpCookieOAuth2AuthorizationRequestRepository())
    }

    @Bean
    fun httpCookieOAuth2AuthorizationRequestRepository(): HttpCookieOAuth2AuthorizationRequestRepository {
        return HttpCookieOAuth2AuthorizationRequestRepository()
    }

    @Bean
    fun tokenProvider(): TokenProvider {
        return TokenProvider(appProperties())
    }
}
