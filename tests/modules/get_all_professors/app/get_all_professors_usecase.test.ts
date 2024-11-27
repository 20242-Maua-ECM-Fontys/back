import { describe, it, expect } from 'vitest'

import { GetAllProfessorsUsecase } from '../../../../src/modules/get_all_professors/app/get_all_professors_usecase'
import { ScheduleRepositoryMock } from '../../../../src/shared/infra/repositories/schedule_repository_mock'

describe('Assert GetAllProfessorsUsecase is correct at all', () => {
  it('Should activate usecase correctly', async () => {
    const repo = new ScheduleRepositoryMock()
    const usecase = new GetAllProfessorsUsecase(repo)

    const professors = await usecase.execute()

    // Validate that three professors are returned
    expect(professors.length).toEqual(8)

    // Validate first professor's data
    const firstProfessor = professors[0]
    expect(firstProfessor.professor.props.id).toEqual(3)
    expect(firstProfessor.professor.props.name).toEqual('PEDRO HENRIQUE DE SOUSA MATUMOTO')
    expect(firstProfessor.professor.props.email).toEqual('21.00784-5@maua.br')
    expect(firstProfessor.professor.props.role).toEqual('PROFESSOR')
    expect(firstProfessor.professor.props.RA).toEqual('21.00784-5')

    // Validate the availabilities of the first professor
    const firstProfessorAvailabilities = firstProfessor.availabilities
    expect(firstProfessorAvailabilities.length).toEqual(10)
    firstProfessorAvailabilities.forEach((availability, index) => {
      expect(availability.props.userId).toEqual(3)
      expect(availability.props.startTime).toBeGreaterThanOrEqual(460)
      expect(availability.props.endTime).toBeGreaterThan(
        availability.props.startTime,
      )
      expect(['MON', 'TUE', 'WED', 'THU', 'FRI']).toContain(
        availability.props.weekDay,
      )
      expect(typeof availability.props.isTaken).toBe('boolean')
    })

    // Validate the suitabilities of the first professor
    const firstProfessorSuitabilities = firstProfessor.suitabilities
    expect(firstProfessorSuitabilities.length).toEqual(2)
    expect(firstProfessorSuitabilities[0].codeSubject).toEqual("EFB207")
    expect(firstProfessorSuitabilities[0].subjectName).toEqual("Physics I")
    expect(firstProfessorSuitabilities[1].codeSubject).toEqual("ECM256")
    expect(firstProfessorSuitabilities[1].subjectName).toEqual("Programming Languages II")
    
    // Validate second professor's data
    const secondProfessor = professors[1]
    expect(secondProfessor.professor.props.id).toEqual(5)
    expect(secondProfessor.professor.props.name).toEqual('user5')
    expect(secondProfessor.professor.props.email).toEqual('user5@gmail.com')
    expect(secondProfessor.professor.props.role).toEqual('PROFESSOR')
    expect(secondProfessor.professor.props.RA).toEqual('55.00000-5')

    // Validate the availabilities of the third professor
    const secondProfessorAvailabilities = secondProfessor.availabilities
    expect(secondProfessorAvailabilities.length).toEqual(0)

    // Validate the suitabilities of the third professor
    const secondProfessorSuitabilities = secondProfessor.suitabilities
    expect(secondProfessorSuitabilities.length).toEqual(0)
    
    // Validate third professor's data
    const thirdProfessor = professors[2]
    expect(thirdProfessor.professor.props.id).toEqual(7)
    expect(thirdProfessor.professor.props.name).toEqual('Austin Green')
    expect(thirdProfessor.professor.props.email).toEqual('viraw@mon.cm')
    expect(thirdProfessor.professor.props.role).toEqual('PROFESSOR')
    expect(thirdProfessor.professor.props.RA).toEqual('66.00000-6')

    // Validate the availabilities of the third professor
    const thirdProfessorAvailabilities = thirdProfessor.availabilities
    expect(thirdProfessorAvailabilities.length).toEqual(2)

    // Validate the suitabilities of the third professor
    const thirdProfessorSuitabilities = thirdProfessor.suitabilities
    expect(thirdProfessorSuitabilities.length).toEqual(2)

    // Validate fourth professor's data
    const fourthProfessor = professors[3]
    expect(fourthProfessor.professor.props.id).toEqual(9)
    expect(fourthProfessor.professor.props.name).toEqual('UMUT')
    expect(fourthProfessor.professor.props.email).toEqual('523464@student.fontys.nl')
    expect(fourthProfessor.professor.props.role).toEqual('PROFESSOR')
    expect(fourthProfessor.professor.props.RA).toEqual('00.52346-4')

    // Validate the availabilities of the fourth professor
    const fourthProfessorAvailabilities = fourthProfessor.availabilities
    expect(fourthProfessorAvailabilities.length).toEqual(0)

    // Validate the suitabilities of the fourth professor
    const fourthProfessorSuitabilities = fourthProfessor.suitabilities
    expect(fourthProfessorSuitabilities.length).toEqual(0)

    // Validate fifth professor's data
    const fifthProfessor = professors[4]
    expect(fifthProfessor.professor.props.id).toEqual(11)
    expect(fifthProfessor.professor.props.name).toEqual('ANDREIA CRISTINA GRISOLIO MACHION')
    expect(fifthProfessor.professor.props.email).toEqual('andreia.machion@maua.br')
    expect(fifthProfessor.professor.props.role).toEqual('PROFESSOR')
    expect(fifthProfessor.professor.props.RA).toEqual('11.11111-1')

    // Validate sixth professor's data
    const sixthProfessor = professors[professors.length - 3]
    expect(sixthProfessor.professor.props.id).toEqual(6)
    expect(sixthProfessor.professor.props.name).toEqual('Keith Thompson')
    expect(sixthProfessor.professor.props.email).toEqual('udibon@tisim.sy')
    expect(sixthProfessor.professor.props.role).toEqual('COORDINATOR')
    expect(sixthProfessor.professor.props.RA).toEqual('66.00000-6')

    // Validate the availabilities of the sixth professor
    const sixthProfessorAvailabilities = sixthProfessor.availabilities
    expect(sixthProfessorAvailabilities.length).toEqual(0)

    // Validate the suitabilities of the sixth professor
    const sixthProfessorSuitabilities = sixthProfessor.suitabilities
    expect(sixthProfessorSuitabilities.length).toEqual(0)

    // Validate seventh professor's data
    const seventhProfessor = professors[professors.length - 2]
    expect(seventhProfessor.professor.props.id).toEqual(2)
    expect(seventhProfessor.professor.props.name).toEqual('Pedro Henrique de Sousa Matumoto')
    expect(seventhProfessor.professor.props.email).toEqual('pedromatumoto@gmail.com')
    expect(seventhProfessor.professor.props.role).toEqual('ADMIN')
    expect(seventhProfessor.professor.props.RA).toEqual('22.00000-2')

    // Validate the availabilities of the seventh professor
    const seventhProfessorAvailabilities = seventhProfessor.availabilities
    expect(seventhProfessorAvailabilities.length).toEqual(0)

    // Validate the suitabilities of the seventh professor
    const seventhProfessorSuitabilities = seventhProfessor.suitabilities
    expect(seventhProfessorSuitabilities.length).toEqual(0)

    // Validate eighth professor's data
    const eighthProfessor = professors[professors.length - 1]
    expect(eighthProfessor.professor.props.id).toEqual(4)
    expect(eighthProfessor.professor.props.name).toEqual('FLAVIO MURATA')
    expect(eighthProfessor.professor.props.email).toEqual('21.01192-3@maua.br')
    expect(eighthProfessor.professor.props.role).toEqual('ADMIN')
    expect(eighthProfessor.professor.props.RA).toEqual('21.01192-3')

    // Validate the availabilities of the second professor
    const eighthProfessorAvailabilities = eighthProfessor.availabilities
    expect(eighthProfessorAvailabilities.length).toEqual(8)
    eighthProfessorAvailabilities.forEach((availability, index) => {
      expect(availability.props.userId).toEqual(4)
      expect(availability.props.startTime).toBeGreaterThanOrEqual(460)
      expect(availability.props.endTime).toBeGreaterThan(
        availability.props.startTime,
      )
      expect(['MON', 'TUE', 'WED', 'THU', 'FRI']).toContain(
        availability.props.weekDay,
      )
      expect(typeof availability.props.isTaken).toBe('boolean')
    })

    // Validate the suitabilities of the second professor
    const eighthProfessorSuitabilities = eighthProfessor.suitabilities
    expect(eighthProfessorSuitabilities.length).toEqual(1)
    expect(eighthProfessorSuitabilities[0].codeSubject).toEqual("ECM256")
    expect(eighthProfessorSuitabilities[0].subjectName).toEqual("Programming Languages II")




  })
})
