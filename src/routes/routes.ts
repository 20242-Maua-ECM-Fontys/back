import express, { Request, Response } from 'express'
import { HttpRequest } from '../shared/helpers/external_interfaces/http_models'
import multer from 'multer'
import { Environments } from '../shared/environments'

import { GetAllProfessorsPresenter } from '../modules/get_all_professors/app/get_all_professors_presenter'
import { UploadCSVPresenter } from '../modules/upload_csv/app/upload_csv_presenter'
import { GetAllSubjectsPresenter } from '../modules/get_all_subjects/app/get_all_subjects_presenter'
import { GetAllSchedulesPresenter } from '../modules/get_all_schedules/app/get_all_schedules_presenter'

const upload = multer()
const routes = express.Router()

const repo = Environments.getScheduleRepo()

routes.post(
  '/upload_csv',
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

routes.get(
  '/get_all_subjects',
  async (req: Request, res: Response) => {
    const httpRequest: HttpRequest = new HttpRequest(
      req.body,
      {},
      {},
      req.file
    )
    const response = await GetAllSubjectsPresenter(httpRequest, repo)
    res.status(response.statusCode).json(response.body)
  },
)

routes.get(
  '/get_all_professors',
  async (req: Request, res: Response) => {
    const httpRequest: HttpRequest = new HttpRequest(
      req.body,
      {},
      {},
      req.file
    )
    const response = await GetAllProfessorsPresenter(httpRequest, repo)
    res.status(response.statusCode).json(response.body)
  },
)

routes.get(
  '/get_all_schedules',
  async (req: Request, res: Response) => {
    const httpRequest: HttpRequest = new HttpRequest(
      req.body,
      {},
      {},
      req.file
    )
    const response = await GetAllSchedulesPresenter(httpRequest, repo)
    res.status(response.statusCode).json(response.body)
  },
)


export default routes
