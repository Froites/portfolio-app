import styles from './App.module.css';
import AIChat from './components/AIChat';
// import Header from './components/Header';
import MyExperience from './components/MyExperience';
import MyJobs from './components/MyJobs';
import MyServices from './components/MyServices';
// import { PostType } from './components/Post';
import ProfileBanner from './components/ProfileBanner';
// import ProfileCircular from './components/ProfileCircular';
// import Sidebar from './components/Sidebar';


import './global.css'

function App() {

  return (
    <>
      {/* <Header /> */}
      <ProfileBanner />
      <div className={styles.wrapper}>
        {/* <Sidebar /> */}
        {/* <ProfileCircular /> */}
        {/* <ProfileCards /> */}
        <main>
          <MyJobs />
          <MyServices />
          <MyExperience /> 
        </main>
        <AIChat />
      </div>
    </>
  )
}

export default App