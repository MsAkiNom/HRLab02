import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Button, Spinner } from '@hospitalrun/components'

import useAppointment from '../../hooks/useAppointment'
import usePatient from '../../../patients/hooks/usePatient'
import AppointmentDetailForm from '../AppointmentDetailForm'
import useTranslator from '../../../shared/hooks/useTranslator'
import useUpdateAppointment from '../../hooks/useUpdateAppointment'


const EditAppointment = () => {
  const { id } = useParams()
  const { t } = useTranslator()

  const [newAppointment, setAppointment] = useState({} as Appointment)
  const { data: currentAppointment, isLoading: isLoadingAppointment } = useAppointment(id)
  const { data: patient } = usePatient(currentAppointment ? currentAppointment.patient : id)

  const {
    isLoading: isLoadingUpdate,
    error: updateMutateError,
  } = useUpdateAppointment(newAppointment)

  const onFieldChange = (key: string, value: string | boolean) => {
    setAppointment({
      ...newAppointment,
      [key]: value,
    })
  }
  
  if (isLoadingAppointment || isLoadingUpdate) {
    return <Spinner color="blue" loading size={[10, 25]} type="ScaleLoader" />
  }

  return (
    <div>
      <AppointmentDetailForm
        isEditable
        appointment={newAppointment}
        patient={patient}
        onFieldChange={onFieldChange}
        error={updateMutateError}
      />
      <div className="row float-right">
        <div className="btn-group btn-group-lg mr-3">
          <Button className="mr-2" color="success">
            {t('scheduling.appointments.updateAppointment')}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default EditAppointment
