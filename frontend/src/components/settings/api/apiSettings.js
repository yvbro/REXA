import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

export const updateUserSettings = (currentPassword, newPassword) => {
    return axios
        .post('/private/user/settings', { currentPassword, newPassword })
        .then(() => {
            toast.info('New password saved!');
        })
        .catch((error) => {
            let errorMessage = error?.response?.data?.message;
            if (!errorMessage) {
                errorMessage = "toast.error('Failed to save your new password";
            }
            toast.error(errorMessage);
        });
};

export const updateXnatSettings = (xnatUsername, xnatHost, xnatPassword) => {
    return axios
        .post('/private/xnat/settings', { xnatUsername, xnatHost, xnatPassword })
        .then(() => {
            toast.info('Xnat settings saved');
        })
        .catch(() => {
            toast.error('Failed to save xnat settings');
        });
};

export const testConnection = (xnatUsername, xnatHost, xnatPassword) => {
    axios
        .post('/private/test', { xnatUsername, xnatHost, xnatPassword })
        .then(() => {
            toast.info('Succesfully connected to Xnat');
        })
        .catch(() => {
            toast.error('Connection failed');
        });
};
