
export class EventBus
{
    constructor()
    {
        this._listListener = /** @type {EventListenerEntry[]} */ []
    }

    /**
     * @param {EventPriority} raw
     * @return {EventPriority}
     * */
    _priorityOf(raw)
    {
        switch (raw)
        {
            case 'VeryLow':
            case 'Low':
            case 'Normal':
            case 'High':
            case 'VeryHigh':
                return raw
            default:
                // noinspection JSValidateTypes
                return 'Normal'
        }
    }
    /**
     * @param {EventPriority} priority
     * @return {number}
     * */
    _priorityNumberOf(priority)
    {
        switch (priority)
        {
            case 'VeryLow': return -2
            case 'Low': return -1
            case 'Normal': return 0
            case 'High': return 1
            case 'VeryHigh': return 2
            default: return 0
        }
    }

    /**
     * @param {function} listenerFunction
     * @param {EventPriority} priority
     * */
    addEventListener(listenerFunction, priority)
    {
        priority = this._priorityOf(priority)
        const listListener = this._listListener
        for(let step = 0; step < listListener.length; step++)
        {
            const listenerEntry = listListener[step]
            if(listenerEntry.listenerFunction === listenerFunction)
                return
        }

        listListener.push({
            listenerFunction,
            priority,
        })
    }

    /**
     * @param {function} listenerFunction
     * */
    removeEventListener(listenerFunction)
    {
        const listListener = this._listListener
        for(let step = 0; step < listListener.length; step++)
        {
            const listenerEntry = listListener[step]
            if(listenerEntry.listenerFunction === listenerFunction)
            {
                listListener.splice(step, 1)
                return
            }
        }
    }

    /**
     * @param {any} eventData
     * @return {EventEntry}
     * */
    trigger(eventData)
    {
        const eventEntry = {
            data: eventData,
            isCanceled: false,
        }

        const listListener = [...this._listListener]
        listListener.sort((le1, le2) => {
            const p1 = this._priorityNumberOf(le1?.priority)
            const p2 = this._priorityNumberOf(le2?.priority)
            return p2 - p1
        })

        for(const listenerEntry of listListener)
        {
            listenerEntry.listenerFunction(eventEntry)

            if(eventEntry.isCanceled)
                break
        }

        return eventEntry
    }
}
