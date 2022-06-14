import React from 'react'
import { CButton, CCol, CForm, CFormFeedback, CFormInput, CFormLabel } from '@coreui/react'
import { useForm, Controller } from 'react-hook-form'

const ContactForm = ({ defaultValues, actionFunction }) => {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()
  const onSubmit = (data) => {
    if (defaultValues) {
      actionFunction(data, defaultValues.id)
    } else {
      actionFunction(data)
    }
  }
  const maskPhoneNumber = (event) => {
    const x = event.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/)
    event.target.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '')
  }
  return (
    <CForm className="row g-3 needs-validation" noValidate onSubmit={handleSubmit(onSubmit)}>
      <CCol md={4}>
        <CFormLabel htmlFor="firstName">First name</CFormLabel>
        <Controller
          control={control}
          defaultValue={defaultValues?.data.firstName || ''}
          rules={{ required: true }}
          id="firstName"
          name="firstName"
          render={({ field }) => <CFormInput {...field} />}
        />
        {errors.firstName ? (
          <CFormFeedback className="text-danger">*Required field</CFormFeedback>
        ) : null}
      </CCol>
      <CCol md={4}>
        <CFormLabel htmlFor="lastName">Last name</CFormLabel>
        <Controller
          control={control}
          defaultValue={defaultValues?.data.lastName || ''}
          rules={{ required: true }}
          id="lastName"
          name="lastName"
          render={({ field }) => <CFormInput {...field} />}
        />
        {errors.lastName ? (
          <CFormFeedback className="text-danger">*Required field</CFormFeedback>
        ) : null}
      </CCol>
      <CCol md={4}>
        <CFormLabel htmlFor="address">Address</CFormLabel>
        <Controller
          control={control}
          defaultValue={defaultValues?.data.address || ''}
          rules={{ required: true }}
          id="address"
          name="address"
          render={({ field }) => <CFormInput {...field} />}
        />
        {errors.address ? (
          <CFormFeedback className="text-danger">*Required field</CFormFeedback>
        ) : null}
      </CCol>
      <CCol md={4}>
        <CFormLabel htmlFor="email">Email</CFormLabel>
        <Controller
          control={control}
          defaultValue={defaultValues?.data.email || ''}
          rules={{
            required: true,
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            },
          }}
          id="email"
          name="email"
          render={({ field }) => <CFormInput {...field} type="email" />}
        />
        {errors.email?.type === 'required' && (
          <CFormFeedback className="text-danger">*Required field</CFormFeedback>
        )}
        {errors.email?.type === 'pattern' && (
          <CFormFeedback className="text-danger">*Wrong syntax</CFormFeedback>
        )}
      </CCol>
      <CCol md={4}>
        <CFormLabel htmlFor="phone">Phone number</CFormLabel>
        <Controller
          control={control}
          defaultValue={defaultValues?.data.phone || ''}
          rules={{
            required: true,
            min: 10,
            pattern: { value: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im },
          }}
          id="phone"
          name="phone"
          render={({ field }) => (
            <CFormInput
              {...field}
              type="tel"
              placeholder="(250) 555-0199"
              onInput={(event) => maskPhoneNumber(event)}
            />
          )}
        />
        {errors.phone?.type === 'required' && (
          <CFormFeedback className="text-danger">*Required field</CFormFeedback>
        )}
        {errors.phone?.type === 'pattern' && (
          <CFormFeedback className="text-danger">*Wrong number</CFormFeedback>
        )}
      </CCol>
      <CCol md={12} className="d-flex justify-content-center">
        <CButton color="primary" type="submit">
          Submit form
        </CButton>
      </CCol>
    </CForm>
  )
}
export default ContactForm
