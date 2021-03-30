import axios from 'axios'

export const build_sitemaps = async () => {
  let pages = [`/`,`/cards`, `/biography`, `/books`, `/fatawa`, `/posts`, `/sounds`, `/videos`, `/mini-videos`, `/mini-clip`, `/contact-us`, `/search`];

  let {data} = await axios.get(process.env.API_URL+'/get-sitemap', { headers: {Authorization: 'bearer '}});

  let siteMaps = [];

  siteMaps.push({
    path: '/sitemap-main.xml',
    etag: true,
    gzip: true,
    xmlNs: 'xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
    defaults: {
      changefreq: 'daily',
      priority: 1,
      lastmod: new Date()
    },
    routes: () => {
      /*  let mainRoutes = [];
      /*data.lang_keys.forEach(lang => {
          mainRoutes = [...mainRoutes, ...pages.map(p => `/${lang.key}${p}`)]
        });*/

      return pages;
    }
  });

  siteMaps.push({
    path: '/sitemap-cards.xml',
    etag: true,
    gzip: true,
    xmlNs: 'xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
    defaults: {
      changefreq: 'daily',
      priority: 1,
      lastmod: new Date()
    },
    exclude: pages,
    routes: () => {
      /* let cardsRoutes = [];
      data.lang_keys.forEach(lang => {
         cardsRoutes = [...cardsRoutes, ...data.author_ids.map((author_id) => `/${lang.key}/author/${author_id}`)]
       });
 */
      return data.cards.map((slug) => `/cards/${slug}`);
    }
  });

  siteMaps.push({
    path: '/sitemap-posts.xml',
    etag: true,
    gzip: true,
    xmlNs: 'xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
    defaults: {
      changefreq: 'daily',
      priority: 1,
      lastmod: new Date()
    },
    exclude: pages,
    routes: () => {
      return data.posts.map((pq) => `/posts/${pq}`);
    }
  });

/*  siteMaps.push({
    path: '/sitemap-abstracts.xml',
    etag: true,
    gzip: true,
    xmlNs: 'xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
    defaults: {
      changefreq: 'daily',
      priority: 1,
      lastmod: new Date()
    },
    exclude: pages,
    routes: () => {
      return data.abstracts.map((pq) => `/abstracts/${pq}`);
    }
  });*/

  siteMaps.push({
    path: '/sitemap-fatawas.xml',
    etag: true,
    gzip: true,
    xmlNs: 'xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
    defaults: {
      changefreq: 'daily',
      priority: 1,
      lastmod: new Date()
    },
    exclude: pages,
    routes: () => {
      return data.fatawas.map((pq) => `/fatawa/${pq}`);
    }
  });

  siteMaps.push({
    path: '/sitemap-sounds.xml',
    etag: true,
    gzip: true,
    xmlNs: 'xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
    defaults: {
      changefreq: 'daily',
      priority: 1,
      lastmod: new Date()
    },
    exclude: pages,
    routes: () => {
      return data.sounds.map((pq) => `/sounds/${pq}`)
    }
  });

  siteMaps.push({
    path: '/sitemap-videos.xml',
    etag: true,
    gzip: true,
    xmlNs: 'xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
    defaults: {
      changefreq: 'daily',
      priority: 1,
      lastmod: new Date()
    },
    exclude: pages,
    routes: () => {
      return data.videos.map((pq) => `/videos/${pq}`)
    }
  });

  siteMaps.push({
    path: '/sitemap-books.xml',
    etag: true,
    gzip: true,
    xmlNs: 'xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
    defaults: {
      changefreq: 'daily',
      priority: 1,
      lastmod: new Date()
    },
    exclude: pages,
    routes: () => {
      let bookRoutes = [];
      data.books.forEach((b) => {
        bookRoutes.push(`/books/${b.id}`);
        //bookRoutes = [...bookRoutes, ...b.children.map(c => `/books/${b.id}?index=${c}`)]
        b.children.forEach(index => {
          let url = `/books/${b.id}?index=${index.id}&page=${index.sequence_page_no}`;
          bookRoutes.push(url);

          index.h_one.forEach(hOne => {
            let url = `/books/${b.id}?index=${hOne.id}&page=${hOne.sequence_page_no}`;
            bookRoutes.push(url);

            hOne.h_two.forEach(hTwo => {
              let url = `/books/${b.id}?index=${hTwo.id}&page=${hTwo.sequence_page_no}`;
              bookRoutes.push(url);

              hTwo.h_three.forEach(hThree => {
                let url = `/books/${b.id}?index=${hThree.id}&page=${hThree.sequence_page_no}`;
                bookRoutes.push(url);

                hThree.h_four.forEach(hFour => {
                  let url = `/books/${b.id}?index=${hFour.id}&page=${hFour.sequence_page_no}`;
                  bookRoutes.push(url);
                });
              });
            });
          });

        });
      })

      return bookRoutes;
    }
  });

  return siteMaps;
};
