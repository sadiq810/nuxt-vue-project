export default (context, inject) => {
  inject('buildLaravelPagination', pagination );
  inject('stripTags', stripTags );
}


const pagination = (meta) => {
  if (meta.hasOwnProperty('links'))
    return meta;

  let lastPage = parseInt(meta.total / meta.per_page);
  let page = parseInt(meta.page);

  return {
    "links":{
      "first": "http://pagination?page="+page,
      "last": "http://pagination?page="+lastPage,
      "prev": page > 1,
      "next": page < lastPage
    },
    "meta":{
      "current_page": page,
      "from": meta.from,
      "last_page": lastPage >= 0 ? lastPage : 0,
      "path": "",
      "per_page": meta.per_page,
      "to": page * meta.per_page,
      "total": meta.total
    }
  }
}

const stripTags = (text) => {
  return text ? text.replace(/(<([^>]+)>)/gi, "") : text;
};

const convertObjectToQueryString = (query) => {
  return Object.keys(query).map((key) => {
    if (typeof query[key] == 'object' && query[key].length > 0) {
      let qs = '';
      query[key].forEach((v, k) => {
        if (k > 0)
          qs += '&';

        qs += encodeURIComponent(key) + '[]=' + encodeURIComponent(v);
      })

      return qs;
    }// end if() ....//

    return encodeURIComponent(key) + '=' + encodeURIComponent(query[key])
  }).join('&');
}
