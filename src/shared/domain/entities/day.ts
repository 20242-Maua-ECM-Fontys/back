import { EntityError } from '../../helpers/errors/domain_errors'

export type dayProps = {
    NotEarlier: string,
    NotLater: string
}

export class Day {
    constructor(public props: dayProps) {
        if (!Day.validateEarlier(props.NotEarlier)) {
            throw new EntityError('props.NotEarlier')
        }
        
        if (!Day.validateLater(props.NotLater)) {
            throw new EntityError('props.NotEarlier')
        }
        
        if (!Day.validateTimes(props.NotEarlier, props.NotLater)) {
            throw new EntityError('earlier time is later then later time.')
        }
        this.props.NotEarlier = props.NotEarlier
        this.props.NotLater = props.NotLater
    }

    get NotEarlier() {
        return this.props.NotEarlier
    }

    set setNotEarlier(notEarlier: string) {
        if (!Day.validateEarlier(notEarlier)) {
            throw new EntityError('props.NotEarlier')
        }
        this.props.NotEarlier = notEarlier
    }

    get NotLater() {
        return this.props.NotLater
    }

    set setNotLater(notLater: string) {
        if (!Day.validateLater(notLater)) {
            throw new EntityError('props.NotLater')
        }
        this.props.NotLater = notLater
    }

    //Expecting time in format of HH:mm:ss.
    static validateEarlier(notEarlier: string): boolean {
        return notEarlier != null
    }
    static validateLater(notLater: string): boolean {
        return notLater != null
    }
    static validateTimes(notEarlier: string, notLater: string): boolean {
        return notLater > notEarlier
    }
}
