package fr.yvbro.rexa.controller.mapper

import fr.yvbro.rexa.controller.output.UserDto
import fr.yvbro.rexa.model.User

fun mapToUserDto(users: List<User>): List<UserDto> {
    return users.map { user -> UserDto(user.email, user.userRoles) }
}