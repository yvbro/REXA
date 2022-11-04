import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { RexaException } from '../models/management/RexaException';
import { UserRexa } from '../models/management/UserRexa';
import { Page } from '../models/Page';

type UserSwitchEnabledRequest = {
    userEmail: string;
    enabled: boolean;
};

type AddUserRequest = {
    email: string;
    password: string;
};

type UserChangePasswordRequest = {
    email: string;
    newPassword: string;
    confirmationPassword: string;
};

export default function useUsersManagementService() {
    const USERS_MANAGEMENT_URI = '/private/management/users';

    const fetchUsers = (page: number, rowsPerPage: number) => {
        return axios.get<Page<UserRexa>>(
            `${USERS_MANAGEMENT_URI}/page?page=${page}&size=${rowsPerPage}`
        );
    };

    const switchEnabledUser = (userSwitchEnabled: UserSwitchEnabledRequest) => {
        axios
            .post(`${USERS_MANAGEMENT_URI}/switch`, userSwitchEnabled)
            .then(() => toast.info('Changes saved!'))
            .catch(() => {
                toast.error('Your changes could not be saved.');
            });
    };

    const addUser = async (addUserRequest: AddUserRequest) => {
        await axios
            .post(`${USERS_MANAGEMENT_URI}/add`, addUserRequest)
            .then(() => {
                toast.info('User added!');
            })
            .catch((error: AxiosError<RexaException>) => {
                const errorMessage = error?.response?.data?.message;
                toast.error(errorMessage);
            });
    };

    const updatePassword = async (
        userChangePasswordRequest: UserChangePasswordRequest
    ) => {
        await axios
            .post('/private/management/users/edit', userChangePasswordRequest)
            .then(() => toast.info('Password edited!'))
            .catch((error: AxiosError<RexaException>) => {
                const errorMessage = error?.response?.data?.message;
                toast.error(errorMessage);
            });
    };

    return { addUser, fetchUsers, updatePassword, switchEnabledUser };
}
