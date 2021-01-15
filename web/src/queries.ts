export const siteQuery = `
      *[_type == 'site' && _id == "site"][0]{
          ...,
          "inspiration":inspiration.documents[]-> {
            image,
            "slug": slug->current,
            text,
            title,
            vimeoUrl,
            "category": category-> { 
              title,
              slug
            },
            href,
            'video': video.asset -> url
          },
          "general":{
            ...general,
            "backgroundVideo": general.backgroundVideo.asset->url
          },
          "home":{
            ...home,
            "video": home.video.asset->url
          }
        }
      `
