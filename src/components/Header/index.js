// import {Link} from 'react-router-dom'
// import Cookies from 'js-cookie'
// import {HiHome, HiMoon} from 'react-icons/hi'
// import {AiFillFire} from 'react-icons/ai'
// import {SiYoutubegaming} from 'react-icons/si'
// import {MdPlaylistAdd} from 'react-icons/md'
// import {BsMoon, BsBrightnessHigh} from 'react-icons/bs'
// import {GiHamburgerMenu} from 'react-icons/gi'
// import {FiLogOut} from 'react-icons/fi'
// import {ImCross} from 'react-icons/im'

// // import {FaBeer} from 'react-icons/fa'
// import './index.css'

// const Header = props => {
//   const logout = () => {
//     const {history} = props
//     Cookies.remove('jwt_token')
//     history.replace('/login')
//   }
//   return (
//     <>
//       <nav className="nav-container">
//         <li className="logo-header">
//           <Link to="/" className="link-cls">
//             <img
//               src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
//               alt="website logo"
//               className="logo-img"
//             />
//           </Link>
//         </li>
//         <li className="light-class">
//           <Link to="/lightmode" className="link-cls">
//             <HiMoon />
//           </Link>
//         </li>

//         <li className="profile-cls">
//           <Link to="/profile" className="link-cls">
//             <img
//               src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
//               alt="profile"
//               className="profile"
//             />
//           </Link>
//         </li>

//         <li className="light-class link-cls">
//           <button type="button" className="logout-button" onClick={logout}>
//             logout
//           </button>
//         </li>
//       </nav>
//       <div className="item-container">
//         <li className="li-items">
//           <Link to="/" className="link-cls">
//             <HiHome size={26} />
//             <span className="head-items">Home</span>
//           </Link>
//         </li>

//         <li className="li-items">
//           <AiFillFire size={26} />
//           <Link to="/trending" className="link-cls">
//             <span className="head-items">Trending</span>
//           </Link>
//         </li>
//         <li className="li-items">
//           <Link to="/saved" className="link-cls">
//             <SiYoutubegaming size={26} />
//             <span className="head-items">Gaming</span>
//           </Link>
//         </li>
//         <li className="li-items">
//           <Link to="/saved" className="link-cls">
//             <MdPlaylistAdd size={26} />
//             <span className="head-items">saved Videos</span>
//           </Link>
//         </li>
//       </div>
//     </>
//   )
// }
// export default Header

import {Link, withRouter} from 'react-router-dom'

import {BsMoon} from 'react-icons/bs'

import {FiSun} from 'react-icons/fi'

import Cookies from 'js-cookie'

import Popup from 'reactjs-popup'

import './index.css'

import {
  NavHeader,
  ProfileImage,
  ContentContainer,
  LogoutButton,
  ThemeButton,
  WebsiteLogo,
  ModalContainer,
  CloseButton,
  AlignRow,
  ConfirmButton,
  ModalDesc,
  AlignColumn,
  ContentListItem,
} from './styledComponents'

import CartContext from '../../Context/CartContext'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <CartContext.Consumer>
      {value => {
        const {onChangeTheme, isDarkTheme} = value

        const onClickChangeTheme = () => {
          onChangeTheme()
        }

        const bgColor = isDarkTheme ? '#181818' : '#f9f9f9'

        const textColor = isDarkTheme ? '#f9f9f9' : '#181818'

        const websiteLogo = isDarkTheme
          ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
          : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'

        return (
          <NavHeader bgColor={bgColor}>
            <Link to="/">
              <WebsiteLogo src={websiteLogo} alt="website logo" />
            </Link>
            <ContentContainer>
              <ContentListItem>
                <ThemeButton
                  onClick={onClickChangeTheme}
                  data-testid="theme"
                  color={textColor}
                >
                  {isDarkTheme ? <FiSun /> : <BsMoon />}
                </ThemeButton>
              </ContentListItem>

              <ContentListItem>
                <ProfileImage
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
                  alt="profile"
                />
              </ContentListItem>

              <ContentListItem>
                <Popup
                  modal
                  trigger={
                    <LogoutButton type="button" data-testid="iconButton">
                      Logout
                    </LogoutButton>
                  }
                  className="popup-content"
                >
                  {close => (
                    <ModalContainer>
                      <AlignColumn>
                        <ModalDesc>Are you sure, you want to logout</ModalDesc>
                        <AlignRow>
                          <CloseButton
                            type="button"
                            data-testid="closeButton"
                            onClick={() => close()}
                          >
                            Cancel
                          </CloseButton>

                          <ConfirmButton type="button" onClick={onClickLogout}>
                            Confirm
                          </ConfirmButton>
                        </AlignRow>
                      </AlignColumn>
                    </ModalContainer>
                  )}
                </Popup>
              </ContentListItem>
            </ContentContainer>
          </NavHeader>
        )
      }}
    </CartContext.Consumer>
  )
}

export default withRouter(Header)
