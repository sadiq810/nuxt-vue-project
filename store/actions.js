export default {

  async nuxtServerInit({commit}, {$axios}) {
    //
  },

  async getBooksForDashboard({commit}) {
    try {
      let {data} = await this.$axios.get(`/books`);
      commit('SET_DASHBOARD_BOOK_LIST', data);
    } catch (error) {
      console.log('Error: Error occurred while fetching books for dashboard.', error)
    }//.... end of try-catch() .....//
  },

  async getOtherContentsForDashboard({commit}) {
    try {
      let {data} = await this.$axios.get(`/dashboard-contents`);
      commit('SET_DASHBOARD_FATAWA_LIST', data.fatawa);
      commit('SET_DASHBOARD_GALLERY_LIST', data.gallery);
      commit('SET_DASHBOARD_VIDEOS_LIST', data.videos);
      commit('SET_DASHBOARD_AUDIOS_LIST', data.audios);
    } catch (error) {
      console.log('Error: Error occurred while fetching books for dashboard.', error)
    }//.... end of try-catch() .....//
  },

  async fetchBooks({commit}, {page = 1, sort = ''} = {}) {
    try {
      let data = await this.$axios.get(`/books?page=${page}&sort=${sort}`);
      commit('SET_BOOK_LIST', {data, page});
    } catch (error) {
      console.log('Error: Error occurred while fetching books for book page.', error)
    }//.... end of try-catch() .....//
  },

  async fetchAllBooks({commit}) {
    try {
      let {data} = await this.$axios.get(`/list-books`);
      commit('SET_ALL_BOOK_LIST', data);
    } catch (error) {
      console.log('Error: Error occurred while fetching books for book detail page.', error)
    }//.... end of try-catch() .....//
  },

  async fetchGallery({commit}, {page = 1, sort = ''} = {}) {
    try {
      let data = await this.$axios.get(`/gallery?page=${page}&sort=${sort}`);
      commit('SET_GALLERY_LIST', data);
    } catch (error) {
      console.log('Error: Error occurred while fetching gallery for card page.', error)
    }//.... end of try-catch() .....//
  },

  async fetchVideos({commit}, {page = 1, sort = '', type = 'long'} = {}) {
    try {
      let data = await this.$axios.get(`/videos?page=${page}&sort=${sort}&type=${type}`);
      commit('SET_VIDEOS_LIST', data);
    } catch (error) {
      console.log('Error: Error occurred while fetching videos for card page.', error)
    }//.... end of try-catch() .....//
  },
  async fetchAllFatawa({commit}) {
    try {
      let {data} = await this.$axios.get(`/all-fatawas`);
      commit('SET_ALL_FATAWA_LIST', data.data);
    } catch (error) {
      console.log('Error: Error occurred while fetching fatawas list for fatawa page.', error)
    }//.... end of try-catch() .....//
  },
  async fetchAllSoundCategory({commit}) {
    try {
      let {data} = await this.$axios.get(`/sounds-category`);
      commit('SET_ALL_SOUND_CATEGORY_LIST', data);
    } catch (error) {
      console.log('Error: Error occurred while fetching sound category list for sound page.', error)
    }//.... end of try-catch() .....//
  },

  async fetchFatawas({commit}, {id, page, sort}) {
    try {
      let {data} = await this.$axios.get(`/fatawas?id=${id}&page=${page}&sort=${sort}`);
      commit('SET_FATAWAS_LIST', data);
    } catch (error) {
      console.log('Error: Error occurred while fetching fatawas for fatawa page.', error)
    }//.... end of try-catch() .....//
  },

  async fetchBiography({commit}, {id, page, sort}) {
    try {
      let {data} = await this.$axios.get(`/biography-list?id=${id}&page=${page}&sort=${sort}`);
      commit('SET_PAGINATED_BIOGRAPHY', data);
    } catch (error) {
      console.log('Error: Error occurred while fetching Biography for biography page.', error)
    }//.... end of try-catch() .....//
  },

  async fetchPostCategories({commit}) {
    try {
      let {data} = await this.$axios.get('/articles/categories');
      commit('SET_POST_CATEGORIES', data);
    } catch(error) {
      console.error('Error: Error occurred while fetching post categories list.', error);
    }
  },
  async fetchSetting({commit}) {
    try {
      let {data} = await this.$axios.get('/settings');
      commit('SET_FOOTER_DESCRIPTION', data.footer_description);
      commit('SET_PAGES_LIST', data.pages);
      commit('SET_SOCIAL_LIST', data.social);
    } catch(error) {
      console.error('Error: Error occurred while fetching website Setting.', error);
    }
  },

  async fetchPosts({commit}, {category_id, page, sort}) {
    try {
      let {data} = await this.$axios.get(`/articles?category_id=${category_id}&page=${page}&sort=${sort}`);
      commit('SET_POSTS_LIST', data);
    } catch (error) {
      console.log('Error: Error occurred while fetching posts for posts page.', error)
    }//.... end of try-catch() .....//
  },

  async fetchAbstract({commit}, {category_id, page, sort}) {
    try {
      let {data} = await this.$axios.get(`/abstracts?category_id=${category_id}&page=${page}&sort=${sort}`);
      commit('SET_ABSTRACTS_LIST', data);
    } catch (error) {
      console.log('Error: Error occurred while fetching abstracts for abstracts page.', error)
    }//.... end of try-catch() .....//
  },

  async recordPageView({}, {type, id}) {
    try {
      await this.$axios.get(`/record-page-visit?type=${type}&id=${id}`);
    } catch (error) {
      console.log('Error: Error occurred while recording page visit.', error)
    }//.... end of try-catch() .....//
  },

  async fetchSounds({commit}, {page = 1, sort = '', category_id=''} = {}) {
    try {
      let data = await this.$axios.get(`/sounds?page=${page}&sort=${sort}&category_id=${category_id}`);
      commit('SET_SOUNDS_LIST', data);
    } catch (error) {
      console.log('Error: Error occurred while fetching sound for audio page.', error)
    }//.... end of try-catch() .....//
  },

  async fetchMiniClip({commit}, {page = 1, sort = '', category_id=''} = {}) {
    try {
      let data = await this.$axios.get(`/mini-clip?page=${page}&sort=${sort}&category_id=${category_id}`);
      commit('SET_MINI_CLIP_LIST', data);
    } catch (error) {
      console.log('Error: Error occurred while fetching sound for audio page.', error)
    }//.... end of try-catch() .....//
  },

  async performSearch({commit, state}, {keyword, pageNo = 1, type} = {}) {
    if (keyword.length >= 3) {
      commit('SET_IS_SEARCHING', true);

      try {
        commit('SET_SEARCH_KEYWORD', keyword);
        const {data, page, total, per_page, from} = await this.$axios.$get(`/search?page=${pageNo}&keyword=${keyword}&type=${type}&books=${state.advanceSearchFilter.includes('book') ? state.advanceSearchSelectedBooks: ''}&searchType=${state.searchType}`);
        commit('SET_IS_SEARCHING', false);
        commit('SET_SEARCH_RESULT', {data, meta: {page, total, per_page, from}});
      } catch (e) {
        commit('SET_IS_SEARCHING', false);
        commit('SET_SEARCH_RESULT', {data: [], meta: []});
      }//.... end of try-catch() .....//
    } else {
      commit('SET_IS_SEARCHING', false);
      commit('SET_SEARCH_RESULT', {data: [], meta: []});
      commit('SET_SEARCH_KEYWORD', '');
    }//..... end if() ......//
  },

  async fetchAllBiography({commit}) {
    try {
      let {data} = await this.$axios.get(`/all-biography-list`);
      commit('SET_BIOGRAPHY_LIST', data);
    } catch (error) {
      console.log('Error: Error occurred while fetching biography list for biography page.', error)
    }//.... end of try-catch() .....//
  },

  bookDownloaded(app, {id, type}) {
    try {
      this.$axios.get(`/record-downloads?id=${id}&type=${type}`);
    } catch (err) {
      console.error('Error: ', err);
    }
  }
}//..... end of Actions Object .....//

