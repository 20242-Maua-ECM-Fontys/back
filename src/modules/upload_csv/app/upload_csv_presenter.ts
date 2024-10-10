import { UploadCSVController } from './upload_csv_controller'
import { UploadCSVUsecase } from './upload_csv_usecase'
import { HttpResponse } from '../../../shared/helpers/external_interfaces/http_models'
import { UserRepositoryMock } from '../../../shared/infra/repositories/user_repository_mock'
import { RoomRepositoryMock } from '../../../shared/infra/repositories/room_repository_mock'
import { ClassRepositoryMock } from '../../../shared/infra/repositories/class_repository_mock'
import { SubjectRepositoryMock } from '../../../shared/infra/repositories/subject_repository_mock'
import { IRequest } from '../../../shared/helpers/external_interfaces/external_interface'

const userRepo = new UserRepositoryMock()
const roomRepo = new RoomRepositoryMock()
const classRepo = new ClassRepositoryMock()
const subjectRepo = new SubjectRepositoryMock()
const usecase = new UploadCSVUsecase(userRepo, roomRepo, subjectRepo, classRepo)
const controller = new UploadCSVController(usecase)

export async function UploadCSVPresenter(event: IRequest) {
  const response = await controller.execute(event)
  const httpResponse = new HttpResponse(response?.statusCode, response?.body)

  return httpResponse
}
