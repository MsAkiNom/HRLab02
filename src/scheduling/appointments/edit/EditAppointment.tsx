import React from 'react'
import { useParams } from 'react-router-dom'

import usePatient from '../../../patients/hooks/usePatient'
import useAppointment from '../../hooks/useAppointment'


const EditAppointment = () => {
  const { id } = useParams()

  const { data: currentAppointment, isLoading: isLoadingAppointment } = useAppointment(id)
  const { data: patient } = usePatient(currentAppointment ? currentAppointment.patient : id)
  

  return (
    <div>

    </div>
  )
}

export default EditAppointment
