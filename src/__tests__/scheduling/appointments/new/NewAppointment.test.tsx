import { Toaster } from '@hospitalrun/components'
import { render, screen } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import React from 'react'
import { ReactQueryConfigProvider } from 'react-query'
import { Provider } from 'react-redux'
import { Router } from 'react-router'
import createMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import * as titleUtil from '../../../../page-header/title/TitleContext'
import NewAppointment from '../../../../scheduling/appointments/new/NewAppointment'
import AppointmentRepository from '../../../../shared/db/AppointmentRepository'
import PatientRepository from '../../../../shared/db/PatientRepository'
import Appointment from '../../../../shared/model/Appointment'
import Patient from '../../../../shared/model/Patient'
import { RootState } from '../../../../shared/store'

const { TitleProvider } = titleUtil
const mockStore = createMockStore<RootState, any>([thunk])

describe('New Appointment', () => {
  const expectedPatient: Patient = {
    addresses: [],
    bloodType: 'o',
    careGoals: [],
    carePlans: [],
    code: 'P-qrQc3FkCO',
    createdAt: new Date().toISOString(),
    dateOfBirth: new Date(0).toISOString(),
    emails: [],
    id: '123',
    index: '',
    isApproximateDateOfBirth: false,
    phoneNumbers: [],
    rev: '',
    sex: 'female',
    updatedAt: new Date().toISOString(),
    visits: [],
    givenName: 'Popo',
    prefix: 'Mr',
    fullName: 'Mr Popo',
  }

  const noRetryConfig = {
    queries: {
      retry: false,
    },
  }

  const setup = () => {
    const expectedAppointment = { id: '123' } as Appointment
    jest.spyOn(AppointmentRepository, 'save').mockResolvedValue(expectedAppointment)
    jest.spyOn(PatientRepository, 'search').mockResolvedValue([expectedPatient])

    const history = createMemoryHistory({ initialEntries: ['/appointments/new'] })

    return {
      expectedAppointment,
      history,
      ...render(
        <ReactQueryConfigProvider config={noRetryConfig}>
          <Provider store={mockStore({} as any)}>
            <Router history={history}>
              <TitleProvider>
                <NewAppointment />
              </TitleProvider>
            </Router>
            <Toaster draggable hideProgressBar />
          </Provider>
        </ReactQueryConfigProvider>,
      ),
    }
  }

    describe('layout', () => {
        it('should render an Appointment Detail Component', async () => {
            setup()

            expect(await screen.findByLabelText('new appointment form')).toBeInTheDocument()
        })
    })

})
