import { dayProps } from './day'
import { EntityError } from '../../helpers/errors/domain_errors'

export type timeslotProps = {
    days: dayProps[]
}

export class Timeslot {
    constructor(public props: timeslotProps) {

    }

    get dayCount() {
        return this.props.days.length
    }
}
