import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

export const updateSettings = (xnatUsername, xnatHost, xnatPassword) => {
    return axios
        .post('/private/settings', { xnatUsername, xnatHost, xnatPassword })
        .then(() => {
            toast.info('Settings saved');
        })
        .catch(() => {
            toast.error('Failed to save settings');
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
