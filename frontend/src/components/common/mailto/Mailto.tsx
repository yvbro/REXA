import React, { ReactNode } from 'react';

interface MailtoProps {
    email: string;
    children: ReactNode;
}

function Mailto({ email, children }: MailtoProps) {
    return <a href={`mailto:${email}`}>{children}</a>;
}

export default Mailto;
