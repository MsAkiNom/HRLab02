import { Toaster } from '@hospitalrun/components'
import addMinutes from 'date-fns/addMinutes'
import { createMemoryHistory } from 'history'
import userEvent from '@testing-library/user-event'
import { render, screen, fireEvent, within } from '@testing-library/react'
import roundToNearestMinutes from 'date-fns/roundToNearestMinutes'
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

    describe('new appointment creation', () => {
        it('should have error if patient record does not exist', async () => {
            setup()

            const expectedError = {
                message: 'scheduling.appointment.errors.createAppointmentError',
                patient: 'scheduling.appointment.errors.patientRequired',
            }

            const expectedAppointment = {
                patient: '',
                startDateTime: roundToNearestMinutes(new Date(), { nearestTo: 15 }).toISOString(),
                endDateTime: addMinutes(
                    roundToNearestMinutes(new Date(), { nearestTo: 15 }),
                    60,
                ).toISOString(),
                location: 'location',
                reason: 'reason',
                type: 'routine',
            } as Appointment

            userEvent.type(
                screen.getByPlaceholderText(/scheduling\.appointment\.patient/i),
                expectedAppointment.patient,
            )

            userEvent.click(screen.getByText(/scheduling.appointments.createAppointment/i))

            expect(screen.getByText(expectedError.message)).toBeInTheDocument()
            expect(screen.getByPlaceholderText(/scheduling\.appointment\.patient/i)).toHaveClass('is-invalid')
            expect(AppointmentRepository.save).not.toHaveBeenCalled()
        })

        it('should have error when end time earlier than start time', async () => {
            setup()
      
            const expectedError = {
              message: 'scheduling.appointment.errors.createAppointmentError',
              startDateTime: 'scheduling.appointment.errors.startDateMustBeBeforeEndDate',
            }
      
            const expectedAppointment = {
              patient: expectedPatient.fullName,
              startDateTime: new Date(2020, 10, 10, 0, 0, 0, 0).toISOString(),
              endDateTime: new Date(1957, 10, 10, 0, 0, 0, 0).toISOString(),
              location: 'location',
              reason: 'reason',
              type: 'routine',
            } as Appointment
      
            userEvent.type(
              screen.getByPlaceholderText(/scheduling\.appointment\.patient/i),
              expectedAppointment.patient,
            )
            fireEvent.change(within(screen.getByTestId('startDateDateTimePicker')).getByRole('textbox'), {
              target: { value: expectedAppointment.startDateTime },
            })
            fireEvent.change(within(screen.getByTestId('endDateDateTimePicker')).getByRole('textbox'), {
              target: { value: expectedAppointment.endDateTime },
            })
            userEvent.click(screen.getByText(/scheduling.appointments.createAppointment/i))
      
            expect(screen.getByText(expectedError.message)).toBeInTheDocument()
            expect(screen.getByPlaceholderText(/scheduling\.appointment\.patient/i)).toHaveClass(
              'is-invalid',
            )
            expect(
              within(screen.getByTestId('startDateDateTimePicker')).getByRole('textbox'),
            ).toHaveClass('is-invalid')
            expect(screen.getByText(expectedError.startDateTime)).toBeInTheDocument()
            expect(AppointmentRepository.save).toHaveBeenCalledTimes(0)
        })
    })

})
