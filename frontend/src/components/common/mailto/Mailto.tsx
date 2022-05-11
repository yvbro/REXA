import React, { ReactNode } from 'react';

interface MailtoProps {
  email: string;
  children: ReactNode;
}

const Mailto = ({ email, children }: MailtoProps) => (<a href={`mailto:${email}`}>{children}</a>);

export default Mailto;
