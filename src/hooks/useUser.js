import { useState, useEffect } from 'react';
import * as usersApi from '../api/users.js';

export const useUser = (identifier) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!identifier) { setLoading(false); return; }
    setLoading(true);
    (identifier.startsWith('user_')
      ? usersApi.getUserById(identifier.replace('user_', ''))
      : usersApi.getUserByUsername(identifier)
    )
      .then(res => setUser(res.user || res))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, [identifier]);

  return { user, loading };
};
