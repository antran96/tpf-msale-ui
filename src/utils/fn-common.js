const opt = {
  url: '', method: 'get', responseType: null, params: null, data: {}, headers: { 'Content-Type': 'application/json;charset=UTF-8' },
  _search: {}, _sort: '', uuid: false,
  total: 0, list: [], obj: {},
  _isLoading: false, _showMess: false, _message: {}
}

export const objState = JSON.parse(JSON.stringify(opt))
