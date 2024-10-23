import {
  MissingParameters,
  WrongTypeParameters,
} from '../../../shared/helpers/errors/controller_errors'
import { IRequest } from '../../../shared/helpers/external_interfaces/external_interface'
import { UploadCSVUsecase } from './get_all_professors_usecase'
import {
  BadRequest,
  OK,
  InternalServerError,
} from '../../../shared/helpers/external_interfaces/http_codes'
import { EntityError } from '../../../shared/helpers/errors/domain_errors'
import { Express } from 'express'
import {
  InvalidCSVRowType,
  InvalidCSVFormat,
} from '../../../shared/helpers/errors/usecase_errors'

export class UploadCSVController {
  constructor(private usecase: UploadCSVUsecase) {}

  async execute(request: IRequest) {
    try {
      if (request.data.file === undefined) {
        throw new MissingParameters('data')
      }
      let csvBuffer: Buffer | undefined
      try {
        csvBuffer = (request.data.file as Express.Multer.File).buffer
      } catch (error: unknown) {
        throw new WrongTypeParameters('data', 'csv', typeof request.data.file)
      }
      await this.usecase.execute(csvBuffer)

      const viewmodel = { message: 'the csv was uploaded successfully' }

      const response = new OK(viewmodel)

      return response
    } catch (error: unknown) {
      if (error instanceof MissingParameters) {
        return new BadRequest(error.message)
      }
      if (error instanceof WrongTypeParameters) {
        return new BadRequest(error.message)
      }
      if (error instanceof EntityError) {
        return new BadRequest(error.message)
      }
      if (error instanceof InvalidCSVRowType) {
        return new BadRequest(error.message)
      }
      if (error instanceof InvalidCSVFormat) {
        return new BadRequest(error.message)
      }
      if (error instanceof Error) {
        return new InternalServerError(error.message)
      }
    }
  }
}
