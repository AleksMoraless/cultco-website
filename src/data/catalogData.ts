import { ICategory } from "../types/index"

const images = {
  placeholder: new URL('../images/ph.jpg', import.meta.url).href,
};

export const catalogData: ICategory[] = [
  {
    id: '1',
    title: 'Строительные решения',
    src: images.placeholder,
    href: '#',
    description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Amet mollitia accusamus labore, ducimus vitae perspiciatis quod. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Amet mollitia accusamus labore, ducimus vitae perspiciatis quod.',
    categoryOffers: [
      {
        id: '1',
        title: 'Корзины для кондиционеров',
        src: images.placeholder,
        description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Amet mollitia accusamus labore, ducimus vitae perspiciatis quod. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Amet mollitia accusamus labore, ducimus vitae perspiciatis quod.',
        href: '',
        items: [
          {
            id: '1',
            title: 'Корзина Alice Judge',
            src: images.placeholder,
            alt: '',
            description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
            hit: true,
          },
          {
            id: '2',
            title: 'Корзина Adriana',
            src: images.placeholder,
            alt: '',
            description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Amet mollitia accusamus labore, ducimus vitae perspiciatis quod. ',
            hit: true,
          },
          {
            id: '3',
            title: 'Корзина Alice Judge',
            src: images.placeholder,
            alt: '',
            description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
            hit: false,
          },
        ]
      },
      {
        id: '02',
        title: 'Кровельные люки',
        src: images.placeholder,
        description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Amet mollitia accusamus labore, ducimus vitae perspiciatis quod. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Amet mollitia accusamus labore, ducimus vitae perspiciatis quod.',
        href: '',
        items: []
      },
      {
        id: '03',
        title: 'Решетки шумоподавления',
        src: images.placeholder,
        description: '#',
        href: '',
        items: []
      },
      {
        id: '04',
        title: 'Подставки для кондиционеров',
        src: images.placeholder,
        description: '#',
        href: '',
        items: []
      },
      {
        id: '05',
        title: 'Поожарные шкафы',
        src: images.placeholder,
        description: '#',
        href: '',
        items: []
      },
      {
        id: '06',
        title: 'Вентиляционные люки',
        src: images.placeholder,
        description: '#',
        href: '',
        items: []
      },
      {
        id: '07',
        title: 'Вентиляционные решетки',
        src: images.placeholder,
        description: '#',
        href: '',
        items: []
      },
    ]
  },
  {
    id: '2',
    title: 'Сервисное оборудование',
    src: images.placeholder,
    href: '#',
    description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Amet mollitia accusamus labore, ducimus vitae perspiciatis quod. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Amet mollitia accusamus labore, ducimus vitae perspiciatis quod.',
    categoryOffers: [
      {
        id: '1',
        title: 'Станки',
        src: images.placeholder,
        description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Amet mollitia accusamus labore, ducimus vitae perspiciatis quod. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Amet mollitia accusamus labore, ducimus vitae perspiciatis quod.',
        href: '',
        items: [
          {
            id: '1',
            title: 'Станок Khristen hancher',
            src: images.placeholder,
            alt: '',
            description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Amet mollitia accusamus labore, ducimus vitae perspiciatis quod. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Amet mollitia accusamus labore, ducimus vitae perspiciatis quod.',
            hit: true,
          }
        ]
      },
      {
        id: '02',
        title: 'Инструменты',
        src: images.placeholder,
        description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Amet mollitia accusamus labore, ducimus vitae perspiciatis quod. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Amet mollitia accusamus labore, ducimus vitae perspiciatis quod.',
        href: '',
        items: [
          {
            id: '1',
            title: 'Набор инструментов "Гамора"',
            src: images.placeholder,
            alt: '',
            description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Amet mollitia accusamus labore, ducimus vitae perspiciatis quod. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Amet mollitia accusamus labore, ducimus vitae perspiciatis quod.',
            hit: true,
          }
        ]
      },
    ]
  },
  {
    id: '3',
    title: 'Мангальные зоны',
    src: images.placeholder,
    href: '#',
    description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Amet mollitia accusamus labore, ducimus vitae perspiciatis quod. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Amet mollitia accusamus labore, ducimus vitae perspiciatis quod.',
    categoryOffers: [
    ]
  },
  {
    id: '4',
    title: 'Банные чаны',
    src: images.placeholder,
    href: '#',
    description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Amet mollitia accusamus labore, ducimus vitae perspiciatis quod. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Amet mollitia accusamus labore, ducimus vitae perspiciatis quod.',
    categoryOffers: [
    ]
  },
  // {
  //   id: '5',
  //   title: 'Что-то еще через 2 месяца',
  //   src: './src/images/catalog/bathtub/bathtub.jpg',
  //   href: '#',
  //   description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Amet mollitia accusamus labore, ducimus vitae perspiciatis quod. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Amet mollitia accusamus labore, ducimus vitae perspiciatis quod.',
  //   categoryOffers: [
  //   ]
  // },
]