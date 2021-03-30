/**
 *  Mutations.
 */
export default {

  SET_DASHBOARD_BOOK_LIST(store, data) {
    store.dashboard.books = data.data;
  },

  SET_DASHBOARD_FATAWA_LIST(store, data) {
    store.dashboard.fatawa = data;
  },

  SET_FOOTER_DESCRIPTION(store, data) {
    store.settings.footerdescription = data;
  },

  SET_SOCIAL_LIST(store, data) {
    store.settings.social = data;
  },

  SET_PAGES_LIST(store, data) {
    store.settings.pages = data;
  },

  SET_DASHBOARD_GALLERY_LIST(store, data) {
    store.dashboard.gallery = data;
  },

  SET_DASHBOARD_VIDEOS_LIST(store, data) {
    store.dashboard.videos = data;
  },

  SET_DASHBOARD_AUDIOS_LIST(store, data) {
    store.dashboard.audios = data;
  },

  SET_BOOK_LIST(store, {data, page} = {}) {
    if (store.books.length == 0 || page == 1)
      store.books = data.data;
    else {
     store.books.data = [...store.books.data, ...data.data.data];
     store.books.meta = data.data.meta;
    }
  },

  SET_GALLERY_LIST(store, data) {
    store.gallery = data.data;
  },

  SET_SOUNDS_LIST(store, data) {
    store.audios = data.data;
  },

  SET_MINI_CLIP_LIST(store, data) {
    store.miniclips = data.data;
  },

  SET_VIDEOS_LIST(store, data) {
    store.videos = data.data;
  },

  SET_ALL_BOOK_LIST(store, data) {
    store.bookList = data.data;
  },

  SET_ALL_FATAWA_LIST(store, data) {
    store.fatawa_list = data;
    let f = [];
    data.forEach(ft => {
      f.push({id: ft.id, title: ft.title, parent: ft.parent});
      f = [...f, ...ft.childs];
    });

    store.flatten_fatawa_list = f;
  },

  SET_ALL_SOUND_CATEGORY_LIST(store, data) {
    store.sound_category_list = data;
  },

  SET_SELECTED_FATAWA(store, fatawa) {
    store.selectedFatawa = fatawa;
  },

  SET_SELECTED_BIOGRAPHY(store, id) {
    store.selectedBiography = id;
  },

  SET_SELECTED_SOUND_CATEGORY(store, id) {
    store.selectedSoundCategory = id;
  },

  SET_SELECTED_MINI_CLIP_CATEGORY(store, id) {
    store.SelectedMiniClip = id;
  },

  SET_FATAWAS_LIST(store, data) {
    store.fatawaPaginatedList = data;
  },

  SET_POST_CATEGORIES(store, data) {
    store.postCategories = data.data;
  },

  SET_POST_CATEGORY_SELECTED(store, category) {
    store.selectedPostCategory = category;
  },

  SET_POSTS_LIST(store, data) {
    store.posts = data;
  },

  SET_ABSTRACTS_LIST(store, data) {
    store.abstracts = data;
  },

  SET_ABSTRACT_CATEGORY_SELECTED(store, category) {
    store.selectedAbstractCategory = category;
  },

  SET_SEARCH_KEYWORD(store, str) {
    store.searchStr = str;
  },

  SET_IS_SEARCHING(store, v) {
    store.isSearching = v;
  },

  SET_SEARCH_RESULT(state, {data, meta}) {
    state.searchResult = data;
    state.searchMeta = meta;
  },

  SET_ADVANCE_SEARCH_BOOK(state, id) {
    if (state.advanceSearchSelectedBooks.includes(id))
      state.advanceSearchSelectedBooks = state.advanceSearchSelectedBooks.filter(ids => ids != id);
    else
      state.advanceSearchSelectedBooks = [...state.advanceSearchSelectedBooks, id];
  },

  SET_ADVANCE_SEARCH_FILTER(state, item) {
    if (state.advanceSearchFilter.includes(item))
      state.advanceSearchFilter = state.advanceSearchFilter.filter(title => title != item);
    else
      state.advanceSearchFilter = [...state.advanceSearchFilter, item];

    if (state.advanceSearchFilter.length == 0)
      state.selectedTab = "book";
    else if (!state.advanceSearchFilter.includes(state.selectedTab))
      state.selectedTab = state.advanceSearchFilter[0];
  },

  SET_SELECTED_TAB(state, tab) {
    state.selectedTab = tab;
  },

  SET_SEARCH_TYPE(state, type) {
    state.searchType = type;
  },

  SET_BOOK_FOR_MODAL(state, book) {
    state.bookForModalView = book;
  },

  SET_BIOGRAPHY_LIST(state, biographies) {
    state.biography_list = biographies;
  },

  SET_PAGINATED_BIOGRAPHY(state, data) {
    state.biographyPaginatedList = data;
  }
}//..... end of Mutations Object() .....//
