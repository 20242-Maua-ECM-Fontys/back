import express, { Request, Response } from 'express'
import { HttpRequest } from '../shared/helpers/external_interfaces/http_models'
import multer from 'multer'
import { UploadCSVPresenter } from '../modules/upload_csv/app/upload_csv_presenter'

const upload = multer()
const routes = express.Router()

routes.post(
  '/upload-csv',
  upload.single('file'),
  async (req: Request, res: Response) => {
    const httpRequest: HttpRequest = {
      body: req.body,
      file: req.file!,
      headers: {},
      query_params: {},
      _data: {},
      data: {},
    } as unknown as HttpRequest
    const response = await UploadCSVPresenter(httpRequest)
    res.status(response.statusCode).json(response.body)
  },
)

export default routes
