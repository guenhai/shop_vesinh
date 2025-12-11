import { Category, Product, ShopConfig } from './types';

export const SHOP_CONFIG: ShopConfig = {
  name: "Kho Tổng Vệ Sinh Việt",
  phone: "0912345678",
  zaloId: "0912345678",
  address: "123 Đường Xây Dựng, Q. Thanh Xuân, Hà Nội"
};

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Bồn cầu 1 khối Nano Men Tuyết',
    code: 'BC-001',
    category: Category.TOILET,
    price: 2500000,
    originalPrice: 3800000,
    description: 'Công nghệ xả xoáy 4D, men nano chống bám bẩn, nắp đóng êm.',
    image: 'https://picsum.photos/id/10/600/600',
    images: [
      'https://picsum.photos/id/10/600/600',
      'https://picsum.photos/id/11/600/600',
      'https://picsum.photos/id/12/600/600',
      'https://picsum.photos/id/13/600/600'
    ],
    isPopular: true,
    inStock: true,
  },
  {
    id: '2',
    name: 'Lavabo đặt bàn đá ceramic',
    code: 'LV-202',
    category: Category.LAVABO,
    price: 850000,
    originalPrice: 1200000,
    description: 'Thiết kế hiện đại, viền mỏng, dễ dàng vệ sinh.',
    image: 'https://picsum.photos/id/20/600/600',
    images: [
        'https://picsum.photos/id/20/600/600',
        'https://picsum.photos/id/21/600/600'
    ],
    isPopular: false,
    inStock: true,
  },
  {
    id: '3',
    name: 'Sen cây tắm đứng phím đàn',
    code: 'SC-303',
    category: Category.SHOWER,
    price: 3200000,
    originalPrice: 4500000,
    description: 'Chất liệu đồng thau mạ crom/niken, hiển thị nhiệt độ nước.',
    image: 'https://picsum.photos/id/30/600/600',
    images: [
        'https://picsum.photos/id/30/600/600',
        'https://picsum.photos/id/31/600/600',
        'https://picsum.photos/id/32/600/600'
    ],
    isPopular: true,
    inStock: true,
  },
  {
    id: '4',
    name: 'Vòi lavabo nóng lạnh 304',
    code: 'VL-404',
    category: Category.FAUCET,
    price: 450000,
    description: 'Inox 304 mờ, không gỉ sét, bảo hành 3 năm.',
    image: 'https://picsum.photos/id/40/600/600',
    images: ['https://picsum.photos/id/40/600/600'],
    isPopular: false,
    inStock: true,
  },
  {
    id: '5',
    name: 'Gương đèn LED cảm ứng',
    code: 'G-505',
    category: Category.ACCESSORY,
    price: 1100000,
    description: 'Phôi gương Bỉ, led vàng ấm, có sấy gương chống mờ.',
    image: 'https://picsum.photos/id/50/600/600',
    images: ['https://picsum.photos/id/50/600/600'],
    isPopular: true,
    inStock: true,
  },
  {
    id: '6',
    name: 'Combo Phòng Tắm Tiêu Chuẩn',
    code: 'CB-001',
    category: Category.COMBO,
    price: 5990000,
    originalPrice: 7500000,
    description: 'Bao gồm: Bồn cầu, Lavabo, Vòi sen, Gương, Phụ kiện 6 món.',
    image: 'https://picsum.photos/id/60/600/600',
    images: [
        'https://picsum.photos/id/60/600/600',
        'https://picsum.photos/id/61/600/600',
        'https://picsum.photos/id/62/600/600'
    ],
    isPopular: true,
    inStock: true,
  },
  {
    id: '7',
    name: 'Bồn cầu thông minh tự động',
    code: 'BC-SMART',
    category: Category.TOILET,
    price: 8900000,
    originalPrice: 12000000,
    description: 'Tự động đóng mở, xịt rửa, sấy khô, sưởi bệ ngồi.',
    image: 'https://picsum.photos/id/70/600/600',
    images: ['https://picsum.photos/id/70/600/600'],
    isPopular: false,
    inStock: false,
  },
  {
    id: '8',
    name: 'Vòi xịt vệ sinh tăng áp',
    code: 'VX-88',
    category: Category.ACCESSORY,
    price: 150000,
    description: 'Nhựa ABS chịu lực, dây xoắn chống rối.',
    image: 'https://picsum.photos/id/80/600/600',
    images: ['https://picsum.photos/id/80/600/600'],
    isPopular: false,
    inStock: true,
  }
];