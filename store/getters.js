/**
 *  Getters
 */
const getters = {

  getSettings(state) {
    return state.settings;
  },

  getDashboardData(state) {
    return state.dashboard;
  },

  getBooks(state) {
    return state.books;
  },

  getBookList(state) {
    return state.bookList;
  },

  getCards(state) {
    return state.gallery;
  },

  getVideos(state) {
    return state.videos;
  },

  getSounds(state) {
    return state.audios;
  },

  getMiniclips(state) {
    return state.miniclips;
  },

  getAllFatawaList(store) {
    return store.fatawa_list;
  },

  getAllBiographyList(store) {
    return store.biography_list;
  },

  getSoundCategory(store) {
    return store.sound_category_list;
  },
  getSelectedCategory(state){
    return state.selectedSoundCategory;
  },

  getSelectedMiniClip(state){
    return state.SelectedMiniClip;
  },

  getSelectedFatawa(state) {
    return state.selectedFatawa;
  },

  getSelectedBiography(state) {
    return state.selectedBiography;
  },

  getPaginatedFatawas(state) {
    return state.fatawaPaginatedList;
  },

  getPostCategoriesList(state) {
    return state.postCategories;
  },

  getPostSelectedCategory(state) {
    return state.selectedPostCategory;
  },

  getAbstractSelectedCategory(state) {
    return state.selectedAbstractCategory;
  },

  getPosts(state) {
    return state.posts;
  },

  getAbstracts(state) {
    return state.abstracts;
  },

  getSearchStr(state) {
    return state.searchStr;
  },

  getSearchResult(state) {
    return state.searchResult;
  },

  getSearchMeta(state) {
    return state.searchMeta;
  },

  getAdvanceSearchFilter(state) {
    return state.advanceSearchFilter;
  },

  getAdvanceSearchBooks(state) {
    return state.advanceSearchSelectedBooks;
  },

  getSelectedTab(state) {
    return state.selectedTab;
  },

  isSearching(state) {
    return state.isSearching;
  },

  getSearchType (state) {
    return state.searchType;
  },

  getBookForModal(state) {
    return state.bookForModalView;
  },

  getSiteDirection(state) {
    let direction = 1;
    state.locales.some(lang => (direction = lang.direction, lang.key == state.locale));
    return direction == 0 ? 'ltr' : 'rtl'
  },

  getBreadcrumbs(state) {
    const items = state.breadcrumbs.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@id': item.url,
        name: item.text,
      },
    }));
    return {
      '@context': 'http://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: items,
    };
  },

  getPaginatedBiography(state) {
    return state.biographyPaginatedList;
  },
};//.... end of Getters Object ....//


export default getters;
