import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import {reset, submit} from 'redux-form';
import {
  checkout,
  updateCart,
  fetchShippingMethods,
  fetchPaymentMethods,
  updateCartShippingCountry,
  updateCartShippingState,
  updateCartShippingCity,
  updateCartShippingMethod,
  updateCartPaymentMethod,
  analyticsSetShippingMethod,
  analyticsSetPaymentMethod
} from '../../actions'
import Form from './form'

const mapStateToProps = (state, ownProps) => {
  return {
    initialValues: state.app.cart,
    settings: state.app.settings,
    paymentMethods: state.app.paymentMethods,
    shippingMethods: state.app.shippingMethods,
    loadingShippingMethods: state.app.loadingShippingMethods,
    loadingPaymentMethods: state.app.loadingPaymentMethods,
    checkoutFields: state.app.checkoutFields
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onSubmit: (values) => {
      dispatch(updateCart(values));
      dispatch(analyticsSetShippingMethod(values.shipping_method_id));
      dispatch(analyticsSetPaymentMethod(values.payment_method_id));
    },
    saveForm: (values) => {
      dispatch(submit('CheckoutStepContacts'));
    },
    saveShippingCountry: (value) => {
      dispatch(updateCartShippingCountry(value));
    },
    saveShippingState: (value) => {
      dispatch(updateCartShippingState(value));
    },
    saveShippingCity: (value) => {
      dispatch(updateCartShippingCity(value));
    },
    saveShippingMethod: (value) => {
      dispatch(updateCartShippingMethod(value));
    },
    savePaymentMethod: (value) => {
      dispatch(updateCartPaymentMethod(value));
    },
    onLoad: () => {
      dispatch(fetchShippingMethods());
      dispatch(fetchPaymentMethods());
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Form));
