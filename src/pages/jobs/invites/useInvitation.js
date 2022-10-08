import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {invitationList} from 'src/services/http.service';

export const useInvitation = (
  page = 1,
  type = 'pending',
  projectId,
  isRefreshing,
) => {
  const [invitation, setInvitation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMorePage, setHasMorePage] = useState(0);
  const token = useSelector((state) => state.myReducer?.user?.token);
  useEffect(() => {
    setLoading(true);
    invitationList({token: token, page: page, type: type, projectId: projectId})
      .then((res) => {
        // console.log(' 👽', JSON.stringify(res.data, null, 2));
        setInvitation(res.data?.data?.invitation?.data);
        setHasMorePage(res?.data?.data?.invitation?.meta?.has_more_pages);
      })
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, [isRefreshing]);
  return {loading, error, invitation, hasMorePage};
};

// export default memo(useInvitation);
