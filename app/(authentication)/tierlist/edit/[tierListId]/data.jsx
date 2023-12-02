export const data = [
  // index mean current order of row
  {
    id: 'container1', // id of row
    label: 'All of my heart',
    color: '#FABEBE',
    deletedElements: [],
    elements: [
      // index mean current order of element
      {
        // elementId field will have only new create element and set to -2
        id: 'asd', // id of element
        title: 'First Item',
        description: 'This is the first item.',
        picture: '/vercel.svg', // e.target.file[0]
        toShowSrc: '/vercel.svg', // URL.createObjectURL(e.target.file[0])
      },
      {
        id: 'a',
        title: 'Second Item',
        description: 'This is the second item.',
        picture: '/next.svg',
        toShowSrc: '/next.svg',
      },
      {
        id: 'c',
        title: 'Third Item',
        description: 'This is the third item.',
        picture: '/vercel.svg',
        toShowSrc: '/vercel.svg',
      },
    ],
  },
  {
    id: 'container2',
    label: 'Part of my heart',
    color: '#FAD4BE',
    deletedElements: [],
    elements: [
      {
        id: 'asd2',
        title: 'First Item',
        description: 'This is the first item.',
        picture: '/next.svg',
        toShowSrc: '/next.svg',
      },
      {
        id: 'a2',
        title: 'Second Item',
        description: 'This is the second item.',
        picture: '/next.svg',
        toShowSrc: '/next.svg',
      },
      {
        id: 'c2',
        title: 'Third Item',
        description: 'This is the third item.',
        picture: '/vercel.svg',
        toShowSrc: '/vercel.svg',
      },
      {
        id: 'c3',
        title: 'Third Item',
        description: 'This is the third item.',
        picture: '/next.svg',
        toShowSrc: '/next.svg',
      },
      {
        id: 'c4',
        title: 'fouth Item',
        description: 'This is the third item.',
        picture: '/vercel.svg',
        toShowSrc: '/vercel.svg',
      },
      {
        id: 'c5',
        title: 'fifth Item',
        description: 'This is the third item.',
        picture: '/next.svg',
        toShowSrc: '/next.svg',
      },
      {
        id: 'c6',
        title: 'six Item',
        description: 'This is the third item.',
        picture: '/vercel.svg',
        toShowSrc: '/vercel.svg',
      },
      {
        id: 'c7',
        title: 'seven Item',
        description: 'This is the third item.',
        picture: '/vercel.svg',
        toShowSrc: '/vercel.svg',
      },
      {
        id: 'c8',
        title: 'egg Item',
        description: 'This is the third item.',
        picture: '/next.svg',
        toShowSrc: '/next.svg',
      },
    ],
  },
  // {
  //   id: 'container3',
  //   label: 'container3',
  //   color: '#FAE6BE',
  //   deletedElements: [],

  //   elements: [],
  // },
  // {
  //   id: 'container4',
  //   label: 'container4',
  //   color: '#FAE6BE',
  //   deletedElements: [],
  //   elements: [],
  // },
  // {
  //   id: 'container5',
  //   label: 'container5',
  //   color: '#FAE6BE',
  //   deletedElements: [],
  //   elements: [],
  // },
  // {
  //   id: 'container6',
  //   label: 'container6',
  //   color: '#FAE6BE',
  //   deletedElements: [],
  //   elements: [],
  // },
  // {
  //   id: 'container7',
  //   label: 'container7',
  //   color: '#FAE6BE',
  //   elements: [],
  //   deletedElements: [],
  // },
  // {
  //   id: 'container8',
  //   label: 'container8',
  //   color: '#FAE6BE',
  //   elements: [],
  //   deletedElements: [],
  // },
  {
    id: -1,
    label: -1,
    color: '#F2FABE',
    deletedElements: [],
    elements: [
      {
        id: 'c9',
        title: 'seven Item',
        description: 'This is the third item.',
        picture: '/vercel.svg',
        toShowSrc: '/vercel.svg',
        isNew: true,
      },
      {
        id: 'c10',
        title: 'egg Item',
        description: 'This is the third item.',
        picture: '/next.svg',
        toShowSrc: '/next.svg',
        isNew: true,
      },
    ],
  },
];
