import express, { Request, Response } from 'express'
import { HttpRequest } from '../shared/helpers/external_interfaces/http_models'
import multer from 'multer'
import { UploadCSVPresenter } from '../modules/upload_csv/app/upload_csv_presenter'
import { Environments } from '../shared/environments'

const upload = multer()
const routes = express.Router()

const repo = Environments.getScheduleRepo()

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
    const response = await UploadCSVPresenter(httpRequest, repo)
    res.status(response.statusCode).json(response.body)
  },
)


export default routes
