import { ACCOUNT_DRAGONS } from './types';
import { fetchFromAccount } from './account';

export const fetchAccountDragons = () => fetchFromAccount('dragons',
    { credentials: 'include' },
    ACCOUNT_DRAGONS.FETCH,
    ACCOUNT_DRAGONS.FETCH_ERROR,
    ACCOUNT_DRAGONS.FETCH_SUCCESS
)