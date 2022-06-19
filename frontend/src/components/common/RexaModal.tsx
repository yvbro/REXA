import React, { JSXElementConstructor, ReactElement } from 'react';

import { Modal } from '@material-ui/core';

import classes from './common.module.scss';

interface RexaModalProps {
    children: ReactElement<any, string | JSXElementConstructor<any>>;
    title: string;
    open: boolean;
    closeModal: () => void;
}

const RexaModal = ({ children, title, open, closeModal }: RexaModalProps) => (
    <Modal
        className={classes.modal}
        open={open}
        onClose={closeModal}
        aria-labelledby={title}
    >
        {children}
    </Modal>
);

export default RexaModal;
