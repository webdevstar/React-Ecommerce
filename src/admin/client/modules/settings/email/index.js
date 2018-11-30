import { connect } from 'react-redux'
import { push } from 'react-router-redux';
import { fetchEmailSettings } from '../actions'
import Form from './components/form'

const mapStateToProps = (state) => {
  return {
    emailSettings: state.settings.emailSettings
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLoad: () => {
      dispatch(fetchEmailSettings())
    },
    pushUrl: (path) => {
      dispatch(push(path));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form);
