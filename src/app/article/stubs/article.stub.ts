import { ArticleModel } from '../../models';

export const article: ArticleModel = {
    author: {
        bio: null,
        following: null,
        username: 'test3',
        image: 'https://api.realworld.io/images/smiley-cyrus.jpeg',
    },
    body: 'article unit test',
    comments: [],
    createdAt: '2021-12-03T09:29:01.790Z',
    description: 'cypress description',
    favorited: true,
    favoritesCount: 1,
    slug: 'unit-1',
    tagList: [],
    title: 'unit title',
    updatedAt: '2021-12-03T12:35:34.228Z',
};
