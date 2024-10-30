import { describe, it, expect } from 'vitest'
import { ScheduleRepositoryMock } from '../../../../src/shared/infra/repositories/schedule_repository_mock'
import { UpdateAvailabilitiesViewmodel } from '../../../../src/modules/update_availabilities/app/update_availabilities_viewmodel'

describe('Assert UpdateAvailabilitiesViewmodel is correct', () => {
  it('Should correctly transform user data to viewmodel', async () => {
    const repo = new ScheduleRepositoryMock()
    const updateAvailabilitiesViewmodel =
      new UpdateAvailabilitiesViewmodel().toJSON()

    expect(updateAvailabilitiesViewmodel).toEqual({
      message: 'availabilities updated',
    })
  })
})
