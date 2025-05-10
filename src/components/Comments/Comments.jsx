import { useContext, useState } from 'react';
import './comments.scss';
import { AuthContext } from '../../context/authContext';
import { useQuery } from '@tanstack/react-query';
import { makeRequest } from '../../axios';
import moment from 'moment';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

const Comments = ({ postId }) => {
    const { currentUser } = useContext(AuthContext);
    const [desc, setDesc] = useState('');
    const queryClient = useQueryClient();
    // const comments = [
    //     {
    //         id: 1,
    //         name: 'Havold',
    //         avatar: 'https://scontent.fsgn5-14.fna.fbcdn.net/v/t1.6435-9/149128164_1379855842365987_6424596517571655275_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=53a332&_nc_eui2=AeHezHCbi3oaiQjzSf8pFNC6kGGyVcIOkTuQYbJVwg6ROzjFWJLz-Q3Y7dJO3NqfSjxPAbm_YwXdKnJMi6hIg8dK&_nc_ohc=c9BgkSROktMQ7kNvgF8SuVn&_nc_ht=scontent.fsgn5-14.fna&_nc_gid=AdTHq8VtDCZ3JmH_oIe44yI&oh=00_AYCItTCuBLW1EugSkUneaU4ICLI7xMdDgd66LDcRjimy0Q&oe=670FBB5D',
    //         userId: 1,
    //         desc: 'OMG! I was there 3 day ago. People there are so friendly and atmosphere is so warm. Will come back there one day soon.',
    //     },
    //     {
    //         id: 2,
    //         name: 'Havold',
    //         avatar: 'https://scontent.fsgn5-14.fna.fbcdn.net/v/t1.6435-9/149128164_1379855842365987_6424596517571655275_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=53a332&_nc_eui2=AeHezHCbi3oaiQjzSf8pFNC6kGGyVcIOkTuQYbJVwg6ROzjFWJLz-Q3Y7dJO3NqfSjxPAbm_YwXdKnJMi6hIg8dK&_nc_ohc=c9BgkSROktMQ7kNvgF8SuVn&_nc_ht=scontent.fsgn5-14.fna&_nc_gid=AdTHq8VtDCZ3JmH_oIe44yI&oh=00_AYCItTCuBLW1EugSkUneaU4ICLI7xMdDgd66LDcRjimy0Q&oe=670FBB5D',
    //         userId: 2,
    //         desc: 'OMG! I was there 3 day ago. People there are so friendly and atmosphere is so warm. Will come back there one day soon.',
    //     },
    // ];

    const { isPending, error, data } = useQuery({
        queryKey: ['comments'],
        queryFn: () => {
            return makeRequest.get('/comments/' + postId).then((res) => {
                return res.data;
            });
        },
    });

    const mutation = useMutation({
        mutationFn: (newComment) => {
            return makeRequest.post('/comments/' + postId, newComment);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['comments'] });
            queryClient.invalidateQueries({ queryKey: ['countComments', postId] });
        },
    });

    const handleSendComment = () => {
        mutation.mutate({ desc });
        setDesc('');
    };

    return (
        <div className="comments">
            <div className="write">
                <Link to={`/profile/${currentUser.id}`}>
                    <img src={currentUser.profilePic} alt="avatar" />
                </Link>
                <input
                    value={desc}
                    type="text"
                    placeholder="Write a comment..."
                    onChange={(e) => setDesc(e.target.value)}
                />
                <button onClick={handleSendComment}>Send</button>
            </div>
            {error
                ? 'Something went wrong! '
                : isPending
                ? 'Loading...'
                : data.map((comment) => (
                      <div className="comment" key={comment.id}>
                          <Link to={`/profile/${comment.userId}`}>
                              <img src={comment.profilePic} alt="avatar" />
                          </Link>
                          <div className="info">
                              <span>{comment.name}</span>
                              <p>{comment.desc}</p>
                          </div>
                          <div className="date">{moment(comment.createdAt).fromNow()}</div>
                      </div>
                  ))}
        </div>
    );
};

export default Comments;
