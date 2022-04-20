const opt = {
  url: '', method: 'get', responseType: null, params: null, data: {}, headers: { 'Content-Type': 'application/json;charset=UTF-8' },
  _search: {}, _sort: '', _select: '', _selected: [], uuid: false,
  total: 0, list: [], obj: {},
  _isLoading: false, _isForm: false, _showMess: false, _message: {}, _stt: ''
}

export const objState = JSON.parse(JSON.stringify(opt))
