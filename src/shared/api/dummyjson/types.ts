export type DummyReview = {
  rating: number;
  comment: string;
  date: string; // ISO
  reviewerName: string;
  reviewerEmail: string;
};

export type DummyDimensions = {
  width: number;
  height: number;
  depth: number;
};

export type DummyMeta = {
  createdAt: string;
  updatedAt: string;
  barcode: string;
  qrCode: string;
};

export type DummyVehicle = {
  id: number;
  title: string;
  description: string;
  category: "vehicle" | string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;

  tags: string[];
  brand: string;
  sku: string;
  weight: number;
  dimensions: DummyDimensions;

  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;

  reviews: DummyReview[];

  returnPolicy: string;
  minimumOrderQuantity: number;

  meta: DummyMeta;

  images: string[];
  thumbnail: string;
};

export type DummyCategoryResponse<T> = {
  products: T[];
  total: number;
  skip: number;
  limit: number;
};