import { describe, it, expect } from 'vitest'

import { GetAllProfessorsUsecase } from '../../../../src/modules/get_all_professors/app/get_all_professors_usecase'
import { ScheduleRepositoryMock } from '../../../../src/shared/infra/repositories/schedule_repository_mock'

describe('Assert GetAllProfessorsUsecase is correct at all', () => {
  it('Should activate usecase correctly', async () => {
    const repo = new ScheduleRepositoryMock()
    const usecase = new GetAllProfessorsUsecase(repo)

    const professors = await usecase.execute()
    
    // Validate that three professors are returned
    expect(professors.length).toEqual(3)
    
    // Validate first professor's data
    const firstProfessor = professors[0]
    expect(firstProfessor.professor.props.id).toEqual(3)
    expect(firstProfessor.professor.props.name).toEqual("user3")
    expect(firstProfessor.professor.props.email).toEqual("user3@gmail.com")
    expect(firstProfessor.professor.props.role).toEqual("PROFESSOR")
    expect(firstProfessor.professor.props.RA).toEqual("33.00000-3")
    expect(firstProfessor.professor.props.password).toEqual("Password3@")
    
    // Validate the availabilities of the first professor
    const firstProfessorAvailabilities = firstProfessor.availabilities
    expect(firstProfessorAvailabilities.length).toEqual(10)
    firstProfessorAvailabilities.forEach((availability, index) => {
      expect(availability.props.userId).toEqual(3)
      expect(availability.props.startTime).toBeGreaterThanOrEqual(460)
      expect(availability.props.endTime).toBeGreaterThan(availability.props.startTime)
      expect(["MON", "TUE", "WED", "THU", "FRI"]).toContain(availability.props.weekDay)
      expect(typeof availability.props.isTaken).toBe('boolean')
    })
    
    // Validate the suitabilities of the first professor
    const firstProfessorSuitabilities = firstProfessor.suitabilities
    expect(firstProfessorSuitabilities.length).toEqual(1)
    firstProfessorSuitabilities.forEach((suitability) => {
      expect(suitability.codeSubject).toEqual("EFB207")
      expect(suitability.subjectName).toEqual("Physics I")
    })
    
    // Validate second professor's data
    const secondProfessor = professors[1]
    expect(secondProfessor.professor.props.id).toEqual(4)
    expect(secondProfessor.professor.props.name).toEqual("user4")
    expect(secondProfessor.professor.props.email).toEqual("user4@gmail.com")
    expect(secondProfessor.professor.props.role).toEqual("PROFESSOR")
    expect(secondProfessor.professor.props.RA).toEqual("44.00000-4")
    expect(secondProfessor.professor.props.password).toEqual("Password4@")
    
    // Validate the availabilities of the second professor
    const secondProfessorAvailabilities = secondProfessor.availabilities
    expect(secondProfessorAvailabilities.length).toEqual(8)
    secondProfessorAvailabilities.forEach((availability, index) => {
      expect(availability.props.userId).toEqual(4)
      expect(availability.props.startTime).toBeGreaterThanOrEqual(460)
      expect(availability.props.endTime).toBeGreaterThan(availability.props.startTime)
      expect(["MON", "TUE", "WED", "THU", "FRI"]).toContain(availability.props.weekDay)
      expect(typeof availability.props.isTaken).toBe('boolean')
    })
    
    // Validate the suitabilities of the second professor
    const secondProfessorSuitabilities = secondProfessor.suitabilities
    expect(secondProfessorSuitabilities.length).toEqual(2)
    secondProfessorSuitabilities.forEach((suitability) => {
      expect(suitability.codeSubject).toEqual("ECM256")
      expect(suitability.subjectName).toEqual("Programming Languages II")
    })
    
    // Validate third professor's data
    const thirdProfessor = professors[2]
    expect(thirdProfessor.professor.props.id).toEqual(5)
    expect(thirdProfessor.professor.props.name).toEqual("user5")
    expect(thirdProfessor.professor.props.email).toEqual("user5@gmail.com")
    expect(thirdProfessor.professor.props.role).toEqual("PROFESSOR")
    expect(thirdProfessor.professor.props.RA).toEqual("55.00000-5")
    expect(thirdProfessor.professor.props.password).toEqual("Password5@")
    
    // Validate the availabilities of the third professor
    const thirdProfessorAvailabilities = thirdProfessor.availabilities
    expect(thirdProfessorAvailabilities.length).toEqual(0)
    
    // Validate the suitabilities of the third professor
    const thirdProfessorSuitabilities = thirdProfessor.suitabilities
    expect(thirdProfessorSuitabilities.length).toEqual(0)
  })
})
