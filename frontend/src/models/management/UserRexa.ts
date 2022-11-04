import { RexaRole } from './RexaRole';

export interface UserRexa {
    email: string;
    roles: RexaRole[];
    enabled: boolean;
    authProvider?: string;
}
