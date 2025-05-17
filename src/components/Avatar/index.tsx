import { ImgHTMLAttributes } from 'react'
import styles from './styles.module.css'

export interface AvatarProps extends ImgHTMLAttributes<HTMLImageElement> {
    hasBorder?: boolean,

}


const Avatar: React.FC<AvatarProps> = ({hasBorder = true, ...props}) => {
    return (
        <img 
            className={hasBorder ? styles.avatarWithBorder : styles.avatar}
            {...props}
        />
    )
}

export default Avatar