

export interface IJsonResult {
    data: Array<Object>
}


export class JsonResult {

    constructor(public result: IJsonResult) {

    }

    get data() {
        return this.result.data;
    }
}


