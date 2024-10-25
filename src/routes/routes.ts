import express, { Request, Response } from 'express'
import { HttpRequest } from '../shared/helpers/external_interfaces/http_models'
import multer from 'multer'
import { UploadCSVPresenter } from '../modules/upload_csv/app/upload_csv_presenter'
import { Environments } from '../shared/environments'
import { UpdateAvailabilitiesPresenter } from '../modules/update_availabilities/app/update_availabilities_presenter'

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

routes.put(
  '/update_availabilities',
  async (req: Request, res: Response) => {
    const httpRequest: HttpRequest = new HttpRequest(
      req.body,
      {},
      {},
      undefined
    )
    const response = await UpdateAvailabilitiesPresenter(httpRequest, repo)
    res.status(response.statusCode).json(response.body)
  },
)


export default routes
