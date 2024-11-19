import { describe, it, expect } from 'vitest'
import { ScheduleRepositoryMock } from '../../../../src/shared/infra/repositories/schedule_repository_mock'
import { UpdateAvailabilitiesFullfilledViewmodel } from '../../../../src/modules/update_availabilities_fullfilled/app/update_availabilities_fullfilled_viewmodel'

describe('Assert UpdateAvailabilitiesFullfilledViewmodel is correct', () => {
  it('Should correctly transform user data to viewmodel', async () => {

    const repo = new ScheduleRepositoryMock()
    const updateAvailabilitiesFullfilledViewmodel = new UpdateAvailabilitiesFullfilledViewmodel().toJSON()

    expect(updateAvailabilitiesFullfilledViewmodel).toEqual({
      'message': 'availabilities fullfilled updated',
    })
  })
})