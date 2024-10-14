import express, { Request, Response } from 'express'
import { HttpRequest } from '../shared/helpers/external_interfaces/http_models'
import multer from 'multer'
import { UploadCSVPresenter } from '../modules/upload_csv/app/upload_csv_presenter'
import { UserRepositoryMock } from '../shared/infra/repositories/user_repository_mock'

const upload = multer()
const routes = express.Router()

routes.post(
  '/upload-csv',
  upload.single('file'),
  async (req: Request, res: Response) => {
    const httpRequest: HttpRequest = new HttpRequest(
      req.body,
      {},
      {},
      req.file
    )
    const response = await UploadCSVPresenter(httpRequest)
    res.status(response.statusCode).json(response.body)
  },
)


export default routes
