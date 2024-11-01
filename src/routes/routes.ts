import express, { Request, Response } from 'express'
import { HttpRequest } from '../shared/helpers/external_interfaces/http_models'
import multer from 'multer'
import { Environments } from '../shared/environments'
import { UpdateAvailabilitiesPresenter } from '../modules/update_availabilities/app/update_availabilities_presenter'
import { GetRoleByEmailPresenter } from '../modules/get_role_by_email/app/get_role_by_email_presenter'
import { GetAllProfessorsPresenter } from '../modules/get_all_professors/app/get_all_professors_presenter'
import { UploadCSVPresenter } from '../modules/upload_csv/app/upload_csv_presenter'
import { GetAllSubjectsPresenter } from '../modules/get_all_subjects/app/get_all_subjects_presenter'
import { GetAllSchedulesPresenter } from '../modules/get_all_schedules/app/get_all_schedules_presenter'
import { GetSuitabilitiesByProfessorPresenter } from '../modules/get_suitabilities_by_professor/app/get_suitabilities_by_professor_presenter'
import { GetProfessorsByClassPresenter } from '../modules/get_professors_by_class/app/get_professors_by_class_presenter' // Import adicionado
import { UpdateSuitabilitiesPresenter } from '../modules/update_suitabilities/app/update_suitabilities_presenter'

const upload = multer()
const routes = express.Router()

const repo = Environments.getScheduleRepo()

routes.post(
  '/upload_csv',
  upload.single('file'),
  async (req: Request, res: Response) => {
    const httpRequest: HttpRequest = new HttpRequest(req.body, {}, {}, req.file)
    const response = await UploadCSVPresenter(httpRequest, repo)
    res.status(response.statusCode).json(response.body)
  },
)

routes.get('/get_all_subjects', async (req: Request, res: Response) => {
  const httpRequest: HttpRequest = new HttpRequest(req.body, {}, {}, req.file)
  const response = await GetAllSubjectsPresenter(httpRequest, repo)
  res.status(response.statusCode).json(response.body)
})

routes.put('/update_availabilities', async (req: Request, res: Response) => {
  const httpRequest: HttpRequest = new HttpRequest(req.body, {}, {}, undefined)
  const response = await UpdateAvailabilitiesPresenter(httpRequest, repo)
  res.status(response.statusCode).json(response.body)
})

routes.put('/update_suitabilities', async (req: Request, res: Response) => {
  const httpRequest: HttpRequest = new HttpRequest(req.body, {}, {}, req.file)
  const response = await UpdateSuitabilitiesPresenter(httpRequest, repo)
  res.status(response.statusCode).json(response.body)
})

routes.get('/get_all_professors', async (req: Request, res: Response) => {
  const httpRequest: HttpRequest = new HttpRequest(req.body, {}, {}, req.file)
  const response = await GetAllProfessorsPresenter(httpRequest, repo)
  res.status(response.statusCode).json(response.body)
})

routes.get('/get_all_schedules', async (req: Request, res: Response) => {
  const httpRequest: HttpRequest = new HttpRequest(req.body, {}, {}, req.file)
  const response = await GetAllSchedulesPresenter(httpRequest, repo)
  res.status(response.statusCode).json(response.body)
})

routes.get('/get_role_by_email', async (req: Request, res: Response) => {
  const { email } = req.query

  const httpRequest: HttpRequest = new HttpRequest({ email }, {}, {}, req.file)
  const response = await GetRoleByEmailPresenter(httpRequest, repo)
  res.status(response.statusCode).json(response.body)
})

routes.get(
  '/get_suitabilities_by_professor',
  async (req: Request, res: Response) => {
    const httpRequest: HttpRequest = new HttpRequest(req.body, {}, {}, req.file)
    const response = await GetSuitabilitiesByProfessorPresenter(
      httpRequest,
      repo,
    )
    res.status(response.statusCode).json(response.body)
  },
)
routes.get('/get_professors_by_class', async (req: Request, res: Response) => {
  const { classId } = req.query

  const httpRequest: HttpRequest = new HttpRequest({ classId }, {}, {}, req.file)
  const response = await GetProfessorsByClassPresenter(httpRequest, repo)
  res.status(response.statusCode).json(response.body)
})
export default routes
