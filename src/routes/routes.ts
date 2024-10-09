import express, { Request, Response } from 'express'
import { HttpRequest } from '../shared/helpers/external_interfaces/http_models'
import multer from 'multer'
import { UserRepositoryMock } from '../shared/infra/repositories/user_repository_mock'
import { RoomRepositoryMock } from '../shared/infra/repositories/room_repository_mock'
import { SubjectRepositoryMock } from '../shared/infra/repositories/subject_repository_mock'
import { ClassRepositoryMock } from '../shared/infra/repositories/class_repository_mock'

const upload = multer()
const routes = express.Router()

// repositories
const userRepo = new UserRepositoryMock()
const roomRepo = new RoomRepositoryMock()
const classRepo = new ClassRepositoryMock()
const subjectRepo = new SubjectRepositoryMock()

routes.post(
  '/upload-csv',
  upload.single('file'),
  async (req: Request, res: Response) => {
    const response = await UploadCSVPresenter(
      req,
      userRepo,
      roomRepo,
      classRepo,
      subjectRepo,
    )
    res.status(response.statusCode).json(response.body)
  },
)

export default routes
