import { ThumbsUp, Trash } from 'phosphor-react';
import { useState } from 'react';
import Avatar from '../Avatar';
import styles from './styles.module.css'


interface CommentProps {
    content: string,
    onDeleteComment: (comment: string) => void
}

const Comment: React.FC<CommentProps> = ({content, onDeleteComment}) => {

    const [likeCount, setLikeCount] = useState(0); 

    function handleDeleteComment() {
        onDeleteComment(content);
    }

    function hanldeSetLikeCount() {
        setLikeCount((state) => {
            return state + 1;
        });
    }

    return (
        <div className={styles.comment}>
            <Avatar
                hasBorder={false}
                src="https://github.com/froites.png"
            />
            <div className={styles.commentBox}>
                <div className={styles.commentContent}>
                    <header>
                        <div className={styles.authorAndTime}>
                            <strong>Jonh Doe</strong>
                            <time title='10 de Março às 00:15h' dateTime='2023-03-10 00:15:10'>Cerca de 1h atrás</time>
                        </div>
                        <button onClick={handleDeleteComment} title='Deletar comentário'>
                            <Trash size={24}/>
                        </button>
                    </header>

                    <p>{content}</p>
                </div>

                <footer>
                    <button onClick={hanldeSetLikeCount}>
                        <ThumbsUp />
                        Aplaudir <span>{likeCount}</span>
                    </button>
                </footer>
            </div>
        </div>
    );
}

export default Comment;