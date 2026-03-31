'use client';

import { useAuth, useUser } from '@clerk/nextjs';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { Account, API_URL, getAuthHeaders } from '../lib/api';

export function useAccount() {
  const { isLoaded, isSignedIn, getToken, userId } = useAuth();
  const { user } = useUser();
  const [account, setAccount] = useState<Account | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const buildOfflineAccount = useCallback((): Account | null => {
    if (!user) {
      return null;
    }

    const primaryEmail = user.primaryEmailAddress?.emailAddress ?? user.emailAddresses[0]?.emailAddress ?? null;
    const clerkId = userId ?? user.id;

    return {
      id: clerkId,
      clerkId,
      email: primaryEmail,
      firstName: user.firstName ?? null,
      lastName: user.lastName ?? null,
      plan: 'FREE',
      resumeCount: 0,
    };
  }, [user, userId]);

  const refresh = useCallback(async () => {
    if (!isLoaded) {
      return;
    }

    if (!isSignedIn || !user) {
      setAccount(null);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const headers = await getAuthHeaders(getToken, userId);
      const response = await axios.get<Account>(`${API_URL}/api/account/me`, { headers });
      setAccount(response.data);
      setError(null);
    } catch (fetchError) {
      if (axios.isAxiosError(fetchError) && !fetchError.response) {
        setAccount((currentAccount) => currentAccount ?? buildOfflineAccount());
        setError(null);

        if (process.env.NODE_ENV !== 'production') {
          console.warn(`Account API unavailable at ${API_URL}; using local fallback mode.`);
        }

        return;
      }

      console.error(fetchError);
      setError('Failed to load account details');
    } finally {
      setLoading(false);
    }
  }, [buildOfflineAccount, getToken, isLoaded, isSignedIn, user, userId]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { account, loading, error, refresh };
}
