export const buildParams = fields => {
    let params = new FormData()
    for (let field in fields) {
        params.append(field, fields[field])
    }

    return params
}