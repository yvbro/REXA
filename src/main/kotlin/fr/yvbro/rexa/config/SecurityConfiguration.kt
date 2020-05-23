package fr.yvbro.rexa.config

import fr.yvbro.rexa.security.CustomUserDetailsService
import fr.yvbro.rexa.security.TokenAuthenticationFilter
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
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse

@Configuration
@EnableWebSecurity
class SecurityConfiguration(private val customUserDetailsService: CustomUserDetailsService) : WebSecurityConfigurerAdapter() {

    @Throws(Exception::class)
    override fun configure(http: HttpSecurity) {
        http
                .cors()
                .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .csrf()
                .csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse())
                .and()
                .formLogin()
                .disable()
                .httpBasic()
                .disable()
                .authorizeRequests()
                .antMatchers("/**/*.{js,html,css}").permitAll()
                .antMatchers("/", "/auth/**", "/oauth2/**").permitAll()
                .anyRequest().authenticated()
//                .and()
//                .oauth2Login()
//                .authorizationEndpoint()
//                .baseUri("/oauth2/authorize")
//                .authorizationRequestRepository(cookieAuthorizationRequestRepository())
//                .and()
//                .redirectionEndpoint()
//                .baseUri("/oauth2/callback/*")
//                .and()
//                .userInfoEndpoint()
//                .userService(customOAuth2UserService)
//                .and()
//                .successHandler(oAuth2AuthenticationSuccessHandler)
//                .failureHandler(oAuth2AuthenticationFailureHandler)

        // Add our custom Token based authentication filter
        http.addFilterBefore(tokenAuthenticationFilter(), UsernamePasswordAuthenticationFilter::class.java)

//        http
//                .oauth2Login().and()
//                .csrf()
//                .csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse())
//                .and()
//                .authorizeRequests()
//                .antMatchers("/**/*.{js,html,css}").permitAll()
//                .antMatchers("/", "/auth/**").permitAll()
//                .anyRequest().authenticated()
//                .and().exceptionHandling()
//                .authenticationEntryPoint(LoginUrlAuthenticationEntryPoint("/"))
//                .and().logout { l -> l.logoutSuccessUrl("/").permitAll() }
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
    fun appProperties(): AppProperties {return AppProperties()}
}
