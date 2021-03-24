import { connect } from 'react-redux'
import LogoutButton from './LogoutButton'
import { logoutUser } from './LogoutButtonActions'

const mapStateToProps = (state, ownProps) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLogoutUserClick: (event) => {
      event.preventDefault();
      sessionStorage.clear();
      dispatch(logoutUser())
    }
  }
}

const LogoutButtonContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(LogoutButton)

export default LogoutButtonContainer
