import styles from './styles.module.css'

import imageLogo from '../../assets/ignite-image.svg'

const Header: React.FC = () => {
    return (
        <header className={styles.header}>
            <img src={imageLogo} alt="Ignite Logo" />
        </header>
    )
}

export default Header