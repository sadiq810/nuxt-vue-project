import actions from '~/store/actions';
import mutations from '~/store/mutations';
import getters from '~/store/getters';

/**
 * State of the store.
 */
const state = () => ({
  dashboard: {
    books: [],
    fatawa: [],
    cards: [],
    videos: [],
    audios: [],
  },
  settings:{
    footerdescription: [],
    pages:[],
    social:[]
  }, //.....get website setting
  books: [],//..... paginated book list for book page.
  bookList: [], //..... all books list (id, title) for book detail page.
  gallery: [],//..... paginated gallery list for card page.
  videos: [],//..... paginated videos list for videos page.
  audios: [],//..... paginated audios list for videos page.
  miniclips: [],//..... paginated miniclips list for miniclip page.
  sound_category_list: [],//..... sound category for audio page.
  fatawa_list: [], //..... fatawa list for main fatawa page, for listing only (id, title)
  flatten_fatawa_list: [],//flatten fatawa list for paging and so on
  selectedFatawa: {id: 0, parent: 0, title: ''}, //..... used in fatawa page, for selecting category.
  selectedSoundCategory: undefined, //..... used in sounds page, for selecting Sound category.
  SelectedMiniClip: undefined, //..... used in miniclip page, for selecting miniclip category.
  fatawaPaginatedList: {}, //..... paginated fatawa list for main fatawa page.
  playlistArray:[],
  postCategories: [],//.... all categories list for post page
  selectedPostCategory: undefined, //..... selected category.
  posts: {}, //..... paginated posts.
  abstracts: {}, //..... paginated abstracts
  selectedAbstractCategory: undefined, //.... selected category in abstract page.

  searchStr: '', //.... global search
  isSearching: false, //..... indicate that search request forwarded to server and not fulfilled yet.
  searchResult: [],
  searchMeta: [],
  advanceSearchFilter: ['book'],
  advanceSearchSelectedBooks: [],
  selectedTab: 'book',
  searchType: 'exact',
  bookForModalView: {},//.... book for modal view will be held here.
  biography_list: [],
  biographyPaginatedList: [],
  selectedBiography: undefined,

  locales: [{ id: 1, key: 'ar', title: '?????????????? Arabic', direction: 1 }],
  locale: 'ar',
  breadcrumbs: [
    {
      url: 'http://ibn-mahmoud.com',
      text: '?????????? ?????????????? ???? ?????? ???? ?????????? ????????????',
    },
    {
      url: 'http://ibn-mahmoud.com/abstracts',
      text: '?????????? ???? ??????????',
    },
    {
      url: 'http://ibn-mahmoud.com/books',
      text: '?????????????? (??????????)',
    },
    {
      url: 'http://ibn-mahmoud.com/cards',
      text: '????????????',
    },
    {
      url: 'http://ibn-mahmoud.com/fatawa',
      text: '??????????????',
    },
    {
      url: 'http://ibn-mahmoud.com/contact-us',
      text: '???????? ??????',
    },
    {
      url: 'http://ibn-mahmoud.com/search',
      text: '??????',
    },
    {
      url: 'http://ibn-mahmoud.com/mini-clip',
      text: '?????????? ???????????????? ??????????????',
    },
    {
      url: 'http://ibn-mahmoud.com/posts',
      text: '????????????????',
    },
    {
      url: 'http://ibn-mahmoud.com/sounds',
      text: '?????????????????? ??????????????',
    },
    {
      url: 'http://ibn-mahmoud.com/videos',
      text: '?????????? ????????????????',
    },
    {
      url: 'http://ibn-mahmoud.com/pages/13',
      text: '?????????? ????????????????',
    },
    {
      url: 'http://ibn-mahmoud.com/pages/12',
      text: '?????????????? ??????????????',
    },
  ]
});//..... end of state() .....//

export {state, getters, mutations, actions};


